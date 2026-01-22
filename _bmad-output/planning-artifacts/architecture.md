---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
    [
        '_bmad-output/planning-artifacts/prd.md',
        '_bmad-output/analysis/brainstorming-session-2026-01-21.md',
    ]
workflowType: 'architecture'
project_name: 'natalchart'
user_name: 'daun'
date: '2026-01-21'
lastStep: 8
status: 'complete'
completedAt: '2026-01-21'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

- **온보딩·입력 (6):** 생년월일·시간·장소 단계별 입력, "시간 모름" 옵션. 출생차트·해석 파이프라인 입력.
- **출생차트·해석 (6):** 생년월일·시간·장소 → 네이탈/출생차트 계산. 출생차트+주제 → LLM 요청 → 구조화 카드(심볼, 1~2문장, CTA). 14주제, 로딩/진행 상태, "시간 모름" 시 제한/근사 해석.
- **카드 표시·네비게이션 (5):** 한 화면 한 장, 심볼·핵심·CTA, [ 다음 카드 ]. 무료 4주제 순차, 해금된 유료 주제 열람.
- **무료/유료·접근 제어 (4):** 4주제 무료·10주제 유료, 미구독/미구매 시 잠금(자물쇠·블러), 구매/구독 기반 접근, 무료/유료 구분 UI.
- **결제·구독 (5):** 해금용 결제/구독, 결제·구독 플로우, 구매·구독 이력 저장·연결, 결제 후 해당 주제 해금, 주제/패키지 선택.
- **계정·세션·재방문 (4):** 세션/계정으로 방문 간 식별, 구매 이력 사용자 연계, 재방문 시 해금 주제 재열람, 결제/접근 시 로그인·계정 생성.
- **랜딩·SEO (2):** 랜딩(메인/온보딩), 메타·OG·공유 URL.

**Non-Functional Requirements:**

- **Performance:** LCP 2.5초, 카드 생성(출생차트+LLM+구조화) 목표 구간 내·로딩 UI, 카드 전환 1초 이내.
- **Security:** TLS, 출생정보·구매 이력 보호·접근 제어, LLM API 키·결제 비밀·서버 로직 클라이언트 비노출, 인증 사용자만 구매·해금 접근.
- **Accessibility:** 키보드 포커스, 터치 44×44px, (Growth) WCAG 2.1 AA.
- **Integration:** LLM·PG 장애 시 에러 안내·재시도.
- **Scalability:** MVP 1,000 DAU 수준에서 NFR-P1~P3 유지.

**Scale & Complexity:**

- Primary domain: **full-stack web** (Next.js SSR, API, LLM, 결제, 접근 제어)
- Complexity level: **low**
- Estimated architectural components: **8~10** (입력/온보딩 UI, 출생차트 계산, LLM 연동·파싱, 카드 생성·캐시, 무료/유료·접근 제어, 결제·구독, 계정·세션, 랜딩·SEO 등)

### Technical Constraints & Dependencies

- **Framework:** Next.js (App Router 또는 Pages Router). 랜딩·입력·OG는 SSR, 출생차트·LLM은 서버, 카드 전환·로딩은 클라이언트.
- **외부 연동:** LLM API(출생차트·주제 컨텍스트 입력, 구조화 응답), PG(결제·구독).
- **출생차트:** `circular-natal-horoscope-js`(천체·하우스·각도 계산), `@eaprelsky/nocturna-wheel`(원형 차트 시각화). "시간 모름" 시 기본값/제한 모드.
- **플랫폼:** 모바일 우선 반응형. iOS Safari·Android Chrome·데스크톱(Chrome, Safari, Edge) 최근 2버전.

### Cross-Cutting Concerns Identified

- **인증·권한:** 무료/유료 구간, 세션·계정, 구매 이력 기반 해금·재방문.
- **LLM 연동:** 에러·타임아웃·폴백, 응답 파싱·구조화, 비즈니스 로직·키 보호.
- **출생차트:** 정확도·검증, "시간 모름"·기본값 전략.
- **결제·PG:** 연동 방식, 장애·재시도, 구매 이력·해금 일관성.
- **모바일 우선·반응형:** 한 장 카드·입력 폼, 터치·접근성.

## Starter Template Evaluation

### Primary Technology Domain

