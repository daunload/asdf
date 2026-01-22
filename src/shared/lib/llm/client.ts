/**
 * LLM API 클라이언트
 */

import OpenAI from 'openai';
import type { LLMRequest, LLMResponse } from './types';
import { createPrompt } from './prompt';

// OpenAI 클라이언트 초기화
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
	if (!openaiClient) {
		const apiKey = process.env.OPENAI_API_KEY;
		if (!apiKey) {
			throw new Error('OPENAI_API_KEY 환경 변수가 설정되지 않았습니다.');
		}
		openaiClient = new OpenAI({
			apiKey,
		});
	}
	return openaiClient;
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
	const client = getOpenAIClient();
	const prompt = createPrompt(request);

	try {
		const completion = await client.chat.completions.create({
			model: 'gpt-4o-mini', // 또는 'gpt-3.5-turbo'
			messages: [
				{
					role: 'system',
					content:
						'당신은 전문적인 점성술 해석가입니다. 출생차트를 분석하여 사용자에게 의미 있는 해석을 제공합니다. 항상 JSON 형식으로 응답하세요.',
				},
				{
					role: 'user',
					content: prompt,
				},
			],
			temperature: 0.7,
			max_tokens: 500,
			response_format: { type: 'json_object' }, // JSON 형식 강제
		});

		const content = completion.choices[0]?.message?.content;
		if (!content) {
			throw new Error('LLM 응답이 비어있습니다.');
		}

		// JSON 파싱
		try {
			const parsed = JSON.parse(content) as LLMResponse;

			// 필수 필드 검증
			if (!parsed.symbol || !parsed.body || !parsed.cta) {
				throw new Error('LLM 응답에 필수 필드가 누락되었습니다.');
			}

			return parsed;
		} catch (parseError) {
			console.error('LLM 응답 파싱 오류:', parseError);
			console.error('원본 응답:', content);
			throw new Error('LLM 응답을 파싱할 수 없습니다.');
		}
	} catch (error: any) {
		// OpenAI API 에러 처리
		if (error instanceof OpenAI.APIError) {
			if (error.status === 429) {
				// Rate limit - 재시도 가능
				if (retryCount < maxRetries) {
					// Retry-After 헤더 확인 (초 단위)
					const retryAfter = error.headers?.['retry-after']
						? parseInt(error.headers['retry-after'] as string, 10) *
							1000
						: Math.min(1000 * Math.pow(2, retryCount), 10000); // Exponential backoff, 최대 10초

					// 개발 환경에서만 상세 로그 출력
					if (process.env.NODE_ENV === 'development') {
						console.log(
							`Rate limit 발생. ${retryAfter}ms 후 재시도... (${retryCount + 1}/${maxRetries})`,
						);
					}
					await sleep(retryAfter);
					return generateCard(request, retryCount + 1, maxRetries);
				}
				// 최대 재시도 횟수 초과
				throw new Error(
					'LLM API 호출 한도가 초과되었습니다. 잠시 후 다시 시도해주세요.',
				);
			} else if (error.status === 500 || error.status === 503) {
				// 서버 오류 - 재시도 가능
				if (retryCount < maxRetries) {
					const retryDelay = Math.min(
						1000 * Math.pow(2, retryCount),
						5000,
					); // 최대 5초
					console.log(
						`서버 오류 발생. ${retryDelay}ms 후 재시도... (${retryCount + 1}/${maxRetries})`,
					);
					await sleep(retryDelay);
					return generateCard(request, retryCount + 1, maxRetries);
				}
				throw new Error(
					'LLM 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
				);
			} else if (error.code === 'insufficient_quota') {
				// 할당량 부족 - 재시도 불가
				throw new Error('LLM API 할당량이 부족합니다.');
			}
		}

		// 타임아웃 체크 (일반적으로 fetch 타임아웃은 에러로 처리됨)
		if (
			error.message?.includes('timeout') ||
			error.message?.includes('TIMEOUT')
		) {
			if (retryCount < maxRetries) {
				const retryDelay = 1000 * (retryCount + 1); // 1초, 2초, 3초...
				console.log(
					`타임아웃 발생. ${retryDelay}ms 후 재시도... (${retryCount + 1}/${maxRetries})`,
				);
				await sleep(retryDelay);
				return generateCard(request, retryCount + 1, maxRetries);
			}
			throw new Error(
				'LLM API 호출이 시간 초과되었습니다. 다시 시도해주세요.',
			);
		}

		// 기타 에러
		throw error;
	}
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
			// OpenAI 무료 계정은 분당 3-5 요청 제한이 있으므로 충분한 지연 필요
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
