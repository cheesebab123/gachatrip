# 🚀 가챠트립(GachaTrip) 팀 바이브 코딩(AI Pair-Programming) 분업 가이드

본 문서는 **3명의 개발자가 각자의 AI 에이전트(Cursor, Claude Code, Antigravity, ChatGPT 등)를 활용하여 충돌 없이 빠르고 일관되게 개발(Vibe Coding)**할 수 있도록 설계된 종합 분업 가이드입니다.

---

## 📌 1. 팀원별 역할 분담

관리자 웹 페이지는 최종 단계로 미루고, **사용자 웹(Web) 서비스를 기준**으로 도메인별로 분담했습니다.

```
tasks/
├── README.md                      # [현재 파일] 전체 분업 및 AI 바이브코딩 공통 규칙
├── dev_a_planner/                 # 은석 : AI 큐레이션 & 마이트립 & 인증
│   ├── README.md                  # 은석 전용 AI 프롬프트, 체크리스트, API/DB 가이드
│   └── screens/                   # 피그마 디자인 캡처 이미지
├── dev_b_gacha/                   # 혁진 : 홈 & 가챠 시스템 & 여행지 DB
│   ├── README.md                  # 혁진 전용 AI 프롬프트, 체크리스트, API/DB 가이드
│   └── screens/                   # 피그마 디자인 캡처 이미지
└── dev_c_mypage/                  # 수민 : 마이페이지 설정 & 알림 & 찜
    ├── README.md                  # 수민 전용 AI 프롬프트, 체크리스트, API/DB 가이드
    └── screens/                   # 피그마 디자인 캡처 이미지
```

| 담당자 | 담당 도메인 (풀스택) | 핵심 기술 |
| :--- | :--- | :--- |
| **은석** | `auth` + `curation` + `mytrip` | Google Gemini AI REST API, JWT 인증, 여행 일정 플래너 |
| **혁진** | `gacha` + `destination` | 한국관광공사 TourAPI 4.0, 가챠 확률 알고리즘, 애니메이션 |
| **수민** | `user` + `notification` + `bookmark` | 폼 수정(PATCH), 알림/찜 리스트 조회(GET), CRUD |

---

## 🤖 2. 바이브 코딩(AI 프롬프트) 사용 3단계 원칙

각 팀원은 본인의 IDE에서 AI에게 작업을 시킬 때 아래 3단계를 그대로 따릅니다.

### 1단계: AI에게 내 역할 주입 (처음 대화 시작 시)
각자 본인 폴더의 `tasks/dev_x_xxx/README.md` 상단에 적힌 **"AI 프롬프트 템플릿"**을 복사해서 AI에게 첫 메시지로 전송합니다.

### 2단계: 체크리스트 단위로 1개씩 구현 요청
한 번에 모든 걸 만들라고 하지 말고, **체크리스트의 항목 1~2개씩 끊어서** 요청합니다.
> **예시 프롬프트:**  
> *"체크리스트 중 `1. 온보딩 슬라이드 페이지 (/onboarding)` 프론트엔드부터 구현해줘. `tasks/dev_a_planner/screens/17_온보딩 - 2.png` 이미지를 참고하고 스타일은 `frontend/src/styles/tokens.css`를 써줘."*

### 3단계: 완료 후 체크박스 표시 (`- [x]`) 및 Git 커밋
구현과 동작 테스트가 끝나면 본인 폴더의 `README.md` 체크리스트를 `[x]`로 갱신하고 커밋합니다.

---

## 🛠️ 3. 개발 환경 및 공통 규칙 (충돌 방지 필독!)

### ① 백엔드 공통 규칙 (Spring Boot 3.3.4)
* **모든 API 응답**: `com.gachatrip.global.response.ApiResponse<T>` 규격을 사용합니다.
  ```java
  return ResponseEntity.ok(ApiResponse.success(data));
  ```
* **예외 처리**: 새 에러 코드가 필요하면 `com.gachatrip.global.exception.ErrorCode`에 본인 도메인 코드를 추가하고 `CustomException(ErrorCode.XXX)`을 던집니다.
* **패키지 격리**: 본인 도메인 디렉토리(`backend/src/main/java/com/gachatrip/domain/{본인도메인}/`) 내부에서만 작업하여 파일 충돌을 방지합니다.

### ② 프론트엔드 공통 규칙 (React 18 + Vite + TS)
* **API 호출**: `frontend/src/api/client.ts`의 `apiClient` 인스턴스를 사용합니다. (JWT 토큰 자동 첨부 및 401 자동 갱신 내장)
* **디자인 토큰**: 색상, 여백, 폰트는 반드시 `frontend/src/styles/tokens.css`의 CSS 변수를 사용합니다. (`var(--color-primary)`, `var(--radius-card)` 등)
* **공통 컴포넌트 재사용**: `frontend/src/components/common/`에 이미 생성된 버튼(`Button`), 헤더(`AppHeader`, `BackHeader`), 하단바(`BottomNavigation`)를 활용합니다.
* **화면 너비**: 모바일 뷰 규격(최대 430px 중앙 정렬)이 이미 `frontend/src/styles/global.css`에 잡혀 있으므로 바깥 컨테이너 크기를 임의로 수정하지 마세요.

### ③ Git 브랜치 전략
* `main`: 배포용 브랜치 (직접 Push 금지)
* `develop`: 개발 통합 브랜치
* 각자 작업 브랜치:
  * 은석: `feature/a-auth-curation-mytrip`
  * 혁진: `feature/b-gacha-destination`
  * 수민: `feature/c-mypage-notification`
* 작업 완료 시 `develop` 브랜치로 PR(Pull Request)을 생성하여 머지합니다.
