---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ["_bmad-output/planning-artifacts/prd.md", "_bmad-output/planning-artifacts/architecture.md", "_bmad-output/planning-artifacts/ux-design-specification.md"]
---

# natalchart - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for natalchart, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**1. 온보딩·입력 (Onboarding & Input)**
- FR1: 사용자는 생년월일을 입력할 수 있다.
- FR2: 사용자는 출생 시간을 입력할 수 있다.
- FR3: 사용자는 출생 시간을 모른다는 것을 선택할 수 있다.
- FR4: 사용자는 출생 장소를 입력할 수 있다.
- FR5: 사용자는 입력 단계를 한 번에 하나씩 진행할 수 있다.
- FR6: 시스템은 입력된 출생 정보를 출생차트 계산 및 해석 생성에 사용할 수 있다.

**2. 출생차트·해석 생성 (Chart & Interpretation)**
- FR7: 시스템은 생년월일·시간·장소로 출생(네이탈) 차트를 계산할 수 있다.
- FR8: 시스템은 출생차트와 주제 컨텍스트를 LLM에 전달해 해석을 요청할 수 있다.
- FR9: 시스템은 LLM 응답을 구조화된 카드 형식(심볼, 1~2문장, CTA)으로 변환할 수 있다.
- FR10: 시스템은 14개 주제 각각에 대해 한 장 카드 해석을 생성할 수 있다.
- FR11: 사용자는 카드 생성·LLM 호출 대기 중 로딩·진행 상태를 인지할 수 있다.
- FR12: 시스템은 출생 시간을 모를 때 제한된 또는 근사 해석을 제공할 수 있다.

**3. 카드 표시·네비게이션 (Card Display & Navigation)**
- FR13: 사용자는 한 번에 한 장의 카드만 볼 수 있다.
- FR14: 사용자는 각 카드에서 심볼, 핵심 1~2문장, CTA를 볼 수 있다.
- FR15: 사용자는 다음 카드로 이동할 수 있다(예: [ 다음 카드 ]).
- FR16: 사용자는 무료 4주제 카드를 순서대로 볼 수 있다.
- FR17: 사용자는 해금된 유료 주제 카드를 볼 수 있다.

**4. 무료/유료·접근 제어 (Access Control)**
- FR18: 시스템은 4개 무료 주제를 결제 없이 노출할 수 있다.
- FR19: 시스템은 미구독·미구매 시 10개 유료 주제를 잠금(자물쇠·블러 등) 상태로 노출할 수 있다.
- FR20: 시스템은 구매·구독 여부에 따라 유료 주제 카드 접근을 제한할 수 있다.
- FR21: 사용자는 어떤 주제가 무료이고 어떤 주제가 유료(잠금)인지 구분할 수 있다.

**5. 결제·구독 (Payment & Subscription)**
- FR22: 사용자는 유료 주제 해금을 위해 결제 또는 구독을 시작할 수 있다.
- FR23: 사용자는 결제 또는 구독 플로우를 완료할 수 있다.
- FR24: 시스템은 구매·구독 이력을 기록하고 사용자와 연결할 수 있다.
- FR25: 시스템은 결제 완료 후 해당 유료 주제(들)를 해금할 수 있다.
- FR26: 사용자는 결제·구독으로 해금할 유료 주제 또는 패키지를 선택할 수 있다.

**6. 계정·세션·재방문 (Account, Session & Revisit)**
- FR27: 사용자는 방문 간에 식별 가능한 세션 또는 계정을 가질 수 있다.
- FR28: 시스템은 구매 이력을 사용자와 연결해 보관할 수 있다.
- FR29: 사용자는 재방문 시 이전에 해금한 유료 주제 카드를 다시 볼 수 있다.
- FR30: 사용자는 결제 또는 접근 유지가 필요할 때 로그인하거나 계정을 만들 수 있다.

**7. 랜딩·SEO (Landing & SEO)**
- FR31: 사용자는 서비스 진입을 위한 랜딩(메인/온보딩) 페이지에 도달할 수 있다.
- FR32: 시스템은 랜딩 및 핵심 페이지에 메타·OG 태그를 제공해 SEO 및 SNS 공유 미리보기를 지원할 수 있다.

### NonFunctional Requirements

