# Story 3.2: LLM 연동 및 /api/cards

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **시스템**,
I want **출생차트와 주제를 LLM에 보내** 구조화된 카드(심볼, 1~2문장, CTA)를 받고,
So that **14주제 각각에 대해 한 장 카드**를 생성할 수 있다.

## Acceptance Criteria

**Given** `/api/chart`로부터 차트 데이터를 얻었거나, 출생 정보를 직접 받은 상태이다  
**When** `POST /api/cards`로 주제(들)와 출생 정보·차트 컨텍스트를 LLM에 전달한다  
**Then** LLM 응답을 파싱해 카드 형식 `{ symbol, body, cta }`(또는 동일 역할 필드)로 변환한다 (FR8, FR9, FR10)  
**And** "시간 모름"이면 제한/근사 해석을 요청·표시한다 (FR12)  
**And** LLM 장애·타임아웃 시 `{ error, code, retry: true }` 및 사용자 안내·재시도 옵션을 반환한다 (NFR-I1)  
**And** LLM API 키·호출은 서버 전용이며 클라이언트에 노출되지 않는다 (NFR-S3)

## Tasks / Subtasks

- [x] Task 1: LLM API 유틸리티 함수 생성
    - [x] Subtask 1.1: `src/shared/lib/llm/` 폴더 생성
    - [x] Subtask 1.2: LLM API 호출 함수 생성 (환경 변수에서 API 키 읽기)
    - [x] Subtask 1.3: 프롬프트 생성 함수 (출생차트 + 주제 → 프롬프트)
    - [x] Subtask 1.4: LLM 응답 파싱 함수 (JSON → { symbol, body, cta })
    - [x] Subtask 1.5: "시간 모름" 처리 (제한/근사 해석 프롬프트)
    - [x] Subtask 1.6: 에러 처리 (타임아웃, 장애, 재시도 가능 여부 판단)

- [x] Task 2: /api/cards Route Handler 구현
    - [x] Subtask 2.1: `src/app/api/cards/route.ts` 파일 생성
    - [x] Subtask 2.2: POST 요청 처리 (주제 ID 배열, 쿠키에서 출생 정보 읽기)
    - [x] Subtask 2.3: `/api/chart` 호출 또는 직접 차트 계산
    - [x] Subtask 2.4: 주제별로 LLM 호출 (순차 처리)
    - [x] Subtask 2.5: 카드 데이터 배열 반환 `[{ topicId, symbol, body, cta }, ...]`
    - [x] Subtask 2.6: 에러 처리 (`{ error, code, retry? }` 형식)

- [x] Task 3: 환경 변수 설정
    - [x] Subtask 3.1: `.env.example`에 OPENAI_API_KEY 추가 (파일 생성 시도, globalignore로 차단됨)
    - [x] Subtask 3.2: 환경 변수 검증 로직 추가 (getOpenAIClient에서 검증)

## Dev Notes

### Architecture Compliance

**FSD 구조:**

- LLM 유틸리티는 `src/shared/lib/llm/`에 구현
- API Route Handler는 `src/app/api/cards/route.ts`에 구현
- 카드 타입은 `src/shared/types/` 또는 `src/entities/card/model.ts`에 정의

**보안:**

- LLM API 키는 서버 전용 (환경 변수, 클라이언트 노출 금지)
- API Route Handler는 서버 사이드에서만 실행

**에러 처리:**

- LLM 타임아웃/장애 시 `{ error, code, retry: true }` 반환
- 재시도 가능 여부를 명확히 표시

### Technical Decisions

**LLM API 선택:**

- OpenAI API (gpt-4o-mini 또는 gpt-3.5-turbo) 사용
- 환경 변수: `OPENAI_API_KEY`
- 대안: Anthropic Claude API (`ANTHROPIC_API_KEY`)

**프롬프트 구조:**

- 출생차트 데이터 (천체 위치, 하우스, 각도 등)
- 주제별 해석 요청
- "시간 모름" 시 제한/근사 해석 명시
- JSON 형식 응답 요청 (`{ symbol: string, body: string, cta: string }`)

**카드 형식:**

```typescript
interface Card {
	topicId: string;
	symbol: string; // 이모지 또는 심볼 문자
	body: string; // 1~2문장 해석
	cta: string; // CTA 텍스트
}
```

**배치 처리:**

- 여러 주제를 한 번에 요청하거나, 주제별로 순차 호출
- 타임아웃 고려 (주제당 최대 30초)

### Dependencies

- `openai` 패키지 (또는 `@anthropic-ai/sdk`)
- 환경 변수: `OPENAI_API_KEY` (또는 `ANTHROPIC_API_KEY`)

### Testing Considerations

- LLM API 호출은 실제 API 키 필요 (로컬 테스트)
- Mock 응답으로 단위 테스트 가능
- 타임아웃 시나리오 테스트

### Completion Notes List

- OpenAI API 패키지 설치 완료 (`openai` v6.16.0)
- LLM 유틸리티 모듈 생성 완료 (`src/shared/lib/llm/`)
    - 타입 정의 (`types.ts`): Card, LLMRequest, LLMResponse
    - 프롬프트 생성 (`prompt.ts`): 출생차트 + 주제 → 프롬프트
    - LLM 클라이언트 (`client.ts`): OpenAI API 호출, JSON 파싱, 에러 처리
- /api/cards Route Handler 구현 완료
    - POST 요청 처리 (주제 ID 배열 또는 무료 주제 4개 기본값)
    - 쿠키에서 출생 정보 읽기
    - 출생차트 계산 (calculateChart 직접 호출)
    - 주제별 LLM 호출 (순차 처리, 개별 실패 시 기본값으로 대체)
    - 카드 데이터 배열 반환
    - 에러 처리 (`{ error, code, retry? }` 형식)
- "시간 모름" 처리 완료 (프롬프트에 제한/근사 해석 안내 포함)
- LLM API 키는 서버 전용 (환경 변수, 클라이언트 노출 금지)
- 타임아웃/장애 시 재시도 가능 여부 판단 및 에러 응답
- 모든 수락 기준(AC) 충족 확인
- 빌드 및 타입 검사 통과 확인

### File List

**생성된 파일:**

- `src/shared/lib/llm/types.ts` - LLM 관련 타입 정의
- `src/shared/lib/llm/prompt.ts` - 프롬프트 생성 유틸리티
- `src/shared/lib/llm/client.ts` - OpenAI API 클라이언트
- `src/shared/lib/llm/index.ts` - 모듈 export
- `src/app/api/cards/route.ts` - /api/cards Route Handler

**설치된 패키지:**

- `openai` v6.16.0

**기술적 해결 사항:**

- 템플릿 리터럴 내부 중첩 문제 해결 (변수로 분리)
- OpenAI API 에러 처리 (429, 500, 503, 할당량 부족 등)
- JSON 응답 형식 강제 (`response_format: { type: 'json_object' }`)
- 개별 주제 실패 시 기본값으로 대체하여 전체 요청 실패 방지
