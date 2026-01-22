---
stepsCompleted: [1, 2, 3, 4, 5, 6]
documentsAssessed:
    prd: '_bmad-output/planning-artifacts/prd.md'
    architecture: '_bmad-output/planning-artifacts/architecture.md'
    epics: '_bmad-output/planning-artifacts/epics.md'
    ux: '_bmad-output/planning-artifacts/ux-design-specification.md'
---

# Implementation Readiness Assessment Report

**Date:** 2026-01-21  
**Project:** natalchart

---

## 1. Document Discovery (Step 1)

### PRD

**Whole:**

- `prd.md` (~20KB, 2026-01-21)

**Sharded:** 없음

**비고:** `prd-validation-report.md`는 PRD 검증 산출물로, 본 평가에는 `prd.md`만 사용.

### Architecture

**Whole:**

- `architecture.md` (~32KB, 2026-01-21)

**Sharded:** 없음

### Epics & Stories

**Whole:**

- `epics.md` (~26KB, 2026-01-21)

**Sharded:** 없음

### UX Design

**Whole:**

- `ux-design-specification.md` (~26KB, 2026-01-21)

**Sharded:** 없음

### 이슈

- **중복:** 없음 (whole/sharded 동시 존재 없음)
- **누락:** 없음 (PRD, Architecture, Epics, UX 모두 존재)

---

## 2. PRD Analysis (Step 2)

### Functional Requirements

- FR1: 사용자는 생년월일을 입력할 수 있다.
- FR2: 사용자는 출생 시간을 입력할 수 있다.
- FR3: 사용자는 출생 시간을 모른다는 것을 선택할 수 있다.
- FR4: 사용자는 출생 장소를 입력할 수 있다.
- FR5: 사용자는 입력 단계를 한 번에 하나씩 진행할 수 있다.
- FR6: 시스템은 입력된 출생 정보를 출생차트 계산 및 해석 생성에 사용할 수 있다.
- FR7: 시스템은 생년월일·시간·장소로 출생(네이탈) 차트를 계산할 수 있다.
- FR8: 시스템은 출생차트와 주제 컨텍스트를 LLM에 전달해 해석을 요청할 수 있다.
- FR9: 시스템은 LLM 응답을 구조화된 카드 형식(심볼, 1~2문장, CTA)으로 변환할 수 있다.
- FR10: 시스템은 14개 주제 각각에 대해 한 장 카드 해석을 생성할 수 있다.
- FR11: 사용자는 카드 생성·LLM 호출 대기 중 로딩·진행 상태를 인지할 수 있다.
- FR12: 시스템은 출생 시간을 모를 때 제한된 또는 근사 해석을 제공할 수 있다.
- FR13: 사용자는 한 번에 한 장의 카드만 볼 수 있다.
- FR14: 사용자는 각 카드에서 심볼, 핵심 1~2문장, CTA를 볼 수 있다.
- FR15: 사용자는 다음 카드로 이동할 수 있다(예: [ 다음 카드 ]).
- FR16: 사용자는 무료 4주제 카드를 순서대로 볼 수 있다.
- FR17: 사용자는 해금된 유료 주제 카드를 볼 수 있다.
- FR18: 시스템은 4개 무료 주제를 결제 없이 노출할 수 있다.
- FR19: 시스템은 미구독·미구매 시 10개 유료 주제를 잠금(자물쇠·블러 등) 상태로 노출할 수 있다.
- FR20: 시스템은 구매·구독 여부에 따라 유료 주제 카드 접근을 제한할 수 있다.
- FR21: 사용자는 어떤 주제가 무료이고 어떤 주제가 유료(잠금)인지 구분할 수 있다.
- FR22: 사용자는 유료 주제 해금을 위해 결제 또는 구독을 시작할 수 있다.
- FR23: 사용자는 결제 또는 구독 플로우를 완료할 수 있다.
- FR24: 시스템은 구매·구독 이력을 기록하고 사용자와 연결할 수 있다.
- FR25: 시스템은 결제 완료 후 해당 유료 주제(들)를 해금할 수 있다.
- FR26: 사용자는 결제·구독으로 해금할 유료 주제 또는 패키지를 선택할 수 있다.
- FR27: 사용자는 방문 간에 식별 가능한 세션 또는 계정을 가질 수 있다.
- FR28: 시스템은 구매 이력을 사용자와 연결해 보관할 수 있다.
- FR29: 사용자는 재방문 시 이전에 해금한 유료 주제 카드를 다시 볼 수 있다.
- FR30: 사용자는 결제 또는 접근 유지가 필요할 때 로그인하거나 계정을 만들 수 있다.
- FR31: 사용자는 서비스 진입을 위한 랜딩(메인/온보딩) 페이지에 도달할 수 있다.
- FR32: 시스템은 랜딩 및 핵심 페이지에 메타·OG 태그를 제공해 SEO 및 SNS 공유 미리보기를 지원할 수 있다.