**Performance**
- NFR-P1: 랜딩·입력 첫 화면은 LCP 2.5초 이내(또는 목표치)에 사용 가능해야 한다.
- NFR-P2: 카드 생성 요청(출생차트 계산·LLM 호출·구조화) 후, 사용자가 카드를 볼 수 있을 때까지 목표치 이내(예: 15초 이내)여야 하며, 그 전까지 로딩·진행 상태를 보여줘야 한다.
- NFR-P3: 카드 간 전환([ 다음 카드 ])은 1초 이내에 반영되어야 한다.

**Security**
- NFR-S1: 출생 정보(생년월일·시간·장소)는 전송 시(TLS 등) 암호화되어야 한다.
- NFR-S2: 출생 정보·구매 이력은 인증된 사용자 본인이 조회·확인할 수 있어야 한다. 저장·전송 시 권한 없는 제3자 접근을 막기 위한 보안 조치(접근 제어, 전송 암호화 등)를 적용해야 한다.
- NFR-S3: LLM API 키·결제 관련 비밀·서버 전용 로직은 클라이언트에 노출되지 않아야 한다.
- NFR-S4: 인증된 사용자만 해당 사용자의 구매 이력·해금 주제에 접근할 수 있어야 한다.

**Accessibility**
- NFR-A1: 입력 필드·카드·CTA는 키보드 포커스로 조작 가능해야 한다.
- NFR-A2: 터치 타겟(버튼·[ 다음 카드 ] 등)은 44×44px 이상이어야 한다.
- NFR-A3: (Growth) WCAG 2.1 AA 준수를 목표로 한다. MVP에서는 포커스·대비·터치 영역만 필수.

**Integration**
- NFR-I1: LLM API 장애·타임아웃 시 사용자에게 에러 안내 또는 재시도 옵션을 제공해야 한다.
- NFR-I2: 결제 연동(PG) 장애 시 결제 플로우에서 명확한 안내와, 가능하면 재시도 경로를 제공해야 한다.

**Scalability**
- NFR-SC1: (MVP) 동시 접속·일 사용자 수가 초기 목표 규모(예: 1,000 DAU)일 때, NFR-P1·P2·P3가 유지되어야 한다. 구체 용량·한도는 아키텍처 단계에서 정의.

### Additional Requirements

**From Architecture**
- **Starter (Epic 1 Story 1):** `npx create-next-app@latest . --yes`로 프로젝트 초기화. 그 직후 또는 동일 스토리 내 Base UI(`@base-ui-components/react` 등) 설치. TypeScript, Tailwind, App Router, Turbopack, `src/`, `@/*`.
- **Data:** Prisma + PostgreSQL + Prisma Migrate. Redis 미사용. `prisma/schema.prisma`, `shared/lib/db.ts`(Prisma singleton). User, Session, Purchase 등 스키마.
- **Auth:** NextAuth.js v4 (next-auth@4.x). OAuth·Credentials. 세션·구매 이력 기반 인가. `/api/auth/[...nextauth]`. `shared/lib/auth.ts`. (구현 시) `src/middleware.ts` NextAuth middleware.
- **API:** Route Handlers(`/api/cards`, `/api/chart`, `/api/webhooks/payment`) + Server Actions(`features/*/actions.ts`, `'use server'`). 에러 응답 `{ error, code?, retry? }`. NFR-I1·I2: 재시도 가능 시 `retry: true`.
- **FSD:** app → pages → widgets → features → entities → shared. 상위→하위만 import. 동일 레이어 슬라이스 간 import 금지. `loading.tsx`, `error.tsx` 라우트 단위.
- **출생차트:** `circular-natal-horoscope-js`, `@eaprelsky/nocturna-wheel`. "시간 모름" 시 기본값/제한 모드.
- **Config:** `shared/config/topics.ts` 14주제·무료 4/유료 10 목록.
- **Infra:** Vercel, Vercel Env. (선택) Sentry.

