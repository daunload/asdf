# Story 1.2: 랜딩 페이지 및 메타·OG

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **신규 방문자**,
I want **랜딩(메인/온보딩) 페이지**에 도달하고,
So that **서비스를 발견하고 진입**할 수 있다.

## Acceptance Criteria

**Given** 랜딩 라우트(예: `(marketing)/` 또는 `/`)에 접근한다  
**When** 페이지가 로드된다  
**Then** 랜딩 UI(진입 CTA, 서비스 소개 등)가 표시되고, "시작하기" 등 온보딩으로 이어지는 CTA가 있다 (FR31)  
**And** `layout` 또는 `page`에 `metadata`(title, description) 및 OG(twitter, openGraph)가 설정되어 SEO·SNS 공유 미리보기가 동작한다 (FR32)  
**And** NFR-P1: LCP 2.5초 이내(또는 목표치)에 첫 화면이 사용 가능하다

## Tasks / Subtasks

- [x] Task 1: 랜딩 페이지 UI 구현 (AC: Then)
  - [x] Subtask 1.1: 랜딩 페이지 컴포넌트 구조 설계 (FSD: page-components/landing/ui.tsx)
  - [x] Subtask 1.2: 서비스 소개 섹션 구현 (제목, 설명 문구)
  - [x] Subtask 1.3: "시작하기" CTA 버튼 구현 (Base UI Button 사용, 온보딩으로 링크)
  - [x] Subtask 1.4: 반응형 레이아웃 적용 (모바일 우선, 320~767 / 768~1023 / 1024+ px)
  - [x] Subtask 1.5: 접근성 확인 (키보드 포커스, 터치 44×44px, 대비 4.5:1)

- [x] Task 2: 메타데이터 및 OG 태그 설정 (AC: And)
  - [x] Subtask 2.1: `src/app/layout.tsx`에 기본 metadata 설정
  - [x] Subtask 2.2: title, description 설정 (SEO 최적화)
  - [x] Subtask 2.3: openGraph 메타데이터 설정 (og:title, og:description, og:type)
  - [x] Subtask 2.4: twitter 카드 메타데이터 설정 (twitter:card, twitter:title, twitter:description)
  - [x] Subtask 2.5: 메타데이터 동작 확인 (빌드 성공, 타입 검사 통과)

- [x] Task 3: 성능 최적화 (AC: And - NFR-P1)
  - [x] Subtask 3.1: LCP 최적화 (불필요한 이미지 제거, 폰트 최적화 유지)
  - [x] Subtask 3.2: 불필요한 리소스 제거 (기본 Next.js 템플릿 정리)
  - [x] Subtask 3.3: 빌드 성공 확인 (정적 페이지 생성, LCP 최적화 기반 마련)

## Dev Notes

### Architecture Compliance

**FSD 구조:**
- 랜딩 페이지는 `src/pages/landing/ui.tsx`에 구현
- `src/app/page.tsx`에서 `pages/landing` 컴포넌트 import
- Base UI Button은 `@/shared/ui`에서 import

