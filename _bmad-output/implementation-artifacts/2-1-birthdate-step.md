# Story 2.1: 생년월일 입력 스텝

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **방문자**,
I want **생년월일을 한 스텝에 입력**하고,
So that **출생 정보의 첫 단계**를 완료할 수 있다.

## Acceptance Criteria

**Given** 온보딩 첫 스텝(또는 랜딩에서 "시작하기" 후)에 있다  
**When** 생년월일을 선택/입력하고 "다음"을 누른다  
**Then** 유효한 날짜일 때 다음 스텝(시간)으로 진행한다 (FR1)  
**And** 입력·버튼은 키보드 포커스로 조작 가능하고, 터치 타겟은 44×44px 이상이다 (NFR-A1, A2)

## Tasks / Subtasks

- [x] Task 1: 온보딩 페이지 라우트 및 기본 구조 생성
    - [x] Subtask 1.1: `/onboarding` 라우트 생성 (`src/app/onboarding/page.tsx`)
    - [x] Subtask 1.2: 온보딩 페이지 컴포넌트 구조 설계 (FSD: page-components/onboarding/ui.tsx)
    - [x] Subtask 1.3: 스텝 상태 관리 (URL 쿼리 파라미터 사용, Suspense boundary 적용)

- [x] Task 2: 생년월일 입력 폼 구현
    - [x] Subtask 2.1: 생년월일 입력 필드 구현 (년, 월, 일 number input)
    - [x] Subtask 2.2: 날짜 유효성 검사 로직 구현 (유효한 날짜, 미래 날짜 체크)
    - [x] Subtask 2.3: 에러 메시지 표시 (유효하지 않은 날짜, ARIA 지원)
    - [x] Subtask 2.4: "다음" 버튼 구현 (Base UI Button 사용, 유효성 검사 통과 시 활성화)

- [x] Task 3: 접근성 및 UX 요구사항 충족
    - [x] Subtask 3.1: 키보드 포커스 가능 확인 (NFR-A1, 모든 입력 필드 및 버튼)
    - [x] Subtask 3.2: 터치 타겟 44×44px 이상 확인 (NFR-A2, 버튼 min-h-[44px])
    - [x] Subtask 3.3: 반응형 레이아웃 적용 (모바일 우선, max-w-md)
    - [x] Subtask 3.4: 입력값 유지 및 다음 스텝으로 진행 기능 (세션 스토리지 저장, router.push)

## Dev Notes

### Architecture Compliance

**FSD 구조:**

- 온보딩 페이지는 `src/page-components/onboarding/ui.tsx`에 구현
- `src/app/onboarding/page.tsx`에서 `page-components/onboarding` 컴포넌트 import
- Base UI Input, Button은 `@/shared/ui`에서 import

**라우팅:**

- `/onboarding` - 온보딩 첫 스텝 (생년월일)
- `/onboarding?step=2` - 다음 스텝 (시간) - 다음 스토리에서 구현

