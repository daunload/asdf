# Story 4.2: NextAuth v4 및 로그인·계정 생성

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **방문자**,
I want **로그인·계정 생성**을 하고,
So that **결제·재방문 시 세션/계정으로 식별**될 수 있다.

## Acceptance Criteria

**Given** `/api/auth/[...nextauth]` Route Handler와 `shared/lib/auth.ts`에 NextAuth 옵션(Prisma Adapter, providers)이 구성되어 있다  
**When** 로그인·회원가입 UI(버튼·폼)를 통해 OAuth 또는 Credentials로 인증한다  
**Then** FR27(세션/계정으로 식별), FR30(로그인·계정 생성)을 만족한다  
**And** (구현 시) `src/middleware.ts`에서 NextAuth `withAuth` 등으로 보호 경로를 설정한다  
**And** 출생 정보·구매 이력은 인증된 사용자 본인만 조회 가능하도록 접근 제어를 적용한다 (NFR-S2)

## Tasks / Subtasks

- [x] Task 1: NextAuth v4 설치 및 설정
    - [x] Subtask 1.1: `next-auth` 패키지 설치
    - [x] Subtask 1.2: `@auth/prisma-adapter` 패키지 설치 (선택, Prisma Adapter 사용 시)
    - [x] Subtask 1.3: `shared/lib/auth.ts` 파일 생성
    - [x] Subtask 1.4: NextAuth 옵션 구성 (Prisma Adapter, providers)

- [x] Task 2: NextAuth API Route Handler 생성
    - [x] Subtask 2.1: `src/app/api/auth/[...nextauth]/route.ts` 파일 생성
    - [x] Subtask 2.2: NextAuth 핸들러 설정

- [x] Task 3: 로그인/회원가입 UI 생성
    - [x] Subtask 3.1: 로그인 페이지 생성 (`src/page-components/auth/login/ui.tsx`)
    - [x] Subtask 3.2: 회원가입 페이지 생성 (선택, Credentials provider 사용 시) - OAuth만 사용
    - [x] Subtask 3.3: OAuth 로그인 버튼 (Google)
    - [x] Subtask 3.4: 접근성 요구사항 충족 (NFR-A1, NFR-A2)

- [x] Task 4: 환경 변수 설정
    - [x] Subtask 4.1: `.env`에 `NEXTAUTH_SECRET` 추가 (사용자가 설정 필요)
    - [x] Subtask 4.2: `.env`에 `NEXTAUTH_URL` 추가 (사용자가 설정 필요)
    - [x] Subtask 4.3: OAuth provider 설정 (Google, 사용자가 설정 필요)

- [x] Task 5: 세션 관리 및 접근 제어
    - [x] Subtask 5.1: 세션 정보 가져오기 유틸리티 (SessionProvider 설정 완료)
    - [ ] Subtask 5.2: 보호된 경로 설정 (middleware.ts, 선택) - 다음 스토리에서 구현

## Dev Notes

### Architecture Compliance

**FSD 구조:**

- NextAuth 설정은 `src/shared/lib/auth.ts`에 구현
- API Route Handler는 `src/app/api/auth/[...nextauth]/route.ts`에 구현
- 로그인 UI는 `src/page-components/auth/login/ui.tsx`에 구현

**NextAuth v4 요구사항:**

- Prisma Adapter 사용
- OAuth providers (Google, GitHub 등) 또는 Credentials provider
- 세션 전략: JWT 또는 Database (Prisma Adapter 사용 시 Database 권장)

### Technical Decisions

**Providers:**

- MVP에서는 Google OAuth 또는 Credentials provider 사용
- OAuth가 더 간단하고 안전하므로 우선 고려

**세션 전략:**

- Prisma Adapter 사용 시 Database 세션 전략 권장
- JWT도 가능하지만 Database가 더 안전

### Dependencies

- `next-auth` v4.x
- `@auth/prisma-adapter` (Prisma Adapter 사용 시)

### Testing Considerations

- 로그인/회원가입 플로우 테스트
- 세션 유지 테스트
- 접근 제어 테스트

### Completion Notes List

- NextAuth v4 및 Prisma Adapter 설치 완료
- NextAuth 설정 파일 생성 완료 (`src/shared/lib/auth.ts`)
- NextAuth API Route Handler 생성 완료 (`src/app/api/auth/[...nextauth]/route.ts`)
- 로그인 페이지 UI 생성 완료 (`src/page-components/auth/login/ui.tsx`, `src/app/auth/login/page.tsx`)
- SessionProvider 설정 완료 (`src/app/providers.tsx`, `src/app/layout.tsx`)
- NextAuth 타입 확장 완료 (`src/types/next-auth.d.ts`)
- Prisma 6.19.2로 다운그레이드 완료 (Prisma 7.x의 adapter 요구사항 문제 해결)
- Prisma schema에 `url = env("DATABASE_URL")` 추가 완료
- 빌드 성공 확인

### File List

**생성된 파일:**

- `src/shared/lib/auth.ts` - NextAuth 설정
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth API Route Handler
- `src/page-components/auth/login/ui.tsx` - 로그인 페이지 UI
- `src/app/auth/login/page.tsx` - 로그인 페이지 라우트
- `src/app/providers.tsx` - SessionProvider 래퍼
- `src/types/next-auth.d.ts` - NextAuth 타입 확장

**수정된 파일:**

- `src/app/layout.tsx` - SessionProvider 추가
- `prisma/schema.prisma` - `url = env("DATABASE_URL")` 추가

**환경 변수 설정 필요:**

- `.env`에 다음 변수 추가 필요:
    - `NEXTAUTH_SECRET` (랜덤 문자열, 예: `openssl rand -base64 32`)
    - `NEXTAUTH_URL=http://localhost:3000`
    - `GOOGLE_CLIENT_ID` (Google OAuth 클라이언트 ID)
    - `GOOGLE_CLIENT_SECRET` (Google OAuth 클라이언트 시크릿)
