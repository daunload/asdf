---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: []
workflowType: 'research'
lastStep: 1
research_type: 'technical'
research_topic: '점성술/천문 데이터 API·오픈소스 라이브러리'
research_goals: 'natalchart 제품 개발용 API·라이브러리 선정. 대상 전역(한국·동아시아·영어권), 모바일+웹, 넓게(항목당 5~10개 이상)'
user_name: 'daun'
date: '2026-01-21'
web_research_enabled: true
source_verification: true
---

# Research Report: technical

**Date:** 2026-01-21
**Author:** daun
**Research Type:** technical

---

## Research Overview

[Research overview and methodology will be appended here]

---

## Technical Research Scope Confirmation

**Research Topic:** 점성술/천문 데이터 API·오픈소스 라이브러리
**Research Goals:** natalchart 제품 개발용 API·라이브러리 선정. 대상 전역(한국·동아시아·영어권), 모바일+웹, 넓게(항목당 5~10개 이상)

**Technical Research Scope:**

- Architecture Analysis - design patterns, frameworks, system architecture
- Implementation Approaches - development methodologies, coding patterns
- Technology Stack - languages, frameworks, tools, platforms
- Integration Patterns - APIs, protocols, interoperability
- Performance Considerations - scalability, optimization, patterns

**Research Methodology:**

- Current web data with rigorous source verification
- Multi-source validation for critical technical claims
- Confidence level framework for uncertain information
- Comprehensive technical coverage with architecture-specific insights

**Scope Confirmed:** 2026-01-21

---

## Technology Stack Analysis

### Programming Languages

점성술/천문·출생 차트 개발에 많이 쓰이는 언어는 **Python**, **JavaScript/TypeScript**가 주력이고, 모바일은 **Dart(Flutter)**, **Swift**, **Kotlin**이 사용된다.

