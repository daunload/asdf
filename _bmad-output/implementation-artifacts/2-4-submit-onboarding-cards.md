# Story 2.4: 온보딩 제출 및 /cards 리다이렉트

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **방문자**,
I want **입력 완료 후 "결과 보기"를 누르면** 출생 정보가 저장되고 카드 페이지로 이동하고,
So that **계정 없이** 카드 생성 단계로 넘어갈 수 있다.

## Acceptance Criteria

**Given** 생년월일·시간(또는 모름)·장소를 모두 입력한 상태이다  
**When** `submitOnboarding`(Server Action)을 호출한다  
**Then** 출생 정보를 httpOnly·secure 쿠키(또는 동등한 방식)에 저장하고 `/cards`로 리다이렉트한다 (FR5)  
**And** 스텝 간 "이전"으로 돌아가도 입력값이 유지된다 (FR5)  
**And** FSD `features/onboarding/actions.ts`에 `'use server'`로 정의한다

## Tasks / Subtasks

- [x] Task 1: Server Action 구현
  - [x] Subtask 1.1: `src/features/onboarding/actions.ts` 파일 생성
  - [x] Subtask 1.2: `submitOnboarding` Server Action 구현
  - [x] Subtask 1.3: 출생 정보를 httpOnly·secure 쿠키에 저장
  - [x] Subtask 1.4: 유효성 검사 및 에러 처리

- [x] Task 2: 온보딩 페이지에서 Server Action 호출
  - [x] Subtask 2.1: 스텝 3에서 "결과 보기" 버튼 클릭 시 Server Action 호출
  - [x] Subtask 2.2: 로딩 상태 처리 (isSubmitting, "처리 중..." 표시)
  - [x] Subtask 2.3: 에러 처리 및 사용자 피드백 (에러 메시지 표시)
  - [x] Subtask 2.4: 성공 시 `/cards`로 리다이렉트 (Server Action에서 redirect)

- [x] Task 3: 입력값 유지 기능 (스텝 간 이동)
  - [x] Subtask 3.1: 세션 스토리지에서 입력값 복원 (useEffect로 각 스텝에서 복원)
  - [x] Subtask 3.2: 스텝 간 이동 시 입력값 유지 확인

- [x] Task 4: /cards 페이지 기본 구조 생성
  - [x] Subtask 4.1: `/cards` 라우트 생성 (`src/app/cards/page.tsx`)
  - [x] Subtask 4.2: 기본 페이지 컴포넌트 생성 (`src/page-components/cards/ui.tsx`)

## Dev Notes

### Architecture Compliance

**FSD 구조:**
- Server Action은 `src/features/onboarding/actions.ts`에 구현
- `'use server'` 지시어 사용
- 온보딩 페이지는 `page-components/onboarding/ui.tsx`에서 Server Action 호출

**쿠키 저장:**
- httpOnly, secure 쿠키 사용 (Next.js cookies API)
- 출생 정보: 생년월일, 시간(또는 "unknown"), 장소