**From UX Design**
- **반응형:** 모바일 우선. 320~767 / 768~1023 / 1024+ px. 카드·입력은 스크롤 없이 한 화면. Tailwind breakpoints.
- **접근성:** 터치 44×44px, 키보드 포커스, 대비 4.5:1(MVP). Base UI ARIA·시맨틱. Growth: WCAG 2.1 AA.
- **브라우저:** iOS Safari, Android Chrome, Chrome, Safari, Edge 최근 2버전.
- **컴포넌트:** NatalCard(심볼+문장+CTA, default/loading/locked), OnboardingStep(생년월일/시간/장소, "모름" 선택), LockedTopicCard/List(블러·자물쇠, "해금이 필요해요"+CTA), ProgressIndicator(1/4 등), LoadingCard/ChartLoading(스피너·진행 문구). `shared/ui` Base UI 래퍼.
- **인터랙션:** 스텝당 한 입력, [ 다음 카드 ] CTA, 잠금 카드·로딩/에러(스피너·retry). 에러·지연 시 `{ error, retry }` 노출.
- **시각:** Tailwind `theme` 확장(색·타이포·간격). 밝은·현대적 톤. Design Direction: 가이드+진행감(1/4 등).

### FR Coverage Map

- FR1: Epic 2 — 생년월일 입력
- FR2: Epic 2 — 출생 시간 입력
- FR3: Epic 2 — 출생 시간 "모름" 선택
- FR4: Epic 2 — 출생 장소 입력
- FR5: Epic 2 — 스텝당 한 단계씩 진행
- FR6: Epic 3 — 출생 정보를 출생차트·해석 생성에 사용(쿠키→/api/chart·/api/cards)
- FR7: Epic 3 — 출생차트 계산
- FR8: Epic 3 — 출생차트+주제를 LLM에 전달
- FR9: Epic 3 — LLM 응답을 구조화 카드(심볼, 1~2문장, CTA)로 변환
- FR10: Epic 3 — 14주제 각각 한 장 카드 생성
- FR11: Epic 3 — 카드 생성·LLM 대기 중 로딩·진행 상태 노출
- FR12: Epic 3 — "시간 모름" 시 제한/근사 해석
- FR13: Epic 3 — 한 번에 한 장 카드만 표시
- FR14: Epic 3 — 카드에 심볼, 핵심 1~2문장, CTA 표시
- FR15: Epic 3 — [ 다음 카드 ]로 다음 주제 이동
- FR16: Epic 3 — 무료 4주제 카드 순서대로 열람
- FR17: Epic 5 — 해금된 유료 주제 카드 열람(결제·해금 후)
- FR18: Epic 3 — 4개 무료 주제 결제 없이 노출
- FR19: Epic 3 — 미구독·미구매 시 10개 유료 주제 잠금(자물쇠·블러 등) 노출
- FR20: Epic 5 — 구매·구독 여부에 따른 유료 주제 접근 제한
- FR21: Epic 3 — 무료/유료(잠금) 구분 가능
- FR22: Epic 5 — 유료 주제 해금용 결제/구독 시작
- FR23: Epic 5 — 결제/구독 플로우 완료
- FR24: Epic 5 — 구매·구독 이력 기록 및 사용자 연결
- FR25: Epic 5 — 결제 완료 후 해당 유료 주제(들) 해금
- FR26: Epic 5 — 해금할 유료 주제 또는 패키지 선택
- FR27: Epic 4 — 세션 또는 계정으로 방문 간 식별
- FR28: Epic 5 — 구매 이력 사용자와 연결·보관
- FR29: Epic 6 — 재방문 시 이전 해금 유료 주제 카드 재열람
- FR30: Epic 4 — 결제·접근 유지 시 로그인·계정 생성
- FR31: Epic 1 — 랜딩(메인/온보딩) 페이지 진입
- FR32: Epic 1 — 랜딩·핵심 페이지 메타·OG(SEO·SNS 공유)

## Epic List

### Epic 1: 프로젝트 기반 및 랜딩
사용자가 서비스를 발견하고 랜딩(메인/온보딩)에 도달할 수 있으며, 메타·OG로 SEO·SNS 공유 미리보기를 제공한다.  
**FRs covered:** FR31, FR32  
**구현:** create-next-app@latest, Base UI, FSD 골격(app, pages, widgets, features, entities, shared), 랜딩 페이지, 메타·OG.

### Epic 2: 출생 정보 입력(온보딩)
사용자가 생년월일·시간·장소를 스텝별로 입력하고, "시간 모름"을 선택할 수 있으며, 입력을 완료해 결과(카드) 단계로 넘어갈 수 있다.  
**FRs covered:** FR1, FR2, FR3, FR4, FR5  
**구현:** OnboardingStep 스텝 폼, submitOnboarding(출생 정보를 쿠키 등에 저장 후 /cards 리다이렉트). Anonymous 플로우(계정 불필요).