**Full-stack web** (Next.js SSR, API, LLM·결제 연동, 접근 제어) — 프로젝트 맥락 분석 기반.

### Starter Options Considered

| 스타터                     | 핵심 구성                                                                   | 평가                                                                                             |
| -------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **create-next-app@latest** | Next.js, TypeScript, Tailwind, ESLint, App Router, Turbopack, `src/`, `@/*` | 공식 스타터. PRD 요구(Next.js·SSR·App Router)와 정합. DB·Auth는 Step 4에서 명시적 결정 가능.     |
| **create-t3-app**          | Next.js, TypeScript, Tailwind, (선택) tRPC, Prisma, NextAuth                | DB·인증 구조를 한 번에 제공. natalchart는 LLM·PG 위주라 tRPC 이득 제한적; Route Handlers로 충분. |

### Selected Starter: create-next-app@latest

**선정 이유:**

- PRD에 명시된 Next.js·App Router·SSR·모바일 우선과 직접 대응.
- 공식 스타터로 유지보수·문서·버전 관리가 안정적.
- DB(Prisma/Drizzle), 인증(NextAuth/Clerk), PG 연동을 Step 4 아키텍처 결정으로 분리해, 추적 가능한 ADR 유지.
- MVP에서 LLM·결제는 Route Handlers·Server Actions로 충분.

**초기화 명령:**

```bash
npx create-next-app@latest . --yes
```

(이미 `package.json` 등이 있으면, 상위 폴더에서 `npx create-next-app@latest natalchart --yes` 실행 후 `_bmad`·`_bmad-output` 등을 이전하는 방안 검토.)

**스타터가 정해 주는 아키텍처 결정:**

**Language & Runtime:** TypeScript 기본, Node 20.9+.

**Styling:** Tailwind CSS, 유틸리티 기반 반응형.

**Build:** Turbopack, `src/` 구조, `@/*` import alias.

**Testing:** 별도 프레임워크 미포함 → Step 4에서 Jest/Vitest 등 결정.

**Code organization:** App Router, `src/app/` 기반 라우팅·레이아웃.

**Development:** `next dev` (Turbopack), ESLint.

### UI Library (사용자 선언): Base UI

- **선택:** Base UI (MUI Base). 헤드리스·접근성 기반 컴포넌트.
- **역할:** 버튼, 입력, 모달, 탭 등 컴포넌트 구조·접근성·동작 제공; 스타일은 Tailwind로 직접 적용.
- **조합:** create-next-app의 Tailwind와 병행. PRD의 모바일 우선·한 장 카드·터치 44px·포커스 등은 Tailwind 유틸로 구현.
- **도입:** create-next-app 초기화 후 `@base-ui-components/react`(또는 최신 패키지명) 설치. 구체 패키지·버전은 Step 4 또는 구현 단계에서 확정.

**Note:** create-next-app으로 프로젝트 초기화하는 것을 첫 구현 스토리로 둔다. Base UI 추가는 해당 스토리 직후 또는 동일 스토리 내에서 진행.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (구현 전 필수):**

- Data: Prisma + PostgreSQL + Prisma Migrate, **캐시·Redis 미사용** (사용자 확정)
- Auth: NextAuth.js v4 (next-auth@4.x) + 세션·구매 이력 기반 접근 제어
- API: Route Handlers + Server Actions, REST, 공통 에러 형식(NFR-I1·I2)
- Frontend: Base UI(확정), URL+서버 상태, fetch
- Infrastructure: Vercel, Vercel Env, (선택) Sentry

**Important Decisions (아키텍처 형성):**

- DB: PostgreSQL. (MVP 한시적으로 SQLite 가능, 전환 경로 유지)
- 인가: 단순 세션 + 구매 이력. RBAC는 Growth로 연기.
- 속도 제한·고급 캐시: MVP 미적용. Redis 미사용.

**Deferred (Post-MVP):**

- Rate limiting, RBAC, WCAG 2.1 AA, PG 업체·테스트 프레임워크 구체화. (출생차트: `circular-natal-horoscope-js`, `@eaprelsky/nocturna-wheel` 확정)

### Data Architecture

