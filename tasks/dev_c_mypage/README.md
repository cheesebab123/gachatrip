# 🧑‍💻 [수민] 마이페이지 설정 & 알림 & 북마크

---

## 📋 1. 역할 개요
* **담당 도메인**: `user` (마이페이지 & 회원 정보 설정), `notification` (알림 센터), `bookmark` (찜한 여행지)
* **핵심 특징**: **"DB에서 가져와서 보여주기(GET) + 수정해서 저장하기(PATCH)"** 중심의 명확하고 깔끔한 개발 파트

---

## 🤖 2. AI 바이브 코딩 프롬프트 (복사해서 AI에게 입력하세요)

```text
너는 가챠트립(GachaTrip) 프로젝트에서 수민의 파트를 전담하는 시니어 풀스택 개발자야.
담당 역할은 "마이페이지(user) + 알림(notification) + 찜 목록(bookmark)" 도메인이야.

[개발 환경 및 규칙]
1. 프론트엔드: React 18 + TypeScript + Vite, 모바일 430px 기준 웹.
   - 디자인 토큰: frontend/src/styles/tokens.css 변수 필수 사용
   - API 클라이언트: frontend/src/api/client.ts 사용
   - 컴포넌트 위치: frontend/src/pages/mypage/, frontend/src/pages/notifications/
2. 백엔드: Spring Boot 3.3.4 (Java 17) + JPA + MySQL 8.0
   - 패키지: backend/src/main/java/com/gachatrip/domain/user/, backend/src/main/java/com/gachatrip/domain/notification/
   - 공통 응답: com.gachatrip.global.response.ApiResponse<T> 사용
3. 피그마 화면 참고: tasks/dev_c_mypage/screens/ 폴더 내 이미지 파일들을 참고해서 디자인과 똑같이 구현해줘.

코드에 주석을 친절하게 달아주고, tasks/dev_c_mypage/README.md의 체크리스트 항목을 하나씩 단계별로 진행해줘.
준비되었으면 수민이 만들어야 하는 4개 페이지 목록과 가장 먼저 시작할 작업을 알려줘.
```

---

## 🖼️ 3. 매핑 화면 이미지 (`screens/`)

| 페이지명 | 라우트 경로 | 피그마 이미지 파일 (`tasks/dev_c_mypage/screens/`) |
| :--- | :--- | :--- |
| **1. 마이페이지 메인** | `/mypage` | `16_07 · My Page.png` |
| **2. 프로필 및 취향 설정**<br>*(설정 항목 통합 페이지)* | `/mypage/edit` | `02_08 · Detail · Profile Edit.png`<br>`03_09 · Detail · Nickname.png`<br>`04_10 · Detail · Password.png`<br>`06_12 · Detail · Departure Region.png`<br>`07_13 · Detail · Travel Style.png`<br>`08_14 · Detail · Budget.png`<br>`09_15 · Detail · Recommendation Alerts.png`<br>`11_17 · Detail · Language.png`<br>`12_18 · Detail · App Version.png` |
| **3. 알림 센터 목록** | `/notifications` | `09_15 · Detail · Recommendation Alerts.png` (수신 알림 리스트) |
| **4. 찜(북마크) 목록** | `/mypage/bookmarks`| `09_06 · 배지 컬렉션.png` (저장한 여행지 카드 그리드) |

---

## ✅ 4. 단계별 개발 체크리스트

### Phase 1: 마이페이지 조회 및 프로필 수정 (`user`)
- [ ] **백엔드 API**:
  - [ ] `GET /api/v1/users/me` (내 프로필 및 설정 정보 조회 API)
  - [ ] `PATCH /api/v1/users/me/profile` (닉네임, 프로필 이미지 변경 API)
  - [ ] `PATCH /api/v1/users/me/password` (비밀번호 변경 API)
  - [ ] `PATCH /api/v1/users/me/preferences` (출발지역, 여행스타일 태그, 예산 변경 API)
  - [ ] `PATCH /api/v1/users/me/notifications` (알림 수신 여부 ON/OFF 토글 API)
- [ ] **프론트엔드**:
  - [ ] 마이페이지 메인 페이지 (`/mypage` - 내 프로필 요약 카드, 메뉴 목록, 앱 버전 표기)
  - [ ] 프로필/취향 설정 통합 페이지 (`/mypage/edit`):
    - [ ] 닉네임 입력 폼 및 중복 확인
    - [ ] 비밀번호 변경 폼 (현재 비밀번호, 새 비밀번호 확인)
    - [ ] 출발 지역 선택 (서울, 경기, 부산 등 선택 드롭다운/라디오)
    - [ ] 선호 여행 스타일 태그 선택 (힐링, 액티비티, 맛집 등 칩 다중선택)
    - [ ] 기본 예산대 선택 슬라이더 또는 버튼
    - [ ] 알림 허용 토글 스위치

### Phase 2: 알림 센터 (`notification`)
- [ ] **DB/엔티티**: `notifications` 엔티티 생성
- [ ] **백엔드 API**:
  - [ ] `GET /api/v1/notifications` (내 알림 목록 최신순 조회 API)
  - [ ] `PATCH /api/v1/notifications/{id}/read` (알림 단건 읽음 처리 API)
  - [ ] `PATCH /api/v1/notifications/read-all` (알림 전체 읽음 처리 API)
- [ ] **프론트엔드**:
  - [ ] 알림 센터 페이지 (`/notifications` - 알림 아이콘, 알림 내용, 경과 시간, 읽음/안읽음 시각적 구분)

### Phase 3: 찜(북마크) 목록 (`bookmark`)
- [ ] **DB/엔티티**: `bookmarks` 엔티티 생성
- [ ] **백엔드 API**:
  - [ ] `GET /api/v1/bookmarks` (내가 찜한 여행지 목록 페이징 조회 API)
  - [ ] `DELETE /api/v1/bookmarks/{id}` (찜 해제 API)
- [ ] **프론트엔드**:
  - [ ] 찜 목록 페이지 (`/mypage/bookmarks` - 여행지 사진 카드, 하트 토글 버튼, 클릭 시 여행지 상세로 이동)

### Phase 4: 동작 확인 테스트
- [ ] 마이페이지 진입 -> 닉네임 변경 -> 변경된 닉네임이 메인에 잘 반영되는지 확인
- [ ] 알림 목록 조회 및 읽음 처리 동작 확인
- [ ] 찜 목록 조회 및 찜 해제 동작 확인
