/**
 * LLM API 클라이언트
 * OpenAI와 Gemini 프로바이더를 지원합니다.
 */

import type { LLMRequest, LLMResponse, LLMProvider, LLMConfig } from './types';
import { generateWithOpenAI } from './openai-client';
import { generateWithGemini } from './gemini-client';

/**
 * 환경 변수에서 LLM 설정 가져오기
 */
function getLLMConfig(): LLMConfig {
	// 프로바이더 선택 (기본값: openai)
	const provider = (process.env.LLM_PROVIDER as LLMProvider) || 'openai';

	// 유효한 프로바이더인지 확인
	if (provider !== 'openai' && provider !== 'gemini') {
		console.warn(
			`잘못된 LLM_PROVIDER 값: ${provider}. 기본값 'openai'를 사용합니다.`,
		);
		return getLLMConfigForProvider('openai');
	}

	return getLLMConfigForProvider(provider);
}

/**
 * 특정 프로바이더에 대한 설정 가져오기
 */
function getLLMConfigForProvider(provider: LLMProvider): LLMConfig {
	let apiKey: string | undefined;

	if (provider === 'openai') {
		apiKey = process.env.NATALCHART_OPENAI_API_KEY;
		if (!apiKey) {
			throw new Error(
				'NATALCHART_OPENAI_API_KEY 환경 변수가 설정되지 않았습니다.',
			);
		}
	} else if (provider === 'gemini') {
		apiKey = process.env.NATALCHART_GEMINI_API_KEY;
		if (!apiKey) {
			throw new Error(
				'NATALCHART_GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.',
			);
		}
	}

	return {
		provider,
		apiKey: apiKey!,
	};
}

/**
 * 지연 함수 (재시도용)
 */
function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * LLM API 호출하여 카드 데이터 생성 (재시도 로직 포함)
 */
export async function generateCard(
	request: LLMRequest,
	retryCount: number = 0,
	maxRetries: number = 3,
): Promise<LLMResponse> {
	const config = getLLMConfig();

	// 프로바이더에 따라 적절한 클라이언트 호출
	if (config.provider === 'openai') {
		return generateWithOpenAI(
			request,
			config.apiKey,
			retryCount,
			maxRetries,
		);
	} else if (config.provider === 'gemini') {
		return generateWithGemini(
			request,
			config.apiKey,
			retryCount,
			maxRetries,
		);
	}

	throw new Error(`지원하지 않는 LLM 프로바이더: ${config.provider}`);
}

/**
 * 여러 주제에 대해 카드 생성 (순차 처리, 요청 간 지연 포함)
 */
export async function generateCards(
	requests: LLMRequest[],
): Promise<Array<{ topicId: string; card: LLMResponse }>> {
	const results: Array<{ topicId: string; card: LLMResponse }> = [];

	for (let i = 0; i < requests.length; i++) {
		const request = requests[i];
		try {
			// 첫 번째 요청이 아니면 지연 추가 (rate limit 방지)
			// 무료 계정은 분당 3-5 요청 제한이 있으므로 충분한 지연 필요
			if (i > 0) {
				await sleep(2000); // 2초 지연 (분당 최대 30 요청으로 제한)
			}

			const card = await generateCard(request);
			results.push({ topicId: request.topicId, card });
		} catch (error: any) {
			// 개별 주제 실패 시 에러를 기록하고 계속 진행
			console.error(`주제 ${request.topicId} 카드 생성 실패:`, error);
			// 실패한 주제는 기본값으로 대체하거나 에러 응답에 포함
			results.push({
				topicId: request.topicId,
				card: {
					symbol: '⚠️',
					body:
						error.message ||
						'카드 생성 중 오류가 발생했습니다. 다시 시도해주세요.',
					cta: '다시 시도',
				},
			});
		}
	}

	return results;
}