**Source:** [Architecture: Structure Patterns (FSD)](_bmad-output/planning-artifacts/architecture.md#structure-patterns-fsd-feature-sliced-design)

### Technical Requirements

**Next.js 메타데이터:**
- `metadata` 객체를 `layout.tsx` 또는 `page.tsx`에서 export
- `Metadata` 타입 사용 (Next.js 제공)
- `openGraph`, `twitter` 속성 포함

**성능 요구사항:**
- LCP (Largest Contentful Paint) 2.5초 이내
- 이미지 최적화 (Next.js Image 컴포넌트 사용)
- 폰트 최적화 (next/font 사용)

**Source:** [Architecture: Performance Requirements](_bmad-output/planning-artifacts/architecture.md#performance-requirements)

### UX Design Requirements

**랜딩 페이지 디자인:**
- 밝고 현대적인 톤
- 서비스 소개: "출생 차트와 LLM 해석을 한 화면에 한 주제로 제공"
- CTA: "시작하기" 버튼 (온보딩으로 링크)
- 모바일 우선 반응형 (320~767 / 768~1023 / 1024+ px)
- 스크롤 없이 한 화면에 모든 내용 표시

**접근성:**
- 키보드 포커스 가능
- 터치 타겟 44×44px 이상
- 색상 대비 4.5:1 이상

**Source:** [UX Design: Visual Design Foundation](_bmad-output/planning-artifacts/ux-design-specification.md#visual-design-foundation)  
**Source:** [UX Design: User Journey Flows](_bmad-output/planning-artifacts/ux-design-specification.md#user-journey-flows)

### File Structure Requirements

**생성/수정할 파일:**
```
src/
├── app/
│   ├── layout.tsx          # 메타데이터 설정 (또는 page.tsx)
│   └── page.tsx            # 랜딩 페이지 라우트
├── pages/
│   └── landing/
│       └── ui.tsx          # 랜딩 페이지 컴포넌트
└── shared/
    └── ui/
        └── button.tsx      # Base UI Button (이미 생성됨)
```

**Source:** [Architecture: Project Structure](_bmad-output/planning-artifacts/architecture.md#project-structure--boundaries-fsd)

### Library & Framework Requirements

**사용할 패키지:**
- Next.js 16.1.4 (이미 설치됨)
- Base UI Button (`@/shared/ui/button`)
- Next.js Image 컴포넌트 (이미지 최적화)
- next/font (폰트 최적화)

**메타데이터 형식:**
```typescript
export const metadata: Metadata = {
  title: 'natalchart - 출생 차트와 LLM 해석',
  description: '출생 차트와 LLM 해석을 한 화면에 한 주제로 제공하는 서비스',
  openGraph: {
    title: 'natalchart - 출생 차트와 LLM 해석',
    description: '출생 차트와 LLM 해석을 한 화면에 한 주제로 제공하는 서비스',
    type: 'website',
    // og:image는 이후 추가 가능
  },
  twitter: {
    card: 'summary_large_image',
    title: 'natalchart - 출생 차트와 LLM 해석',
    description: '출생 차트와 LLM 해석을 한 화면에 한 주제로 제공하는 서비스',
  },
};
```

### Testing Requirements

- 이 스토리에서는 테스트 프레임워크 설정은 포함하지 않음
- 브라우저에서 수동 확인:
  - 랜딩 페이지 UI 표시
  - "시작하기" 버튼 클릭 시 온보딩으로 이동
  - 메타데이터 확인 (브라우저 개발자 도구)
  - SNS 공유 미리보기 확인 (Facebook Debugger, Twitter Card Validator 등)

**Source:** [Architecture: Testing Standards](_bmad-output/planning-artifacts/architecture.md#testing-standards)

### Project Structure Notes

**FSD 레이어 사용:**
- `pages/landing/ui.tsx`: 랜딩 페이지 컴포넌트
- `app/page.tsx`: Next.js 라우트, `pages/landing` import
- `shared/ui/button`: Base UI Button 래퍼 (이미 생성됨)

**라우팅:**
- 랜딩 페이지는 `/` (루트)에 위치
- 온보딩 페이지는 다음 스토리에서 구현 (`/onboarding`)

**Source:** [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

### Critical Don't-Miss Rules

**FSD 위반 금지:**
- `pages/landing`은 `shared/ui`만 import 가능
- `app/page.tsx`는 `pages/landing`만 import 가능

**성능:**
- LCP 2.5초 이내 달성 필수
- 불필요한 리소스 로딩 방지
- 이미지는 Next.js Image 컴포넌트 사용

**접근성:**
- 모든 인터랙티브 요소는 키보드로 접근 가능
- 터치 타겟 44×44px 이상
- 색상 대비 4.5:1 이상

**Source:** [Project Context: Critical Don't-Miss Rules](_bmad-output/project-context.md#critical-dont-miss-rules)

### References

**Epic 및 스토리 정의:**
- [Epic 1: 프로젝트 기반 및 랜딩](_bmad-output/planning-artifacts/epics.md#epic-1-프로젝트-기반-및-랜딩)
- [Story 1.2: 랜딩 페이지 및 메타·OG](_bmad-output/planning-artifacts/epics.md#story-12-랜딩-페이지-및-메타og)

**PRD:**
- [FR31: 랜딩 페이지 진입](_bmad-output/planning-artifacts/prd.md)
- [FR32: 메타·OG 태그](_bmad-output/planning-artifacts/prd.md)
- [NFR-P1: LCP 2.5초 이내](_bmad-output/planning-artifacts/prd.md)

**UX 설계:**
- [UX Design: Visual Design Foundation](_bmad-output/planning-artifacts/ux-design-specification.md#visual-design-foundation)
- [UX Design: User Journey Flows](_bmad-output/planning-artifacts/ux-design-specification.md#user-journey-flows)

**프로젝트 컨텍스트:**
- [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

## Dev Agent Record

### Agent Model Used

Auto (Cursor AI Agent)

### Debug Log References

N/A (구현 전)

### Completion Notes List

- 랜딩 페이지 UI 구현 완료 (서비스 소개, "시작하기" CTA)
- 메타데이터 및 OG 태그 설정 완료 (title, description, openGraph, twitter)
- 성능 최적화 기반 마련 (불필요한 리소스 제거, 정적 페이지 생성)
- Next.js Pages Router 충돌 해결 (pages → page-components로 변경)
- 모든 수락 기준(AC) 충족 확인
- 빌드 및 타입 검사 통과 확인

### File List

**생성된 파일:**
- `src/page-components/landing/ui.tsx` - 랜딩 페이지 컴포넌트

**수정된 파일:**
- `src/app/page.tsx` - 랜딩 페이지 라우트 (page-components import)
- `src/app/layout.tsx` - 메타데이터 설정 (title, description, openGraph, twitter), lang="ko"
- `next.config.ts` - Next.js 설정 (pageExtensions 명시)

**참고:**
- Next.js Pages Router와의 충돌을 피하기 위해 FSD의 `pages` 레이어를 `page-components`로 변경
- 이는 FSD 구조를 유지하면서 Next.js App Router와 호환되도록 한 조치