**Total FRs: 32**

### Non-Functional Requirements

- NFR-P1: 랜딩·입력 첫 화면은 LCP 2.5초 이내(또는 목표치)에 사용 가능해야 한다.
- NFR-P2: 카드 생성 요청(출생차트 계산·LLM 호출·구조화) 후, 사용자가 카드를 볼 수 있을 때까지 목표치 이내(예: 15초 이내)여야 하며, 그 전까지 로딩·진행 상태를 보여줘야 한다.
- NFR-P3: 카드 간 전환([ 다음 카드 ])은 1초 이내에 반영되어야 한다.
- NFR-S1: 출생 정보(생년월일·시간·장소)는 전송 시(TLS 등) 암호화되어야 한다.
- NFR-S2: 출생 정보·구매 이력은 인증된 사용자 본인이 조회·확인할 수 있어야 한다. 저장·전송 시 권한 없는 제3자 접근을 막기 위한 보안 조치(접근 제어, 전송 암호화 등)를 적용해야 한다.
- NFR-S3: LLM API 키·결제 관련 비밀·서버 전용 로직은 클라이언트에 노출되지 않아야 한다.
- NFR-S4: 인증된 사용자만 해당 사용자의 구매 이력·해금 주제에 접근할 수 있어야 한다.
- NFR-A1: 입력 필드·카드·CTA는 키보드 포커스로 조작 가능해야 한다.
- NFR-A2: 터치 타겟(버튼·[ 다음 카드 ] 등)은 44×44px 이상이어야 한다.
- NFR-A3: (Growth) WCAG 2.1 AA 준수를 목표로 한다. MVP에서는 포커스·대비·터치 영역만 필수.
- NFR-I1: LLM API 장애·타임아웃 시 사용자에게 에러 안내 또는 재시도 옵션을 제공해야 한다.
- NFR-I2: 결제 연동(PG) 장애 시 결제 플로우에서 명확한 안내와, 가능하면 재시도 경로를 제공해야 한다.
- NFR-SC1: (MVP) 동시 접속·일 사용자 수가 초기 목표 규모(예: 1,000 DAU)일 때, NFR-P1·P2·P3가 유지되어야 한다.

**Total NFRs: 13**

### Additional Requirements

- **web_app:** Next.js, SSR, 모바일 우선, App Router. 랜딩·입력·OG는 SSR, 카드·로딩은 클라이언트.
- **browser_matrix:** iOS Safari·Android Chrome(최근 2버전), Chrome·Safari·Edge(최근 2버전).
- **responsive_design:** 모바일 우선, 한 장 카드·입력 스크롤 없이 한 화면, 터치 44px 이상.
- **seo_strategy:** 메타·OG·공유 URL, SSR 랜딩·OG. 카드 결과는 세션 의존으로 SEO 낮은 우선순위.
- **14주제:** 무료 4(기본 성격·자아, 첫인상, 재능·강점, 과제·성장) / 유료 10. 주제별 잠금·해금.

### PRD Completeness Assessment

- FR·NFR가 번호·라벨로 정리되어 있고, 온보딩·차트·카드·접근 제어·결제·계정·랜딩·SEO·NFR(성능·보안·접근성·통합·확장성)을 포괄한다. 여정·Scope(MVP/Growth/Vision)·web_app·browser·반응형·제약이 보완되어 있다. **완전성·명확성: 충분.**

---

## 3. Epic Coverage Validation (Step 3)

### Epic FR Coverage (from epics.md)

