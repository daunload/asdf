import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { calculateChart } from '@/shared/lib/chart/calculate';
import { generateCards } from '@/shared/lib/llm/client';
import { getTopicById, topics } from '@/shared/config/topics';
import type { LLMRequest } from '@/shared/lib/llm/types';

// 지오코딩 함수: 주소를 위도/경도로 변환
async function geocodeAddress(
	address: string,
): Promise<{ lat: number; lon: number }> {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
			{
				headers: {
					'User-Agent': 'AstrologyApp/1.0',
				},
			},
		);

		if (!response.ok) {
			throw new Error('지오코딩 API 요청 실패');
		}

		const data = await response.json();

		if (!data || data.length === 0) {
			throw new Error(`주소를 찾을 수 없습니다: ${address}`);
		}

		const lat = parseFloat(data[0].lat);
		const lon = parseFloat(data[0].lon);

		if (isNaN(lat) || isNaN(lon)) {
			throw new Error('유효하지 않은 좌표값');
		}

		return { lat, lon };
	} catch (error) {
		console.error('지오코딩 오류:', error);
		throw new Error(
			`주소를 좌표로 변환할 수 없습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
		);
	}
}

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

		// 주소를 위도/경도로 변환
		let coordinates;
		try {
			coordinates = await geocodeAddress(birthPlace);
		} catch (error) {
			console.error('지오코딩 오류:', error);
			return NextResponse.json(
				{
					error:
						error instanceof Error
							? error.message
							: '주소 변환 중 오류가 발생했습니다.',
					code: 'GEOCODING_ERROR',
					retry: true,
				},
				{ status: 500 },
			);
		}

		// ISO 날짜 문자열 생성
		const isTimeUnknown = birthTime === 'unknown';
		const isoDateTime = isTimeUnknown
			? `${birthDate}T12:00:00+09:00` // 시간 모를 경우 정오 기준
			: `${birthDate}T${birthTime}:00+09:00`;

		// 출생차트 계산
		let chartData;
		try {
			chartData = calculateChart(
				isoDateTime,
				coordinates.lat,
				coordinates.lon,
			);
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
				isTimeUnknown,
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