### Epic 3: 출생차트·해석 생성 및 무료 카드 열람
사용자가 출생 정보 제출 후, 출생차트·LLM 기반 한 장 카드(무료 4주제)를 순서대로 보고, 유료 10주제는 잠금으로 인지할 수 있다.  
**FRs covered:** FR6, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR18, FR19, FR21  
**구현:** /api/chart, /api/cards, circular-natal-horoscope-js·nocturna-wheel, LLM 연동·구조화, NatalCard·LoadingCard·LockedTopicCard/List, [ 다음 카드 ], topics 설정(무료 4/유료 10).

### Epic 4: 계정·인증
사용자가 로그인·계정 생성을 하고, 방문 간 세션/계정으로 식별될 수 있다. (결제·재방문에 필요.)  
**FRs covered:** FR27, FR30  
**구현:** Prisma+PostgreSQL, User·Session 스키마, NextAuth v4, /api/auth/[...nextauth], middleware, 로그인·회원가입 UI.

### Epic 5: 결제·구독 및 유료 해금
사용자가 유료 주제를 선택·결제(또는 구독)하고, 해당 주제가 해금되어 한 장 카드로 열람할 수 있다. 구매 이력은 사용자와 연결된다.  
**FRs covered:** FR17, FR20, FR22, FR23, FR24, FR25, FR26, FR28  
**구현:** Purchase 스키마, PG 연동, /api/webhooks/payment, 결제 플로우·패키지 선택, access(해금 판단)·유료 카드 노출.

### Epic 6: 재방문·해금 주제 재열람
사용자가 재방문 시 이전에 해금한 유료 주제 카드를 다시 볼 수 있다.  
**FRs covered:** FR29  
**구현:** 세션·구매 이력 조회, 해금 주제 목록·카드 재노출. (선택) "오늘의 한 장" 등 재노출.

---

## Epic 1: 프로젝트 기반 및 랜딩

사용자가 서비스를 발견하고 랜딩(메인/온보딩)에 도달할 수 있으며, 메타·OG로 SEO·SNS 공유 미리보기를 제공한다.  
**FRs:** FR31, FR32 | **NFR:** NFR-P1(LCP)

### Story 1.1: 프로젝트 초기화 및 Base UI·FSD 골격

As a **개발자**,
I want **create-next-app과 Base UI, FSD 폴더 구조**로 프로젝트를 초기화하고,
So that **이후 랜딩·온보딩·카드 구현의 기반**이 마련된다.

**Acceptance Criteria:**

**Given** 프로젝트 루트에 기존 `package.json` 등이 없거나 덮어쓰기 가능한 상태  
**When** `npx create-next-app@latest . --yes`를 실행한다  
**Then** TypeScript, Tailwind, App Router, Turbopack, `src/`, `@/*` alias가 적용된 Next.js 앱이 생성된다  
**And** `@base-ui-components/react`(또는 최신 패키지명)가 설치되고, `shared/ui/`에 Button·Input 등 Base UI 래퍼 골격이 있다  
**And** FSD 레이어 `app`, `pages`, `widgets`, `features`, `entities`, `shared`가 `src/` 하위에 존재한다  

### Story 1.2: 랜딩 페이지 및 메타·OG

As a **신규 방문자**,
I want **랜딩(메인/온보딩) 페이지**에 도달하고,
So that **서비스를 발견하고 진입**할 수 있다.

**Acceptance Criteria:**

**Given** 랜딩 라우트(예: `(marketing)/` 또는 `/`)에 접근한다  
**When** 페이지가 로드된다  
**Then** 랜딩 UI(진입 CTA, 서비스 소개 등)가 표시되고, "시작하기" 등 온보딩으로 이어지는 CTA가 있다 (FR31)  
**And** `layout` 또는 `page`에 `metadata`(title, description) 및 OG(twitter, openGraph)가 설정되어 SEO·SNS 공유 미리보기가 동작한다 (FR32)  
**And** NFR-P1: LCP 2.5초 이내(또는 목표치)에 첫 화면이 사용 가능하다  

---

## Epic 2: 출생 정보 입력(온보딩)

사용자가 생년월일·시간·장소를 스텝별로 입력하고, "시간 모름"을 선택할 수 있으며, 입력을 완료해 결과(카드) 단계로 넘어갈 수 있다.  
**FRs:** FR1–FR5 | **UX:** OnboardingStep, 스텝당 한 입력, 터치 44px(NFR-A2)

