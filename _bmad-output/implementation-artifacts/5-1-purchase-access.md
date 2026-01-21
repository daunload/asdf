# Story 5.1: Purchase 스키마 및 access(해금) 로직

Status: done

## Story

As a **시스템**,
I want **Purchase 테이블**과 **해금 판단 로직**(`canViewTopic`, `getUnlockedTopics`)을 갖고,
So that **구매 이력에 따라 유료 주제 접근**을 제한·허용할 수 있다.

## Acceptance Criteria

**Given** `prisma/schema.prisma`에 Purchase 모델(userId, topicIds 또는 패키지, createdAt 등)이 있고, `prisma migrate`가 적용되어 있다  
**When** `features/access/model.ts`(또는 `shared/lib`)에 `canViewTopic(userId, topicId)`, `getUnlockedTopics(userId)`가 구현된다  
**Then** FR20(구매/구독 여부에 따른 접근 제한), FR24·FR28(구매 이력 기록·사용자 연결)의 기반이 된다  
**And** 인증된 사용자만 해당 사용자의 구매 이력·해금 주제에 접근한다 (NFR-S4)

## Tasks / Subtasks

- [x] Task 1: Purchase 모델 정의
  - [x] Subtask 1.1: `prisma/schema.prisma`에 Purchase 모델 추가
  - [x] Subtask 1.2: User 모델과 Purchase 관계 설정
  - [x] Subtask 1.3: Prisma 마이그레이션 생성 및 적용

- [x] Task 2: Access 로직 구현
  - [x] Subtask 2.1: `features/access/model.ts` 파일 생성
  - [x] Subtask 2.2: `canViewTopic(userId, topicId)` 함수 구현
  - [x] Subtask 2.3: `getUnlockedTopics(userId)` 함수 구현
  - [x] Subtask 2.4: 무료 주제 처리 로직 포함

- [x] Task 3: 타입 정의
  - [x] Subtask 3.1: Purchase 관련 타입 정의
  - [x] Subtask 3.2: Access 관련 타입 정의 (함수 시그니처로 포함)

## Dev Notes

### Architecture Compliance

**FSD 구조:**
- Purchase 모델은 `prisma/schema.prisma`에 정의
- Access 로직은 `src/features/access/model.ts`에 구현
- Purchase 타입은 `src/entities/purchase/model.ts`에 정의 (선택)

**Purchase 모델 구조:**
- `id`: String (cuid)
- `userId`: String (User와 연결)
- `topicIds`: String[] (구매한 주제 ID 배열)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Access 로직:**
- `canViewTopic(userId, topicId)`: 특정 주제를 볼 수 있는지 확인
  - 무료 주제는 항상 true
  - 유료 주제는 Purchase 이력 확인
- `getUnlockedTopics(userId)`: 사용자가 해금한 주제 ID 배열 반환
  - 무료 주제 + 구매한 유료 주제

### Technical Decisions

**Purchase 저장 방식:**
- topicIds를 배열로 저장 (PostgreSQL의 배열 타입 또는 JSON)
- 패키지 구매 시 여러 주제를 한 번에 저장

**Access 로직 위치:**
- `features/access/model.ts`에 구현 (FSD 구조 준수)

### Dependencies

- `@prisma/client` (이미 설치됨)
- `prisma` (이미 설치됨)

### Testing Considerations

- canViewTopic 테스트 (무료/유료 주제)
- getUnlockedTopics 테스트
- 인증되지 않은 사용자 처리

### Completion Notes List

- Purchase 모델 추가 완료 (`prisma/schema.prisma`)
  - `id`, `userId`, `topicIds` (String[]), `createdAt`, `updatedAt` 필드
  - User와의 관계 설정 (Cascade 삭제)
- Prisma 마이그레이션 생성 및 적용 완료 (`20260121151048_add_purchase`)
- Access 로직 구현 완료 (`src/features/access/model.ts`)
  - `canViewTopic(userId, topicId)`: 무료 주제는 항상 true, 유료 주제는 Purchase 확인
  - `getUnlockedTopics(userId)`: 무료 주제 + 구매한 유료 주제 반환
  - `hasPurchasedTopic(userId, topicId)`: 구매 여부 확인 (보너스 함수)
- Purchase 타입 정의 완료 (`src/entities/purchase/model.ts`)
- 빌드 성공 확인

### File List

**생성된 파일:**
- `src/features/access/model.ts` - Access 로직 (canViewTopic, getUnlockedTopics, hasPurchasedTopic)
- `src/entities/purchase/model.ts` - Purchase 타입 정의

**수정된 파일:**
- `prisma/schema.prisma` - Purchase 모델 추가, User 모델에 purchases 관계 추가

**마이그레이션:**
- `prisma/migrations/20260121151048_add_purchase/migration.sql` - Purchase 테이블 생성
