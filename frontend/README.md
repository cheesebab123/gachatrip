# 🎲 가챠트립 (GachaTrip) - 프론트엔드 프로토타입 명세 및 개발 핸드오버 가이드

> **캡스톤디자인 큐레이션 & REST API 연동 파트 인수인계 문서**  
> 본 문서는 가챠트립의 전체 UI/UX 규격, 공통 컴포넌트 구조, 디자인 토큰, 타이포그래피, 라우팅 맵 및 향후 큐레이션 파트 작업 가이드를 정리한 명세서입니다.

---

## 📱 1. 레이아웃 시스템 & 뷰포트 규격

모바일 웹앱(Mobile Web App) 환경에 최적화된 프레임 규격을 사용하며, PC 브라우저 접속 시에도 중앙 정렬된 모바일 디바이스 프레임을 제공합니다.

### 1) 모바일 컨테이너 (`.mobile-container`)
* **스마트폰 디바이스**: 너비 `100vw`, 높이 `100dvh` (동적 뷰포트 100% 풀스크린)
* **데스크톱 브라우저 (`min-width: 640px`)**:
  * 최대 너비: `max-w-[440px]`
  * 최대 높이: `max-h-[900px]`
  * 모서리 곡률: `rounded-[24px]`
  * 배경 및 그림자: `shadow-[0_20px_40px_rgba(0,0,0,0.08)]` 중앙 배치
* **Safe Area 여백**:
  ```css
  padding-top: max(20px, env(safe-area-inset-top));
  padding-bottom: max(32px, env(safe-area-inset-bottom));
  ```
* **스크롤바 규격**:
  * 모바일 앱스러운 룩앤필을 위해 본문 스크롤 시 브라우저 기본 스크롤바는 투명/숨김 처리되어 있습니다 (`::-webkit-scrollbar { display: none; }`).

---

## 📐 2. 헤더, 바디, 푸터 공통 UI 규격

```
+------------------------------------------+  ▲
|  [<]            헤더 타이틀           [ ]  |  │ Header: h-[60px] (px-5)
+------------------------------------------+  ▼
|                                          |  ▲
|  [메인 히어로 카드 / 타이틀 그래픽]       |  │
|                                          |  │
|  [컨텐츠 카드 리스트 / 인터랙션 영역]      |  │ Body: flex-1 overflow-y-auto
|                                          |  │ (px-5, py-4~5, space-y-3~4)
|  [안내 문구 및 보조 정보]                 |  │
|                                          |  │
+------------------------------------------+  ▼
|  +------------------------------------+  |  ▲
|  |       [PrimaryButton 메인 액션]     |  |  │ Footer: sticky bottom-0
|  +------------------------------------+  |  │ (p-5 pb-6, bg-white/95)
|             보조 링크 / 설명 문구         |  │
+------------------------------------------+  ▼
```

### 1) 상단 헤더 (Header)
* **높이 규격**: `h-[60px]` (또는 `h-14` / 56~60px)
* **패딩**: `px-5`
* **배경 & 고정**: `bg-white` 또는 `bg-white/95 backdrop-blur-md`, `border-b border-[#F0F2FA]`, `sticky top-0 z-30`
* **좌측 뒤로가기 버튼**:
  ```tsx
  <button
    type="button"
    onClick={() => navigate(-1)}
    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#151B3F] hover:bg-[#F0F2FA] transition-colors cursor-pointer active:scale-95"
    aria-label="뒤로가기"
  >
    <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  ```
* **헤더 타이틀**: `text-[17px] font-bold text-[#151B3F] tracking-tight`
* **우측 영역**: 좌우 대칭을 위한 `<div className="w-10" />` 또는 액션 버튼/필터 뱃지

### 2) 본문 영역 (Body / Main)
* **클래스 구조**: `flex-1 overflow-y-auto px-5 py-4 space-y-4`
* **카드 컨테이너**:
  * 일반 카드: `bg-white rounded-[20px] ~ rounded-[22px] p-4.5 border border-[#E8ECF4] shadow-[0_2px_10px_rgba(0,0,0,0.02)]`
  * 대형 히어로 카드: `rounded-[26px] p-5~6 text-white`