### Story 2.1: 생년월일 입력 스텝

As a **방문자**,
I want **생년월일을 한 스텝에 입력**하고,
So that **출생 정보의 첫 단계**를 완료할 수 있다.

**Acceptance Criteria:**

**Given** 온보딩 첫 스텝(또는 랜딩에서 "시작하기" 후)에 있다  
**When** 생년월일을 선택/입력하고 "다음"을 누른다  
**Then** 유효한 날짜일 때 다음 스텝(시간)으로 진행한다 (FR1)  
**And** 입력·버튼은 키보드 포커스로 조작 가능하고, 터치 타겟은 44×44px 이상이다 (NFR-A1, A2)  

### Story 2.2: 출생 시간 입력 스텝 및 "시간 모름"

As a **방문자**,
I want **출생 시간을 입력하거나 "모름"을 선택**하고,
So that **시간을 아는 경우와 모르는 경우 모두** 다음 단계로 넘어갈 수 있다.

**Acceptance Criteria:**

**Given** 생년월일 입력을 마친 후 시간 스텝에 있다  
**When** 시간을 입력하면 "다음"으로 진행하고, "모름"을 선택하면 동의/안내 후 "다음"으로 진행한다  
**Then** FR2(시간 입력), FR3("시간 모름" 선택)을 만족한다  
**And** "시간 모름" 선택 시 제한 해석 안내 문구를 노출한다 (UX)  

### Story 2.3: 출생 장소 입력 스텝

As a **방문자**,
I want **출생 장소를 입력**하고,
So that **출생차트 계산에 필요한 정보**를 모두 입력한다.

**Acceptance Criteria:**

**Given** 시간(또는 "모름") 입력을 마친 후 장소 스텝에 있다  
**When** 장소를 입력(텍스트 또는 자동완성)하고 "결과 보기" 등을 누른다  
**Then** FR4를 만족하고, 유효 시 제출 가능하다  

### Story 2.4: 온보딩 제출 및 /cards 리다이렉트

As a **방문자**,
I want **입력 완료 후 "결과 보기"를 누르면** 출생 정보가 저장되고 카드 페이지로 이동하고,
So that **계정 없이** 카드 생성 단계로 넘어갈 수 있다.

**Acceptance Criteria:**

**Given** 생년월일·시간(또는 모름)·장소를 모두 입력한 상태이다  
**When** `submitOnboarding`(Server Action)을 호출한다  
**Then** 출생 정보를 httpOnly·secure 쿠키(또는 동등한 방식)에 저장하고 `/cards`로 리다이렉트한다 (FR5)  
**And** 스텝 간 "이전"으로 돌아가도 입력값이 유지된다 (FR5)  
**And** FSD `features/onboarding/actions.ts`에 `'use server'`로 정의한다  

---

## Epic 3: 출생차트·해석 생성 및 무료 카드 열람

사용자가 출생 정보 제출 후, 출생차트·LLM 기반 한 장 카드(무료 4주제)를 순서대로 보고, 유료 10주제는 잠금으로 인지할 수 있다.  
**FRs:** FR6–FR16, FR18, FR19, FR21 | **NFR:** NFR-P2, P3, NFR-I1

### Story 3.1: topics 설정 및 /api/chart

As a **시스템**,
I want **14주제(무료 4/유료 10) 설정**과 **출생차트 계산 API**를 갖고,
So that **출생 정보를 차트 데이터로 변환**해 LLM·카드 생성에 사용할 수 있다.

**Acceptance Criteria:**

**Given** `shared/config/topics.ts`가 존재하고, 14주제 ID·이름·무료(4)/유료(10) 구분이 정의되어 있다  
**When** `POST /api/chart`에 쿠키(또는 body)의 출생 정보(생년월일·시간·장소, "시간 모름" 여부)가 전달된다  
**Then** `circular-natal-horoscope-js`로 출생차트를 계산하고, "시간 모름"이면 기본값(예: 12:00) 또는 제한 모드로 계산한다 (FR6, FR7, FR12)  
**And** 차트 데이터(또는 에러 `{ error, code?, retry? }`)를 JSON으로 반환한다  

### Story 3.2: LLM 연동 및 /api/cards

As a **시스템**,
I want **출생차트와 주제를 LLM에 보내** 구조화된 카드(심볼, 1~2문장, CTA)를 받고,
So that **14주제 각각에 대해 한 장 카드**를 생성할 수 있다.

