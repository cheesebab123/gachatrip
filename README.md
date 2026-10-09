# 🎯 가챠트립 (GachaTrip)

> **"여행을 뽑는다!"**  
> 사용자의 취향과 조건을 반영한 랜덤 뽑기 메커니즘과 AI 맞춤 큐레이션으로 즐거운 여행을 제안하는 서비스

---

## 📚 프로젝트 설계 및 명세 문서 바로가기

모든 기획 및 아키텍처 명세는 `docs/` 디렉토리에 정리되어 있습니다:

| 문서명 | 주요 내용 | 링크 |
|---|---|---|
| **01. 기능명세서** | 화면별 상세 요구사항, 비즈니스 규칙, 유저 플로우 | [docs/01_기능명세서.md](docs/01_기능명세서.md) |
| **02. ER 다이어그램** | 20개 테이블 전체 Mermaid ERD, 속성/외래키/Enum 정의 | [docs/02_ER다이어그램.md](docs/02_ER다이어그램.md) |
| **03. API 명세서** | 67개 REST API 명세, WebSocket STOMP 규격, 에러 코드 | [docs/03_API명세서.md](docs/03_API명세서.md) |
| **04. 프로젝트 구조** | React TS + Spring Boot 디렉토리 설계, 도메인 분담 | [docs/04_프로젝트구조.md](docs/04_프로젝트구조.md) |

---

## 🛠️ 기술 스택 (Tech Stack)

### Frontend
- **Language & Framework**: TypeScript, React 18, Vite 5
- **Routing & State**: React Router v6, TanStack React Query v5, Zustand v5
- **Communication**: Axios, STOMP.js / SockJS (WebSocket)
- **Style**: Mobile-First Viewport, CSS Custom Properties (Design Tokens)

### Backend
- **Language & Framework**: Java 17, Spring Boot 3.3.4
- **Security & Auth**: Spring Security, JWT (jjwt 0.12.6)
- **Data & Persistence**: Spring Data JPA, QueryDSL, MySQL 8.0, Flyway
- **Real-Time & Communication**: Spring WebSocket (STOMP), WebClient
- **External Integration**: Google Gemini 1.5 Flash REST API (순수 API Key 방식), 한국관광공사 TourAPI 4.0

### Infrastructure & DevOps
- **Local Infra**: Docker Compose (MySQL 8.0 + Redis 7.2)
- **Storage**: AWS S3
- **Push**: Firebase Cloud Messaging (FCM)

---

## 👥 백엔드 3인 도메인 분업 가이드

> 충돌을 방지하기 위해 **도메인(기능) 기준**으로 패키지를 분리했습니다.  
> 각 개발자는 자신이 담당하는 패키지 디렉토리 내부에서 Controller, Service, Repository, DTO를 작업합니다.

```
com.gachatrip/
├── global/          --> 🤝 3명 공동 관리 (Security, Response, Exception)
│
├── auth/            --> 🧑‍💻 개발자 A (회원가입, 로그인, OAuth, JWT)
├── user/            --> 🧑‍💻 개발자 A (프로필, 닉네임 변경 30일 제한, 설정)
├── notification/    --> 🧑‍💻 개발자 A (FCM 푸시 알림)
├── support/         --> 🧑‍💻 개발자 A (1:1 문의, 신고, 공지사항)
│
├── destination/     --> 🧑‍💻 개발자 B (여행지 조회, 한국관광공사 TourAPI 동기화)
├── gacha/           --> 🧑‍💻 개발자 B (개인/그룹 뽑기 알고리즘, WebSocket 실시간 투표, AI 미션)
│
├── curation/        --> 🧑‍💻 개발자 C (Google Gemini AI 맞춤 코스 비동기 생성 @Async)
├── mytrip/          --> 🧑‍💻 개발자 C (18개 시도 여행 지도, 기록 CRUD, 배지 획득)
└── admin/           --> 🧑‍💻 개발자 C (웹 백오피스 대시보드, 정책 설정, 방 모니터링)
```

각 도메인 패키지 내부의 상세 가이드:
- [auth 가이드](backend/src/main/java/com/gachatrip/auth/README.md)
- [user 가이드](backend/src/main/java/com/gachatrip/user/README.md)
- [destination 가이드](backend/src/main/java/com/gachatrip/destination/README.md)
- [gacha 가이드](backend/src/main/java/com/gachatrip/gacha/README.md)
- [curation 가이드](backend/src/main/java/com/gachatrip/curation/README.md)
- [mytrip 가이드](backend/src/main/java/com/gachatrip/mytrip/README.md)
- [notification 가이드](backend/src/main/java/com/gachatrip/notification/README.md)
- [support 가이드](backend/src/main/java/com/gachatrip/support/README.md)
- [admin 가이드](backend/src/main/java/com/gachatrip/admin/README.md)

---

## 🚀 로컬 개발 환경 실행 방법

### 1단계: 필수 서버 인프라 구동 (Docker)
로컬에 **Docker Desktop**이 설치되어 있다면 다음 명령어로 MySQL 8.0과 Redis가 한 번에 실행됩니다:

```bash
# 프로젝트 루트에서 실행
docker-compose up -d
```
- **MySQL**: `localhost:3306` (DB: `gachatrip`, User: `gachatrip_user` / PW: `gachatrip_pass123!`)
- **Redis**: `localhost:6379`
- *Flyway 마이그레이션 스크립트(`V1__init_schema.sql`)에 의해 백엔드 구동 시 20개 테이블이 자동 생성됩니다.*

### 2단계: 백엔드 (Spring Boot) 실행
```bash
cd backend

# 환경변수 파일 준비 (.env.example 참고)
# IntelliJ 또는 터미널에서 Gradle 실행
./gradlew bootRun
```
- **Swagger API 문서**: `http://localhost:8080/swagger-ui.html`

### 3단계: 프론트엔드 (React) 실행
```bash
cd frontend

# 의존성 패키지 설치
npm install

# 로컬 개발 서버 실행
npm run dev
```
- **프론트엔드 로컬 서버**: `http://localhost:3000`

---

## 🔀 Git 브랜치 전략 & 협업 규칙

1. **브랜치 네이밍**:
   - `main`: 프로덕션 배포 브랜치
   - `develop`: 개발 통합 브랜치
   - `feature/{domain}-{기능}`: 기능 개발 브랜치 (예: `feature/gacha-solo-draw`, `feature/auth-kakao`)
2. **도메인 간 참조 규칙**:
   - 서로 다른 도메인의 Entity를 직접 참조하지 않고, **ID(`Long`)** 로 연결합니다.
   - 타 도메인의 데이터가 필요할 경우 Repository 또는 Service 인터페이스를 주입받아 사용합니다.
3. **공통 응답 통일**:
   - 백엔드의 모든 API 응답은 `ApiResponse<T>` 래퍼를 사용합니다.
   - 예외 발생 시 `BusinessException(ErrorCode.XXX)`를 발생시켜 일관된 에러 JSON을 반환합니다.