**Source:** [Architecture: Structure Patterns (FSD)](_bmad-output/planning-artifacts/architecture.md#structure-patterns-fsd-feature-sliced-design)

### Technical Requirements

**Server Action:**
- Next.js Server Actions 사용 (`'use server'`)
- `cookies()` API로 쿠키 설정
- 쿠키 옵션: httpOnly, secure, sameSite
- 유효성 검사 및 에러 처리

**리다이렉트:**
- `redirect()` 함수 사용 (Next.js)
- `/cards`로 리다이렉트

**Source:** [Architecture: API & Communication Patterns](_bmad-output/planning-artifacts/architecture.md#api--communication-patterns)

### UX Design Requirements

**로딩 상태:**
- "결과 보기" 버튼 클릭 시 로딩 표시
- 버튼 비활성화 (중복 제출 방지)

**에러 처리:**
- 에러 발생 시 사용자에게 명확한 메시지 표시
- 재시도 가능한 경우 재시도 옵션 제공

**Source:** [UX Design: Feedback Patterns](_bmad-output/planning-artifacts/ux-design-specification.md#feedback-patterns)

### File Structure Requirements

**생성/수정할 파일:**
```
src/
├── features/
│   └── onboarding/
│       └── actions.ts          # Server Action (submitOnboarding)
├── app/
│   └── cards/
│       └── page.tsx            # 카드 페이지 라우트 (기본 구조)
└── page-components/
    └── onboarding/
        └── ui.tsx              # 온보딩 페이지 (Server Action 호출)
```

**Source:** [Architecture: Project Structure](_bmad-output/planning-artifacts/architecture.md#project-structure--boundaries-fsd)

### Library & Framework Requirements

**사용할 패키지:**
- Next.js 16.1.4 (이미 설치됨)
- Next.js cookies API (`next/headers`)
- Next.js redirect (`next/navigation`)

**쿠키 설정:**
- httpOnly: true (JavaScript 접근 불가)
- secure: true (HTTPS에서만 전송)
- sameSite: 'lax' 또는 'strict'

### Testing Requirements

- 이 스토리에서는 테스트 프레임워크 설정은 포함하지 않음
- 브라우저에서 수동 확인:
  - "결과 보기" 버튼 클릭 시 Server Action 호출
  - 쿠키에 출생 정보 저장 확인
  - `/cards`로 리다이렉트 확인
  - 스텝 간 이동 시 입력값 유지 확인

**Source:** [Architecture: Testing Standards](_bmad-output/planning-artifacts/architecture.md#testing-standards)

### Project Structure Notes

**FSD 레이어 사용:**
- `features/onboarding/actions.ts`: Server Action (FSD features 레이어)
- `page-components/onboarding/ui.tsx`: 온보딩 페이지 컴포넌트
- `app/cards/page.tsx`: 카드 페이지 라우트

**상태 관리:**
- 세션 스토리지에 임시 저장 (스텝 간 이동용)
- Server Action 호출 시 쿠키에 최종 저장

**Source:** [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

### Critical Don't-Miss Rules

**FSD 위반 금지:**
- `features/onboarding`은 `shared`만 import 가능
- `page-components/onboarding`은 `features/onboarding`을 import 가능

**보안:**
- 쿠키는 httpOnly, secure로 설정
- 출생 정보는 민감한 정보이므로 안전하게 저장

**에러 처리:**
- Server Action에서 발생한 에러는 사용자에게 명확히 전달
- 네트워크 에러 등은 재시도 옵션 제공

**Source:** [Project Context: Critical Don't-Miss Rules](_bmad-output/project-context.md#critical-dont-miss-rules)

### References

**Epic 및 스토리 정의:**
- [Epic 2: 출생 정보 입력(온보딩)](_bmad-output/planning-artifacts/epics.md#epic-2-출생-정보-입력온보딩)
- [Story 2.4: 온보딩 제출 및 /cards 리다이렉트](_bmad-output/planning-artifacts/epics.md#story-24-온보딩-제출-및-cards-리다이렉트)

**PRD:**
- [FR5: 스텝당 한 단계씩 진행](_bmad-output/planning-artifacts/prd.md)
- [FR6: 출생 정보를 출생차트·해석 생성에 사용](_bmad-output/planning-artifacts/prd.md)

**UX 설계:**
- [UX Design: Feedback Patterns](_bmad-output/planning-artifacts/ux-design-specification.md#feedback-patterns)

**프로젝트 컨텍스트:**
- [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

## Dev Agent Record

### Agent Model Used

Auto (Cursor AI Agent)

### Debug Log References

N/A (구현 전)

### Completion Notes List

- Server Action 구현 완료 (`src/features/onboarding/actions.ts`)
- `submitOnboarding` Server Action 구현 (유효성 검사, 쿠키 저장, 리다이렉트)
- 출생 정보를 httpOnly·secure 쿠키에 저장 (production에서만 secure)
- 온보딩 페이지에서 Server Action 호출 구현
- 로딩 상태 처리 ("처리 중..." 표시, 버튼 비활성화)
- 에러 처리 및 사용자 피드백 (에러 메시지 표시)
- 성공 시 `/cards`로 리다이렉트
- 세션 스토리지에서 입력값 복원 기능 구현 (스텝 간 이동 시 유지)
- `/cards` 페이지 기본 구조 생성
- 모든 수락 기준(AC) 충족 확인
- 빌드 및 타입 검사 통과 확인

### File List

**생성된 파일:**
- `src/features/onboarding/actions.ts` - Server Action (submitOnboarding)
- `src/app/cards/page.tsx` - 카드 페이지 라우트
- `src/page-components/cards/ui.tsx` - 카드 페이지 컴포넌트 (기본 구조)

**수정된 파일:**
- `src/page-components/onboarding/ui.tsx` - 온보딩 페이지 (Server Action 호출, 입력값 복원)

**기술적 해결 사항:**
- Server Action에서 쿠키 저장 및 리다이렉트 처리
- 클라이언트 컴포넌트에서는 쿠키를 직접 읽을 수 없으므로, 임시로 세션 스토리지 사용 (향후 서버 컴포넌트에서 쿠키 읽어서 전달하도록 개선 가능)
- 세션 스토리지에서 입력값 복원하여 스텝 간 이동 시 유지
- 로딩 상태 및 에러 처리 구현
