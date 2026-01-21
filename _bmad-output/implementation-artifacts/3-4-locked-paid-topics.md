# Story 3.4: 유료 10주제 잠금 노출

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **방문자**,
I want **무료 4장 후** 유료 10주제가 **잠금(자물쇠·블러)·"해금이 필요해요"**로 보이고,
So that **무료/유료를 구분**하고, 필요 시 해금(결제)으로 이어갈 수 있다.

## Acceptance Criteria

**Given** 무료 4주제 카드를 모두 본 상태이거나, 유료 구간 목록/카드 자리를 본다  
**When** 유료 10주제를 노출한다  
**Then** 자물쇠·블러·"이 카드를 보려면 해금이 필요해요" 문구와 CTA(해금/결제 유도)를 표시한다 (FR19, FR21)  
**And** LockedTopicCard 또는 LockedTopicList 패턴(UX)을 사용한다

## Tasks / Subtasks

- [x] Task 1: LockedTopicCard 컴포넌트 생성
  - [x] Subtask 1.1: `src/entities/card/ui.tsx`에 LockedCard 컴포넌트 추가
  - [x] Subtask 1.2: 자물쇠 아이콘/이모지 표시 (🔒)
  - [x] Subtask 1.3: 블러 효과 적용 (CSS filter: blur())
  - [x] Subtask 1.4: "해금이 필요해요" 문구 표시
  - [x] Subtask 1.5: CTA 버튼 (해금하기, 다음 카드)
  - [x] Subtask 1.6: 접근성 요구사항 충족 (aria-label, role="article")

- [x] Task 2: /cards 페이지에 잠금 카드 통합
  - [x] Subtask 2.1: 무료 4장 후 유료 주제를 잠금 카드로 표시
  - [x] Subtask 2.2: 잠금 카드로 네비게이션 (다음 카드 버튼)
  - [x] Subtask 2.3: 잠금 카드에서 해금 CTA 클릭 시 처리 (현재는 안내만, 실제 결제는 Epic 5에서 구현)

- [ ] Task 3: 유료 주제 목록 표시 (선택)
  - [ ] Subtask 3.1: 잠금 카드에서 유료 주제 목록 표시 (선택 사항, MVP에서 제외)

## Dev Notes

### Architecture Compliance

**FSD 구조:**
- 잠금 카드 컴포넌트는 `src/entities/card/ui.tsx`에 추가하거나 별도 파일 생성
- /cards 페이지는 `src/page-components/cards/ui.tsx`에 구현

**접근성:**
- NFR-A1: 키보드 포커스 관리
- NFR-A2: 터치 타겟 최소 44px
- 잠금 상태를 명확히 전달 (aria-label)

### Technical Decisions

**잠금 카드 디자인:**
- 자물쇠 아이콘: 🔒 이모지 또는 SVG 아이콘
- 블러 효과: CSS `backdrop-filter: blur()` 또는 `filter: blur()`
- 반투명 오버레이로 내용 가림

**CTA 버튼:**
- "해금하기" 또는 "결제하기" 버튼
- 현재는 클릭 시 안내만 표시 (실제 결제는 Epic 5에서 구현)

**카드 전환:**
- 무료 4장 → 잠금 카드들로 자연스럽게 전환
- 잠금 카드도 [ 다음 카드 ] 버튼으로 이동 가능

### Dependencies

- 기존: Button 컴포넌트 (`src/shared/ui/button`)
- 기존: Card 컴포넌트 (`src/entities/card/ui`)

### Testing Considerations

- 잠금 카드 표시 확인
- 블러 효과 확인
- CTA 버튼 동작 확인
- 접근성 요구사항 확인

### Completion Notes List

- LockedCard 컴포넌트 생성 완료 (`src/entities/card/ui.tsx`)
  - 자물쇠 아이콘 (🔒) 표시
  - 블러 효과 적용 (CSS filter: blur(20px))
  - 반투명 오버레이로 내용 가림
  - "해금이 필요해요" 문구 및 안내 메시지
  - CTA 버튼 (해금하기, 다음 카드)
  - 접근성 요구사항 충족 (aria-label, role="article")
- /cards 페이지에 잠금 카드 통합 완료
  - 무료 4장 후 유료 10주제를 잠금 카드로 표시
  - 잠금 카드로 자연스럽게 네비게이션 (다음 카드 버튼)
  - 해금 CTA 클릭 시 안내 메시지 (실제 결제는 Epic 5에서 구현)
  - 전체 카드 수 계산 (무료 4장 + 유료 10장 = 14장)
- 모든 수락 기준(AC) 충족 확인
- 빌드 및 타입 검사 통과 확인

### File List

**수정된 파일:**
- `src/entities/card/ui.tsx` - LockedCard 컴포넌트 추가
- `src/page-components/cards/ui.tsx` - 잠금 카드 통합

**기술적 해결 사항:**
- 블러 효과: CSS `filter: blur(20px)` 사용
- 반투명 오버레이: `bg-white/60 dark:bg-black/60` 사용
- 무료/유료 카드 구분: `isFreeCard` 조건으로 렌더링 분기
- 전체 카드 수: 무료 카드 수 + 유료 주제 수로 계산
- 해금 CTA: 현재는 alert로 안내, Epic 5에서 실제 결제 플로우 구현 예정
