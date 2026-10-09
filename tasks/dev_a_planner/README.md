# 🧑‍💻 [은석] AI 큐레이션 & 마이트립 플래너 & 인증

---

## 📋 1. 역할 개요
* **담당 도메인**: `auth` (인증/보안), `curation` (AI 여행 코스 큐레이션), `mytrip` (여행 일정 플래너)
* **핵심 기술**: Google Gemini REST API 연동, JSON 파싱, JWT 토큰 인터셉터, 타임라인 일정 UI

---

## 🤖 2. AI 바이브 코딩 프롬프트 (복사해서 AI에게 입력하세요)

```text
너는 가챠트립(GachaTrip) 프로젝트에서 은석의 파트를 전담하는 시니어 풀스택 개발자야.
담당 역할은 "인증(auth) + AI 여행 큐레이션(curation) + 마이트립 일정 플래너(mytrip)" 도메인이야.

[개발 환경 및 규칙]
1. 프론트엔드: React 18 + TypeScript + Vite, 모바일 430px 기준 웹.
   - 디자인 토큰: frontend/src/styles/tokens.css 변수 필수 사용
   - API 클라이언트: frontend/src/api/client.ts (JWT 자동 첨부)
   - 컴포넌트 위치: frontend/src/pages/auth/, frontend/src/pages/curation/, frontend/src/pages/mytrip/
2. 백엔드: Spring Boot 3.3.4 (Java 17) + JPA + MySQL 8.0
   - 패키지: backend/src/main/java/com/gachatrip/domain/{auth, curation, mytrip}/
   - 공통 응답: com.gachatrip.global.response.ApiResponse<T> 사용
   - AI 연동: com.gachatrip.global.infra.gemini.GeminiClient (WebClient 기반 REST API) 사용
3. 피그마 화면 참고: tasks/dev_a_planner/screens/ 폴더 내 이미지 파일들을 참고해서 디자인과 똑같이 구현해줘.

이제 tasks/dev_a_planner/README.md의 체크리스트 항목을 하나씩 요청할 테니 단계별로 완전한 코드를 작성해줘.
준비되었으면 은석이 담당하는 8개 페이지 목록과 첫 번째로 시작할 작업을 알려줘.
```

---

## 🖼️ 3. 매핑 화면 이미지 (`screens/`)

| 페이지명 | 라우트 경로 | 피그마 이미지 파일 (`tasks/dev_a_planner/screens/`) |
| :--- | :--- | :--- |
| **1. 온보딩 슬라이드** | `/onboarding` | `15_01 · Onboarding · Logo.png`, `17_온보딩 - 2.png` ~ `14_온보딩 - 5.png` |
| **2. 로그인** | `/login` | `14_온보딩 - 5.png` (하단 카카오/구글/이메일 버튼) |
| **3. 회원가입** | `/signup` | `01_06 · Sign Up.png` |
| **4. AI 큐레이션 설문** | `/curation` | `01_AI큐레이션_홈.png` |
| **5. AI 로딩 대기** | `/curation/loading` | `03_결과큐레이션_인트로.png` |
| **6. AI 코스 결과** | `/curation/result` | `07_AI여행추천_AI 추천 코스.png`, `12_AI여행추천_결과.png`, `02_AI여행추천_마이트립에 저장.png` |
| **7. 마이트립 목록** | `/mytrip` | `01_01 · 여행 지도.png`, `02_09 · 여행 기록.png` |
| **8. 마이트립 상세/일정** | `/mytrip/:id` | `06_10 · 여행 기록 상세.png`, `07_11 · 여행 기록 작성.png` |

---

## ✅ 4. 단계별 개발 체크리스트

### Phase 1: 인증 및 회원가입 (`auth`)
- [ ] **DB/엔티티**: `users`, `refresh_tokens` 엔티티 및 리포지토리 확인/생성
- [ ] **백엔드 API**:
  - [ ] `POST /api/v1/auth/signup` (이메일 회원가입)
  - [ ] `POST /api/v1/auth/login` (이메일 로그인 & JWT Access/Refresh 발급)
  - [ ] `POST /api/v1/auth/refresh` (Access Token 재발급)
  - [ ] `POST /api/v1/auth/logout` (로그아웃 & Refresh Token 무효화)
- [ ] **프론트엔드**:
  - [ ] 온보딩 슬라이드 뷰 (`/onboarding` - 스와이프 or 다음 버튼)
  - [ ] 로그인 페이지 (`/login` - 폼 검증 및 토큰 저장)
  - [ ] 회원가입 페이지 (`/signup` - 비밀번호 일치 확인, 닉네임 입력)
  - [ ] `useAuthStore` 상태 동기화 및 라우터 보호(로그인 안 한 유저 리다이렉트)

### Phase 2: AI 여행 큐레이션 (`curation`)
- [ ] **DB/엔티티**: `curations`, `curation_places` 엔티티 생성
- [ ] **백엔드 AI 연동**:
  - [ ] `GeminiClient`를 호출하여 여행 스타일/동행/예산 기반 프롬프트 전송
  - [ ] Gemini의 JSON 응답을 DTO(`CurationRecommendResponse`)로 파싱하는 서비스 구현
  - [ ] `POST /api/v1/curations/recommend` (AI 코스 추천 요청 API)
  - [ ] `POST /api/v1/curations/{id}/save-to-trip` (추천받은 코스를 마이트립으로 변환 저장 API)
- [ ] **프론트엔드**:
  - [ ] AI 큐레이션 설문 폼 페이지 (`/curation` - 스타일 태그, 일정, 분위기 선택)
  - [ ] AI 추천 로딩 연출 화면 (`/curation/loading` - Lottie 또는 스피너)
  - [ ] AI 추천 결과 상세 페이지 (`/curation/result` - Day별 추천 스팟 목록, '마이트립에 담기' 버튼)

### Phase 3: 마이트립 플래너 (`mytrip`)
- [ ] **DB/엔티티**: `trips`, `trip_days`, `trip_places` 엔티티 생성
- [ ] **백엔드 API**:
  - [ ] `GET /api/v1/trips` (내 여행 일정 목록 조회)
  - [ ] `POST /api/v1/trips` (새 여행 생성)
  - [ ] `GET /api/v1/trips/{id}` (특정 여행 Day별 상세 코스 조회)
  - [ ] `PATCH /api/v1/trips/{id}/places/order` (방문지 순서 변경)
  - [ ] `DELETE /api/v1/trips/{id}` (여행 삭제)
- [ ] **프론트엔드**:
  - [ ] 마이트립 목록 페이지 (`/mytrip` - 진행 중인 여행 / 다녀온 여행 탭)
  - [ ] Day별 일정 타임라인 상세 페이지 (`/mytrip/:id` - 지도 연동 또는 타임라인 카드 뷰)
  - [ ] 여행 메모/방문 기록 작성 모달

### Phase 4: 통합 테스트
- [ ] 회원가입 -> 로그인 -> AI 큐레이션 코스 추천 -> 마이트립 저장 흐름 E2E 테스트 통과
