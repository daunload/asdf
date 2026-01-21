# Story 2.2: 출생 시간 입력 스텝 및 "시간 모름"

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **방문자**,
I want **출생 시간을 입력하거나 "모름"을 선택**하고,
So that **시간을 아는 경우와 모르는 경우 모두** 다음 단계로 넘어갈 수 있다.

## Acceptance Criteria

**Given** 생년월일 입력을 마친 후 시간 스텝에 있다  
**When** 시간을 입력하면 "다음"으로 진행하고, "모름"을 선택하면 동의/안내 후 "다음"으로 진행한다  
**Then** FR2(시간 입력), FR3("시간 모름" 선택)을 만족한다  
**And** "시간 모름" 선택 시 제한 해석 안내 문구를 노출한다 (UX)

## Tasks / Subtasks

- [x] Task 1: 출생 시간 입력 폼 구현
  - [x] Subtask 1.1: 시간 입력 필드 구현 (시, 분 number input)
  - [x] Subtask 1.2: 시간 유효성 검사 로직 구현 (0-23시, 0-59분)
  - [x] Subtask 1.3: "시간 모름" 체크박스 구현
  - [x] Subtask 1.4: "시간 모름" 선택 시 제한 해석 안내 문구 표시 (경고 박스)

- [x] Task 2: 온보딩 페이지에 스텝 2 추가
  - [x] Subtask 2.1: 스텝 2 UI 구현 (시간 입력 또는 "시간 모름" 선택)
  - [x] Subtask 2.2: 스텝 간 전환 로직 구현 (스텝 1 → 스텝 2 → 스텝 3)
  - [x] Subtask 2.3: 입력값 세션 스토리지 저장 (시간 또는 "unknown" 플래그)
  - [x] Subtask 2.4: "다음" 버튼 구현 (시간 입력 또는 "모름" 선택 시 활성화)

- [x] Task 3: 접근성 및 UX 요구사항 충족
  - [x] Subtask 3.1: 키보드 포커스 가능 확인 (NFR-A1, 모든 입력 필드 및 버튼)
  - [x] Subtask 3.2: 터치 타겟 44×44px 이상 확인 (NFR-A2, 버튼 및 체크박스)
  - [x] Subtask 3.3: "시간 모름" 선택 시 안내 문구 명확히 표시 (경고 박스, ARIA)
  - [x] Subtask 3.4: 반응형 레이아웃 적용 (모바일 우선, max-w-md)

## Dev Notes

### Architecture Compliance

**FSD 구조:**
- 온보딩 페이지는 기존 `src/page-components/onboarding/ui.tsx`에 스텝 2 추가
- Base UI Input, Button은 `@/shared/ui`에서 import

**라우팅:**
- `/onboarding?step=1` - 생년월일 입력 (이미 구현됨)
- `/onboarding?step=2` - 출생 시간 입력 또는 "시간 모름" 선택 (이번 스토리)
- `/onboarding?step=3` - 출생 장소 입력 (다음 스토리)