- **ORM:** Prisma (6.x 또는 7.x). 구매 이력·계정·세션 스키마, Next.js와 조합.
- **DB:** PostgreSQL. (MVP에서만 SQLite 검토 가능, 프로덕션은 Postgres 권장.)
- **마이그레이션:** Prisma Migrate (`prisma migrate dev`).
- **캐시:** **미사용. Redis 사용 안 함(사용자 확정).** NFR-SC1 이슈 시 in-memory 등 단순 전략만 검토.

### Authentication & Security

- **인증:** NextAuth.js v4 (next-auth@4.x, 프로덕션 안정). OAuth·Credentials 등.
- **인가:** 세션 + 구매 이력 기반. 무료/유료·해금 판단. RBAC는 Growth.
- **비밀·API 키:** Vercel Env, 서버 전용. 클라이언트 비노출(NFR-S3).
- **전송·저장:** TLS(Vercel), DB at-rest(호스팅).

### API & Communication Patterns

- **내부:** Route Handlers(LLM·PG 웹훅·출생차트) + Server Actions(폼·카드 플로우).
- **대외:** REST. PG 웹훅 등.
- **에러:** 공통 JSON(`{ error, code, retry }` 등), NFR-I1·I2(재시도·안내).
- **Rate limiting:** MVP 미적용. Post-MVP 검토.

### Frontend Architecture

- **UI:** Base UI + Tailwind(이미 확정).
- **상태:** URL(카드 인덱스·입력 단계) + 서버 fetch. 전역 클라이언트 store·Zustand 등 MVP 미사용.
- **Data fetching:** fetch, Server Components·Route Handler. React Query/SWR는 필요 시 도입.
- **번들:** Turbopack(스타터).

### Infrastructure & Deployment

- **호스팅:** Vercel. TLS·CDN·env·프리뷰.
- **CI/CD:** Vercel Git 연동. 테스트·린트는 이후.
- **환경:** Vercel Env. 개발 `.env.local`.
- **모니터링:** Vercel 기본, (선택) Sentry. 상세 APM은 Growth.

### Decision Impact Analysis

**Implementation Sequence:**

1. create-next-app 초기화, Base UI·Tailwind
2. Prisma + PostgreSQL 세팅, 스키마(User, Session, Purchase 등), Migrate
3. NextAuth.js v4 설정, 세션·인가 연동
4. 출생차트·LLM Route Handlers, Server Actions(카드·입력)
5. PG·결제 연동, 웹훅·구매 이력
6. Vercel 배포, Env, (선택) Sentry

**Cross-Component Dependencies:**

- NextAuth ↔ Prisma(User, Session), 접근 제어 ↔ 구매 이력
- Route Handlers(LLM)·Server Actions ↔ 출생차트, 카드 생성·캐시 없음
- Vercel Env ↔ NextAuth, LLM, PG

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**  
이름(DB·API·코드), 폴더/파일 구조, API·에러 포맷, Server Action·로딩/에러 처리 등 — AI 에이전트가 다르게 구현할 수 있는 지점을 하나의 규칙으로 통일.

### Naming Patterns

**Database Naming (Prisma):**

- **테이블:** 복수, `snake_case` 또는 Prisma 기본 `camelCase` → `@@map("users")`로 DB명 매핑. 예: `users`, `purchases`, `sessions`.
- **컬럼:** Prisma 스키마는 `camelCase` (예: `userId`, `createdAt`). DB가 `snake_case`면 `@map("user_id")`.
- **관계·FK:** `userId`, `purchaseId` 등. 인덱스: `@@index([userId])` 또는 `idx_users_email` 등 팀 규칙.

**API Naming (Route Handlers, REST):**

- **경로:** `app/api/` 하위. 리소스 복수: `/api/cards`, `/api/purchases`. 동적: `[id]` — `/api/cards/[id]`.
- **쿼리·헤더:** `camelCase` (예: `topicId`, `X-Request-Id`는 kebab). JSON body/response: `camelCase`.

**Code Naming:**

- **컴포넌트·타입:** `PascalCase` — `CardView`, `OnboardingForm`, `NatalChartCard`.
- **함수·변수·훅:** `camelCase` — `getUnlockedTopics`, `userId`, `useSession`.
- **파일:** 컴포넌트 `PascalCase.tsx` (`CardView.tsx`). 훅·유틸 `camelCase.ts` (`useCard.ts`, `parseChart.ts`). `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`는 Next.js 관례 유지.
- **폴더:** `lowercase` 또는 `kebab-case`(복합어). FSD: `app/`, `pages/`, `widgets/`, `features/`, `entities/`, `shared/`, `prisma/`.

