# Story 1.1: 프로젝트 초기화 및 Base UI·FSD 골격

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **개발자**,
I want **create-next-app과 Base UI, FSD 폴더 구조**로 프로젝트를 초기화하고,
So that **이후 랜딩·온보딩·카드 구현의 기반**이 마련된다.

## Acceptance Criteria

**Given** 프로젝트 루트에 기존 `package.json` 등이 없거나 덮어쓰기 가능한 상태  
**When** `npx create-next-app@latest . --yes`를 실행한다  
**Then** TypeScript, Tailwind, App Router, Turbopack, `src/`, `@/*` alias가 적용된 Next.js 앱이 생성된다  
**And** `@base-ui-components/react`(또는 최신 패키지명)가 설치되고, `shared/ui/`에 Button·Input 등 Base UI 래퍼 골격이 있다  
**And** FSD 레이어 `app`, `pages`, `widgets`, `features`, `entities`, `shared`가 `src/` 하위에 존재한다

## Tasks / Subtasks

- [x] Task 1: Next.js 프로젝트 초기화 (AC: Then)
    - [x] Subtask 1.1: `npx create-next-app@latest . --yes` 실행
    - [x] Subtask 1.2: TypeScript, Tailwind, App Router, Turbopack, `src/`, `@/*` 설정 확인
    - [x] Subtask 1.3: 기본 Next.js 앱이 정상 실행되는지 확인 (`npm run dev`)

- [x] Task 2: Base UI 설치 및 래퍼 골격 생성 (AC: And)
    - [x] Subtask 2.1: Base UI 패키지 설치 (`@base-ui/react` 설치 완료)
    - [x] Subtask 2.2: `src/shared/ui/` 폴더 생성
    - [x] Subtask 2.3: Base UI Button 래퍼 컴포넌트 생성 (`shared/ui/button.tsx`)
    - [x] Subtask 2.4: Base UI Input 래퍼 컴포넌트 생성 (`shared/ui/input.tsx`)
    - [x] Subtask 2.5: `shared/ui/index.ts`에서 export 설정

- [x] Task 3: FSD 폴더 구조 생성 (AC: And)
    - [x] Subtask 3.1: `src/app/` 확인 (Next.js 기본 생성됨)
    - [x] Subtask 3.2: `src/pages/` 폴더 생성
    - [x] Subtask 3.3: `src/widgets/` 폴더 생성
    - [x] Subtask 3.4: `src/features/` 폴더 생성
    - [x] Subtask 3.5: `src/entities/` 폴더 생성
    - [x] Subtask 3.6: `src/shared/` 폴더 구조 확인 (ui, lib, config, types 등)
    - [x] Subtask 3.7: 각 레이어에 `.gitkeep` 또는 기본 `index.ts` 파일 생성 (선택)

## Dev Notes

### Architecture Compliance

**프로젝트 구조 (FSD: Feature-Sliced Design):**

- **레이어 순서 (상→하):** `app → pages → widgets → features → entities → shared`
- **의존성 규칙:** 상위 레이어는 하위 레이어만 import 가능. 동일 레이어 슬라이스 간 import 금지
- **레이어 역할:**
    - `app/`: Next.js `src/app/` - 라우트, `layout.tsx`, `globals.css`, `api/`
    - `pages/`: `src/pages/<page>/ui.tsx` - 페이지 조합
    - `widgets/`: `src/widgets/<widget>/ui.tsx` - 복합 블록
    - `features/`: `src/features/<feature>/` - `ui.tsx`, `actions.ts`('use server'), `model.ts`
    - `entities/`: `src/entities/<entity>/` - `model.ts`, `api.ts`, `ui.tsx`(선택)
    - `shared/`: `src/shared/` - `ui/`, `lib/`, `api/`, `config/`, `types/`

