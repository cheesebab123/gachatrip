# 🧑‍💻 [혁진] 홈 & 가챠 시스템 & 여행지 DB & TourAPI

---

## 📋 1. 역할 개요
* **담당 도메인**: `gacha` (랜덤 가챠 뽑기 및 그룹 뽑기), `destination` (한국관광공사 여행지 DB)
* **핵심 기술**: 한국관광공사 TourAPI 4.0 연동, 가챠 랜덤 가중치 알고리즘, 캡슐 머신 애니메이션 인터랙션

---

## 🤖 2. AI 바이브 코딩 프롬프트 (복사해서 AI에게 입력하세요)

```text
너는 가챠트립(GachaTrip) 프로젝트에서 혁진의 파트를 전담하는 시니어 풀스택 개발자야.
담당 역할은 "메인 홈 + 가챠(랜덤 뽑기) 시스템(gacha) + 여행지 데이터베이스(destination) 및 한국관광공사 TourAPI 연동" 도메인이야.

[개발 환경 및 규칙]
1. 프론트엔드: React 18 + TypeScript + Vite, 모바일 430px 기준 웹.
   - 디자인 토큰: frontend/src/styles/tokens.css 변수 필수 사용
   - API 클라이언트: frontend/src/api/client.ts 사용
   - 상태 관리: zustand (frontend/src/stores/gachaStore.ts 등)
   - 컴포넌트 위치: frontend/src/pages/home/, frontend/src/pages/gacha/, frontend/src/pages/destinations/
2. 백엔드: Spring Boot 3.3.4 (Java 17) + JPA + MySQL 8.0
   - 패키지: backend/src/main/java/com/gachatrip/domain/{gacha, destination}/
   - 공통 응답: com.gachatrip.global.response.ApiResponse<T> 사용
   - 외부 API: 한국관광공사 TourAPI 4.0 (관광지/맛집/숙소 데이터) 수집 클라이언트 구현
3. 피그마 화면 참고: tasks/dev_b_gacha/screens/ 폴더 내 이미지 파일들을 참고해서 디자인과 똑같이 구현해줘.

이제 tasks/dev_b_gacha/README.md의 체크리스트 항목을 하나씩 요청할 테니 단계별로 완전한 코드를 작성해줘.
준비되었으면 혁진이 담당하는 8개 페이지 목록과 첫 번째로 시작할 작업을 알려줘.
```

---

## 🖼️ 3. 매핑 화면 이미지 (`screens/`)

| 페이지명 | 라우트 경로 | 피그마 이미지 파일 (`tasks/dev_b_gacha/screens/`) |
| :--- | :--- | :--- |
| **1. 메인 홈** | `/` | `13_06 · Home — Reference Redesign.png` |
| **2. 개인 가챠 조건 설정** | `/gacha/setup` | `02_개인 시작.png`, `09_개인 _ 여행 조건.png` |
| **3. 가챠 뽑기 애니메이션** | `/gacha/draw` | `04_개인 뽑기 중.png`, `03_개인뽑기-V2.png` |
| **4. 개인 가챠 결과** | `/gacha/result` | `05_개인 _ 뽑기 결과.png`, `07_뽑기 결과 - 확정하기.png` |
| **5. 그룹 가챠 대기실** | `/gacha/group/room` | `10_그룹 시작.png`, `13_그룹방 대기실.png` |
| **6. 그룹 가챠 결과** | `/gacha/group/result`| `20_그룹뽑기.png`, `21_그룹 _ 뽑기 결과.png` |
| **7. 여행지 탐색/검색** | `/destinations` | `04_여행계획_여행정보.png`, `05_여행계획_명소.png` |
| **8. 여행지 상세** | `/destinations/:id` | `08_여행계획_맛집.png` (상세 사진, 주소, 설명, 지도) |

---

## ✅ 4. 단계별 개발 체크리스트

### Phase 1: 여행지 데이터베이스 & TourAPI 연동 (`destination`)
- [x] **DB/엔티티**: `destinations`, `destination_tags` 엔티티 생성 및 MySQL 연동
- [x] **백엔드 TourAPI 연동**:
  - [x] 한국관광공사 TourAPI 4.0 클라이언트 구현 (`TourApiClient.java` - 이중 인코딩 방지 검증 로직 유지)
  - [x] 주요 대표 관광지 데이터 초기 적재(Seeding) 서비스 구현
  - [x] `GET /api/v1/destinations` (지역/카테고리/키워드 검색 및 페이징 API)
  - [x] `GET /api/v1/destinations/{id}` (여행지 상세 단건 조회 API)
- [x] **프론트엔드**:
  - [x] 여행지 검색 및 카테고리 필터 API 연동
  - [x] 여행지 상세 정보 조회 API 연동

### Phase 2: 메인 홈 화면 (`home`)
- [x] **백엔드 API**:
  - [x] `GET /api/v1/home/banners` (상단 가챠 배너 데이터)
  - [x] `GET /api/v1/home/popular-destinations` (실시간 인기 여행지 TOP 5)
- [x] **프론트엔드**:
  - [x] 메인 홈 페이지 (`/` - 상단 가챠 뽑기 배너, 피그마 디자인 토큰 및 에셋 연동)

### Phase 3: 가챠(랜덤 뽑기) 시스템 (`gacha`)
- [x] **DB/엔티티**: `gacha_draws`, `gacha_groups`, `gacha_group_members` 엔티티 생성
- [x] **백엔드 가챠 알고리즘**:
  - [x] 유저 조건(출발지역, 예산, 여행스타일) 필터링 + 가중치 랜덤 추첨 로직 (`GachaService.java`)
  - [x] `POST /api/v1/gacha/draw` (개인 가챠 뽑기 실행 API)
  - [x] `POST /api/v1/gacha/confirm/{ticketId}` (가챠 결과 여행지로 최종 확정 API)
  - [x] `POST /api/v1/gacha/redraw` (가본 곳 제외 후 재추첨 API)
  - [x] `POST /api/v1/gacha/groups` (그룹 가챠 방 생성 & 6자리 초대코드 발급 API)
  - [x] `POST /api/v1/gacha/groups/join` (초대코드로 그룹 참여 API)
  - [x] `GET /api/v1/gacha/groups/{roomCode}` (대기실 상태 및 참여자 조회 API)
- [x] **프론트엔드**:
  - [x] 가챠 조건 선택 페이지 (`/gacha/setup` / `SoloDrawPage`)
  - [x] 가챠 뽑기 연출 (`/gacha/draw` / `GachaAnimationPage` - 캡슐 머신 회전 애니메이션)
  - [x] 가챠 결과 카드 페이지 (`/gacha/result` / `SoloResultPage` - 여행지 카드, '다시 뽑기', '확정하기')
  - [x] 그룹 가챠 대기실 및 플로우 (`/gacha/group/room` / `PartyFlow` - 초대코드 복사 및 참여)

### Phase 4: 통합 테스트
- [x] 홈 -> 조건 설정 -> 가챠 뽑기 애니메이션 -> 결과 확인 및 확정 흐름 E2E 빌드 및 통합 테스트 통과
