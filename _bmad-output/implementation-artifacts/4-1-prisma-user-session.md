# Story 4.1: Prisma·PostgreSQL 및 User·Session 스키마

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **시스템**,
I want **Prisma와 PostgreSQL**로 User·Session(NextAuth 호환) 스키마를 갖고,
So that **계정·세션 기반 인증**을 사용할 수 있다.

## Acceptance Criteria

**Given** `prisma/schema.prisma`에 User, Session(NextAuth Adapter 요구 필드) 모델이 정의되어 있다  
**When** `prisma migrate dev`로 마이그레이션을 적용한다  
**Then** `shared/lib/db.ts`에서 Prisma 클라이언트 singleton을 export하고, 앱에서 이를 사용한다  
**And** Redis는 사용하지 않는다 (Architecture)

## Tasks / Subtasks

- [x] Task 1: Prisma 설치 및 초기화
  - [x] Subtask 1.1: `@prisma/client` 및 `prisma` 패키지 설치 (이미 설치됨)
  - [x] Subtask 1.2: `prisma/schema.prisma` 파일 확인 (이미 존재)
  - [x] Subtask 1.3: PostgreSQL 데이터소스 설정 (이미 설정됨)

- [x] Task 2: User 및 Session 모델 정의
  - [x] Subtask 2.1: User 모델 정의 (NextAuth 요구 필드 포함) (이미 정의됨)
  - [x] Subtask 2.2: Session 모델 정의 (NextAuth Adapter 요구 필드) (이미 정의됨)
  - [x] Subtask 2.3: Account 모델 정의 (OAuth용) (이미 정의됨)
  - [x] Subtask 2.4: VerificationToken 모델 정의 (이메일 인증용) (이미 정의됨)

- [x] Task 3: Prisma 클라이언트 singleton 생성
  - [x] Subtask 3.1: `src/shared/lib/db.ts` 파일 생성
  - [x] Subtask 3.2: Prisma 클라이언트 singleton 패턴 구현
  - [x] Subtask 3.3: 개발 환경에서 hot reload 대응

- [ ] Task 4: 마이그레이션 적용
  - [ ] Subtask 4.1: `prisma migrate dev` 실행 (사용자가 PostgreSQL 설정 후 실행 필요)
  - [ ] Subtask 4.2: 마이그레이션 파일 생성 확인

- [ ] Task 5: 환경 변수 설정
  - [ ] Subtask 5.1: `.env`에 `DATABASE_URL` 추가 (사용자가 설정 필요)
  - [ ] Subtask 5.2: PostgreSQL 연결 확인

## Dev Notes

### Architecture Compliance

**FSD 구조:**
- Prisma 스키마는 `prisma/schema.prisma`에 구현
- Prisma 클라이언트는 `src/shared/lib/db.ts`에 구현
- Redis는 사용하지 않음

**NextAuth Adapter 요구사항:**
- User 모델: `id`, `name`, `email`, `emailVerified`, `image` 등
- Session 모델: `id`, `sessionToken`, `userId`, `expires` 등
- Account 모델 (OAuth용): `id`, `userId`, `type`, `provider`, `providerAccountId` 등
- VerificationToken 모델 (이메일 인증용): `identifier`, `token`, `expires` 등

### Technical Decisions

**데이터베이스:**
- PostgreSQL 사용 (프로덕션)
- 개발 환경에서는 SQLite도 가능하지만 PostgreSQL 권장

**Prisma 버전:**
- Prisma 6.x 또는 7.x 사용

**Singleton 패턴:**
- 개발 환경에서 hot reload 시 Prisma 클라이언트 인스턴스가 여러 개 생성되는 것을 방지

### Dependencies

- `@prisma/client`
- `prisma` (dev dependency)

### Testing Considerations

- Prisma 클라이언트 연결 테스트
- 마이그레이션 롤백 테스트

### Completion Notes List

- Prisma 스키마 확인 완료 (`prisma/schema.prisma`)
  - User 모델: NextAuth 요구 필드 포함 (id, name, email, emailVerified, image 등)
  - Session 모델: NextAuth Adapter 요구 필드 포함 (id, sessionToken, userId, expires)
  - Account 모델: OAuth용 (id, userId, type, provider, providerAccountId 등)
  - VerificationToken 모델: 이메일 인증용 (identifier, token, expires)
- Prisma 클라이언트 singleton 생성 완료 (`src/shared/lib/db.ts`)
  - 개발 환경 hot reload 대응 (globalThis 사용)
  - 개발 환경에서만 query 로그 활성화
  - 프로덕션 환경에서는 error 로그만 활성화
- Prisma 클라이언트 생성 완료 (`npx prisma generate`)
- 빌드 및 타입 검사 통과 확인
- 마이그레이션은 사용자가 PostgreSQL 데이터베이스를 설정한 후 `prisma migrate dev` 실행 필요
- 환경 변수 `DATABASE_URL` 설정 필요 (사용자가 설정)

### File List

**생성된 파일:**
- `src/shared/lib/db.ts` - Prisma 클라이언트 singleton

**기존 파일 (확인 완료):**
- `prisma/schema.prisma` - NextAuth Adapter 모델 정의 (User, Session, Account, VerificationToken)

**설치된 패키지:**
- `@prisma/client` v7.2.0 (이미 설치됨)
- `prisma` v7.2.0 (이미 설치됨)

**기술적 해결 사항:**
- Prisma 클라이언트 singleton 패턴으로 개발 환경 hot reload 시 인스턴스 중복 생성 방지
- globalThis를 사용하여 전역 변수에 Prisma 클라이언트 저장
- 개발/프로덕션 환경별 로그 레벨 설정