**Source:** [Architecture: Structure Patterns (FSD)](_bmad-output/planning-artifacts/architecture.md#structure-patterns-fsd-feature-sliced-design)

### Technical Requirements

**Next.js 설정:**

- TypeScript strict 모드 유지
- App Router 사용 (Pages Router 사용 안 함)
- Turbopack 빌드 시스템
- `src/` 디렉터리 구조
- `@/*` import alias (`tsconfig.json`에서 `paths` 설정)

**Base UI 통합:**

- Base UI (MUI Base)는 헤드리스·접근성 기반 컴포넌트
- 스타일은 Tailwind CSS로 직접 적용 (Base UI 기본 스타일 제거)
- `shared/ui/`에 Base UI 래퍼 컴포넌트 생성
- 접근성(ARIA, 포커스)·구조·동작은 Base UI 제공, 시각은 Tailwind 제어

**Source:** [Architecture: UI Library](_bmad-output/planning-artifacts/architecture.md#ui-library-사용자-선언-base-ui)  
**Source:** [UX Design: Design System](_bmad-output/planning-artifacts/ux-design-specification.md#design-system-components-base-ui--tailwind)

### File Structure Requirements

**프로젝트 루트 구조:**

```
.
├── src/
│   ├── app/              # Next.js App Router (FSD app 레이어)
│   ├── pages/             # FSD pages 레이어
│   ├── widgets/           # FSD widgets 레이어
│   ├── features/           # FSD features 레이어
│   ├── entities/           # FSD entities 레이어
│   └── shared/             # FSD shared 레이어
│       ├── ui/             # Base UI 래퍼
│       ├── lib/            # 유틸리티, db, auth 등
│       ├── config/         # 설정 파일
│       └── types/           # 공용 타입
├── prisma/                 # Prisma 스키마 (다음 스토리에서 생성)
├── public/                  # 정적 에셋
├── next.config.*           # Next.js 설정
├── tailwind.config.*       # Tailwind 설정
├── tsconfig.json           # TypeScript 설정
└── package.json
```

**Source:** [Architecture: Project Structure](_bmad-output/planning-artifacts/architecture.md#project-structure--boundaries-fsd)

### Library & Framework Requirements

**필수 패키지:**

- `next`: Next.js (App Router, Turbopack)
- `react`, `react-dom`: React
- `typescript`: TypeScript
- `tailwindcss`: Tailwind CSS
- `@base-ui-components/react` (또는 최신 패키지명): Base UI

**버전 요구사항:**

- Node.js 20.9+
- TypeScript strict 모드
- Next.js 최신 안정 버전 (App Router 지원)

**Source:** [Project Context: Technology Stack](_bmad-output/project-context.md#technology-stack--versions)

### Testing Requirements

- 이 스토리에서는 테스트 프레임워크 설정은 포함하지 않음
- 테스트 프레임워크(Jest/Vitest)는 이후 스토리에서 결정
- 각 슬라이스의 `__tests__/` 또는 `*.test.ts(x)` 위치만 확인

**Source:** [Architecture: Testing Standards](_bmad-output/planning-artifacts/architecture.md#testing-standards)

### Project Structure Notes

**FSD 레이어 생성 시 주의사항:**

- `app/` 레이어는 `create-next-app`이 자동 생성하므로 확인만 필요
- 나머지 레이어(`pages/`, `widgets/`, `features/`, `entities/`, `shared/`)는 수동 생성
- 각 레이어는 빈 폴더로 시작해도 되며, 필요 시 `.gitkeep` 파일 추가
- `shared/ui/`는 Base UI 래퍼를 위한 필수 폴더

**Import 경로 규칙:**

- `@/` alias 사용 (`src/` 기준)
- FSD 의존성 규칙 엄수: 상위→하위만, 동일 레이어 슬라이스 간 import 금지

**Source:** [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

### Critical Don't-Miss Rules

**FSD 위반 금지:**

- `entities`가 `features`를 import 금지
- `shared`가 `entities`를 import 금지
- `widgets` 간 상호 import 금지

**Base UI 사용:**

- Base UI 기본 스타일 제거, Tailwind로 완전 제어
- 접근성(ARIA, 포커스)은 Base UI 기본 활용

**TypeScript:**

- `any` 타입 사용 금지
- strict 모드 유지

**Source:** [Project Context: Critical Don't-Miss Rules](_bmad-output/project-context.md#critical-dont-miss-rules)

### References

**Epic 및 스토리 정의:**

- [Epic 1: 프로젝트 기반 및 랜딩](_bmad-output/planning-artifacts/epics.md#epic-1-프로젝트-기반-및-랜딩)
- [Story 1.1: 프로젝트 초기화 및 Base UI·FSD 골격](_bmad-output/planning-artifacts/epics.md#story-11-프로젝트-초기화-및-base-uifsd-골격)

**아키텍처 결정:**

- [Architecture: Starter Template Evaluation](_bmad-output/planning-artifacts/architecture.md#starter-template-evaluation)
- [Architecture: Structure Patterns (FSD)](_bmad-output/planning-artifacts/architecture.md#structure-patterns-fsd-feature-sliced-design)
- [Architecture: Project Structure & Boundaries](_bmad-output/planning-artifacts/architecture.md#project-structure--boundaries-fsd)

**UX 설계:**

- [UX Design: Design System Components](_bmad-output/planning-artifacts/ux-design-specification.md#design-system-components-base-ui--tailwind)

**프로젝트 컨텍스트:**

- [Project Context: Technology Stack](_bmad-output/project-context.md#technology-stack--versions)
- [Project Context: Framework-Specific Rules](_bmad-output/project-context.md#framework-specific-rules)

## Dev Agent Record

### Agent Model Used

Auto (Cursor AI Agent)

### Debug Log References

N/A (초기 스토리)

### Completion Notes List

- Next.js 16.1.4 프로젝트 초기화 완료 (TypeScript, Tailwind, App Router, Turbopack, src/, @/\* alias)
- Base UI 패키지 `@base-ui/react` 설치 및 Button, Input 래퍼 컴포넌트 생성 완료
- FSD 폴더 구조 생성 완료 (app, pages, widgets, features, entities, shared)
- 모든 수락 기준(AC) 충족 확인
- 빌드 및 개발 서버 실행 확인 완료

### File List

**생성된 파일:**

- `package.json` - Next.js 프로젝트 의존성
- `package-lock.json` - 의존성 잠금 파일
- `tsconfig.json` - TypeScript 설정 (@/\* alias 포함)
- `next.config.ts` - Next.js 설정
- `next-env.d.ts` - Next.js 타입 정의
- `eslint.config.mjs` - ESLint 설정
- `postcss.config.mjs` - PostCSS 설정
- `.gitignore` - Git 무시 파일
- `src/app/layout.tsx` - 루트 레이아웃
- `src/app/page.tsx` - 홈 페이지
- `src/app/globals.css` - 전역 스타일
- `src/shared/ui/button.tsx` - Base UI Button 래퍼
- `src/shared/ui/input.tsx` - Base UI Input 래퍼
- `src/shared/ui/index.ts` - UI 컴포넌트 export
- `src/shared/lib/utils.ts` - 유틸리티 함수 (cn)

**생성된 폴더:**

- `src/app/` - Next.js App Router (FSD app 레이어)
- `src/pages/` - FSD pages 레이어
- `src/widgets/` - FSD widgets 레이어
- `src/features/` - FSD features 레이어
- `src/entities/` - FSD entities 레이어
- `src/shared/ui/` - Base UI 래퍼 컴포넌트
- `src/shared/lib/` - 공용 라이브러리
- `src/shared/config/` - 설정 파일
- `src/shared/types/` - 공용 타입
- `public/` - 정적 에셋
