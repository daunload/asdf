import { Origin, Horoscope } from 'circular-natal-horoscope-js';

export interface BirthInfo {
	birthDate: string; // YYYY-MM-DD
	birthTime: string; // HH:MM or "unknown"
	birthPlace: string; // 장소 이름 (위도/경도 변환 필요)
}

export interface ChartData {
	origin: {
		year: number;
		month: number; // 0-based (0=1월, 11=12월)
		date: number;
		hour: number;
		minute: number;
		latitude: number;
		longitude: number;
	};
	horoscope: {
		celestialBodies: any;
		houses: any;
		aspects: {
			all: any[];
			types: Record<string, any>;
			points: Record<string, any>;
		};
		angles: {
			ascendant: any;
			midheaven: any;
		};
	};
	isTimeUnknown: boolean;
}

/**
 * 장소 이름을 위도/경도로 변환 (간단한 예시)
 * 실제로는 지오코딩 API를 사용해야 함
 */
function getCoordinatesFromPlace(place: string): {
	latitude: number;
	longitude: number;
} {
	// 임시로 주요 도시 매핑 (실제로는 지오코딩 API 사용)
	const cityMap: Record<string, { latitude: number; longitude: number }> = {
		'서울': { latitude: 37.5665, longitude: 126.978 },
		'부산': { latitude: 35.1796, longitude: 129.0756 },
		'대구': { latitude: 35.8714, longitude: 128.6014 },
		'인천': { latitude: 37.4563, longitude: 126.7052 },
		'광주': { latitude: 35.1595, longitude: 126.8526 },
		'대전': { latitude: 36.3504, longitude: 127.3845 },
		'New York': { latitude: 40.7128, longitude: -74.006 },
		'Los Angeles': { latitude: 34.0522, longitude: -118.2437 },
		London: { latitude: 51.5074, longitude: -0.1278 },
		Tokyo: { latitude: 35.6762, longitude: 139.6503 },
	};

	// 정확한 매칭 시도
	if (cityMap[place]) {
		return cityMap[place];
	}

	// 부분 매칭 시도
	for (const [city, coords] of Object.entries(cityMap)) {
		if (place.includes(city) || city.includes(place)) {
			return coords;
		}
	}

	// 기본값: 서울
	console.warn(`장소 "${place}"를 찾을 수 없어 서울 좌표를 사용합니다.`);
	return { latitude: 37.5665, longitude: 126.978 };
}

/**
 * 출생 정보로부터 출생차트 계산
 */
export function calculateChart(birthInfo: BirthInfo): ChartData {
	const { birthDate, birthTime, birthPlace } = birthInfo;

	// 날짜 파싱
	const [year, month, date] = birthDate.split('-').map(Number);
	const monthIndex = month - 1; // 0-based (0=1월, 11=12월)

	// 시간 처리
	let hour = 12; // 기본값: 정오
	let minute = 0;
	const isTimeUnknown = birthTime === 'unknown';

	if (!isTimeUnknown) {
		const [h, m] = birthTime.split(':').map(Number);
		hour = h;
		minute = m;
	}

	// 장소를 위도/경도로 변환
	const { latitude, longitude } = getCoordinatesFromPlace(birthPlace);

	// Origin 생성
	const origin = new Origin({
		year,
		month: monthIndex,
		date,
		hour,
		minute,
		latitude,
		longitude,
	});

	// Horoscope 계산
	const horoscope = new Horoscope({
		origin,
		houseSystem: 'placidus', // 기본 하우스 시스템
		zodiac: 'tropical', // 기본 황도 시스템
		aspectPoints: ['bodies', 'points', 'angles'],
		aspectWithPoints: ['bodies', 'points', 'angles'],
		aspectTypes: ['major'], // 주요 각도만
	});

	return {
		origin: {
			year,
			month: monthIndex,
			date,
			hour,
			minute,
			latitude,
			longitude,
		},
		horoscope: {
			celestialBodies: horoscope.CelestialBodies,
			houses: horoscope.Houses,
			aspects: horoscope.Aspects,
			angles: {
				ascendant: horoscope.Ascendant,
				midheaven: horoscope.Midheaven,
			},
		},
		isTimeUnknown,
	};
}