### 3) 하단 푸터 및 CTA 버튼 (Footer & Button)
* **푸터 컨테이너**: `w-full bg-white/95 backdrop-blur-md border-t border-[#EEF1F8] p-5 pb-6 sticky bottom-0 z-30`
* **메인 CTA 버튼 (`PrimaryButton`)**:
  * 규격: 높이 `h-[54px]`, 라운딩 `rounded-[18px]`
  * 배경 그라데이션: `linear-gradient(180deg, #5863FF 0%, #7361FF 100%)`
  * 폰트: `text-[16px] font-bold text-white`
  * 그림자 & 효과: `shadow-[0_8px_20px_rgba(88,99,255,0.30)] active:scale-[0.98]`
  * 사용법:
    ```tsx
    import { PrimaryButton } from '../../components/common/PrimaryButton';

    <PrimaryButton onClick={handleClick} disabled={isLoading}>
      여행지 뽑으러 가기
    </PrimaryButton>
    ```

---

## 🎨 3. 디자인 토큰 & 컬러 팔레트 (Design Tokens)

Figma 디자인 시스템 토큰을 기반으로 정의된 정밀 컬러 규격입니다.

| 토큰 이름 | 코드 / 그라데이션 | 주요 용도 |
| :--- | :--- | :--- |
| **Primary Brand** | `#5863FF` | 메인 브랜드 컬러, 활성 아이콘, 링크, 강조 텍스트 |
| **CTA Gradient** | `linear-gradient(180deg, #5863FF 0%, #7361FF 100%)` | 모든 화면의 주요 액션 버튼 (`PrimaryButton`) |
| **General Navy (`navy gr`)** | `linear-gradient(135deg, #172050 0%, #2A3570 100%)` | 마이페이지 설정 박스, 미션 보너스 안내 배너 |
| **Group Lobby / Hero** | `linear-gradient(180deg, #242F68 0%, #455BC8 100%)` | 그룹 대기실 방 카드, AI 미션 발표 1등 히어로 카드 |
| **Accent Lime** | `#D2F800` / `#C8F026` | 🏆 1등 뱃지, 타이머 강조, 최고 확률 UP 뱃지 |
| **App Background** | `#FAFBFF` (기본 배경), `#F0F2F7` (데스크톱 배경) | 모바일 전체 배경색 |
| **Text Primary (Dark)** | `#151B3F` | 메인 헤드라인, 볼드 타이틀 |
| **Text Secondary (Sub)** | `#717A9B` / `#8C94A6` | 부제목, 설명 텍스트, 비활성 캡션 |
| **Border / Divider** | `#F0F2FA` / `#E8ECF4` | 헤더 구분선, 카드 테두리 |

---

## 🔤 4. 타이포그래피 (Typography)

* **기본 폰트**: **Pretendard** (`font-sans`)
* **영문/특수**: `-apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif`

### 주요 폰트 스케일 가이드
* **대형 타이틀 / 로고 문구**: `text-[28px] ~ text-[36px] font-black tracking-tight leading-tight text-[#151B3F]`
* **섹션 타이틀**: `text-[20px] ~ text-[24px] font-black tracking-tight text-[#151B3F]`
* **헤더 제목**: `text-[17px] font-bold text-[#151B3F]`
* **카드 메인 텍스트 / 리스트 항목**: `text-[14.5px] ~ text-[16px] font-bold`
* **설명 및 서브 텍스트**: `text-[13px] ~ text-[14px] font-medium text-[#717A9B] leading-relaxed`
* **뱃지 및 메타 정보**: `text-[11px] ~ text-[12px] font-bold`

---

## 👤 5. 캐릭터 아바타 규격 (Dot-Eyed Avatar)

모든 그룹/참여자 UI에서는 통일된 **귀여운 2-dot 눈(`• •`) 아바타**를 사용합니다.

```tsx
// 기본 규격 (2-dot 캡슐 아바타 컴포넌트 구조)
<div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${avatarColor} ring-2 ring-white flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
  <div className="flex gap-1">
    <div className="w-1 h-1.5 bg-white rounded-full shadow-sm" />
    <div className="w-1 h-1.5 bg-white rounded-full shadow-sm" />
  </div>
</div>
```

* **나연 (Purple)**: `from-[#5863FF] to-[#7B86FF]`
* **민지 (Sky Blue)**: `from-[#4EA8FE] to-[#3B92F5]`
* **수현 (Lime Green)**: `from-[#C8F026] to-[#AEE000]`

---

## 🗺️ 6. 전체 라우팅 맵 (Route Structure)

