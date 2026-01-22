/**
 * LLM 프롬프트 생성 유틸리티
 */

import type { LLMRequest } from './types';

/**
 * 출생차트와 주제를 기반으로 LLM 프롬프트 생성
 */
export function createPrompt(request: LLMRequest): string {
	const { chartData, topicId, topicName, isTimeUnknown } = request;

	// 차트 데이터 요약 (주요 정보만 추출)
	const sunSign =
		chartData.horoscope?.celestialBodies?.sun?.Sign?.label || '알 수 없음';
	const ascendant =
		chartData.horoscope?.angles?.ascendant?.Sign?.label || '알 수 없음';
	const moonSign =
		chartData.horoscope?.celestialBodies?.moon?.Sign?.label || '알 수 없음';

	// 시간 모름 처리 안내
	const timeUnknownNote = isTimeUnknown
		? '\n\n⚠️ 중요: 출생 시간을 모르는 경우이므로, 시간에 의존적인 해석(예: 하우스 위치, 상승궁 정확도)은 제한적이거나 근사치로 제공해야 합니다. 이 점을 명시하거나 일반적인 해석에 집중하세요.'
		: '';

	// 출생 시간 문자열 생성
	const birthTimeStr = isTimeUnknown
		? '알 수 없음 (기본값 12:00 사용)'
		: `${chartData.origin.hour}:${String(chartData.origin.minute).padStart(2, '0')}`;

	const prompt = `당신은 전문적인 점성술 해석가입니다. 다음 출생차트 정보를 바탕으로 "${topicName}" 주제에 대한 해석을 제공해주세요.
        **출생차트 정보:**
        - 태양궁: ${sunSign}
        - 상승궁: ${ascendant}
        - 달궁: ${moonSign}
        - 출생 시간: ${birthTimeStr}
        - 출생 장소: 위도 ${chartData.origin.latitude}, 경도 ${chartData.origin.longitude}${timeUnknownNote}

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