**Acceptance Criteria:**

**Given** `/api/chart`로부터 차트 데이터를 얻었거나, 출생 정보를 직접 받은 상태이다  
**When** `POST /api/cards`로 주제(들)와 출생 정보·차트 컨텍스트를 LLM에 전달한다  
**Then** LLM 응답을 파싱해 카드 형식 `{ symbol, body, cta }`(또는 동일 역할 필드)로 변환한다 (FR8, FR9, FR10)  
**And** "시간 모름"이면 제한/근사 해석을 요청·표시한다 (FR12)  
**And** LLM 장애·타임아웃 시 `{ error, code, retry: true }` 및 사용자 안내·재시도 옵션을 반환한다 (NFR-I1)  
**And** LLM API 키·호출은 서버 전용이며 클라이언트에 노출되지 않는다 (NFR-S3)  

### Story 3.3: /cards 페이지·로딩·한 장 카드·[ 다음 카드 ]

As a **방문자**,
I want **온보딩 제출 후 /cards에서** 로딩을 보고, 이어서 **무료 4주제 한 장 카드**를 [ 다음 카드 ]로 넘기며 볼 수 있고,
So that **"나를 잘 안다"는 체감**을 얻을 수 있다.

**Acceptance Criteria:**

**Given** /cards에 진입했고, 쿠키에 출생 정보가 있다  
**When** `/api/chart`·`/api/cards` 호출 중이면 `loading.tsx`·ChartLoading(스피너·진행 문구)을 보여준다 (FR11, NFR-P2)  
**When** 카드가 준비되면 한 번에 **한 장**만 보여주고, 심볼·핵심 1~2문장·[ 다음 카드 ] CTA를 표시한다 (FR13, FR14, FR15)  
**Then** 무료 4주제만 순서대로 열람 가능하고, [ 다음 카드 ]로 1→2→3→4 이동한다 (FR16, FR18)  
**And** 카드 전환은 1초 이내에 반영된다 (NFR-P3)  
**And** NFR-A1(포커스), NFR-A2(44px)를 만족한다  

### Story 3.4: 유료 10주제 잠금 노출

As a **방문자**,
I want **무료 4장 후** 유료 10주제가 **잠금(자물쇠·블러)·"해금이 필요해요"**로 보이고,
So that **무료/유료를 구분**하고, 필요 시 해금(결제)으로 이어갈 수 있다.

**Acceptance Criteria:**

**Given** 무료 4주제 카드를 모두 본 상태이거나, 유료 구간 목록/카드 자리를 본다  
**When** 유료 10주제를 노출한다  
**Then** 자물쇠·블러·"이 카드를 보려면 해금이 필요해요" 문구와 CTA(해금/결제 유도)를 표시한다 (FR19, FR21)  
**And** LockedTopicCard 또는 LockedTopicList 패턴(UX)을 사용한다  

---

## Epic 4: 계정·인증

사용자가 로그인·계정 생성을 하고, 방문 간 세션/계정으로 식별될 수 있다. (결제·재방문에 필요.)  
**FRs:** FR27, FR30 | **NFR:** NFR-S1, S2

### Story 4.1: Prisma·PostgreSQL 및 User·Session 스키마

As a **시스템**,
I want **Prisma와 PostgreSQL**로 User·Session(NextAuth 호환) 스키마를 갖고,
So that **계정·세션 기반 인증**을 사용할 수 있다.

**Acceptance Criteria:**

**Given** `prisma/schema.prisma`에 User, Session(NextAuth Adapter 요구 필드) 모델이 정의되어 있다  
**When** `prisma migrate dev`로 마이그레이션을 적용한다  
**Then** `shared/lib/db.ts`에서 Prisma 클라이언트 singleton을 export하고, 앱에서 이를 사용한다  
**And** Redis는 사용하지 않는다 (Architecture)  

### Story 4.2: NextAuth v4 및 로그인·계정 생성

As a **방문자**,
I want **로그인·계정 생성**을 하고,
So that **결제·재방문 시 세션/계정으로 식별**될 수 있다.

**Acceptance Criteria:**

