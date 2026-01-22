/**
 * Google Gemini LLM 클라이언트
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { LLMRequest, LLMResponse } from './types';
import { createPrompt } from './prompt';

// Gemini 클라이언트 초기화
let geminiClient: GoogleGenerativeAI | null = null;

function getGeminiClient(apiKey: string): GoogleGenerativeAI {
	if (!geminiClient) {
		geminiClient = new GoogleGenerativeAI(apiKey);
	}
	return geminiClient;
}

/**
 * 지연 함수 (재시도용)
 */
function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Gemini API 호출하여 카드 데이터 생성 (재시도 로직 포함)
 */
export async function generateWithGemini(
	request: LLMRequest,
	apiKey: string,
	retryCount: number = 0,
	maxRetries: number = 3,
): Promise<LLMResponse> {
	const client = getGeminiClient(apiKey);
	const model = client.getGenerativeModel({
		model: 'gemini-3-flash-preview', // Gemini Pro 모델 사용
		generationConfig: {
			temperature: 0.7,
			maxOutputTokens: 3000,
			responseMimeType: 'application/json',
		},
	});

	const prompt = createPrompt(request);
	const systemInstruction =
		'당신은 전문적인 점성술 해석가입니다. 출생차트를 분석하여 사용자에게 의미 있는 해석을 제공합니다. 항상 JSON 형식으로 응답하세요.';

	try {
		const result = await model.generateContent([systemInstruction, prompt]);

		const response = result.response;
		let content = response.text();
		console.log('=== Gemini Raw Response ===');

		if (!content) {
			throw new Error('LLM 응답이 비어있습니다.');
		}

		// JSON 파싱 전 정리
		// 1. 마크다운 코드 블록 제거 (```json ... ```)
		content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '');
		// 2. 앞뒤 공백 제거
		content = content.trim();

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
			console.error('정리된 응답:', content);

			// JSON 파싱 실패 시 재시도 (마지막 시도)
			// 불완전한 JSON을 수정 시도
			try {
				// 마지막 중괄호가 없으면 추가
				if (!content.endsWith('}')) {
					// 마지막 따옴표 찾기
					const lastQuoteIndex = content.lastIndexOf('"');
					if (lastQuoteIndex > 0) {
						content =
							content.substring(0, lastQuoteIndex + 1) + '\n}';
					}
				}

				const parsed = JSON.parse(content) as LLMResponse;
				if (!parsed.symbol || !parsed.body || !parsed.cta) {
					throw new Error('LLM 응답에 필수 필드가 누락되었습니다.');
				}
				return parsed;
			} catch (retryError) {
				throw new Error('LLM 응답을 파싱할 수 없습니다.');
			}
		}
	} catch (error: any) {
		// Gemini API 에러 처리
		const errorMessage = error.message || '';

		// 디버깅: 전체 에러 정보 출력
		console.error('=== Gemini API Error Debug ===');
		console.error('Error status:', error.status);
		console.error('Error message:', errorMessage);
		console.error('Error object:', JSON.stringify(error, null, 2));

		// Rate limit 에러
		if (
			error.status === 429 ||
			errorMessage.includes('RESOURCE_EXHAUSTED') ||
			errorMessage.includes('quota')
		) {
			if (retryCount < maxRetries) {
				const retryAfter = Math.min(
					1000 * Math.pow(2, retryCount),
					10000,
				); // Exponential backoff, 최대 10초

				if (process.env.NODE_ENV === 'development') {
					console.log(
						`Rate limit 발생. ${retryAfter}ms 후 재시도... (${retryCount + 1}/${maxRetries})`,
					);
				}
				await sleep(retryAfter);
				return generateWithGemini(
					request,
					apiKey,
					retryCount + 1,
					maxRetries,
				);
			}
			throw new Error(
				'LLM API 호출 한도가 초과되었습니다. 잠시 후 다시 시도해주세요.',
			);
		}

		// 서버 오류
		if (
			error.status === 500 ||
			error.status === 503 ||
			errorMessage.includes('INTERNAL') ||
			errorMessage.includes('UNAVAILABLE')
		) {
			if (retryCount < maxRetries) {
				const retryDelay = Math.min(
					1000 * Math.pow(2, retryCount),
					5000,
				); // 최대 5초
				console.log(
					`서버 오류 발생. ${retryDelay}ms 후 재시도... (${retryCount + 1}/${maxRetries})`,
				);
				await sleep(retryDelay);
				return generateWithGemini(
					request,
					apiKey,
					retryCount + 1,
					maxRetries,
				);
			}
			throw new Error(
				'LLM 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
			);
		}

		// 타임아웃
		if (
			errorMessage.includes('timeout') ||
			errorMessage.includes('TIMEOUT') ||
			errorMessage.includes('DEADLINE_EXCEEDED')
		) {
			if (retryCount < maxRetries) {
				const retryDelay = 1000 * (retryCount + 1); // 1초, 2초, 3초...
				console.log(
					`타임아웃 발생. ${retryDelay}ms 후 재시도... (${retryCount + 1}/${maxRetries})`,
				);
				await sleep(retryDelay);
				return generateWithGemini(
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

		// 인증 오류
		if (
			error.status === 400 ||
			error.status === 401 ||
			error.status === 403
		) {
			throw new Error(
				`LLM API 키가 유효하지 않습니다. (Status: ${error.status})`,
			);
		}

		// 기타 에러 - 원본 에러 메시지 포함
		throw new Error(`Gemini API 오류: ${errorMessage}`);
	}
}
