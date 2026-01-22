/**
 * OpenAI LLM 클라이언트
 */

import OpenAI from 'openai';
import type { LLMRequest, LLMResponse } from './types';
import { createPrompt } from './prompt';

// OpenAI 클라이언트 초기화
let openaiClient: OpenAI | null = null;

function getOpenAIClient(apiKey: string): OpenAI {
	if (!openaiClient) {
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
 * OpenAI API 호출하여 카드 데이터 생성 (재시도 로직 포함)
 */
export async function generateWithOpenAI(
	request: LLMRequest,
	apiKey: string,
	retryCount: number = 0,
	maxRetries: number = 3,
): Promise<LLMResponse> {
	const client = getOpenAIClient(apiKey);
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
					return generateWithOpenAI(
						request,
						apiKey,
						retryCount + 1,
						maxRetries,
					);
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
					return generateWithOpenAI(
						request,
						apiKey,
						retryCount + 1,
						maxRetries,
					);
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
				return generateWithOpenAI(
					request,
					apiKey,
					retryCount + 1,
					maxRetries,
				);
			}
			throw new Error(
				'LLM API 호출이 시간 초과되었습니다. 다시 시도해주세요.',
			);
		}

		// 기타 에러
		throw error;
	}
}