### Structure Patterns (FSD: Feature-Sliced Design)

**프로젝트는 FSD(Feature-Sliced Design)로 구성한다. 레이어 순(상→하): app → pages → widgets → features → entities → shared. 상위는 하위만 import. 동일 레이어 슬라이스 간 import 금지.**

**레이어:**

- **app** — Next.js `src/app/`: 라우트, `layout.tsx`, `globals.css`, `api/`. `page.tsx`는 `pages/` 위젯만 import.
- **pages** — `src/pages/<page>/ui.tsx`. 페이지 조합. `widgets/`, `features/`, `entities/` 사용.
- **widgets** — `src/widgets/<widget>/ui.tsx`. 복합 블록. `features/`, `entities/`, `shared/` 사용.
- **features** — `src/features/<feature>/`: `ui.tsx`, `actions.ts`('use server'), `model.ts`. 사용자 액션·인터랙션.
- **entities** — `src/entities/<entity>/`: `model.ts`(타입·도메인 로직), `api.ts`, `ui.tsx`(선택). 비즈니스 엔티티.
- **shared** — `src/shared/`: `ui/`(Base UI 래퍼), `lib/`(db, auth, chart, llm, utils), `api/`(fetch 등), `config/`, `types/`. 재사용, 비즈니스 무관.

**세그먼트 (슬라이스 내):** `ui`, `model`, `api`, `lib` 등 필요한 것만. `index.ts`로 외부에 공개.

**기타:**

- `prisma/` — 루트. `schema.prisma`, `migrations/`. `shared/lib/db.ts`에서 Prisma client.
- **테스트:** 각 슬라이스 안 `__tests__/` 또는 `*.test.ts(x)`.
- **설정:** 루트 `next.config.*`, `tailwind.config.*`, `tsconfig.json`, `.env*`. `public/`: 정적 에셋.

### Format Patterns

**API Response Formats:**

- **에러 (Step 4 확정):** `{ error: string, code?: string, retry?: boolean }`. HTTP 4xx/5xx. NFR-I1·I2: 재시도 가능 시 `retry: true`와 사용자 메시지.
- **성공:** 본문 직접 (예: `Card[]`) 또는 `{ data: T }`. 팀이 `{ data }`로 통일해도 됨.
- **날짜:** ISO 8601 문자열 (`createdAt` 등). 타임스탬프 숫자 사용 시 문서에 명시.

**Data Exchange (JSON, Prisma → API → Client):**

- **필드:** `camelCase`. DB `snake_case`는 Prisma·`@map`으로 변환.
- **불리언:** `true`/`false`. `null` vs 생략: optional은 생략 또는 `null` 중 하나로 통일(팀 규칙).

### Communication Patterns

**Event System:**  
MVP에 이벤트 버스·Pub/Sub 없음. PG 웹훅 등 외부 이벤트는 Route Handler `POST /api/webhooks/...`로 수신, 페이로드는 PG 스펙 따름.

**State (URL + Server):**

- **URL:** 카드 인덱스·입력 단계는 `?step=2`, `?card=3` 또는 `/onboarding/2`, `/cards/3` 등. 쿼리/세그먼트 명칭 팀 통일.
- **Server state:** `fetch`·Server Components. 클라이언트 캐시 키 등은 `[route, query]` 조합으로 일관되게.

**Server Actions:**

- **이름:** 동사·목적 명확 — `submitOnboarding`, `unlockTopics`, `createSession`. `get*`는 가급적 조회(Server Component·Route Handler)로.
- **파일:** FSD `features/<name>/actions.ts`. `'use server'` 상단.

### Process Patterns

**Error Handling:**

- **Route Handlers:** `try/catch` → `NextResponse.json({ error, code, retry }, { status })`. 로그는 `console.error` 또는 (선택) Sentry. 사용자 메시지는 `error`에, 상세는 로그만.
- **Server Actions:** `revalidatePath` 등 후 `redirect` 또는 `{ error, code, retry }` 반환. 폼은 `useActionState` 등으로 `error` 표시.
- **UI:** `error.tsx`, `ErrorBoundary`(필요 시). 메시지: `error` 필드 또는 코드별 맵.

