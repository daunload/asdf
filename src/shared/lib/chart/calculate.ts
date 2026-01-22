import * as Astronomy from 'astronomy-engine';

// ==========================================
// 1. 설정 및 상수
// ==========================================
const ZODIAC_SIGNS = [
	'Aries',
	'Taurus',
	'Gemini',
	'Cancer',
	'Leo',
	'Virgo',
	'Libra',
	'Scorpio',
	'Sagittarius',
	'Capricorn',
	'Aquarius',
	'Pisces',
];

const ASPECTS = [
	{ name: 'Conjunction', angle: 0, orb: 8 },
	{ name: 'Opposition', angle: 180, orb: 8 },
	{ name: 'Trine', angle: 120, orb: 8 },
	{ name: 'Square', angle: 90, orb: 8 },
	{ name: 'Sextile', angle: 60, orb: 6 },
];

// 행성 목록 (소행성 제외)
const PLANET_NAMES = [
	'Sun',
	'Moon',
	'Mercury',
	'Venus',
	'Mars',
	'Jupiter',
	'Saturn',
	'Uranus',
	'Neptune',
	'Pluto',
];

// ==========================================
// 2. 유틸리티 함수
// ==========================================

// 도(Degree) -> 분(Minute) 포함 텍스트 변환 (예: 3°48’)
function formatDMS(degrees: number) {
	const d = Math.floor(degrees);
	const m = Math.floor((degrees - d) * 60);
	return `${d}°${String(m).padStart(2, '0')}’`;
}

// 황경 정규화 (0~360)
function normalizeDegree(deg: number) {
	let d = deg % 360;
	if (d < 0) d += 360;
	return d;
}

// 0~360도를 별자리 정보로 변환
function getZodiacData(longitude: number) {
	const abs = normalizeDegree(longitude);
	const signIndex = Math.floor(abs / 30);
	const signDegree = abs % 30;

	return {
		signName: ZODIAC_SIGNS[signIndex],
		degree: signDegree,
		absDegree: abs,
	};
}