| 경로 (Path) | 컴포넌트 파일 | 설명 |
| :--- | :--- | :--- |
| `/` | `SplashPage.tsx` | 브랜드 스플래시 인트로 |
| `/onboarding` | `OnboardingPage.tsx` | 4단계 슬라이드 온보딩 가이드 |
| `/login`, `/signup` | `LoginPage.tsx`, `SignUpPage.tsx` | 이메일/소셜 로그인 및 회원가입 |
| `/home` | `HomePage.tsx` | 메인 홈 (가챠 시작 배너, 최근 여행 등) |
| `/gacha` | `GachaPage.tsx` | 가챠 모드 선택 바텀시트 (`GachaModeSelectModal`) |
| **개인 가챠 플로우** | | |
| `/gacha/condition` | `GachaConditionPage.tsx` | 개인 여행 조건 설정 (출발지, 날짜 캘린더, 동행, 스타일, 예산) |
| `/gacha/solo` | `SoloGachaPage.tsx` | 리얼 3D 물리 가챠 머신 (코인 투입 ➔ 텀블링 ➔ 캡슐 배출) |
| `/gacha/result` | `GachaResultPage.tsx` | 개인 뽑기 결과 및 SNS/QR 상세 공유 모달 |
| **그룹 가챠 & AI 미션 플로우** | | |
| `/gacha/group/create` | `GroupRoomCreatePage.tsx` | 그룹방 이름, 인원, 기간 설정 및 방 생성 |
| `/gacha/group/submit` | `GroupDestinationSubmitPage.tsx` | 멤버별 희망 여행지 1곳 선택 및 제출 |
| `/gacha/group/lobby` | `GroupLobbyPage.tsx` | 그룹 대기실 (방장 모드 / 참가자 3인 자동 입장 & 시작 시뮬레이션) |
| `/gacha/group/mission` | `GroupMissionIntroPage.tsx` | AI 랜덤 미션 안내 (5초 카운트다운 타이머) |
| `/gacha/group/mission/play` | `GroupMissionPlayPage.tsx` | 실시간 미션 채팅 (타이머 동기화, 2초 주기 채팅, 사진 인증) |
| `/gacha/group/mission/result` | `GroupMissionResultPage.tsx` | 미션 결과 발표 (1등 50%, 2등 30%, 3등 20% 차등 가중치 시각화) |
| `/gacha/group/play` | `GroupGachaPlayPage.tsx` | 그룹 뽑기 머신 (3D 회전 애니메이션 & 가중치 반영 추첨) |
| `/gacha/group/result` | `GroupGachaResultPage.tsx` | 그룹 뽑기 결과 화면 |
| `/gacha/confirmed` | `GachaConfirmedPage.tsx` | 최종 여행지 확정 화면 (3인 멤버 카드 뱃지 지원) |
| **마이페이지 서브 화면** | | |
| `/my/profile` ~ `/my/setting/*` | `EditProfilePage.tsx` 외 | 프로필 수정, 출발지/예산/알림 설정 등 |

---

## 🚀 7. 큐레이션 파트 인수인계 & 개발 가이드

다음 작업자인 **큐레이션 파트장**님께서 이어서 작업하실 때 참고하실 사항입니다:

### 1) AI 여행 코스 큐레이션 화면 연결점
* 최종 여행지가 확정되는 `/gacha/confirmed` 화면의 **`[✨ AI 여행 코스 만들기]`** 버튼 클릭 시, 큐레이션 파트의 코스 추천 화면(`/course` 또는 `/curation`)으로 연결되도록 설계되어 있습니다.
* 여행지 파라미터(`?destination=제주도&mode=group` 등)를 넘겨받아 해당 지역에 맞는 AI 맞춤 코스/일정 생성 뷰를 개발하시면 됩니다.

### 2) REST API 전환 시 주요 목업 데이터 포인트
1. **가챠 조건 조회 및 제출**:
   * `GachaConditionPage.tsx`의 동행자/스타일/예산 선택값을 `POST /api/v1/gacha/conditions`로 전송.
2. **그룹방 생성 및 웹소켓/폴링 연동**:
   * `GroupRoomCreatePage.tsx` ➔ `POST /api/v1/rooms`
   * `GroupLobbyPage.tsx` ➔ `GET /api/v1/rooms/{roomId}` (또는 WebSocket을 통한 멤버 실시간 입장/레디 상태 수신)
3. **AI 미션 출제 및 사진 업로드**:
   * `GroupMissionPlayPage.tsx` ➔ `POST /api/v1/missions/{missionId}/submissions` (멀티파트 이미지 파일 업로드)
   * 미션 통과 여부 및 제출 순위(`submissionRank`) 수신.
4. **가챠 결과 추첨 API**:
   * `GroupGachaPlayPage.tsx` ➔ `POST /api/v1/gacha/draw` (가중치 기반 추첨 결과 수신).

---

## 🛠️ 개발 환경 실행 방법

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행 (Vite)
npm run dev

# 프로덕션 빌드 및 타입 검사
npm run build
```