**Loading States:**

- **이름:** `isLoading` 또는 `status: 'idle'|'loading'|'error'|'success'` 중 하나로 통일.
- **위치:** 로컬(버튼·폼·카드 영역). 전역 로딩 bar는 (선택).
- **UI:** `loading.tsx`(라우트), 스피너·스켈레톤. NFR-P2: 카드 생성 시 "진행 중" 표시 의무.

### Enforcement Guidelines

**All AI Agents MUST:**

- DB·API·코드 네이밍을 위 규칙에 맞춘다.
- 에러 응답은 `{ error, code?, retry? }`를 사용한다.
- Server Actions는 `'use server'`, 동사·목적 중심 이름, FSD `features/<name>/actions.ts`에 둔다.
- `loading.tsx`, `error.tsx`를 라우트 단위로 두고, NFR-P2·에러 안내를 만족한다.
- **FSD 의존성:** 상위 레이어 → 하위만. 동일 레이어 슬라이스 간 import 금지. `shared`는 `entities` 이하에서만 import.

**Pattern Enforcement:**

- ESLint·TypeScript로 이름·import 경로·FSD 위반 검사. `shared/lib`·Prisma singleton 등 규칙은 PR·아키텍처 문서로 검토.
- 패턴 위반·예외는 `architecture.md` 또는 ADR에 "예외: …" 형태로 기록.

### Pattern Examples

**Good Examples:**

- `src/app/api/cards/route.ts` → `GET /api/cards`, `POST /api/cards`. 응답 `Card[]` 또는 `{ data: Card[] }`, 에러 `{ error, code, retry }`.
- FSD: `src/widgets/card-viewer/ui.tsx`, `src/entities/card/model.ts`, `src/features/onboarding/actions.ts`, `src/shared/lib/chart/parseChart.ts`, `prisma/schema.prisma`.
- Server Action: `src/features/onboarding/actions.ts` — `export async function submitOnboarding(form: FormData) { 'use server'; ... }`.

**Anti-Patterns:**

- `user_id` in JSON (→ `userId`), `GET /api/card` (→ `/api/cards`), 컴포넌트 파일 `card-view.tsx` (→ `CardView.tsx`).
- 에러 시 `{ message }`만 사용 (→ `error` 필드 포함). Server Action에 `'use server'` 누락.
- `shared/lib/db.ts`에서 요청마다 `new PrismaClient()` (→ singleton `globalThis` 패턴).
- **FSD 위반:** `entities`가 `features`를 import, `shared`가 `entities`를 import, `widgets` 간 상호 import.

---

## Project Structure & Boundaries (FSD)

### FSD 레이어 및 의존성

- **순서 (위→아래):** `app` → `pages` → `widgets` → `features` → `entities` → `shared`
- **규칙:** 상위 레이어만 하위를 import. 같은 레이어 내 다른 슬라이스 간 import 금지. `shared`는 어디서든 사용, `shared`는 `entities` 이상을 import하지 않음.
- **유지보수:** 슬라이스 추가·변경이 레이어 경계를 지키면 다른 슬라이스 영향 최소화. 도메인(온보딩·카드·결제·접근)별로 `features`·`entities` 분리.

### Complete Project Directory Structure

