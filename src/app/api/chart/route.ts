import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { calculateChart } from '@/shared/lib/chart/calculate';

export async function POST(request: NextRequest) {
	try {
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

		// 날짜 형식 검증
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateRegex.test(birthDate)) {
			return NextResponse.json(
				{
					error: '유효하지 않은 날짜 형식입니다.',
					code: 'INVALID_DATE_FORMAT',
				},
				{ status: 400 },
			);
		}

		// 시간 형식 검증 (unknown이 아닌 경우)
		if (birthTime !== 'unknown') {
			const timeRegex = /^\d{2}:\d{2}$/;
			if (!timeRegex.test(birthTime)) {
				return NextResponse.json(
					{
						error: '유효하지 않은 시간 형식입니다.',
						code: 'INVALID_TIME_FORMAT',
					},
					{ status: 400 },
				);
			}
		}

		// 출생차트 계산
		const chartData = calculateChart({
			birthDate,
			birthTime,
			birthPlace,
		});

		// 차트 데이터 반환
		return NextResponse.json({
			chart: chartData,
		});
	} catch (error) {
		console.error('출생차트 계산 오류:', error);

		// 계산 오류인 경우 재시도 가능
		return NextResponse.json(
			{
				error: '출생차트 계산 중 오류가 발생했습니다.',
				code: 'CHART_CALCULATION_ERROR',
				retry: true,
			},
			{ status: 500 },
		);
	}
}
