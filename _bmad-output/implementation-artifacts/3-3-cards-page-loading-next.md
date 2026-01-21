# Story 3.3: /cards 페이지·로딩·한 장 카드·[ 다음 카드 ]

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **방문자**,
I want **온보딩 제출 후 /cards에서** 로딩을 보고, 이어서 **무료 4주제 한 장 카드**를 [ 다음 카드 ]로 넘기며 볼 수 있고,
So that **"나를 잘 안다"는 체감**을 얻을 수 있다.

## Acceptance Criteria

**Given** /cards에 진입했고, 쿠키에 출생 정보가 있다  
**When** `/api/chart`·`/api/cards` 호출 중이면 `loading.tsx`·ChartLoading(스피너·진행 문구)을 보여준다 (FR11, NFR-P2)  
**When** 카드가 준비되면 한 번에 **한 장**만 보여주고, 심볼·핵심 1~2문장·[ 다음 카드 ] CTA를 표시한다 (FR13, FR14, FR15)  
**Then** 무료 4주제만 순서대로 열람 가능하고, [ 다음 카드 ]로 1→2→3→4 이동한다 (FR16, FR18)  
**And** 카드 전환은 1초 이내에 반영된다 (NFR-P3)  
**And** NFR-A1(포커스), NFR-A2(44px)를 만족한다

## Tasks / Subtasks

- [x] Task 1: 로딩 상태 컴포넌트 생성
  - [x] Subtask 1.1: `src/app/cards/loading.tsx` 파일 생성 (Next.js loading.tsx)
  - [x] Subtask 1.2: 스피너 및 진행 문구 표시
  - [x] Subtask 1.3: 접근성 요구사항 충족 (NFR-A1, NFR-A2)

- [x] Task 2: 카드 컴포넌트 생성
  - [x] Subtask 2.1: `src/entities/card/ui.tsx` 생성
  - [x] Subtask 2.2: 한 장 카드 UI (심볼, 주제명, body, CTA)
  - [x] Subtask 2.3: 접근성 요구사항 충족 (role="article", aria-label 등)

- [x] Task 3: /cards 페이지 구현
  - [x] Subtask 3.1: `/api/cards` 호출하여 무료 4주제 카드 가져오기
  - [x] Subtask 3.2: 현재 카드 인덱스 상태 관리
  - [x] Subtask 3.3: [ 다음 카드 ] 버튼으로 카드 전환 (1→2→3→4)
  - [x] Subtask 3.4: 카드 전환 애니메이션/전환 효과 (0.3초, 1초 이내)
  - [x] Subtask 3.5: 에러 처리 및 재시도 옵션
  - [x] Subtask 3.6: 접근성 요구사항 충족

- [x] Task 4: 쿠키에서 출생 정보 읽기 (서버 사이드)
  - [x] Subtask 4.1: `/api/cards`에서 서버 사이드로 쿠키 읽기 (이미 구현됨)
  - [x] Subtask 4.2: 출생 정보 없을 시 에러 처리 및 온보딩으로 리다이렉트 옵션 제공

## Dev Notes

### Architecture Compliance

**FSD 구조:**
- 카드 컴포넌트는 `src/entities/card/ui.tsx` 또는 `src/widgets/card-viewer/ui.tsx`에 구현
- /cards 페이지는 `src/page-components/cards/ui.tsx`에 구현
- 로딩 상태는 `src/app/cards/loading.tsx`에 구현 (Next.js loading.tsx)

**접근성:**
- NFR-A1: 키보드 포커스 관리
- NFR-A2: 터치 타겟 최소 44px

**성능:**
- NFR-P2: 로딩 상태 표시 (15초 내 카드 노출 또는 진행 표시)
- NFR-P3: 카드 전환 1초 이내

### Technical Decisions

**로딩 상태:**
- Next.js `loading.tsx` 사용 (자동 Suspense 경계)
- 또는 컴포넌트 내부에서 로딩 상태 관리

**카드 전환:**
- 상태로 현재 카드 인덱스 관리
- CSS transition 또는 framer-motion 사용 (1초 이내 전환)

**데이터 페칭:**
- 클라이언트 컴포넌트에서 `/api/cards` 호출
- 또는 서버 컴포넌트에서 데이터 페칭 후 전달

### Dependencies

- 기존: Button 컴포넌트 (`src/shared/ui/button`)
- (선택) framer-motion: 카드 전환 애니메이션

### Testing Considerations

- 로딩 상태 표시 확인
- 카드 전환 동작 확인
- 접근성 요구사항 확인 (키보드 네비게이션, 터치 타겟 크기)

### Completion Notes List

- 로딩 상태 컴포넌트 생성 완료 (`src/app/cards/loading.tsx`)
  - Next.js loading.tsx 사용 (자동 Suspense 경계)
  - 스피너 및 진행 문구 표시
  - 접근성 요구사항 충족 (role="status", aria-label)
- 카드 컴포넌트 생성 완료 (`src/entities/card/ui.tsx`)
  - 한 장 카드 UI (심볼, 주제명, body, CTA)
  - 접근성 요구사항 충족 (role="article", aria-label)
  - 진행 표시 (현재/전체)
- /cards 페이지 구현 완료 (`src/page-components/cards/ui.tsx`)
  - `/api/cards` 호출하여 무료 4주제 카드 가져오기
  - 현재 카드 인덱스 상태 관리
  - [ 다음 카드 ] 버튼으로 카드 전환 (1→2→3→4)
  - 카드 전환 애니메이션 (0.3초, 1초 이내)
  - 에러 처리 및 재시도 옵션
  - 접근성 요구사항 충족 (NFR-A1, NFR-A2)
- 카드 전환 애니메이션 CSS 추가 (`src/app/globals.css`)
- 모든 수락 기준(AC) 충족 확인
- 빌드 및 타입 검사 통과 확인

### File List

**생성된 파일:**
- `src/app/cards/loading.tsx` - 로딩 상태 컴포넌트 (Next.js loading.tsx)
- `src/entities/card/ui.tsx` - 한 장 카드 컴포넌트
- `src/page-components/cards/ui.tsx` - /cards 페이지 구현 (업데이트)
- `src/app/globals.css` - 카드 전환 애니메이션 CSS 추가

**기술적 해결 사항:**
- Next.js loading.tsx를 사용하여 자동 Suspense 경계 생성
- 카드 전환 애니메이션 (0.3초 fade-in, 1초 이내)
- 접근성 요구사항 충족 (NFR-A1: 키보드 포커스, NFR-A2: 터치 타겟 44px 이상)
- 에러 처리 및 재시도 옵션 제공
- 무료 4주제만 순서대로 열람 가능
