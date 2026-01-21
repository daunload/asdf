# Story 2.3: 출생 장소 입력 스텝

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **방문자**,
I want **출생 장소를 입력**하고,
So that **출생차트 계산에 필요한 정보**를 모두 입력한다.

## Acceptance Criteria

**Given** 시간(또는 "모름") 입력을 마친 후 장소 스텝에 있다  
**When** 장소를 입력(텍스트 또는 자동완성)하고 "결과 보기" 등을 누른다  
**Then** FR4를 만족하고, 유효 시 제출 가능하다

## Tasks / Subtasks

- [x] Task 1: 출생 장소 입력 폼 구현
  - [x] Subtask 1.1: 장소 입력 필드 구현 (텍스트 input)
  - [x] Subtask 1.2: 장소 유효성 검사 로직 구현 (최소 2자 이상, 빈 값 체크)
  - [x] Subtask 1.3: "결과 보기" 버튼 구현 (Base UI Button 사용)
  - [x] Subtask 1.4: 입력값 세션 스토리지 저장

- [x] Task 2: 온보딩 페이지에 스텝 3 추가
  - [x] Subtask 2.1: 스텝 3 UI 구현 (장소 입력)
  - [x] Subtask 2.2: 스텝 간 전환 로직 구현 (스텝 2 → 스텝 3)
  - [x] Subtask 2.3: "결과 보기" 버튼 클릭 시 다음 스토리(2-4)로 연결 준비 (스텝 4로 이동)

- [x] Task 3: 접근성 및 UX 요구사항 충족
  - [x] Subtask 3.1: 키보드 포커스 가능 확인 (NFR-A1, 모든 입력 필드 및 버튼)
  - [x] Subtask 3.2: 터치 타겟 44×44px 이상 확인 (NFR-A2, 버튼 min-h-[44px])
  - [x] Subtask 3.3: 반응형 레이아웃 적용 (모바일 우선, max-w-md)
  - [x] Subtask 3.4: 입력값 유효성 검사 및 에러 메시지 표시 (ARIA 지원)

## Dev Notes

### Architecture Compliance

**FSD 구조:**
- 온보딩 페이지는 기존 `src/page-components/onboarding/ui.tsx`에 스텝 3 추가
- Base UI Input, Button은 `@/shared/ui`에서 import

**라우팅:**
- `/onboarding?step=1` - 생년월일 입력 (이미 구현됨)
- `/onboarding?step=2` - 출생 시간 입력 또는 "시간 모름" (이미 구현됨)
- `/onboarding?step=3` - 출생 장소 입력 (이번 스토리)
- `/onboarding?step=4` 또는 제출 후 `/cards` - 다음 스토리에서 구현

