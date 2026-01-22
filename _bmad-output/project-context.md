---
project_name: 'natalchart'
user_name: 'daun'
date: '2026-01-21'
sections_completed:
    - technology_stack
    - language_rules
    - framework_rules
    - testing_rules
    - quality_rules
    - workflow_rules
    - anti_patterns
status: 'complete'
rule_count: 28
optimized_for_llm: true
---

# Project Context for AI Agents

_이 파일은 AI 에이전트가 구현 시 반드시 따라야 할 규칙과 패턴을 담습니다. 에이전트가 놓치기 쉬운, 덜 obvious한 내용에 초점을 둡니다._

---

## Technology Stack & Versions

- **Runtime:** Node 20.9+, TypeScript
- **Framework:** Next.js (App Router, Turbopack, `src/`, `@/*`)
- **UI:** Base UI (MUI Base) + Tailwind CSS
- **DB:** Prisma (6.x 또는 7.x) + PostgreSQL (MVP에서 SQLite 허용)
- **Auth:** NextAuth.js v4 (`next-auth@4.x`)
- **Hosting:** Vercel, Vercel Env
- **캐시:** 미사용 (Redis 사용 안 함)

**네이탈 차트 (사용자 확정):**

- **`circular-natal-horoscope-js`** — 천체 위치, 하우스, 각도, 별자리 계산. 생년월일·시간·위치 → `Origin`+`Horoscope`. **위치:** `shared/lib/chart`. 서버/라우트에서 사용. `Origin`의 `month`는 0=1월, 11=12월.
- **`@eaprelsky/nocturna-wheel`** — 원형 차트 SVG 렌더. `WheelChart`에 `planets`, `houses` 등 점성술 데이터 전달. **위치:** 차트를 그리는 클라이언트 컴포넌트 (`widgets` 또는 `entities/natal-chart/ui`). `circular-natal-horoscope-js` 결과를 nocturna-wheel 형식(`planets: { sun: { lon }, ... }`, `houses: [ { lon }, ... ]`)으로 변환해 전달.

## Critical Implementation Rules

### Language-Specific Rules

- **TypeScript:** strict 모드 유지. `any` 회피. 공용 타입은 `shared/types` 또는 `entities/<name>/model`.
- **Import:** `@/` alias (`src/` 기준). FSD: 상위→하위만. 동일 레이어 슬라이스 간 import 금지.
- **에러:** `try/catch` 후 API는 `NextResponse.json({ error, code, retry }, { status })`. `{ message }`만 쓰지 말 것.

### Framework-Specific Rules

- **Next.js:** App Router만. `page.tsx`는 `pages/*/ui` 등만 import. Route Handlers: `app/api/**/route.ts`. Server Actions: `features/<name>/actions.ts`, 파일 최상단 `'use server'`.
- **FSD:** `app → pages → widgets → features → entities → shared`. `shared`는 `entities` 이상을 import하지 않음.
- **상태:** URL(카드 인덱스·입력 단계) + 서버 fetch. 전역 클라이언트 store(Zustand 등) MVP 미사용.
- **출생차트:** 계산은 `shared/lib/chart`에서 `circular-natal-horoscope-js`. 시각화는 클라이언트에서 `@eaprelsky/nocturna-wheel` (DOM 필요). “시간 모름” 시 `Origin` 기본값(예: 12:00) 또는 제한 모드.

### Testing Rules

- **위치:** 각 슬라이스 `__tests__/` 또는 `*.test.ts(x)`.
- **이름:** `*.test.ts`, `*.spec.ts`. Jest/Vitest는 구현 단계에서 확정.

### Code Quality & Style Rules

- **네이밍:** DB/Prisma `camelCase`, 테이블 복수. API 경로 복수 `/api/cards`. 컴포넌트/타입 `PascalCase`, 함수/변수 `camelCase`. 폴더 `lowercase`/`kebab-case`.
- **에러 형식:** `{ error: string, code?: string, retry?: boolean }`. JSON 필드 `camelCase`, 날짜 ISO 8601.
- **로딩:** `isLoading` 또는 `status: 'idle'|'loading'|'error'|'success'` 중 하나로 통일. `loading.tsx`, `error.tsx` 라우트 단위.
- **Prisma:** `shared/lib/db.ts`에서 singleton (`globalThis` 패턴). 요청마다 `new PrismaClient()` 금지.

### Development Workflow Rules

- (선택) Git/PR 규칙은 팀 정할 때 추가. 배포: Vercel Git 연동.

### Critical Don't-Miss Rules

- **FSD 위반:** `entities`→`features`, `shared`→`entities` import, `widgets` 간 상호 import 금지.
- **에러:** `{ message }`만 반환 금지 → `error` 필드 포함.
- **Prisma:** 요청마다 `new PrismaClient()` 금지.
- **Redis:** 사용 안 함. 캐시 도입 시 in-memory 등만 검토.
- **circular-natal-horoscope-js:** `Origin.month` 0-based. “시간 모름” 처리 시 기본값·제한 모드 문서화.
- **nocturna-wheel:** DOM/클라이언트 전제. Server Component에서 직접 사용 금지; `'use client'` 또는 동적 import.

---

## Usage Guidelines

**For AI Agents:**

- 구현 전 이 파일을 읽을 것.
- 문서된 규칙을 그대로 따를 것.
- 애매하면 더 제한적인 쪽을 선택.
- 새 패턴이 생기면 이 파일을 갱신.

**For Humans:**

- 에이전트용으로만 간결하게 유지.
- 스택·패턴 변경 시 반영.
- 주기적으로 검토해 뻔한 규칙은 정리.

Last Updated: 2026-01-21
