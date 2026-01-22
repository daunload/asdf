# Docker를 통한 PostgreSQL 설정

## 사전 요구사항

1. **Docker Desktop 설치 및 실행**
    - [Docker Desktop 다운로드](https://www.docker.com/products/docker-desktop/)
    - Docker Desktop을 설치하고 실행하세요.

## 설정 방법

### 1. 환경 변수 설정

`.env` 파일에 다음 내용을 추가하거나 업데이트하세요:

```env
DATABASE_URL="postgresql://natalchart:natalchart_dev_password@localhost:5432/natalchart?schema=public"
```

### 2. Docker Compose로 PostgreSQL 실행

```bash
# PostgreSQL 컨테이너 시작
docker-compose up -d

# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs postgres
```

### 3. Prisma 마이그레이션 실행

PostgreSQL이 실행된 후:

```bash
# 마이그레이션 생성 및 적용
npx prisma migrate dev --name init

# 또는 기존 마이그레이션이 있다면
npx prisma migrate deploy
```

### 4. Prisma Studio로 데이터베이스 확인 (선택)

```bash
npx prisma studio
```

## 유용한 명령어

```bash
# 컨테이너 중지
docker-compose stop

# 컨테이너 중지 및 제거 (데이터는 유지됨)
docker-compose down

# 컨테이너 중지 및 제거 + 볼륨 삭제 (데이터 삭제)
docker-compose down -v

# 컨테이너 재시작
docker-compose restart

# PostgreSQL에 직접 연결
docker-compose exec postgres psql -U natalchart -d natalchart
```

## 문제 해결

### Docker Desktop이 실행되지 않는 경우

- Docker Desktop을 시작하세요.
- Windows의 경우 WSL 2가 필요할 수 있습니다.

### 포트 5432가 이미 사용 중인 경우

`docker-compose.yml`에서 포트를 변경하세요:

```yaml
ports:
    - '5433:5432' # 호스트 포트를 5433으로 변경
```

그리고 `.env`의 `DATABASE_URL`도 포트를 5433으로 변경하세요.

### 데이터베이스 연결 오류

- Docker 컨테이너가 실행 중인지 확인: `docker-compose ps`
- 컨테이너 로그 확인: `docker-compose logs postgres`
- 환경 변수 확인: `.env` 파일의 `DATABASE_URL`이 올바른지 확인