**Given** `/api/auth/[...nextauth]` Route Handler와 `shared/lib/auth.ts`에 NextAuth 옵션(Prisma Adapter, providers)이 구성되어 있다  
**When** 로그인·회원가입 UI(버튼·폼)를 통해 OAuth 또는 Credentials로 인증한다  
**Then** FR27(세션/계정으로 식별), FR30(로그인·계정 생성)을 만족한다  
**And** (구현 시) `src/middleware.ts`에서 NextAuth `withAuth` 등으로 보호 경로를 설정한다  
**And** 출생 정보·구매 이력은 인증된 사용자 본인만 조회 가능하도록 접근 제어를 적용한다 (NFR-S2)  

---

## Epic 5: 결제·구독 및 유료 해금

사용자가 유료 주제를 선택·결제(또는 구독)하고, 해당 주제가 해금되어 한 장 카드로 열람할 수 있다. 구매 이력은 사용자와 연결된다.  
**FRs:** FR17, FR20, FR22–FR26, FR28 | **NFR:** NFR-I2, NFR-S4

### Story 5.1: Purchase 스키마 및 access(해금) 로직

As a **시스템**,
I want **Purchase 테이블**과 **해금 판단 로직**(`canViewTopic`, `getUnlockedTopics`)을 갖고,
So that **구매 이력에 따라 유료 주제 접근**을 제한·허용할 수 있다.

**Acceptance Criteria:**

**Given** `prisma/schema.prisma`에 Purchase 모델(userId, topicIds 또는 패키지, createdAt 등)이 있고, `prisma migrate`가 적용되어 있다  
**When** `features/access/model.ts`(또는 `shared/lib`)에 `canViewTopic(userId, topicId)`, `getUnlockedTopics(userId)`가 구현된다  
**Then** FR20(구매/구독 여부에 따른 접근 제한), FR24·FR28(구매 이력 기록·사용자 연결)의 기반이 된다  
**And** 인증된 사용자만 해당 사용자의 구매 이력·해금 주제에 접근한다 (NFR-S4)  

### Story 5.2: PG 연동·결제 플로우·웹훅

As a **방문자**,
I want **유료 주제(또는 패키지)를 선택하고 결제/구독**을 완료하고,
So that **해당 주제가 해금**되어 카드로 볼 수 있다.

**Acceptance Criteria:**

**Given** 로그인된 사용자가 잠금 카드 또는 결제 진입점에 있다  
**When** 해금할 주제(들) 또는 패키지를 선택하고 PG 결제/구독 플로우를 진행한다  
**Then** FR22(결제/구독 시작), FR23(플로우 완료), FR25(결제 완료 후 해금), FR26(주제/패키지 선택)을 만족한다  
**And** `POST /api/webhooks/payment`에서 PG 웹훅을 받아 Purchase를 생성하고, 해금 상태가 반영된다  
**And** PG 장애 시 결제 플로우에서 명확한 안내와 재시도 경로를 제공한다 (NFR-I2)  

### Story 5.3: 유료 주제 카드 열람

As a **로그인·구매 사용자**,
I want **해금된 유료 주제**를 **한 장 카드**로 열람하고,
So that **FR17**을 만족한다.

**Acceptance Criteria:**

**Given** 사용자가 해당 유료 주제를 구매·해금한 상태이다  
**When** /cards에서 해당 주제로 이동하거나, 해금 목록에서 선택한다  
**Then** NatalCard와 동일한 형식(심볼·1~2문장·CTA)으로 유료 주제 카드가 표시된다 (FR17)  
**And** `getUnlockedTopics`·`canViewTopic`으로 노출 여부를 판단한다  

---

## Epic 6: 재방문·해금 주제 재열람

사용자가 재방문 시 이전에 해금한 유료 주제 카드를 다시 볼 수 있다.  
**FRs:** FR29

### Story 6.1: 재방문 시 해금 주제 재열람

As a **재방문 사용자**,
I want **로그인·세션 인식 후** 이전에 해금한 유료 주제 카드를 **다시** 열람하고,
So that **궁금할 때마다 여기 들어온다**는 습관을 이어갈 수 있다.

**Acceptance Criteria:**

**Given** 사용자가 이전에 결제·해금한 유료 주제가 있다  
**When** 재방문하여 로그인(또는 세션 유지)된 상태로 /cards(또는 해금 주제 진입점)에 접근한다  
**Then** 구매 이력을 조회해 해금 주제 목록을 보여주고, 해당 주제 카드를 다시 열람할 수 있다 (FR29)  
**And** (선택) "오늘의 한 장"·재노출 등은 Nice-to-Have로 나중에 추가 가능하다  

