# Story 3.1: topics 설정 및 /api/chart

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **시스템**,
I want **14주제(무료 4/유료 10) 설정**과 **출생차트 계산 API**를 갖고,
So that **출생 정보를 차트 데이터로 변환**해 LLM·카드 생성에 사용할 수 있다.

## Acceptance Criteria

**Given** `shared/config/topics.ts`가 존재하고, 14주제 ID·이름·무료(4)/유료(10) 구분이 정의되어 있다  
**When** `POST /api/chart`에 쿠키(또는 body)의 출생 정보(생년월일·시간·장소, "시간 모름" 여부)가 전달된다  
**Then** `circular-natal-horoscope-js`로 출생차트를 계산하고, "시간 모름"이면 기본값(예: 12:00) 또는 제한 모드로 계산한다 (FR6, FR7, FR12)  
**And** 차트 데이터(또는 에러 `{ error, code?, retry? }`)를 JSON으로 반환한다

## Tasks / Subtasks

- [x] Task 1: topics 설정 파일 생성
  - [x] Subtask 1.1: `src/shared/config/topics.ts` 파일 생성
  - [x] Subtask 1.2: 14개 주제 정의 (ID, 이름, 무료/유료 구분)
  - [x] Subtask 1.3: 무료 4주제 목록 export (freeTopics)
  - [x] Subtask 1.4: 유료 10주제 목록 export (paidTopics)
  - [x] Subtask 1.5: 전체 주제 목록 export (topics, getTopicById, isFreeTopic)

- [x] Task 2: circular-natal-horoscope-js 설치 및 설정
  - [x] Subtask 2.1: `circular-natal-horoscope-js` 패키지 설치
  - [x] Subtask 2.2: `src/shared/lib/chart/` 폴더 생성
  - [x] Subtask 2.3: 차트 계산 유틸리티 함수 생성 (calculateChart)

- [x] Task 3: /api/chart Route Handler 구현
  - [x] Subtask 3.1: `src/app/api/chart/route.ts` 파일 생성
  - [x] Subtask 3.2: POST 요청 처리 (쿠키에서 출생 정보 읽기)
  - [x] Subtask 3.3: 출생차트 계산 로직 구현
  - [x] Subtask 3.4: "시간 모름" 처리 (기본값 12:00)
  - [x] Subtask 3.5: 에러 처리 (`{ error, code?, retry? }` 형식)
  - [x] Subtask 3.6: 차트 데이터 JSON 반환

## Dev Notes

### Architecture Compliance

**FSD 구조:**
- topics 설정은 `src/shared/config/topics.ts`에 구현
- 차트 계산 유틸리티는 `src/shared/lib/chart/`에 구현
- API Route Handler는 `src/app/api/chart/route.ts`에 구현