// 서수 형식 반환 (1st, 2nd, 3rd, 4th, ...)
function getOrdinal(n: number) {
	const suffixes = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

// 행성이 속한 하우스 계산 (Equal House 기준)
function getHouseNumber(planetDegree: number, ascDegree: number) {
	const diff = normalizeDegree(planetDegree - ascDegree);
	return Math.floor(diff / 30) + 1;
}

// ==========================================
// 3. 계산 로직 (Applying/Separating 포함)
// ==========================================

// 특정 시점(date)의 천체/포인트 위치를 구하는 함수
function getPositionsAtTime(
	date: Astronomy.AstroTime,
	lat: number,
	lon: number,
) {
	// 1. 기본 천문 데이터
	const gst = Astronomy.SiderealTime(date);
	const lst = (gst + lon / 15.0) % 24;
	const ramc = lst * 15 * (Math.PI / 180);
	const sunVec = Astronomy.GeoVector(Astronomy.Body.Sun, date, true);
	const epsilon = Astronomy.Ecliptic(sunVec).elat * (Math.PI / 180); // 황도경사각
	const obl = 23.4392911 * (Math.PI / 180);
	const latRad = lat * (Math.PI / 180);

	// 2. ASC 계산
	const ascY = Math.cos(ramc);
	const ascX =
		-Math.sin(ramc) * Math.cos(obl) - Math.tan(latRad) * Math.sin(obl);
	let ascDeg = (Math.atan2(ascY, ascX) * 180) / Math.PI;
	ascDeg = normalizeDegree(ascDeg);

	// 3. MC 계산
	const mcRad = Math.atan2(Math.tan(ramc), Math.cos(obl));
	let mcDeg = (mcRad * 180) / Math.PI;
	mcDeg = normalizeDegree(mcDeg);
	if (Math.abs(mcDeg - lst * 15) > 90) mcDeg = normalizeDegree(mcDeg + 180);

	// 4. 파생 앵글 (DSC, IC)
	const dscDeg = normalizeDegree(ascDeg + 180);
	const icDeg = normalizeDegree(mcDeg + 180);

	// 5. 행성 위치 계산 (역행 여부 포함)
	const points = [];
	let sunPos = 0,
		moonPos = 0;

	// 역행 판별을 위한 1일 후 시간
	const nextDay = date.AddDays(1);

	PLANET_NAMES.forEach((name) => {
		const vec = Astronomy.GeoVector(name as Astronomy.Body, date, true);
		const elon = Astronomy.Ecliptic(vec).elon;
		const normLon = normalizeDegree(elon);

		// 역행 판별 (Sun, Moon은 역행하지 않음)
		let isRetrograde = false;
		if (name !== 'Sun' && name !== 'Moon') {
			const vecNext = Astronomy.GeoVector(
				name as Astronomy.Body,
				nextDay,
				true,
			);
			const elonNext = Astronomy.Ecliptic(vecNext).elon;
			const normLonNext = normalizeDegree(elonNext);
			// 황경이 감소하면 역행 (360도 경계 처리)
			let diff = normLonNext - normLon;
			if (diff > 180) diff -= 360;
			if (diff < -180) diff += 360;
			isRetrograde = diff < 0;
		}

		points.push({
			name: name,
			absDegree: normLon,
			type: 'Planet',
			retrograde: isRetrograde,
		});

		if (name === 'Sun') sunPos = normLon;
		if (name === 'Moon') moonPos = normLon;
	});

	// 6. Fortune (Part of Fortune) 계산
	const fortuneDeg = normalizeDegree(ascDeg + moonPos - sunPos);

	// 7. North Node (Mean Node) 계산
	// Mean Node 공식: 125.04452 - 1934.136261 * T (T는 J2000부터의 율리우스 세기)
	const jd = date.ut + 2451545.0; // Julian Date
	const T = (jd - 2451545.0) / 36525.0;
	const meanNodeDeg = normalizeDegree(125.04452 - 1934.136261 * T);
	// Node는 항상 역행
	points.push({
		name: 'North Node',
		absDegree: meanNodeDeg,
		type: 'Planet',
		retrograde: true,
	});

	// 8. Lilith (Black Moon Lilith / Mean Apogee) 계산
	// Mean Lilith 공식: 83.3532465 + 4069.0137111 * T
	const lilithDeg = normalizeDegree(83.3532465 + 4069.0137111 * T);
	points.push({
		name: 'Lilith',
		absDegree: lilithDeg,
		type: 'Planet',
		retrograde: false,
	});

	// 9. Chiron 계산 (근사 공식)
	// Chiron 평균 황경 (1977년 기준 + 평균 운동)
	const chiron1977 = 3.45; // 1977년 Chiron 위치 (Aries 약 3도)
	const chironMeanMotion = 360 / 50.76; // 공전주기 약 50.76년
	const yearsSince1977 = (jd - 2443144.5) / 365.25; // 1977년 1월 1일 JD
	const chironDeg = normalizeDegree(
		chiron1977 + chironMeanMotion * yearsSince1977,
	);
	// Chiron 역행 여부 (간단히 현재 위치로 판단 - 정확하지 않음)
	points.push({
		name: 'Chiron',
		absDegree: chironDeg,
		type: 'Planet',
		retrograde: false,
	});

	// 10. Vertex 계산
	// Vertex = 반-ASC (co-latitude에서의 ASC)
	const coLatRad = (90 - lat) * (Math.PI / 180);
	const vertexY = Math.cos(ramc);
	const vertexX =
		-Math.sin(ramc) * Math.cos(obl) - Math.tan(coLatRad) * Math.sin(obl);
	const vertexDeg = normalizeDegree(
		(Math.atan2(vertexY, vertexX) * 180) / Math.PI,
	);

	// 앵글 및 포인트 추가
	points.push({ name: 'Ascendant', absDegree: ascDeg, type: 'Angle' });
	points.push({ name: 'DSC', absDegree: dscDeg, type: 'Angle' });
	points.push({ name: 'MC', absDegree: mcDeg, type: 'Angle' });
	points.push({ name: 'IC', absDegree: icDeg, type: 'Angle' });
	points.push({ name: 'Fortune', absDegree: fortuneDeg, type: 'Point' });
	points.push({ name: 'Vertex', absDegree: vertexDeg, type: 'Point' });

	return points;
}

// 두 각도 차이 (0~180)
function getAngleDiff(d1: number, d2: number) {
	let diff = Math.abs(d1 - d2);
	if (diff > 180) diff = 360 - diff;
	return diff;
}

// 상태 판별 (Applying vs Separating)
// 원리: 현재 오차(orb1)와 아주 잠시 후(1분 후)의 오차(orb2)를 비교
function getAspectState(
	p1Name: string,
	p2Name: string,
	exactAngle: number,
	date: Astronomy.AstroTime,
	lat: number,
	lon: number,
) {
	// 1분 후 시간 객체 생성
	const deltaMin = 1.0 / (24 * 60); // 1분을 day 단위로
	const nextDate = date.AddDays(deltaMin);

	// 현재 위치들
	const currentPoints = getPositionsAtTime(date, lat, lon);
	const p1Curr = currentPoints.find((p) => p.name === p1Name);
	const p2Curr = currentPoints.find((p) => p.name === p2Name);

	// 미래 위치들
	const nextPoints = getPositionsAtTime(nextDate, lat, lon);
	const p1Next = nextPoints.find((p) => p.name === p1Name);
	const p2Next = nextPoints.find((p) => p.name === p2Name);

	if (!p1Curr || !p2Curr || !p1Next || !p2Next) return 'Unknown';

	// 현재 각도 차이
	const diffCurr = getAngleDiff(p1Curr.absDegree, p2Curr.absDegree);
	const orbCurr = Math.abs(diffCurr - exactAngle);

	// 미래 각도 차이
	const diffNext = getAngleDiff(p1Next.absDegree, p2Next.absDegree);
	const orbNext = Math.abs(diffNext - exactAngle);

	// 미래의 오차가 더 줄어들면 Applying, 늘어나면 Separating
	return orbNext < orbCurr ? 'Applying' : 'Separating';
}

// ==========================================
// 4. 메인 실행 함수
// ==========================================
export function calculateChart(birthDateStr: string, lat: number, lon: number) {
	const date = Astronomy.MakeTime(new Date(birthDateStr));
	const allPoints = getPositionsAtTime(date, lat, lon);

	// [출력용 저장소]
	const planetAspects = [];
	const otherAspects: { str: string }[] = [];

	// 분류
	const planets = allPoints.filter((p) => p.type === 'Planet');
	const others = allPoints.filter(
		(p) => p.type === 'Angle' || p.type === 'Point',
	);

	// 1. Planet vs Planet
	for (let i = 0; i < planets.length; i++) {
		for (let j = i + 1; j < planets.length; j++) {
			const p1 = planets[i];
			const p2 = planets[j];
			const diff = getAngleDiff(p1.absDegree, p2.absDegree);

			for (const asp of ASPECTS) {
				if (Math.abs(diff - asp.angle) <= asp.orb) {
					const orbVal = Math.abs(diff - asp.angle);
					const state = getAspectState(
						p1.name,
						p2.name,
						asp.angle,
						date,
						lat,
						lon,
					);

					planetAspects.push({
						str: `${p1.name} ${asp.name} ${p2.name} (Orb: ${formatDMS(orbVal)}, ${state})`,
					});
				}
			}
		}
	}

	// 2. Other Aspects (Angles/Points vs All)
	// 보통 Other Aspects는 [앵글/가상점]이 주체가 되어 행성과 맺는 관계를 봅니다.
	// 예: Ascendant Trine Sun (O), Sun Trine Ascendant (X - 보통 앵글을 앞에 둠)

	// (1) Others vs Planets
	others.forEach((other) => {
		planets.forEach((planet) => {
			const diff = getAngleDiff(other.absDegree, planet.absDegree);
			for (const asp of ASPECTS) {
				if (Math.abs(diff - asp.angle) <= asp.orb) {
					const orbVal = Math.abs(diff - asp.angle);
					const state = getAspectState(
						other.name,
						planet.name,
						asp.angle,
						date,
						lat,
						lon,
					);
					otherAspects.push({
						str: `${other.name} ${asp.name} ${planet.name} (Orb: ${formatDMS(orbVal)}, ${state})`,
					});
				}
			}
		});
	});

	// (2) Others vs Others (예: Fortune Trine Vertex)
	// 필요 시 추가 구현 가능. 여기서는 예제 포맷에 맞춰 Others가 주체인 것만 출력

	// --- 결과 출력 ---
	const ascVal = allPoints.find((p) => p.name === 'Ascendant').absDegree;
	const result = [];

	// 1. Planet Positions (하우스, 역행 포함)
	result.push('Planet positions');
	allPoints
		.filter((p) => p.type === 'Planet')
		.forEach((p) => {
			const z = getZodiacData(p.absDegree);
			const house = getHouseNumber(p.absDegree, ascVal);
			const retrograde = p.retrograde ? ', Retrograde' : '';
			result.push(
				`${p.name} in ${z.signName} ${formatDMS(z.degree)}${retrograde}, in ${getOrdinal(house)} House`,
			);
		});
	// Fortune, Vertex 등 포인트 출력
	allPoints
		.filter((p) => p.type === 'Point')
		.forEach((p) => {
			const z = getZodiacData(p.absDegree);
			const house = getHouseNumber(p.absDegree, ascVal);
			result.push(
				`${p.name} in ${z.signName} ${formatDMS(z.degree)}, in ${getOrdinal(house)} House`,
			);
		});
	// ASC, MC 출력 (도수 포함)
	const ascData = getZodiacData(ascVal);
	const mcVal = allPoints.find((p) => p.name === 'MC').absDegree;
	const mcData = getZodiacData(mcVal);
	result.push(`ASC in ${ascData.signName} ${formatDMS(ascData.degree)}`);
	result.push(`MC in ${mcData.signName} ${formatDMS(mcData.degree)}`);

	// 2. House Positions (Equal House, 서수 형식)
	result.push('\nHouse positions');
	for (let i = 0; i < 12; i++) {
		const hDeg = normalizeDegree(ascVal + i * 30);
		const z = getZodiacData(hDeg);
		result.push(
			`${getOrdinal(i + 1)} House in ${z.signName} ${formatDMS(z.degree)}`,
		);
	}

	// 3. Planet Aspects
	result.push('\nPlanet aspects:');
	planetAspects.forEach((a) => result.push(a.str));

	// 4. Other Aspects (요청하신 포맷)
	result.push('\nOther aspects:');
	otherAspects.forEach((a) => result.push(a.str));

	return result;
}