| FR                                 | Epic | Story |
| ---------------------------------- | ---- | ----- |
| FR1                                | 2    | 2.1   |
| FR2, FR3                           | 2    | 2.2   |
| FR4                                | 2    | 2.3   |
| FR5                                | 2    | 2.4   |
| FR6, FR7, FR12                     | 3    | 3.1   |
| FR8, FR9, FR10                     | 3    | 3.2   |
| FR11, FR13, FR14, FR15, FR16, FR18 | 3    | 3.3   |
| FR19, FR21                         | 3    | 3.4   |
| FR27, FR30                         | 4    | 4.2   |
| FR20, FR24, FR28                   | 5    | 5.1   |
| FR22, FR23, FR25, FR26             | 5    | 5.2   |
| FR17                               | 5    | 5.3   |
| FR29                               | 6    | 6.1   |
| FR31, FR32                         | 1    | 1.2   |

### Coverage Matrix (PRD vs Epics)

| FR   | PRD 요약                   | 에픽·스토리           | 상태      |
| ---- | -------------------------- | --------------------- | --------- |
| FR1  | 생년월일 입력              | Epic 2 Story 2.1      | ✓ Covered |
| FR2  | 출생 시간 입력             | Epic 2 Story 2.2      | ✓ Covered |
| FR3  | 출생 시간 "모름" 선택      | Epic 2 Story 2.2      | ✓ Covered |
| FR4  | 출생 장소 입력             | Epic 2 Story 2.3      | ✓ Covered |
| FR5  | 스텝당 한 단계 진행        | Epic 2 Story 2.4      | ✓ Covered |
| FR6  | 출생 정보→차트·해석 사용   | Epic 3 Story 3.1      | ✓ Covered |
| FR7  | 출생차트 계산              | Epic 3 Story 3.1      | ✓ Covered |
| FR8  | 출생차트+주제→LLM          | Epic 3 Story 3.2      | ✓ Covered |
| FR9  | LLM→구조화 카드            | Epic 3 Story 3.2      | ✓ Covered |
| FR10 | 14주제 한 장 카드 생성     | Epic 3 Story 3.2      | ✓ Covered |
| FR11 | 로딩·진행 상태             | Epic 3 Story 3.3      | ✓ Covered |
| FR12 | "시간 모름" 제한/근사 해석 | Epic 3 Story 3.1, 3.2 | ✓ Covered |
| FR13 | 한 번에 한 장 카드         | Epic 3 Story 3.3      | ✓ Covered |
| FR14 | 심볼·문장·CTA              | Epic 3 Story 3.3      | ✓ Covered |
| FR15 | [ 다음 카드 ]              | Epic 3 Story 3.3      | ✓ Covered |
| FR16 | 무료 4주제 순서 열람       | Epic 3 Story 3.3      | ✓ Covered |
| FR17 | 해금 유료 카드 열람        | Epic 5 Story 5.3      | ✓ Covered |
| FR18 | 4무료 결제 없이 노출       | Epic 3 Story 3.3      | ✓ Covered |
| FR19 | 10유료 잠금 노출           | Epic 3 Story 3.4      | ✓ Covered |
| FR20 | 구매/구독에 따른 접근 제한 | Epic 5 Story 5.1      | ✓ Covered |
| FR21 | 무료/유료 구분             | Epic 3 Story 3.4      | ✓ Covered |
| FR22 | 결제/구독 시작             | Epic 5 Story 5.2      | ✓ Covered |
| FR23 | 결제/구독 플로우 완료      | Epic 5 Story 5.2      | ✓ Covered |
| FR24 | 구매 이력 기록·연결        | Epic 5 Story 5.1      | ✓ Covered |
| FR25 | 결제 완료 후 해금          | Epic 5 Story 5.2      | ✓ Covered |
| FR26 | 주제/패키지 선택           | Epic 5 Story 5.2      | ✓ Covered |
| FR27 | 세션/계정 식별             | Epic 4 Story 4.2      | ✓ Covered |
| FR28 | 구매 이력 사용자 연계      | Epic 5 Story 5.1      | ✓ Covered |
| FR29 | 재방문 시 해금 재열람      | Epic 6 Story 6.1      | ✓ Covered |
| FR30 | 로그인·계정 생성           | Epic 4 Story 4.2      | ✓ Covered |
| FR31 | 랜딩 페이지 진입           | Epic 1 Story 1.2      | ✓ Covered |
| FR32 | 메타·OG(SEO·SNS)           | Epic 1 Story 1.2      | ✓ Covered |

### Missing Requirements

- **없음.** PRD FR1–FR32 전부 에픽·스토리에 매핑됨.

### Coverage Statistics

- **Total PRD FRs:** 32
- **FRs covered in epics:** 32
- **Coverage:** 100%

