# Gachatrip Figma Design System & Specification Archive

이 폴더(`figma_specs/`)는 **피그마(Figma)에 다시 접속하지 않아도** 모든 화면 디자인, 레이아웃, CSS 세팅값, 타이포그래피, 컬러 및 원본 그래픽 에셋을 100% 동일하게 구현하고 참조할 수 있도록 정리된 **오프라인 완결형 디자인 시스템 저장소**입니다.

---

## 📂 디렉토리 구조 요약

- **`global_tokens.json`**: 전역 시그니처 컬러(노란색 `#FFE100`, 차콜 `#121212` 등), 타이포그래피 스케일, 테두리 반경 시스템
- **`assets_manifest.md` / `assets_manifest.json`**: 추출된 총 **294개**의 고화질 원본 그래픽/일러스트/사진 에셋 상세 인덱스
- **`01_onboarding_main/`**: 온보딩 4단계, 로그인, 회원가입, 메인 홈 화면의 상세 스펙 및 원본 그래픽 에셋 (56개 파일)
- **`02_gacha_draw/`**: 뽑기 기계 실물 그래픽, 손잡이, 각 지역 캡슐 볼, 개인/그룹 뽑기, 랜덤 미션 화면 스펙 (30개 파일)
- **`03_curation/`**: AI 큐레이션 인트로, 맞춤 추천 코스, 맛집/명소/일정 카드, 가기 전 팁 화면 스펙 (28개 파일)
- **`04_mytrip/`**: 전국 18개 시·도 지도 일러스트 조각, 배지 컬렉션, 여행 기록 화면 스펙 (46개 파일)
- **`05_admin/`**: 관리자 백오피스 (`ADM-01` ~ `ADM-26`) 26개 화면 전체의 픽셀 단위 레이아웃/컴포넌트 스펙

---

## 🎨 주요 디자인 토큰 (Design Tokens)

### 1. 시그니처 색상 (Color Palette)
- **Signature Yellow (브랜드 키 컬러)**: `#FFE100`
- **Dark Charcoal (헤더/배경/텍스트)**: `#121212`, `#171A2B`
- **Sub / Text Muted**: `#666666`, `#888888`, `#CCCCCC`
- **Surface / Background**: `#F8F9FA`, `#FFFFFF`, `#F0EEEA`
- **Accent Blue**: `#5667FD` (버튼 및 하이라이트)

### 2. 타이포그래피 (Typography)
- **Font Family**: `Pretendard`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
- **Title Large**: `20px` ~ `24px` (Weight: 900 Black / 700 Bold)
- **Title Medium**: `16px` ~ `18px` (Weight: 700 Bold / 900 Black)
- **Body Regular**: `14px` (Weight: 400 Regular / 500 Medium)
- **Caption / Meta**: `11px` ~ `12px` (Weight: 500 Medium / 600 SemiBold)

### 3. 컴포넌트 모서리 곡률 (Border Radius)
- **Cards & Sheets**: `16px` ~ `24px` (`rounded-2xl`, `rounded-3xl`)
- **Buttons**: `14px` ~ `16px`
- **Tags & Pills**: `9999px` (`rounded-full`)

---

## 🔍 화면별 상세 스펙 참조 방법
각 카테고리 폴더의 `screen_specs.md`와 `screen_specs.json`을 열어보시면 피그마의 Inspect 탭과 동일하게:
1. **각 요소의 가로(w)/세로(h) 크기 및 (x, y) 좌표**
2. **Auto Layout 방향(HORIZONTAL/VERTICAL), Gap(간격), Padding(상/하/좌/우 여백)**
3. **배경색(Fill Hex/RGBA), 테두리(Stroke), 그림자(Box-shadow)**
4. **텍스트 폰트, 자간, 행간, 정렬 방식 및 실제 입력된 모든 텍스트 문구**

가 1:1 완벽하게 기록되어 있습니다.