**Source:** [Architecture: Structure Patterns (FSD)](_bmad-output/planning-artifacts/architecture.md#structure-patterns-fsd-feature-sliced-design)

### Technical Requirements

**시간 입력 방식:**
- HTML5 `<input type="time">` 사용 (브라우저 네이티브 지원)
- 또는 시/분 드롭다운 선택 (더 나은 UX, 특히 모바일)
- "시간 모름" 옵션: 체크박스 또는 라디오 버튼

**상태 관리:**
- 시간 입력값 또는 "unknown" 플래그를 세션 스토리지에 저장
- "시간 모름" 선택 시 제한 해석 안내 문구 표시

**Source:** [Architecture: Frontend Architecture](_bmad-output/planning-artifacts/architecture.md#frontend-architecture)

### UX Design Requirements

**시간 입력 디자인:**
- 시간 입력 필드 또는 "시간 모름" 선택 옵션
- "시간 모름" 선택 시 안내 문구: "시간을 모르면 제한된 해석만 제공됩니다"
- 명확한 라벨 및 안내 문구

**접근성:**
- 키보드 포커스 가능 (NFR-A1)
- 터치 타겟 44×44px 이상 (NFR-A2)
- 색상 대비 4.5:1 이상
- ARIA 레이블 및 안내 메시지

**Source:** [UX Design: Form Patterns](_bmad-output/planning-artifacts/ux-design-specification.md#form-patterns)  
**Source:** [UX Design: Feedback Patterns](_bmad-output/planning-artifacts/ux-design-specification.md#feedback-patterns)

### File Structure Requirements

**수정할 파일:**
```
src/
└── page-components/
    └── onboarding/
        └── ui.tsx            # 온보딩 페이지 컴포넌트 (스텝 2 추가)
```

**Source:** [Architecture: Project Structure](_bmad-output/planning-artifacts/architecture.md#project-structure--boundaries-fsd)

### Library & Framework Requirements

**사용할 패키지:**
- Next.js 16.1.4 (이미 설치됨)
- Base UI Input, Button (`@/shared/ui`)
- React hooks (useState, useEffect)

**시간 입력:**
- HTML5 time input 또는 시/분 선택 드롭다운
- 시간 유효성 검사 (00:00 ~ 23:59)

### Testing Requirements

- 이 스토리에서는 테스트 프레임워크 설정은 포함하지 않음
- 브라우저에서 수동 확인:
  - 시간 입력 필드 동작
  - "시간 모름" 선택 옵션
  - 안내 문구 표시
  - "다음" 버튼 클릭 시 다음 스텝으로 진행
  - 키보드 포커스 동작
  - 모바일 반응형 레이아웃

**Source:** [Architecture: Testing Standards](_bmad-output/planning-artifacts/architecture.md#testing-standards)

### Project Structure Notes

**FSD 레이어 사용:**
- `page-components/onboarding/ui.tsx`: 온보딩 페이지 컴포넌트 (스텝 1, 2 포함)
- `shared/ui/input`, `shared/ui/button`: Base UI 래퍼

**상태 관리:**
- URL 쿼리 파라미터로 스텝 관리 (`?step=2`)
- 입력값은 브라우저 세션 스토리지에 임시 저장

**Source:** [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

### Critical Don't-Miss Rules

**FSD 위반 금지:**
- `page-components/onboarding`은 `shared/ui`만 import 가능

**접근성:**
- 모든 입력 필드와 버튼은 키보드로 접근 가능
- 터치 타겟 44×44px 이상
- "시간 모름" 안내 문구는 명확하고 접근 가능하게 표시

**기능 요구사항:**
- 시간 입력 또는 "시간 모름" 선택 중 하나는 필수
- "다음" 버튼은 시간 입력 또는 "모름" 선택 시 활성화

**Source:** [Project Context: Critical Don't-Miss Rules](_bmad-output/project-context.md#critical-dont-miss-rules)

### References

**Epic 및 스토리 정의:**
- [Epic 2: 출생 정보 입력(온보딩)](_bmad-output/planning-artifacts/epics.md#epic-2-출생-정보-입력온보딩)
- [Story 2.2: 출생 시간 입력 스텝 및 "시간 모름"](_bmad-output/planning-artifacts/epics.md#story-22-출생-시간-입력-스텝-및-시간-모름)

**PRD:**
- [FR2: 출생 시간 입력](_bmad-output/planning-artifacts/prd.md)
- [FR3: 출생 시간 "모름" 선택](_bmad-output/planning-artifacts/prd.md)
- [NFR-A1: 키보드 포커스](_bmad-output/planning-artifacts/prd.md)
- [NFR-A2: 터치 타겟 44×44px](_bmad-output/planning-artifacts/prd.md)

**UX 설계:**
- [UX Design: Form Patterns](_bmad-output/planning-artifacts/ux-design-specification.md#form-patterns)
- [UX Design: Feedback Patterns](_bmad-output/planning-artifacts/ux-design-specification.md#feedback-patterns)

**프로젝트 컨텍스트:**
- [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

## Dev Agent Record

### Agent Model Used

Auto (Cursor AI Agent)

### Debug Log References

N/A (구현 전)

### Completion Notes List

- 출생 시간 입력 폼 구현 완료 (시/분 number input)
- 시간 유효성 검사 로직 구현 (0-23시, 0-59분)
- "시간 모름" 체크박스 구현 및 선택 시 시간 입력 필드 비활성화
- "시간 모름" 선택 시 제한 해석 안내 문구 표시 (경고 박스)
- 온보딩 페이지에 스텝 2 추가 완료
- 스텝 간 전환 로직 구현 (스텝 1 → 스텝 2 → 스텝 3)
- 입력값 세션 스토리지 저장 (시간 또는 "unknown" 플래그)
- "다음" 버튼 구현 (시간 입력 또는 "모름" 선택 시 활성화)
- 접근성 요구사항 충족 (키보드 포커스, 터치 타겟 44×44px)
- 반응형 레이아웃 적용 (모바일 우선)
- 모든 수락 기준(AC) 충족 확인
- 빌드 및 타입 검사 통과 확인

### File List

**수정된 파일:**
- `src/page-components/onboarding/ui.tsx` - 온보딩 페이지 컴포넌트 (스텝 2 추가)

**기술적 해결 사항:**
- 시간 입력 필드와 "시간 모름" 체크박스 상호 배타적 동작 구현
- "시간 모름" 선택 시 시간 입력 필드 자동 비활성화
- 경고 박스로 제한 해석 안내 문구 표시 (ARIA 지원)
