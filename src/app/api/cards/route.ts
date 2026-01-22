import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { calculateChart } from '@/shared/lib/chart/calculate';
import { generateCards } from '@/shared/lib/llm/client';
import { getTopicById, topics } from '@/shared/config/topics';
import type { LLMRequest } from '@/shared/lib/llm/types';

export async function POST(request: NextRequest) {
	try {
		// 요청 본문에서 주제 ID 배열 읽기
		const body = await request.json().catch(() => ({}));
		const topicIds: string[] = body.topicIds || [];

		// 주제 ID가 없으면 무료 주제 4개 사용
		const requestedTopicIds =
			topicIds.length > 0
				? topicIds
				: topics.filter((t) => t.isFree).map((t) => t.id);

		// 주제 유효성 검사
		const invalidTopics = requestedTopicIds.filter(
			(id) => !getTopicById(id),
		);
		if (invalidTopics.length > 0) {
			return NextResponse.json(
				{
					error: `유효하지 않은 주제 ID입니다: ${invalidTopics.join(', ')}`,
					code: 'INVALID_TOPIC_IDS',
				},
				{ status: 400 },
			);
		}

		// 쿠키에서 출생 정보 읽기
		const cookieStore = await cookies();
		const birthDate = cookieStore.get('birthDate')?.value;
		const birthTime = cookieStore.get('birthTime')?.value || 'unknown';
		const birthPlace = cookieStore.get('birthPlace')?.value;

		// 필수 정보 확인
		if (!birthDate || !birthPlace) {
			return NextResponse.json(
				{
					error: '출생 정보가 없습니다. 온보딩을 먼저 완료해주세요.',
					code: 'MISSING_BIRTH_INFO',
				},
				{ status: 400 },
			);
		}

		// 출생차트 계산
		let chartData;
		try {
			chartData = calculateChart({
				birthDate,
				birthTime,
				birthPlace,
			});
		} catch (error) {
			console.error('차트 계산 오류:', error);
			return NextResponse.json(
				{
					error: '출생차트 계산 중 오류가 발생했습니다.',
					code: 'CHART_CALCULATION_ERROR',
					retry: true,
				},
				{ status: 500 },
			);
		}

		// 주제별 LLM 요청 생성
		const llmRequests: LLMRequest[] = requestedTopicIds.map((topicId) => {
			const topic = getTopicById(topicId);
			if (!topic) {
				throw new Error(`주제를 찾을 수 없습니다: ${topicId}`);
			}

			return {
				chartData,
				topicId: topic.id,
				topicName: topic.name,
				isTimeUnknown: chartData.isTimeUnknown,
			};
		});

		// LLM 호출하여 카드 생성
		let cards;
		try {
			cards = await generateCards(llmRequests);
		} catch (error: any) {
			console.error('LLM 카드 생성 오류:', error);

			// 타임아웃 또는 재시도 가능한 에러
			const isRetryable =
				error.message?.includes('시간 초과') ||
				error.message?.includes('timeout') ||
				error.message?.includes('일시적인 문제') ||
				error.message?.includes('한도가 초과');

			return NextResponse.json(
				{
					error: error.message || '카드 생성 중 오류가 발생했습니다.',
					code: 'LLM_GENERATION_ERROR',
					retry: isRetryable,
				},
				{ status: 500 },
			);
		}

		// 카드 데이터 변환 (응답 형식에 맞게)
		const cardData = cards.map(({ topicId, card }) => ({
			topicId,
			symbol: card.symbol,
			body: card.body,
			cta: card.cta,
		}));

		return NextResponse.json({
			cards: cardData,
		});
	} catch (error: any) {
		console.error('카드 생성 API 오류:', error);

		return NextResponse.json(
			{
				error: '카드 생성 중 예상치 못한 오류가 발생했습니다.',
				code: 'INTERNAL_ERROR',
				retry: false,
			},
			{ status: 500 },
		);
	}
}