**Source:** [Architecture: Structure Patterns (FSD)](_bmad-output/planning-artifacts/architecture.md#structure-patterns-fsd-feature-sliced-design)

### Technical Requirements

**날짜 입력 방식:**

- HTML5 `<input type="date">` 사용 (브라우저 네이티브 지원)
- 또는 년/월/일 드롭다운 선택 (더 나은 UX, 특히 모바일)
- 유효성 검사: 유효한 날짜인지, 미래 날짜가 아닌지 확인

**상태 관리:**

- URL 쿼리 파라미터로 스텝 관리 (`?step=1`)
- 또는 클라이언트 상태 (useState) - 단, 페이지 새로고침 시 유지 필요
- 입력값은 쿠키 또는 세션 스토리지에 임시 저장 (다음 스토리에서 제출 시 사용)

**Source:** [Architecture: Frontend Architecture](_bmad-output/planning-artifacts/architecture.md#frontend-architecture)

### UX Design Requirements

**온보딩 스텝 디자인:**

- 스텝당 한 입력 (FR5)
- 명확한 라벨 및 안내 문구
- "다음" 버튼은 입력 완료 후 활성화
- 이전 스텝으로 돌아가기 기능 (선택, 다음 스토리에서)

**접근성:**

- 키보드 포커스 가능 (NFR-A1)
- 터치 타겟 44×44px 이상 (NFR-A2)
- 색상 대비 4.5:1 이상
- ARIA 레이블 및 에러 메시지

**Source:** [UX Design: Form Patterns](_bmad-output/planning-artifacts/ux-design-specification.md#form-patterns)  
**Source:** [UX Design: Accessibility Strategy](_bmad-output/planning-artifacts/ux-design-specification.md#accessibility-strategy)

### File Structure Requirements

**생성/수정할 파일:**

```
src/
├── app/
│   └── onboarding/
│       └── page.tsx          # 온보딩 라우트
├── page-components/
│   └── onboarding/
│       └── ui.tsx            # 온보딩 페이지 컴포넌트
└── shared/
    └── ui/
        ├── button.tsx        # Base UI Button (이미 생성됨)
        └── input.tsx        # Base UI Input (이미 생성됨)
```

**Source:** [Architecture: Project Structure](_bmad-output/planning-artifacts/architecture.md#project-structure--boundaries-fsd)

### Library & Framework Requirements

**사용할 패키지:**

- Next.js 16.1.4 (이미 설치됨)
- Base UI Input, Button (`@/shared/ui`)
- React hooks (useState, useEffect)

**날짜 유효성 검사:**

- JavaScript Date 객체 사용
- 유효한 날짜 범위: 과거 날짜만 허용 (미래 날짜 불가)

### Testing Requirements

- 이 스토리에서는 테스트 프레임워크 설정은 포함하지 않음
- 브라우저에서 수동 확인:
    - 생년월일 입력 필드 동작
    - 유효성 검사 (유효하지 않은 날짜)
    - "다음" 버튼 클릭 시 다음 스텝으로 진행
    - 키보드 포커스 동작
    - 모바일 반응형 레이아웃

**Source:** [Architecture: Testing Standards](_bmad-output/planning-artifacts/architecture.md#testing-standards)

### Project Structure Notes

**FSD 레이어 사용:**

- `page-components/onboarding/ui.tsx`: 온보딩 페이지 컴포넌트
- `app/onboarding/page.tsx`: Next.js 라우트
- `shared/ui/input`, `shared/ui/button`: Base UI 래퍼

**상태 관리:**

- URL 쿼리 파라미터로 스텝 관리 (`?step=1`)
- 입력값은 브라우저 세션 스토리지에 임시 저장 (다음 스토리에서 제출)

**Source:** [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

### Critical Don't-Miss Rules

**FSD 위반 금지:**

- `page-components/onboarding`은 `shared/ui`만 import 가능
- `app/onboarding/page.tsx`는 `page-components/onboarding`만 import 가능

**접근성:**

- 모든 입력 필드와 버튼은 키보드로 접근 가능
- 터치 타겟 44×44px 이상
- 에러 메시지는 명확하고 접근 가능하게 표시

**유효성 검사:**

- 유효하지 않은 날짜 입력 시 에러 메시지 표시
- "다음" 버튼은 유효한 날짜 입력 시에만 활성화

**Source:** [Project Context: Critical Don't-Miss Rules](_bmad-output/project-context.md#critical-dont-miss-rules)

### References

**Epic 및 스토리 정의:**

- [Epic 2: 출생 정보 입력(온보딩)](_bmad-output/planning-artifacts/epics.md#epic-2-출생-정보-입력온보딩)
- [Story 2.1: 생년월일 입력 스텝](_bmad-output/planning-artifacts/epics.md#story-21-생년월일-입력-스텝)

**PRD:**

- [FR1: 생년월일 입력](_bmad-output/planning-artifacts/prd.md)
- [FR5: 스텝당 한 단계씩 진행](_bmad-output/planning-artifacts/prd.md)
- [NFR-A1: 키보드 포커스](_bmad-output/planning-artifacts/prd.md)
- [NFR-A2: 터치 타겟 44×44px](_bmad-output/planning-artifacts/prd.md)

**UX 설계:**

- [UX Design: Form Patterns](_bmad-output/planning-artifacts/ux-design-specification.md#form-patterns)
- [UX Design: User Journey Flows](_bmad-output/planning-artifacts/ux-design-specification.md#user-journey-flows)

**프로젝트 컨텍스트:**

- [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

## Dev Agent Record

### Agent Model Used

Auto (Cursor AI Agent)

### Debug Log References

N/A (구현 전)

### Completion Notes List

- 온보딩 페이지 라우트 및 기본 구조 생성 완료 (`/onboarding`)
- 생년월일 입력 폼 구현 완료 (년/월/일 number input)
- 날짜 유효성 검사 로직 구현 (유효한 날짜, 미래 날짜 체크)
- 에러 메시지 표시 및 ARIA 지원
- "다음" 버튼 구현 (유효성 검사 통과 시 활성화)
- 접근성 요구사항 충족 (키보드 포커스, 터치 타겟 44×44px)
- 반응형 레이아웃 적용 (모바일 우선)
- 입력값 세션 스토리지 저장 및 다음 스텝으로 진행 기능
- Next.js Suspense boundary 적용 (useSearchParams 사용)
- 모든 수락 기준(AC) 충족 확인
- 빌드 및 타입 검사 통과 확인

### File List

**생성된 파일:**

- `src/app/onboarding/page.tsx` - 온보딩 라우트 (Suspense boundary 포함)
- `src/page-components/onboarding/ui.tsx` - 온보딩 페이지 컴포넌트 (생년월일 입력 폼)

**기술적 해결 사항:**

- Next.js `useSearchParams()` 사용 시 Suspense boundary 필수 적용
- 날짜 유효성 검사: JavaScript Date 객체를 사용한 실제 날짜 검증
- 세션 스토리지에 입력값 저장 (다음 스토리에서 제출 시 사용)