```
natalchart/
├── _bmad/                      # (기존) BMad 메서드
├── _bmad-output/               # (기존) 산출물
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── .env.local                  # (gitignore)
├── .gitignore
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│   ├── favicon.ico
│   └── (og, assets)
│
└── src/
    ├── app/                          # FSD app = Next.js 라우팅
    │   ├── layout.tsx                # providers, 폰트, globals
    │   ├── globals.css
    │   ├── (marketing)/
    │   │   └── page.tsx              # → pages/landing
    │   ├── onboarding/
    │   │   ├── page.tsx              # → pages/onboarding
    │   │   ├── loading.tsx
    │   │   └── error.tsx
    │   ├── cards/
    │   │   ├── page.tsx              # → pages/cards
    │   │   ├── loading.tsx
    │   │   └── error.tsx
    │   ├── payment/
    │   │   ├── page.tsx              # → pages/payment
    │   │   └── error.tsx
    │   └── api/
    │       ├── cards/
    │       │   ├── route.ts          # GET, POST
    │       │   └── [id]/route.ts
    │       ├── chart/
    │       │   └── route.ts          # POST 출생차트 계산
    │       ├── webhooks/
    │       │   └── payment/
    │       │       └── route.ts      # PG 웹훅
    │       └── auth/
    │           └── [...nextauth]/
    │               └── route.ts
    │
    ├── pages/                        # FSD pages
    │   ├── landing/
    │   │   └── ui.tsx
    │   ├── onboarding/
    │   │   └── ui.tsx
    │   ├── cards/
    │   │   └── ui.tsx
    │   └── payment/
    │       └── ui.tsx
    │
    ├── widgets/                      # FSD widgets
    │   ├── onboarding-steps/
    │   │   └── ui.tsx
    │   ├── card-viewer/
    │   │   └── ui.tsx                # 한 장 카드 + [ 다음 카드 ]
    │   ├── locked-topic-list/
    │   │   └── ui.tsx                # 유료 잠금 목록, CTA
    │   ├── payment-form/
    │   │   └── ui.tsx
    │   └── header/
    │       └── ui.tsx                # 로그인/계정
    │
    ├── features/                     # FSD features
    │   ├── onboarding/
    │   │   ├── ui.tsx                # (선택) 폼 조각
    │   │   └── actions.ts            # submitOnboarding
    │   ├── cards/
    │   │   ├── ui.tsx                # NextCard, Unlock CTA
    │   │   └── actions.ts            # (선택) fetchCards 등
    │   ├── auth/
    │   │   └── ui.tsx                # SignIn, SignOut
    │   ├── payment/
    │   │   ├── ui.tsx                # Checkout, 패키지 선택
    │   │   └── actions.ts            # createCheckout 등
    │   └── access/
    │       └── model.ts              # canViewTopic, getUnlockedTopics
    │
    ├── entities/                     # FSD entities
    │   ├── user/
    │   │   └── model.ts              # 타입, getCurrentUser
    │   ├── card/
    │   │   ├── model.ts              # Card 타입
    │   │   └── ui.tsx                # CardContent (심볼+문장+CTA)
    │   ├── topic/
    │   │   └── model.ts              # Topic, FREE_TOPICS, PAID_TOPICS
    │   ├── natal-chart/
    │   │   └── model.ts              # 타입 (계산은 shared/lib/chart)
    │   ├── purchase/
    │   │   ├── model.ts              # 타입
    │   │   └── api.ts                # listByUser 등 (또는 shared/lib)
    │   └── session/
    │       └── model.ts              # Session 타입 (NextAuth)
    │
    └── shared/                       # FSD shared
        ├── ui/                       # Base UI 래퍼
        │   ├── Button/
        │   ├── Input/
        │   └── (Modal, Tabs, ...)
        ├── lib/
        │   ├── db.ts                 # Prisma singleton
        │   ├── auth.ts               # NextAuth 옵션·헬퍼
        │   ├── chart/                # 출생차트 계산
        │   ├── llm/                  # LLM 호출·파싱
        │   └── utils.ts
        ├── api/
        │   └── client.ts             # fetch 래퍼, 공통 헤더
        ├── config/
        │   ├── topics.ts             # 주제 ID, 무료/유료
        │   └── env.ts                # env 스키마
        └── types/                    # 공용 타입 (또는 entities에)
```

### Architectural Boundaries

**API:** `src/app/api/*` Route Handlers. `shared/lib`, `entities/*/api`, `features/*/actions`만 사용. 외부: LLM, PG 웹훅.

**Components:** `app` → `pages` → `widgets` → `features` → `entities` → `shared`. `shared/ui`는 `shared/lib`·`shared/config`만.

**Data:** Prisma는 `shared/lib/db.ts`. `entities/purchase`, `entities/user` 등에서 db 호출하거나 `shared/lib`에 서비스 함수 두기. Route Handlers·Actions는 `shared/lib`·`entities` 통해 접근.

### Requirements to Structure Mapping