- **Python**: Kerykeion, Immanuel, Flatlib, Skyfield, Astropy, pyswisseph, OpenAstro2, libephemeris, swephR 등 대부분의 점성·천문 라이브러리가 Python. 백엔드·오프라인 연산·리서치·CLI 도구에 적합.
    - _Source: [GitHub - Kerykeion](https://github.com/g-battaglia/kerykeion), [GitHub - flatangle/flatlib](https://github.com/flatangle/flatlib), [PyPI - libephemeris](https://pypi.org/project/libephemeris/)_

- **JavaScript/TypeScript**: Node/브라우저·React Native에서 Swiss Ephemeris 바인딩(sweph, sweph-wasm), CircularNatalHoroscopeJS, AstrologyJS 등. WASM으로 브라우저에서도 고정밀 연산 가능.
    - _Source: [GitHub - timotejroiko/sweph](https://github.com/timotejroiko/sweph), [GitHub - ptprashanttripathi/sweph-wasm](https://github.com/ptprashanttripathi/sweph-wasm), [Skypack - CircularNatalHoroscopeJS](https://www.skypack.dev/view/circular-natal-horoscope-js)_

- **R**: swephR로 Swiss Ephemeris v2.10.03 직접 래핑. 통계·리서치·알고리즘 검증용.
    - _Source: [swephR - R-Universe](https://rstub.r-universe.dev/swephR)_

- **Swift / Kotlin**: 네이티브 전용 상용 라이브러리는 거의 없음. Swift는 vsmithers1087/SwissEphemeris 같은 C 래퍼, Kotlin은 SweetAstroConsole·JPARSEC(Java) 활용 또는 백엔드/API 호출이 일반적.
    - _Source: [GitHub - vsmithers1087/SwissEphemeris](https://github.com/vsmithers1087/SwissEphemeris), [Groups.io - SweetAstroConsole](https://groups.io/g/swisseph/topic/sweetastroconsole/87332868)_

- **Dart(Flutter)**: Jyotish가 베딕·시드리얼·출생 차트를 지원. iOS+Android 크로스플랫폼에 적합.
    - _Source: [pub.dev - Jyotish](https://pub.dev/documentation/jyotish/latest/jyotish)_

### Development Frameworks and Libraries

- **Swiss Ephemeris 계열 (고정밀)**
    - **pyswisseph**(Python), **sweph**(Node/TS), **sweph-wasm**(JS/WASM), **swephR**(R), **Swift SwissEphemeris**.
    - C 원본: [aloistr/swisseph](https://github.com/aloistr/swisseph), [astro.com/swisseph](https://www.astro.com/swisseph-download).
    - 라이선스: 비상업/오픈소스는 GPL·AGPL; 상업용은 Astrodienst와 별도 협의.
    - _Source: [astro.com - Swiss Ephemeris](https://www.astro.com/swisseph-download), [GitHub - timotejroiko/sweph](https://github.com/timotejroiko/sweph)_

- **점성 전용 고수준 라이브러리**
    - **Flatlib**(Python): 나탈·트랜싯·하우스·애스팩트, 황도대·하우스 시스템. 천문 세부는 간소화.
    - **Kerykeion**(Python): Swiss/NASA 천문데이터, SVG 차트, 오프라인. AGPL.
    - **Immanuel**(Python): 나탈·솔라 리턴·시너스트리·컴포지트, JSON. Swiss Ephemeris 기반.
    - **OpenAstro2**(Python): pyswisseph+Skyfield, 다중 하우스, SVG. GPL-3.0.
    - _Source: [GitHub - flatangle/flatlib](https://github.com/flatangle/flatlib), [kerykeion.net](https://www.kerykeion.net/), [GitHub - theriftlab/immanuel-python](https://github.com/theriftlab/immanuel-python), [GitHub - dimmastro/openastro2](https://github.com/dimmastro/openastro2)_

- **천문(과학) 라이브러리**
    - **Skyfield**(Python): JPL .bsp 등, 행성/위성/항성 위치, 광행차·좌표계. Astropy와 연동.
    - **Astropy**(Python): 시간·좌표·단위·상수·FITS 등. 천문 표준 기반.
    - **libephemeris**(Python): Skyfield+JPL로 pyswisseph 호환 시그니처 목표. Pre-alpha.
    - _Source: [rhodesmill.org/skyfield](https://rhodesmill.org/skyfield/api.html), [docs.astropy.org](https://docs.astropy.org/), [pypi.org/project/libephemeris](https://pypi.org/project/libephemeris/)_

- **JS/TS·웹**
    - **CircularNatalHoroscopeJS**: 나탈·하우스·행성·노드·릴리스·트로피컬/시드리얼·애스팩트.
    - **AstrologyJS**: 나탈·시너스트리·트랜싯.
    - _Source: [Skypack - CircularNatalHoroscopeJS](https://www.skypack.dev/view/circular-natal-horoscope-js), [Skypack - AstrologyJS](https://www.skypack.dev/view/astrologyjs)_

### API 및 HTTP 서비스

- **REST·상용/프리미엄**
    - **AstroAPI**(astroapi.io): 출생 차트·트랜싯·시너스트리, 다중 하우스, JS/Python 예제. 유/무료 구간.
    - **FreeAstroAPI**(freeastroapi.com): 나탈·트랜싯·시너스트리, JSON, 고정밀.
    - **Your Stars API**(yourstarsapi.com): Swiss Ephemeris 기반, 나탈·트랜싯·시너스트리·해석.
    - **StellarCalc**(stellarcalc.com): 서양·베딕, 다수 차트 포인트, SDK·무료 할당.
    - **Divine API**(developers.divineapi.com): 나탈 인사이트(요소·모달리티·반구 등).
    - _Source: [astroapi.io](https://astroapi.io/), [freeastroapi.com](https://www.freeastroapi.com/), [yourstarsapi.com](https://www.yourstarsapi.com/), [stellarcalc.com](https://stellarcalc.com/), [developers.divineapi.com](https://developers.divineapi.com/western-api/natal-astrology/natal-insights)_

- **오픈·실험**
    - **ephemeris-api**(Astrolin): Unlicense, 다중 백엔드 목표. WIP.
    - **Cute Swiss Ephemeris API**(CuteMagick): Swiss Ephemeris(JPL DE431), 유/무료.
    - _Source: [GitHub - astrolin/ephemeris-api](https://github.com/astrolin/ephemeris-api), [cutemagick.com](https://cutemagick.com/tools/cute-swiss-ephemeris-api)_

- **천문(과학) 공개 API**
    - **JPL Horizons**: `https://ssd.jpl.nasa.gov/api/horizons.api` — OBSERVER/VECTORS/ELEMENTS/SPK 등, JSON.
    - **Horizons Lookup**: `https://ssd.jpl.nasa.gov/api/horizons_lookup.api` — 천체명→ID.
    - **NAIF/SPK**: SPICE 커널 다운로드, 로컬 연산(Skyfield 등)용.
    - _Source: [ssd-api.jpl.nasa.gov - Horizons](https://ssd-api.jpl.nasa.gov/doc/horizons.html), [ssd.jpl.nasa.gov - Ephemeris](https://ssd.jpl.nasa.gov/ephem.html)_

### 모바일·크로스플랫폼

- **React Native / JS**: CircularNatalHoroscopeJS, AstrologyJS로 로직 구현, SVG/Canvas로 차트.
- **Flutter**: Jyotish — 베딕·시드리얼·하우스 컵스·Swiss Ephemeris, iOS·Android.
- **Swift(iOS)**: Swiss Ephemeris C 래퍼(vsmithers1087/SwissEphemeris) 또는 백엔드/API, JSCore 브릿지.
- **Kotlin(Android)**: SweetAstroConsole(Kotlin/Native), JPARSEC(Java) 연동, 또는 백엔드/API.
    - _Source: [pub.dev - Jyotish](https://pub.dev/documentation/jyotish/latest/jyotish), [GitHub - vsmithers1087/SwissEphemeris](https://github.com/vsmithers1087/SwissEphemeris), [Groups.io - SweetAstroConsole](https://groups.io/g/swisseph/topic/sweetastroconsole/87332868)_

### Database and Storage

- **에페메리스 파일**: Swiss Ephemeris .se1, JPL .bsp 등. 라이브러리별 배포·버전 맞춤 필요(예: 2.10.0/2.10.1/2.10.03).
- **차트·설정·캐시**: 일반 RDB/NoSQL. 대량 천문 원본은 보통 파일/객체 스토리지.
- **NAIF/SPK**: [ssd.jpl.nasa.gov](https://ssd.jpl.nasa.gov/ephem.html), [data.nasa.gov](https://data.nasa.gov/)에서 SPK·Horizons 등 공개.
    - _Source: [ssd.jpl.nasa.gov - Ephemeris](https://ssd.jpl.nasa.gov/ephem.html), [data.nasa.gov - Horizons](https://data.nasa.gov/dataset/horizons)_

### Development Tools and Platforms

- **에디터/IDE**: 언어별 표준( VS Code, PyCharm, Xcode, Android Studio 등).
- **버전·빌드**: Git, npm/pip/pub; WASM은 Emscripten 등으로 Swiss Ephemeris 빌드.
- **테스트**: 단위/통합 테스트로 하우스·애스팩트·트로피컬/시드리얼, 타임존·좌표 검증 권장.

### Cloud Infrastructure and Deployment

- **백엔드/API**: AWS, GCP, Azure, Vercel, Railway 등에서 Python/Node 서비스; 에페메리스 파일은 번들 또는 객체 스토리지.
- **웹**: sweph-wasm으로 클라이언트 연산 가능; 대량/실시간은 서버·API 쪽 고려.
- **모바일**: Flutter/Jyotish는 에페메리스 번들; Swift/Kotlin은 서버 연산 또는 C/네이티브 래퍼+로컬 파일.

### Technology Adoption Trends

- **Swiss Ephemeris**가 점성·나탈 차트의 사실상 표준; 2.10.x 대로 래퍼들이 정리됨. [High Confidence]
- **WASM/JS**(sweph-wasm 등): 브라우저·Node에서 고정밀, 2024–2025에 안정화. [High Confidence]
- **API vs 라이브러리**: 빠른 출시·운영 부담 회피는 API; 오프라인·비용·제어는 라이브러리. [High Confidence]
- **상업 라이선스**: Swiss Ephemeris 상업 사용 시 Astrodienst 라이선스 확인 필요. AGPL(Kerykeion 등)도 상업·폐쇄 배포 전 검토. [High Confidence]
- **천문+점성 조합**: Skyfield/Astropy(위치·시간) + Flatlib/자체 로직(하우스·애스팩트·황도) 스택이 권장됨. [Medium Confidence]
    - _Source: [GitHub - timotejroiko/sweph](https://github.com/timotejroiko/sweph), [GitHub - ptprashanttripathi/sweph-wasm](https://github.com/ptprashanttripathi/sweph-wasm), [astro.com - Swiss Ephemeris](https://www.astro.com/swisseph-download)_

---

## Integration Patterns Analysis

### API Design Patterns

점성·천문 도메인에서는 **REST**가 지배적이며, **JSON** 요청/응답이 표준이다.

- **RESTful API**:
    - **엔드포인트**: `POST /v1/birth-chart`(출생 차트), `POST /v1/birth-chart/planets`, `POST /v1/birth-chart/houses`, `POST /v1/birth-chart/aspects`, `POST /v1/birth-chart/render`(SVG/PNG), `POST /v1/synastry`, `POST /v1/birth-chart/batch`.
    - **요청 스키마**: `subject`(name, datetime ISO-8601, timezone IANA, location lat/lon), `options`(house_system, zodiac_type, sidereal_mode, orb_settings, points, include_retrograde, language).
    - **응답**: `planets`, `houses`, `aspects`, `interpretation`, `metadata`(calculation_engine, precision, generated_at).
    - Vedika Jyotish: `/v1/chart/generate`, `/v1/chart/planets` 등 모듈형. Astrologer-API: 데이터+SVG, split_chart·theme·language.
    - _Source: [astroapi.io](https://astroapi.io/), [vedika.io - Jyotish API](https://vedika.io/jyotish-api-endpoints), [GitHub - Astrologer-API](https://github.com/g-battaglia/Astrologer-API), [freeastrologyapi.com - API Reference](https://freeastrologyapi.com/api-reference/planets)_

- **JPL Horizons**: **HTTP GET** 쿼리, URL 쿼리 파라미터. `COMMAND`, `EPHEM_TYPE`(OBSERVER/VECTORS/ELEMENTS/SPK/APPROACH), `CENTER`, `START_TIME`, `STOP_TIME`, `STEP_SIZE`, `format=json|text`. File API는 **POST**로 배치 입력.
    - _Source: [ssd-api.jpl.nasa.gov - Horizons](https://ssd-api.jpl.nasa.gov/doc/horizons.html), [ssd-api.jpl.nasa.gov - Horizons File](https://ssd-api.jpl.nasa.gov/doc/horizons_file.html)_

- **GraphQL·gRPC·Webhook**: 점성 전용 상용 API에서는 드묾. 클라이언트 유연 쿼리가 필요하면 GraphQL 검토, 대규모 내부 연동에는 gRPC 고려.
    - _Source: [aavians.com - Astrology App Development](https://aavians.com/complete-guide-to-astrology-app-development-trends-features-tech-stack/)_

### Communication Protocols

- **HTTP/HTTPS**: 모든 점성·천문 HTTP API의 기반. **TLS 필수** (생년월일·위치 등 민감 정보).
- **GET**: JPL Horizons, Lookup; 쿼리만으로 요청 가능한 조회.
- **POST**: 출생 차트·시너스트리·배치·렌더링; Body에 JSON.
- **WebSocket**: 일반적이지 않음. 실시간 차트 편집·공유 등 특수 기능에서만 검토.
- **메시지 큐**: 계산 집약적 보고서 생성·이메일/PDF·푸시 알림 등 비동기 작업에 RabbitMQ·Kafka·SQS 등 사용.
    - _Source: [ssd-api.jpl.nasa.gov](https://ssd-api.jpl.nasa.gov/doc/horizons.html), [devtechnosys.ae - Astrology App](https://devtechnosys.ae/blog/develop-an-astrology-app/)_

### Data Formats and Standards

- **JSON**: AstroAPI, FreeAstroAPI, Your Stars API, StellarCalc, Divine API, JPL(`format=json`) 등. 요청·응답 표준.
- **Plain text**: JPL `format=text`; 레거시·디버깅.
- **SPK(바이너리)**: JPL `EPHEM_TYPE=SPK` 응답의 base64 디코딩, Skyfield 등 로컬 연산용.
- **CSV/Flat**: 대량 에페메리스 내보내기·오프라인 분석.
- **도메인 필드**: `datetime`(ISO-8601), `timezone`(IANA), `house_system`, `zodiac_type`, `sidereal_mode`, `orb_settings` 등이 공통 패턴.
    - _Source: [ssd-api.jpl.nasa.gov](https://ssd-api.jpl.nasa.gov/doc/horizons.html), [astroapi.io](https://astroapi.io/)_

### System Interoperability Approaches

- **라이브러리 in-process**: Swiss Ephemeris·Flatlib·Kerykeion 등 임베드, 네트워크 없음. 오프라인·지연·비용 최소.
- **HTTP API 호출**: AstroAPI·FreeAstroAPI·JPL 등. 배포·에페메리스 관리 부담 감소; 네트워크·Rate limit·비용 고려.
- **하이브리드**: 서버에서 Swiss Ephemeris 연산 후 모바일/웹에 JSON; 또는 sweph-wasm으로 클라이언트 연산.
- **API Gateway**: 모바일·웹·파트너를 단일 진입점으로, 인증·라우팅·Rate limit.
- **모놀리식 vs 마이크로서비스**: 초기·중소 규모는 모듈화된 모놀리스; Astrology Engine을 별도 서비스로 분리해 스케일·재사용.
    - _Source: [aavians.com](https://aavians.com/complete-guide-to-astrology-app-development-trends-features-tech-stack/), [jploft.com - Astrology App Tech Stack](https://www.jploft.com/blog/astrology-app-tech-stack), [imgglobalinfotech.com - Astrology App](https://www.imgglobalinfotech.com/blog/develop-an-astrology-app-like-clickastro)_

### Microservices Integration Patterns

- **API Gateway**: 외부 클라이언트→인증·버전·라우팅. `/v1/` prefix, Bearer·X-Api-Key.
- **Astrology Engine 서비스화**: 계산만 담당하는 서비스; 나머지 비즈니스·CMS·결제와 분리.
- **캐시**: Redis·Memcached로 황도 설명·일별 운세·자주 쓰는 차트 결과 캐싱.
- **Circuit Breaker / 재시도**: 외부 점성 API 의존 시 장애·지연 격리.
- **Saga/분산 트랜잭션**: 이 도메인에서는 제한적; 구독+차트 생성 등 복합 플로우에서 고려.
    - _Source: [imgglobalinfotech.com](https://www.imgglobalinfotech.com/blog/develop-an-astrology-app-like-clickastro), [aavians.com](https://aavians.com/complete-guide-to-astrology-app-development-trends-features-tech-stack/)_

### Event-Driven Integration

- **Pub/Sub·메시지 브로커**: 리포트·PDF 생성, 트랜싯 알림·푸시 스케줄링을 비동기 처리.
- **Event Sourcing·CQRS**: 일반적인 점성 앱에서는 드묾; 감사·재연산 필요 시 검토.
- **배치·스케줄**: 일별 운세·트랜싯 사전 생성, 오프피크 처리.
    - _Source: [imgglobalinfotech.com](https://www.imgglobalinfotech.com/blog/develop-an-astrology-app-like-clickastro)_

### Integration Security Patterns

- **API Key**: `Authorization: Bearer <token>`, `X-Api-Key`(예: AstroAPI). 키별 권한·만료.
- **401 Unauthorized**: 키 누락·무효. **429 Too Many Requests**: Rate limit 초과.
- **OAuth 2.0 / JWT**: 사용자 로그인·파트너 연동. 출생 정보 등은 암호화 저장·전송.
- **TLS**: 전송 암호화 필수. GDPR·CCPA 등 적용 지역 개인정보 처리 준수.
    - _Source: [docs.astroapi.cloud - API](https://docs.astroapi.cloud/api/), [docs.astroapi.cloud - Getting Started](https://docs.astroapi.cloud/guide/getting-started), [devtechnosys.ae](https://devtechnosys.ae/blog/develop-an-astrology-app/)_

---

## Architectural Patterns and Design

### System Architecture Patterns

- **모듈러 모놀리스(Modular Monolith)**: 40–100K 사용자·MVP·초기 단계 권장. User/Auth, Astrology Engine, Content, Chat, Notifications, Payments, Analytics를 레이어/모듈로 분리하되 단일 배포. DB는 하나(스키마 분리 가능), REST/GraphQL·버전 관리, 캐시·오프라인 지원.
    - _Source: [astconsulting.in - Microservices](https://astconsulting.in/architecture/microservices-architecture-design-patterns-and-best-practices), [kdpisda.in - Microservices Best Practices](https://kdpisda.in/top-9-microservices-architecture-best-practices-for-2025/)_

- **마이크로서비스**: User, Auth, Astrology/Computation, Content, Chat, Notification, Payment, Analytics 등을 서비스별 분리. 서비스당 DB, API Gateway·Service Discovery, 메시지 브로커(Kafka, RabbitMQ)로 비동기, Docker+K8s·옵저버빌리티.
    - _Source: [astconsulting.in](https://astconsulting.in/architecture/microservices-architecture-design-patterns-and-best-practices), [medium.com - Microservices Best Practices](https://medium.com/@subham.heritage/best-practices-with-microservices-architecture-d1218d323d7f)_

- **Swiss Ephemeris 임베드 vs API/서버리스**:
    - **임베드**: 로컬 C/바인딩+에페메리스 파일. 지연·비용 최소, 오프라인·프라이버시 유리. 빌드·패키징·모바일 저장 부담.
    - **API/서버리스**: 중앙 업데이트·클라이언트 경량·자동 스케일. 네트워크 지연·cold start·호스팅 비용·민감 데이터 전송 이슈.
    - **하이브리드**: 클라이언트(sweph-wasm)로 기본 응답성 확보, 무거운/드문 연산은 API.
    - _Source: [astro.com - Swiss Ephemeris](https://www.astro.com/swisseph/swisseph.htm), [astrology-api.io - Data Positions](https://astrology-api.io/p/data-positions), [GitHub - sweph-wasm](https://github.com/u-blusky/sweph-wasm)_

### Design Principles and Best Practices

- **DDD(Domain-Driven Design)**: User, Astrology computations, Content, Chat, Notifications 등 도메인 경계로 서비스/모듈 분할.
- **단일 DB per 서비스**: 마이크로서비스 시 서비스별 DB/스키마, 공유 DB 지양.
- **API Gateway**: 라우팅·인증·버전·쓰로틀링.
- **이벤트·비동기**: 일별 운세·뉴스레터·분석 등 비실시간은 메시지 큐.
- **옵저버빌리티**: 중앙 로깅·메트릭·분산 트레이싱(OpenTelemetry, Jaeger).
- **Blue/Green·Canary**: 무중단 배포.
    - _Source: [astconsulting.in](https://astconsulting.in/architecture/microservices-architecture-design-patterns-and-best-practices), [kdpisda.in](https://kdpisda.in/top-9-microservices-architecture-best-practices-for-2025/)_

### Scalability and Performance Patterns

- **캐싱**: 나탈 차트는 입력(날짜·시간·위치·하우스) 고정 시 불변 → `natal_{date}_{time}_{lat}_{lng}_{house_system}` 키로 무기한 캐시. 지오코딩(도시→lat/lng)도 불변·캐시.
- **배치·큐**: 대량 나탈/트랜싯는 배치 엔드포인트·태스크 큐.
- **비동기·점진 로딩**: 차트 기본 데이터를 먼저 반환, 렌더·해석은 비동기.
- **오토스케일**: K8s·서버리스로 천문 이벤트·트래픽 피크 대응.
- **에페메리스 캐시**: In-memory(Redis 등), CDN(일별 요약 등 정적·준정적), (body, time-bucket, observer) 키. 보정·버전 업데이트 시 무효화·버저닝.
    - _Source: [astrology-api.io - Integration Guide](https://astrology-api.io/es/blog/astrology-api-integration-step-by-step-guide), [dinoustech.com - Astrology App](https://www.dinoustech.com/blog/top-features-to-look-for-in-an-astrology-app-development-company.html)_

### Integration and Communication Patterns

- **계산 엔진·Geocoding·해석·렌더링·User/Auth**를 모듈/서비스로 분리.
- **API Gateway / LB**: SSL·Rate limit·라우팅.
- **메시지 큐**: 렌더·배치·트랜싯·푸시 스케줄.
- **REST** `POST /charts/natal`, `GET /charts/transits`, `GET /charts/synastry`, `GET /house-systems` 등; JSON.
    - _Source: [astrology-api.io - Comparison](https://astrology-api.io/de/blog/astrology-api-comparison-guide-2025), [avtechnosys.com - Astrological APIs](https://www.avtechnosys.com/blog/top-astrological-apis/)_

### Security Architecture Patterns

- **입력 검증**: 날짜·좌표 범위 등; 무효 입력 차단.
- **인증·인가**: API Key·OAuth2, 사용자별 쿼터.
- **전송·저장 암호화**: TLS; 출생·위치 등 민감 데이터 암호화 저장.
- **개인정보**: 최소 수집·삭제권·GDPR·CCPA.
- **Rate limit·Abuse 방지**: DoS·오용 완화.
    - _Source: [roxyapi.com - Vedic Astrology API](https://roxyapi.com/blogs/vedic-astrology-api-integration-guide), [jploft.com - Astrology App Security](https://www.jploft.com/blog/astrology-app-security), [astrologyapi.com](https://www.astrologyapi.com/)_

### Data Architecture Patterns

- **에페메리스**: SPK(JPL NAIF), JPL Horizons, TLE; 시간·좌표계·보간(Chebyshev 등).
- **Ingest/ETL**: JPL·NOAA 등 수집→검증→캐노니컬 포맷.
- **저장**: Raw(객체 스토리지), 샘플/타임시리즈(PostgreSQL·TimescaleDB), 보간·캐시(Redis·in-memory).
- **트랜잭션**: 사용자·구독·설정은 RDB; 차트/유연 스키마는 JSON·NoSQL.
- **버전·재현**: 에페메리스 모델(DE440 등)·사용 시점 기록.
    - _Source: [ssd.jpl.nasa.gov - Ephemeris](https://ssd.jpl.nasa.gov/ephem.html), [arxiv.org - JPL Horizons](https://arxiv.org/abs/2411.12774), [en.wikipedia.org - JPL DE](https://en.wikipedia.org/wiki/Jet_Propulsion_Laboratory_Development_Ephemeris)_

### Deployment and Operations Architecture

- **컨테이너·오케스트레이션**: Docker, K8s; Stateless 계산·Geocoder는 오토스케일.
- **CI/CD**: 테스트·린트·에페메리스 버전 관리.
- **에페메리스 갱신**: 주기적 fetch→검증→파생 아티팩트→배포; 캐시 TTL·버전.
- **CDN**: 차트 이미지·아이콘 등 정적 자산.
- **모니터링**: 지연(p95, p99), 4xx/5xx, 캐시 히트, 요청량, 헬스체크·알람.
    - _Source: [astrology-api.io](https://astrology-api.io/es/blog/astrology-api-integration-step-by-step-guide), [jploft.com](https://www.jploft.com/blog/astrology-app-security), [vedika.io - Astrology API](https://vedika.io/blog/best-astrology-api-developers-2025)_

---

## Implementation Approaches and Technology Adoption

### Technology Adoption Strategies

- **Swiss Ephemeris 2.10+ 도입**: COB·위성·`swe_calc_pctr()`·`swe_get_current_file_data()` 등; .se1 파일·경로·버전(2.10.0/2.10.1/2.10.03) 정리. Placidus 극위도·700–1000 CE 월식 등 보정 반영.
    - _Source: [astro.com - swephprg.2.10](https://www.astro.com/ftp/swisseph/doc/swephprg.2.10.htm), [groups.io - swisseph 2.10.03](https://groups.io/g/swisseph/topic/93305060)_

- **점진 도입**: 라이브러리→API 또는 API→자체 엔진은 단계별. 기존 출력과의 호환을 위해 legacy 모드·파라미터 노출.
- **트로피컬·시드리얼·다중 Ayanamsa**: Lahiri, Krishnamurti 등; 입력 옵션·테스트 커버리지 확대.
    - _Source: [astrology-api.io - Data Positions](https://astrology-api.io/p/data-positions), [astrology-api.io - Planetary Positions](https://astrology-api.io/p/planetary-positions)_

- **라이선스 선택**: AGPL(오픈·소스 공개) vs Astrodienst Professional(CHF 750/400/1,550). 상업·폐쇄·SaaS는 Pro 또는 오픈소스 전제.
    - _Source: [astro.com - Swiss Ephemeris](https://www.astro.com/swisseph/swisseph.htm), [GitHub - timotejroiko/sweph](https://github.com/timotejroiko/sweph), [GitHub - prolaxu/swisseph-wasm](https://github.com/prolaxu/swisseph-wasm)_

### Development Workflows and Tooling

- **CI/CD**: 테스트·린트·에페메리스 버전·보안 스캔. Blue/Green·Canary 배포.
- **에페메리스·참조 버전 관리**: DE430/441·SE 2.10.x 명시; 테스트 참조와 일치.
- **파일·성능**: .se1 등 에페메리스 미포함 래퍼는 배포 경로·로드 1회화·캐시(고정 solar·자주 쓰는 (body, date) 등).
    - _Source: [astro.com - swephprg.2.10](https://www.astro.com/ftp/swisseph/doc/swephprg.2.10.htm), [cutemagick.com - Cute Swiss Ephemeris API](https://cutemagick.com/tools/cute-swiss-ephemeris-api), [GitHub - drvinaayaksingh/swisseph](https://github.com/drvinaayaksingh/swisseph)_

### Testing and Quality Assurance

- **정확도 검증**: JPL Horizons·SPICE·swetest 벤치마크와 비교; 각도 오차 milliarcsecond 수준 목표.
- **테스트 유형**: 참조 기반(위치·속도), 보간·파일 경계, 시간/좌표계(UTC/TT/TDB, geocentric/barycentric), 극단 날짜·극위도, 형식·메타데이터.
- **자동화**: 단위·회귀 테스트, CI에 에페메리스 검증 스위트, 허용 오차·버전 문서화.
    - _Source: [astro.com - Swiss Ephemeris](https://www.astro.com/swisseph/swisseph.htm), [nv5geospatialsoftware.com - JPLEPHTEST](https://www.nv5geospatialsoftware.com/docs/jplephtest.html), [arxiv.org - ASSIST](https://arxiv.org/abs/2303.16246), [naif.jpl.nasa.gov - SPK](https://naif.jpl.nasa.gov/pub/naif/toolkit_docs/C/req/spk.html)_

### Deployment and Operations Practices

- **컨테이너·오케스트레이션**: Docker, K8s; Stateless 계산·Geocoder 오토스케일.
- **에페메리스 갱신 파이프라인**: 정기 fetch→검증→파생→배포; 캐시 TTL·버전.
- **모니터링**: 지연(p95, p99), 4xx/5xx, 캐시 히트, 요청량, 헬스·알람.
    - _Source: [astrology-api.io](https://astrology-api.io/es/blog/astrology-api-integration-step-by-step-guide), [jploft.com](https://www.jploft.com/blog/astrology-app-security)_

### Team Organization and Skills

- **도메인**: 점성·천문(하우스·애스팩트·트로피컬/시드리얼), 타임존·지오코딩.
- **기술**: Python/JS·Swiss Ephemeris 래퍼, REST·캐시·DB, Docker·K8s·CI/CD.
- **운영**: 에페메리스·정확도 검증, 라이선스·개인정보 준수.

### Cost Optimization and Resource Management

- **API vs 자체 호스팅**:
    - **API**: MVP·초기 출시·중저 트래픽에 유리. AstroAPI·StellarCalc(~$19/월~)·Prokerala(5,000 credits 무료, $39/월~)·Vedika(호출당 $0.012–0.048). MVP 총 $25K–40K, 중급 $50K–90K, 고급 $120K–200K+.
    - **자체**: 에페메리스·라이브러리 통합 50–150h, 렌더 40–100h, 백엔드 80–200h, 해석 40–100h; 인프라 $100–1,000/월~. 중급 자체 $40K–80K+ 개발, $500–2,000/월 운영.
    - _Source: [comfygen.com - Astrology App Cost](https://www.comfygen.com/blog/astrology-app-development-cost/), [jploft.com - Horoscope App](https://www.jploft.com/blog/how-to-develop-a-horoscope-app-like-nebula), [avtechnosys.com - Astrology App Cost 2025](https://www.avtechnosys.com/blog/how-much-does-astrology-app-development-cost-in-2025/), [vedika.io - Pricing](https://vedika.io/pricing), [api.prokerala.com - Pricing](https://api.prokerala.com/pricing)_

- **캐시·배치·사전 연산**: 나탈·지오코딩 캐시, 배치 엔드포인트, 일별 운세·트랜싯 오프피크 생성으로 비용·부하 절감.

### Risk Assessment and Mitigation

- **Swiss Ephemeris AGPL/SEPL**:
    - **AGPL**: 네트워크 제공·유료 배포 시 전체 소스 공개; SaaS·폐쇄 상업과 충돌.
    - **완화**: Professional 라이선스(Astrodienst) 또는 프로젝트 전체 AGPL·오픈소스. 정적/동적 링킹·배포 형태 법적 검토, 공지·버전 기록 유지.
    - _Source: [astro.com - Swiss Ephemeris](https://www.astro.com/swisseph/swisseph.htm), [soundofstars.org - SEPL](https://soundofstars.org/tools4members/astrological/The%20License%20for%20the%20Swiss%20Ephemeris%20Free%20Edition.htm), [astro.com - swephinfo](https://www.astro.com/swisseph/swephinfo_j.htm)_

- **정확도·에지케이스**: 극위도·고대/먼 미래·월식 구간 테스트; 버전 업그레이드 시 회귀 테스트.
- **개인정보**: 출생·위치 최소 수집, 암호화·삭제권·GDPR·CCPA.

---

## Technical Research Recommendations

### Implementation Roadmap

1. **Phase 1(선택·검증)**: API vs 자체·하이브리드 결정; Swiss Ephemeris 라이선스(AGPL vs Pro) 확정.
2. **Phase 2(핵심)**: 에페메리스·래퍼(pyswisseph/sweph/sweph-wasm 등) 통합, 나탈·하우스·애스팩트, 트로피컬/시드리얼·다중 하우스.
3. **Phase 3(검증)**: JPL Horizons·swetest 대조, 극위도·역사/미래 날짜·타임존 테스트.
4. **Phase 4(연산·배포)**: 캐시·배치·(선택) 렌더/해석 비동기; CI/CD·모니터링·에페메리스 갱신.
5. **Phase 5(확장)**: 트랜싯·시너스트리·다국어·오프라인(모바일·WASM) 등.

### Technology Stack Recommendations

- **백엔드**: Python(Immanuel, Kerykeion, Flatlib, pyswisseph) 또는 Node(sweph); 필요 시 Skyfield/Astropy 보조.
- **웹/앱**: sweph-wasm(브라우저·오프라인), React/Vue; React Native는 CircularNatalHoroscopeJS·AstrologyJS.
- **모바일 네이티브**: Flutter(Jyotish), Swift/Kotlin(Swiss Ephemeris C 래퍼 또는 백엔드 연동).
- **인프라**: Redis 캐시, PostgreSQL·JSON, Docker·K8s; API는 REST `/v1/birth-chart` 등.
- **외부 API 검토**: AstroAPI, FreeAstroAPI, Prokerala, StellarCalc, Vedika(베딕); JPL Horizons(천문).

### Skill Development Requirements

- Swiss Ephemeris·에페메리스 파일·하우스/시드리얼; 타임존(IANA)·지오코딩.
- 참조 대조·보간·형식(SPK 등) 기초; 라이선스(AGPL·Pro) 이해.
- REST·캐시·CI/CD·모니터링.

### Success Metrics and KPIs

- **정확도**: 참조 대비 각도 오차 < 몇 milliarcsec; 극위도·역사/미래 구간 검증.
- **성능**: 나탈 응답 p95 < 500 ms(API·캐시 적용 시); 캐시 히트율.
- **가용성·에러**: 4xx/5xx·가동률·알람.
- **비용**: 호출당·인프라·라이선스; API vs 자체 break-even 트래픽.

---

## natalchart 프로젝트 적용 스택

**확정 스택:** Node, Next.js, React, PostgreSQL, Docker, REST, **외부 API만** 사용.

### 선택된 기술

| 구분       | 기술           | 비고                                     |
| ---------- | -------------- | ---------------------------------------- |
| 런타임     | Node           | Next.js 서버·API Routes / Route Handlers |
| 프레임워크 | Next.js        | SSR/SSG, API, 배포 간소화                |
| 프론트엔드 | React          | UI·차트 시각화                           |
| DB         | PostgreSQL     | 사용자·설정·캐시된 차트·메타             |
| 인프라     | Docker         | 로컬·배포 환경 일원화                    |
| API 스타일 | REST           | 내부·외부 연동                           |
| 점성 연산  | **외부 API만** | 자체 Swiss Ephemeris·sweph-wasm 미사용   |

### 외부 API만 사용 시 요약

- **라이선스**: Swiss Ephemeris AGPL/Pro 검토 불필요.
- **운영**: 에페메리스·래퍼 빌드·갱신·버전 관리 불필요.
- **구현 부담**: 나탈·하우스·애스팩트 연산 개발·테스트 최소화.
- **트레이드오프**: 오프라인 연산 불가, 외부 의존·Rate limit·비용·가용성, 응답 지연.

### 스택별 가이드

**Next.js + Node**

- **API Route(Pages)** 또는 **Route Handler(App)**: 외부 점성 API 프록시·캐시·에러 처리.
- **환경 변수**: `ASTRO_API_KEY` 등 API 키 서버 전용 보관.
- **캐시**: 나탈은 `(date,time,lat,lng,house_system)` 불변 → **PostgreSQL**에 결과·메타 저장해 재사용(또는 Redis 추가 시 메모리 캐시).

**React**

- 외부 API → Next.js BFF → React; 차트 휠은 SVG/Canvas(예: D3, Recharts, custom).
- CircularNatalHoroscopeJS·AstrologyJS는 **클라이언트 연산**용; 외부 API만 쓸 경우 **서버/Next API에서 받은 JSON으로만** 렌더.

**PostgreSQL**

- 사용자·출생정보(암호화 권장)·설정, **나탈 캐시** (입력 해시 + JSON/JSONB), (선택) 세션·구독.
- 캐시 키: `sha256(date|time|tz|lat|lng|house_system|zodiac_type)` 또는 유사 식.

**Docker**

- `Dockerfile`로 Next.js 빌드·실행; `docker-compose`에 app + PostgreSQL.
- 배포: Vercel·Railway·AWS ECS 등에서 Docker 사용 가능.

**REST**

- 내부: Next.js API `/api/charts/natal` 등 → 외부 API 호출 → DB 캐시 조회/저장 → JSON 반환.
- 클라이언트: `fetch`/`axios`로 `/api/*`만 호출; 외부 점성 API는 **서버에서만** 호출.

### 외부 API 후보(재 prioritization)

| 후보                                        | 특징                                                 | natalchart 관점                    |
| ------------------------------------------- | ---------------------------------------------------- | ---------------------------------- |
| **AstroAPI** (astroapi.io / astroapi.cloud) | 나탈·트랜싯·시너스트리·SVG, REST, X-Api-Key, 401/429 | JS/TS 예제·무/유료 구간, 우선 검토 |
| **FreeAstroAPI**                            | 고정밀 나탈·트랜싯·시너스트리, JSON                  | 무료·구성 단순, 보조 후보          |
| **Prokerala**                               | 5,000/월 무료, 유료 시 $39/월~                       | 비용·할당량 맞으면 검토            |
| **StellarCalc**                             | 서양·베딕, ~$19/월~                                  | 베딕 필요 시                       |
| **Your Stars API**                          | Swiss Ephemeris, 나탈·트랜싯·시너스트리·해석         | 대안                               |
| **JPL Horizons**                            | 천문 only, 하우스·점성 해석 없음                     | 나탈용으로는 부적합                |

### 적용 로드맵(외부 API 전제)

1. **Phase 1**: 외부 API 1곳 선정(AstroAPI 또는 FreeAstroAPI 권장), API 키·`/api/charts/natal` 프록시, 요청/응답 스키마 정의.
2. **Phase 2**: PostgreSQL 스키마(사용자·캐시), 나탈 캐시 키 설계·저장·조회, Next.js API에서 캐시 우선.
3. **Phase 3**: React 차트 휠(SVG)·출력 필드 매핑, 타임존·입력 검증(날짜·위도/경도).
4. **Phase 4**: Docker(Next + PostgreSQL), 환경 변수·에러·Rate limit(429) 처리·재시도.
5. **Phase 5**: 트랜싯·시너스트리·다중 하우스(API 지원 범위 내), (선택) 제2 API·폴백.

### 리스크·완화(이 스택)

- **외부 장애·Rate limit**: 429 시 백오프·재시도; 가능하면 제2 API 폴백.
- **비용**: 호출당·구독 요금 모니터링; **PostgreSQL 나탈 캐시**로 중복 호출 최소화.
- **정확도**: 선정 API가 Swiss Ephemeris 기반인지 확인; 필요 시 다른 API와 샘플 비교.
- **개인정보**: 출생·위치를 외부로 보내므로 API 제공자 DPA·프라이버시 정책·GDPR/CCPA 확인.

### 스킬 포커스(이 스택)

- **불필요·축소**: Swiss Ephemeris·에페메리스 파일·AGPL/Pro, 보간·SPK.
- **강화**: REST 설계·Next.js API·React, PostgreSQL(스키마·인덱스·JSON/JSONB), Docker, **외부 API 연동·캐시·에러·Rate limit**.

---

<!-- Content will be appended sequentially through research workflow steps -->
