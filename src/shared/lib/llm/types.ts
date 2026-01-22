/**
 * LLM API 관련 타입 정의
 */

/**
 * 지원되는 LLM 프로바이더
 */
export type LLMProvider = 'openai' | 'gemini';

/**
 * LLM 설정
 */
export interface LLMConfig {
	provider: LLMProvider;
	apiKey: string;
}

export interface Card {
	topicId: string;
	symbol: string; // 이모지 또는 심볼 문자
	body: string; // 1~2문장 해석
	cta: string; // CTA 텍스트
}

export interface LLMRequest {
	chartData: string[]; // 출생차트 데이터
	topicId: string;
	topicName: string;
	isTimeUnknown: boolean;
}

export interface LLMResponse {
	symbol: string;
	body: string;
	cta: string;
}