---

## 4. UX Alignment (Step 4)

### UX Document Status

**Found:** `ux-design-specification.md` (whole document)

### UX ↔ PRD Alignment

- **비전·한 장 카드:** UX "한 장 = 심볼 + 1~2문장 + [ 다음 카드 ]", 무료 4/유료 10, "GPT보다 나를 잘 안다" — PRD와 일치.
- **여정:** 첫 방문(무료 4장), 유료 전환(잠금·결제·해금), 재방문, "시간 모름" — PRD 4개 여정과 대응.
- **입력:** 스텝당 한 입력(생년월일→시간→장소), "시간 모름" 선택 — FR1–5, FR3 반영.
- **카드·잠금·로딩:** NatalCard, LockedTopicCard, LoadingCard/ChartLoading, `{ error, retry }` — FR11, FR19, NFR-P2, NFR-I1 반영.
- **접근성:** 44px 터치, 키보드 포커스, 대비 — NFR-A1, A2와 일치.
- **미정합:** 없음.

### UX ↔ Architecture Alignment

- **Base UI + Tailwind:** UX Design System과 Architecture 모두 동일. `shared/ui` 래퍼, Tailwind `theme` 확장.
- **FSD:** UX의 `widgets/card-viewer`, `onboarding-steps`, `features/onboarding` 등이 Architecture FSD 구조와 부합.
- **반응형·브레이크포인트:** UX 320/768/1024, 모바일 우선 — Architecture·PRD browser_matrix·responsive_design과 일치.
- **에러·로딩:** `{ error, code, retry }`, `loading.tsx`, `error.tsx` — Architecture Process 패턴·NFR-I1·I2와 일치.
- **미지원/갭:** UX의 (선택) 스와이프·ProgressIndicator(1/4)는 Architecture에 명시적 필수는 아니나, Epics·스토리(3.3, 3.4)에 반영 가능. **경미.**

### Warnings

- **없음.** UX 문서 존재, PRD·Architecture와 정합. UI 컴포넌트·패턴은 Architecture(Base UI, FSD) 및 Epics에 반영됨.

---

## 5. Epic Quality Review (Step 5)

create-epics-and-stories 기준으로 에픽·스토리 품질을 검토함.

### 1. Epic Structure Validation

#### A. User Value Focus

- **Epic 1:** "서비스 발견·랜딩 도달, SEO·SNS" — 사용자 중심. ✓
- **Epic 2:** "생년월일·시간·장소 스텝 입력, 시간 모름, 결과(카드)로 이동" — 사용자 중심. ✓
- **Epic 3:** "출생차트·한 장 카드(무료 4), 유료 10 잠금 인지" — 사용자 중심. ✓
- **Epic 4:** "로그인·계정 생성, 세션/계정 식별" — 사용자 중심. ✓
- **Epic 5:** "유료 선택·결제·해금, 카드 열람, 구매 이력 연계" — 사용자 중심. ✓
- **Epic 6:** "재방문 시 해금 주제 재열람" — 사용자 중심. ✓

**기술 에픽:** 없음. 모두 사용자 가치 전달.

#### B. Epic Independence

- **Epic 1:** 선행 없음. 독립. ✓
- **Epic 2:** Epic 1(앱·랜딩)만 필요. Epic 3 미필요. ✓
- **Epic 3:** Epic 1, 2(출생정보 쿠키)만 필요. 4·5·6 미필요(무료·익명 플로우). ✓
- **Epic 4:** Epic 1 필요. 5·6 미필요. ✓
- **Epic 5:** Epic 1·2·3·4 필요. 6 미필요. ✓
- **Epic 6:** Epic 1–5 필요. ✓

**순방향 의존(Forward dependency):** 없음. Epic N은 N+1을 참조하지 않음.

### 2. Story Quality

#### A. Story Sizing & Independence

- **1.1:** create-next-app + Base UI + FSD. Architecture의 **Starter 요구**와 일치: "Epic 1 Story 1 = 초기 프로젝트·스타터". ✓
- **1.2:** 1.1 결과물 사용. 순방향 없음. ✓
- **2.1–2.4:** 2.N은 2.(N-1) 또는 1.x만 사용. ✓
- **3.1–3.4:** 3.1→3.2→3.3→3.4. Epic 2(쿠키)만 선행. ✓
- **4.1–4.2:** 4.2가 4.1 사용. Epic 1만 선행. ✓
- **5.1–5.3:** 5.1(4.1 User 필요)→5.2→5.3. ✓
- **6.1:** 4.2, 5.1, 5.3 사용. ✓