| FR 영역                    | pages          | widgets           | features        | entities                 | app/api                 |
| -------------------------- | -------------- | ----------------- | --------------- | ------------------------ | ----------------------- |
| 온보딩·입력 (FR1–6)        | onboarding     | onboarding-steps  | onboarding      | user, natal-chart, topic | —                       |
| 출생차트·해석 (FR7–12)     | cards          | card-viewer       | cards           | card, natal-chart, topic | /api/cards, /api/chart  |
| 카드 표시·네비 (FR13–17)   | cards          | card-viewer       | cards, access   | card, topic              | /api/cards              |
| 무료/유료·접근 (FR18–21)   | cards, payment | locked-topic-list | access, payment | topic, purchase          | —                       |
| 결제·구독 (FR22–26)        | payment        | payment-form      | payment         | purchase                 | /api/webhooks/payment   |
| 계정·세션·재방문 (FR27–30) | (전체)         | header            | auth            | user, session            | /api/auth/[...nextauth] |
| 랜딩·SEO (FR31–32)         | landing        | —                 | —               | —                        | layout, metadata        |

### Integration Points

**내부:** `page.tsx` → `pages/*/ui` → `widgets/*` → `features/*`, `entities/*` → `shared/*`. Route Handlers·Actions는 `shared/lib`, `entities` 호출.

**외부:** LLM(`shared/lib/llm`), PG(`/api/webhooks/payment` → `shared/lib` 또는 `entities/purchase`), NextAuth(`shared/lib/auth`, `/api/auth/[...nextauth]`).

**Data flow:** 온보딩(폼) → `submitOnboarding` → 세션/저장 → ` /api/chart`+`/api/cards` → 카드 뷰. 결제 → 웹훅 → `purchase` 생성 → `access`에서 해금 판단.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**  
Next.js, Prisma, NextAuth v4, Base UI, Vercel, PostgreSQL, Redis 미사용, Route Handlers+Server Actions가 서로 충돌 없이 조합됨. Prisma 6/7, NextAuth 4 버전 호환.

**Pattern Consistency:**  
FSD 레이어·의존성, DB/API/코드 네이밍, 에러 `{ error, code, retry }`, Server Actions in `features/*/actions.ts`, `loading.tsx`/`error.tsx`가 스택·결정과 정합.

**Structure Alignment:**  
FSD 트리와 `app`/`pages`/`widgets`/`features`/`entities`/`shared`가 온보딩·카드·결제·접근·인증·랜딩을 수용. API·컴포넌트·데이터 경계와 연동점이 정의됨.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**  
7개 FR 영역(온보딩, 출생차트·해석, 카드·네비, 무료/유료, 결제, 계정·세션, 랜딩·SEO) 모두 FR–Structure 매핑으로 pages/widgets/features/entities/app/api에 대응.

**Non-Functional Requirements Coverage:**

- Performance: `loading.tsx`, NFR-P2, Turbopack.
- Security: NextAuth, Vercel Env, TLS, 서버 전용 로직.
- Accessibility: Base UI, 터치 44px, Process 패턴.
- Integration: `{ error, code, retry }`, NFR-I1·I2.
- Scalability: 1,000 DAU, Redis 미사용, 현재 구조로 확장 가능.

### Implementation Readiness Validation ✅

**Decision Completeness:** 기술·버전·Deferred가 문서화됨.  
**Structure Completeness:** 디렉터리 트리, FR 매핑, 경계, 연동·데이터 플로우 기술.  
**Pattern Completeness:** 네이밍·FSD·포맷·통신·에러/로딩·Enforcement·예시·안티패턴 기술.

### Gap Analysis Results

**Critical:** 없음. 출생차트 라이브러리·PG·Base UI 패키지명은 구현 단계로 연기.

**Important:**

- NextAuth `middleware.ts`: 트리에는 없음. 구현 시 `src/middleware.ts` 추가 권장.
- `shared/config/topics.ts`의 14주제·무료/유료 구체 목록: 구현 시 확정.

**Nice-to-Have:** FSD/import 경계용 ESLint, `@/shared` 등 path alias 세분화.

### Validation Issues Addressed

- Critical 이슈 없음.
- Important: NextAuth middleware, topics 구체 목록 — 구현 시 반영 대상으로 인지.

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] 프로젝트 맥락, 규모·복잡도, 제약, 교차 관심사

**✅ Architectural Decisions**

- [x] 핵심 결정·버전, 스택, 연동·성능

**✅ Implementation Patterns**

- [x] 네이밍, FSD 구조, 포맷, 통신, 에러/로딩

**✅ Project Structure**