**Source:** [Architecture: Structure Patterns (FSD)](_bmad-output/planning-artifacts/architecture.md#structure-patterns-fsd-feature-sliced-design)

### Technical Requirements

**주제 정의:**
- 14개 주제: ID, 이름, 무료/유료 구분
- 무료 4주제: 기본 성격과 자아의 핵심, 첫인상과 외부 이미지, 재능과 강점이 발휘되는 영역, 인생의 과제·두려움·성장 포인트
- 유료 10주제: 감정 패턴과 무의식 반응, 사고방식·소통 스타일·학습 능력, 사랑 방식과 인간관계 가치관, 연애·결혼에서 반복되는 패턴, 행동력·욕망·분노 표현 방식, 직업 적성·커리어 방향·사회적 역할, 돈·자존가치·물질적 안정 추구 방식, 삶의 큰 변화와 위기 패턴, 영혼의 방향성·인생의 목적, 중요한 인생 사건이 일어나는 타이밍

**출생차트 계산:**
- `circular-natal-horoscope-js` 라이브러리 사용
- 생년월일, 시간, 장소를 입력으로 받음
- "시간 모름" 시 기본값 12:00 사용 또는 제한 모드

**Source:** [Project Context: Technology Stack](_bmad-output/project-context.md#technology-stack--versions)

### Library & Framework Requirements

**필수 패키지:**
- `circular-natal-horoscope-js` - 출생차트 계산 라이브러리
- Next.js 16.1.4 (이미 설치됨)

**API 응답 형식:**
- 성공: 차트 데이터 객체
- 에러: `{ error: string, code?: string, retry?: boolean }`

**Source:** [Architecture: API & Communication Patterns](_bmad-output/planning-artifacts/architecture.md#api--communication-patterns)

### File Structure Requirements

**생성할 파일:**
```
src/
├── shared/
│   ├── config/
│   │   └── topics.ts          # 14주제 설정
│   └── lib/
│       └── chart/
│           └── calculate.ts   # 차트 계산 유틸리티
└── app/
    └── api/
        └── chart/
            └── route.ts       # /api/chart Route Handler
```

**Source:** [Architecture: Project Structure](_bmad-output/planning-artifacts/architecture.md#project-structure--boundaries-fsd)

### Testing Requirements

- 이 스토리에서는 테스트 프레임워크 설정은 포함하지 않음
- 브라우저/Postman에서 수동 확인:
  - `/api/chart` POST 요청 테스트
  - 쿠키에서 출생 정보 읽기 확인
  - 차트 계산 결과 확인
  - "시간 모름" 처리 확인
  - 에러 응답 확인

**Source:** [Architecture: Testing Standards](_bmad-output/planning-artifacts/architecture.md#testing-standards)

### Project Structure Notes

**FSD 레이어 사용:**
- `shared/config/topics.ts`: 주제 설정 (FSD shared 레이어)
- `shared/lib/chart/`: 차트 계산 유틸리티 (FSD shared 레이어)
- `app/api/chart/route.ts`: API Route Handler (Next.js App Router)

**Source:** [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

### Critical Don't-Miss Rules

**FSD 위반 금지:**
- `shared`는 `entities` 이상을 import하지 않음

**에러 형식:**
- API 에러는 `{ error, code?, retry? }` 형식으로 반환
- `{ message }`만 사용하지 않음

**출생차트 라이브러리:**
- `circular-natal-horoscope-js`의 `Origin.month`는 0-based (0=1월, 11=12월)
- "시간 모름" 처리 시 기본값 또는 제한 모드 문서화

**Source:** [Project Context: Critical Don't-Miss Rules](_bmad-output/project-context.md#critical-dont-miss-rules)

### References

**Epic 및 스토리 정의:**
- [Epic 3: 출생차트·해석 생성 및 무료 카드 열람](_bmad-output/planning-artifacts/epics.md#epic-3-출생차트해석-생성-및-무료-카드-열람)
- [Story 3.1: topics 설정 및 /api/chart](_bmad-output/planning-artifacts/epics.md#story-31-topics-설정-및-apichart)

**PRD:**
- [FR6: 출생 정보를 출생차트 계산에 사용](_bmad-output/planning-artifacts/prd.md)
- [FR7: 출생차트 계산](_bmad-output/planning-artifacts/prd.md)
- [FR12: "시간 모름" 시 제한된 해석](_bmad-output/planning-artifacts/prd.md)
- [해석 주제 및 무료/유료 구분](_bmad-output/planning-artifacts/prd.md#해석-주제-및-무료유료-구분)

**프로젝트 컨텍스트:**
- [Project Context: Technology Stack](_bmad-output/project-context.md#technology-stack--versions)

## Dev Agent Record

### Agent Model Used

Auto (Cursor AI Agent)

### Debug Log References

N/A (구현 전)

### Completion Notes List

- topics 설정 파일 생성 완료 (14개 주제, 무료 4/유료 10 구분)
- circular-natal-horoscope-js 패키지 설치 완료
- 차트 계산 유틸리티 함수 생성 (calculateChart)
- 장소 이름을 위도/경도로 변환하는 함수 구현 (임시 매핑, 향후 지오코딩 API로 개선 가능)
- /api/chart Route Handler 구현 완료
- 쿠키에서 출생 정보 읽기 및 유효성 검사
- "시간 모름" 처리 (기본값 12:00)
- 에러 처리 (`{ error, code?, retry? }` 형식)
- 차트 데이터 JSON 반환
- 모든 수락 기준(AC) 충족 확인
- 빌드 및 타입 검사 통과 확인

### File List

**생성된 파일:**
- `src/shared/config/topics.ts` - 14개 주제 설정 (무료 4/유료 10)
- `src/shared/lib/chart/calculate.ts` - 차트 계산 유틸리티
- `src/app/api/chart/route.ts` - /api/chart Route Handler

**기술적 해결 사항:**
- circular-natal-horoscope-js의 Horoscope 클래스 속성 사용 (CelestialBodies, Houses, Aspects, Ascendant, Midheaven)
- Origin.month는 0-based (0=1월, 11=12월) 처리
- 장소 이름을 위도/경도로 변환 (임시 매핑, 향후 지오코딩 API로 개선 가능)
- "시간 모름" 시 기본값 12:00 사용
