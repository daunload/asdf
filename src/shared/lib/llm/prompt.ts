/**
 * LLM 프롬프트 생성 유틸리티
 */

import type { LLMRequest } from './types';

/**
 * 출생차트와 주제를 기반으로 LLM 프롬프트 생성
 */
export function createPrompt(request: LLMRequest): string {
	const { chartData, topicId, topicName, isTimeUnknown } = request;

	const prompt = `당신은 전문적인 점성술 해석가입니다. 다음 출생차트 정보를 바탕으로 "${topicName}" 주제에 대한 해석을 제공해주세요.
        **출생차트 정보:**
        ${chartData.join('\n')}

        **요청 주제:** ${topicName}

        **응답 형식 (JSON):**
        {
        "symbol": "이모지 또는 심볼 문자 (예: ⭐, 🌙, 💫)",
        "body": "1~2문장으로 간결하게 핵심 해석을 제공하세요. 시간을 모르는 경우 그 제한점을 언급할 수 있습니다.",
        "cta": "다음 단계나 행동을 유도하는 짧은 문구 (예: '더 알아보기', '다음 카드 보기')"
        }

        **지침:**
        - 해석은 한국어로 작성하세요.
        - 점성술 용어를 사용하되, 일반인도 이해할 수 있도록 설명하세요.
        - 긍정적이면서도 현실적인 톤을 유지하세요.
        - 시간을 모르는 경우, 그 제한점을 자연스럽게 언급하세요.
        - JSON 형식을 정확히 따르세요.

        JSON 응답만 반환하세요.`;

	return prompt;
}