- [x] FSD 디렉터리, 경계, FR 매핑, 연동·데이터 플로우

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** high — 결정·패턴·구조·FR·NFR이 정리되어 있고, 막히는 Gap은 없음.

**Key Strengths:**

- FSD로 도메인·레이어 분리, 유지보수·확장에 유리.
- 스택(Next.js, Prisma, NextAuth, Base UI, Vercel)이 PRD·NFR과 잘 맞음.
- 에러·로딩·Server Actions·FSD 의존성 등 일관된 패턴.
- FR–Structure 매핑으로 구현 추적 용이.

**Areas for Future Enhancement:**

- 출생차트 라이브러리·PG·테스트·WCAG AA 등 Deferred 항목.
- NextAuth middleware, topics 설정, (선택) FSD/ESLint·path alias.

### Implementation Handoff

**AI Agent Guidelines:**

- 문서의 아키텍처 결정·패턴·FSD 구조를 그대로 따를 것.
- `{ error, code, retry }`, `features/*/actions.ts`, FSD 의존성 엄수.
- 구조·경계·FR 매핑을 참고해 작업.

**First Implementation Priority:**  
`npx create-next-app@latest . --yes` 실행 후 Base UI·Prisma·NextAuth·FSD `src/` 골격(`pages`, `widgets`, `features`, `entities`, `shared`) 생성.

---

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅  
**Total Steps Completed:** 8  
**Date Completed:** 2026-01-21  
**Document Location:** \_bmad-output/planning-artifacts/architecture.md

### Final Architecture Deliverables

**📋 Complete Architecture Document**

- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency (FSD, naming, format, error/loading)
- Complete project structure with all files and directories (FSD)
- Requirements to architecture mapping (7 FR 영역, NFR)
- Validation confirming coherence and completeness

**🏗️ Implementation Ready Foundation**

- 7+ architectural decision areas (Data, Auth, API, Frontend, Infra, Starter, UI)
- 6+ implementation pattern categories (Naming, FSD, Format, Communication, Process, Enforcement)
- FSD 기반 20+ 슬라이스 (pages 4, widgets 5, features 5, entities 6, shared)
- 32 FR + 5 NFR 그룹 fully supported

**📚 AI Agent Implementation Guide**

- Technology stack with verified versions (Next.js, Prisma, NextAuth v4, Base UI, Vercel)
- Consistency rules that prevent implementation conflicts (FSD 의존성, `{ error, code, retry }`)
- Project structure with clear boundaries
- Integration patterns and communication standards

### Implementation Handoff

**For AI Agents:**  
This architecture document is your complete guide for implementing **natalchart**. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**

```bash
npx create-next-app@latest . --yes
```

이후 Base UI, Prisma, NextAuth 도입 및 FSD `src/` 골격(pages, widgets, features, entities, shared) 생성.

**Development Sequence:**

1. Initialize project using documented starter template
2. Set up development environment per architecture (Prisma, NextAuth, Base UI, FSD)
3. Implement core architectural foundations (shared/lib, entities, app/api)
4. Build features following established patterns (features, widgets, pages)
5. Maintain consistency with documented rules (FSD, naming, error/loading)

### Quality Assurance Checklist

**✅ Architecture Coherence**

- [x] All decisions work together without conflicts
- [x] Technology choices are compatible
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**✅ Requirements Coverage**

- [x] All functional requirements are supported
- [x] All non-functional requirements are addressed
- [x] Cross-cutting concerns are handled
- [x] Integration points are defined

**✅ Implementation Readiness**

- [x] Decisions are specific and actionable
- [x] Patterns prevent agent conflicts
- [x] Structure is complete and unambiguous
- [x] Examples are provided for clarity

### Project Success Factors

**🎯 Clear Decision Framework**  
Every technology choice was made collaboratively with clear rationale.

**🔧 Consistency Guarantee**  
FSD, naming, `{ error, code, retry }`, Server Actions in `features/*/actions.ts` ensure consistent implementation.

**📋 Complete Coverage**  
All 32 FR + 5 NFR groups are architecturally supported, with FR–Structure mapping.

**🏗️ Solid Foundation**  
create-next-app, Base UI, Prisma, NextAuth, Vercel, FSD provide a production-ready foundation.

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

**Document Maintenance:** Update this architecture when major technical decisions are made during implementation.