**에픽 단위 스토리·미완결 스토리:** 없음.

#### B. Acceptance Criteria (Given/When/Then, 검증 가능성)

- 전 스토리: Given/When/Then 또는 동등 구조. ✓
- FR·NFR·에러: 3.1 `{ error, code?, retry? }`, 3.2 NFR-I1, 5.2 NFR-I2 등 에러·엣지 반영. ✓

### 3. Dependency & DB 생성 시점

#### Within-Epic

- 1.1 단독 → 1.2가 1.1 사용.
- 2.1→2.2→2.3→2.4; 3.1→3.2→3.3→3.4; 4.1→4.2; 5.1→5.2→5.3.  
  **순방향 참조(이후 스토리 의존):** 없음.

#### Database/Entity Creation Timing

- **User, Session:** Epic 4 Story 4.1 — 인증 **최초 필요 시점**에 생성. ✓
- **Purchase:** Epic 5 Story 5.1 — 결제 **최초 필요 시점**에 생성. ✓
- **Epic 1에서 전 테이블 생성:** 없음. ✓

**“필요한 스토리에서만 생성” 원칙 준수.**

### 4. Starter Template (Architecture)

- Architecture: `npx create-next-app@latest . --yes` + Base UI + FSD.
- **Epic 1 Story 1:** "프로젝트 초기화 및 Base UI·FSD 골격" — create-next-app, Base UI, FSD 명시. **요구사항 충족.** ✓

### 5. Quality Findings by Severity

#### 🔴 Critical Violations

- **없음.**

#### 🟠 Major Issues

- **없음.**

#### 🟡 Minor Concerns

1. **페르소나 "시스템":** Story 3.1, 3.2, 4.1, 5.1이 "As a **시스템**" 사용. 에픽은 사용자 가치 있음. (선택) "As a 방문자, I want the system to ..."로 재표현 시 일관성 향상.
2. **2.4 ↔ 3.3:** 2.4는 `/cards` 리다이렉트. 2.4의 최종 사용자 가치는 3.3에서 실현. 구현 순서 2→3이면 문제 없음. (선택) 2.4 또는 에픽 주에 "3.3 전까지 /cards는 로딩·플레이스홀더 허용" 명시.
3. **AC 보완:**
    - 2.1: 잘못된 날짜 시 검증 메시지 노출을 AC에 추가하면 명확.
    - 3.3: `/api/chart`, `/api/cards` 실패 시 `{ error, retry }` UI 노출을 AC에 명시하면 NFR-I1·UX와 정합.

### 6. Best Practices Compliance

| 체크 항목                    | 결과 |
| ---------------------------- | ---- |
| 에픽이 사용자 가치 전달      | ✓    |
| 에픽 독립성 (N이 N+1 불필요) | ✓    |
| 스토리 적정 크기             | ✓    |
| 순방향 의존 없음             | ✓    |
| DB는 필요 시점에만 생성      | ✓    |
| AC 명확·검증 가능            | ✓    |
| FR 추적성 유지               | ✓    |

---

## Summary and Recommendations (Step 6)

### Overall Readiness Status

**READY**

### Critical Issues Requiring Immediate Action

- **없음.**  
  Critical·Major 위반 없음. 구현 진행 가능.

### Recommended Next Steps

1. **(선택)** Story 3.1, 3.2, 4.1, 5.1의 페르소나를 사용자 관점으로 바꿔 에픽 간 일관성 확보.
2. **(선택)** Epic 2 Story 2.4 또는 에픽 설명에 "3.3 완료 전 /cards는 로딩·플레이스홀더 가능"을 명시.
3. **(선택)** 2.1 AC: 잘못된 날짜 검증·메시지, 3.3 AC: `/api/chart`·`/api/cards` 에러 시 `{ error, retry }` UI를 보완.

### Final Note

이번 평가에서 **Critical 0건, Major 0건, Minor 4건**이 Epic Quality 단계에서 도출되었습니다. Critical·Major가 없어 **현재 문서 상태로 구현을 시작해도 됩니다.** Minor 항목은 에픽·스토리 다듬기 시 반영하거나, 그대로 진행 후 구현 단계에서 처리해도 무방합니다.

---