**Source:** [Architecture: Structure Patterns (FSD)](_bmad-output/planning-artifacts/architecture.md#structure-patterns-fsd-feature-sliced-design)

### Technical Requirements

**장소 입력 방식:**
- 텍스트 input 필드 사용 (MVP에서는 자동완성 없이 간단한 텍스트 입력)
- 향후 자동완성 기능 추가 가능 (Growth)
- 장소 유효성 검사: 최소 길이, 빈 값 체크

**상태 관리:**
- 장소 입력값을 세션 스토리지에 저장
- "결과 보기" 버튼 클릭 시 다음 스토리(2-4)에서 제출 처리

**Source:** [Architecture: Frontend Architecture](_bmad-output/planning-artifacts/architecture.md#frontend-architecture)

### UX Design Requirements

**장소 입력 디자인:**
- 텍스트 입력 필드
- 명확한 라벨 및 안내 문구
- "결과 보기" 버튼 (다음 스토리에서 제출 및 리다이렉트)

**접근성:**
- 키보드 포커스 가능 (NFR-A1)
- 터치 타겟 44×44px 이상 (NFR-A2)
- 색상 대비 4.5:1 이상
- ARIA 레이블 및 에러 메시지

**Source:** [UX Design: Form Patterns](_bmad-output/planning-artifacts/ux-design-specification.md#form-patterns)

### File Structure Requirements

**수정할 파일:**
```
src/
└── page-components/
    └── onboarding/
        └── ui.tsx            # 온보딩 페이지 컴포넌트 (스텝 3 추가)
```

**Source:** [Architecture: Project Structure](_bmad-output/planning-artifacts/architecture.md#project-structure--boundaries-fsd)

### Library & Framework Requirements

**사용할 패키지:**
- Next.js 16.1.4 (이미 설치됨)
- Base UI Input, Button (`@/shared/ui`)
- React hooks (useState, useEffect)

**장소 입력:**
- HTML5 text input
- 최소 길이 유효성 검사 (예: 2자 이상)

### Testing Requirements

- 이 스토리에서는 테스트 프레임워크 설정은 포함하지 않음
- 브라우저에서 수동 확인:
  - 장소 입력 필드 동작
  - 유효성 검사 (빈 값, 최소 길이)
  - "결과 보기" 버튼 클릭 동작
  - 키보드 포커스 동작
  - 모바일 반응형 레이아웃

**Source:** [Architecture: Testing Standards](_bmad-output/planning-artifacts/architecture.md#testing-standards)

### Project Structure Notes

**FSD 레이어 사용:**
- `page-components/onboarding/ui.tsx`: 온보딩 페이지 컴포넌트 (스텝 1, 2, 3 포함)
- `shared/ui/input`, `shared/ui/button`: Base UI 래퍼

**상태 관리:**
- URL 쿼리 파라미터로 스텝 관리 (`?step=3`)
- 입력값은 브라우저 세션 스토리지에 임시 저장

**Source:** [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

### Critical Don't-Miss Rules

**FSD 위반 금지:**
- `page-components/onboarding`은 `shared/ui`만 import 가능

**접근성:**
- 모든 입력 필드와 버튼은 키보드로 접근 가능
- 터치 타겟 44×44px 이상
- 에러 메시지는 명확하고 접근 가능하게 표시

**기능 요구사항:**
- 장소 입력은 필수 (빈 값 불가)
- "결과 보기" 버튼은 유효한 장소 입력 시 활성화
- 다음 스토리(2-4)에서 제출 및 리다이렉트 처리

**Source:** [Project Context: Critical Don't-Miss Rules](_bmad-output/project-context.md#critical-dont-miss-rules)

### References

**Epic 및 스토리 정의:**
- [Epic 2: 출생 정보 입력(온보딩)](_bmad-output/planning-artifacts/epics.md#epic-2-출생-정보-입력온보딩)
- [Story 2.3: 출생 장소 입력 스텝](_bmad-output/planning-artifacts/epics.md#story-23-출생-장소-입력-스텝)

**PRD:**
- [FR4: 출생 장소 입력](_bmad-output/planning-artifacts/prd.md)
- [NFR-A1: 키보드 포커스](_bmad-output/planning-artifacts/prd.md)
- [NFR-A2: 터치 타겟 44×44px](_bmad-output/planning-artifacts/prd.md)

**UX 설계:**
- [UX Design: Form Patterns](_bmad-output/planning-artifacts/ux-design-specification.md#form-patterns)

**프로젝트 컨텍스트:**
- [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

## Dev Agent Record

### Agent Model Used

Auto (Cursor AI Agent)

### Debug Log References

N/A (구현 전)

### Completion Notes List

- 출생 장소 입력 폼 구현 완료 (텍스트 input)
- 장소 유효성 검사 로직 구현 (최소 2자 이상, 빈 값 체크)
- "결과 보기" 버튼 구현 (Base UI Button 사용)
- 입력값 세션 스토리지 저장
- 온보딩 페이지에 스텝 3 추가 완료
- 스텝 간 전환 로직 구현 (스텝 2 → 스텝 3 → 스텝 4)
- "결과 보기" 버튼 클릭 시 다음 스토리(2-4)로 연결 준비 (스텝 4로 이동)
- 접근성 요구사항 충족 (키보드 포커스, 터치 타겟 44×44px)
- 반응형 레이아웃 적용 (모바일 우선)
- 모든 수락 기준(AC) 충족 확인
- 빌드 및 타입 검사 통과 확인

### File List

**수정된 파일:**
- `src/page-components/onboarding/ui.tsx` - 온보딩 페이지 컴포넌트 (스텝 3 추가)

**기술적 해결 사항:**
- 장소 입력 필드 유효성 검사 (최소 2자 이상)
- 에러 메시지 표시 및 ARIA 지원
- 세션 스토리지에 장소 저장
- 다음 스토리(2-4)에서 제출 및 리다이렉트 처리 준비
