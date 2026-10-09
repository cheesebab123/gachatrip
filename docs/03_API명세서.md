# 가챠트립 (GachaTrip) API 명세서

> 작성일: 2026-09-20
> 기술 스택: **React TypeScript** (Frontend) · **Java Spring Boot** (Backend) · **MySQL**
> 기준 문서: 기능명세서.md · ER다이어그램.md

---

## 목차
1. [공통 규약](#1-공통-규약)
2. [인증 API — `/auth`](#2-인증-api--auth)
3. [회원 API — `/users`](#3-회원-api--users)
4. [여행지 API — `/destinations`](#4-여행지-api--destinations)
5. [가챠 뽑기 API — `/gacha`](#5-가챠-뽑기-api--gacha)
6. [AI 큐레이션 API — `/curation`](#6-ai-큐레이션-api--curation)
7. [마이트립 API — `/mytrip`](#7-마이트립-api--mytrip)
8. [알림 API — `/notifications`](#8-알림-api--notifications)
9. [운영 API — `/support`](#9-운영-api--support)
10. [관리자 API — `/admin`](#10-관리자-api--admin)
11. [WebSocket 명세 — 그룹 가챠방](#11-websocket-명세--그룹-가챠방)
12. [에러 코드 정의](#12-에러-코드-정의)

---

## 1. 공통 규약

### Base URL
```
(개발) http://localhost:8080/api/v1
(운영) https://api.gachatrip.app/api/v1
```

### 공통 Request Header
| Header | 필수 | 설명 |
|---|---|---|
| `Content-Type` | ✅ | `application/json` |
| `Authorization` | 인증 필요 시 | `Bearer {accessToken}` |
| `Accept-Language` | ❌ | `ko` / `en` (기본값 `ko`) |

### 공통 Response 형식
```json
{
  "success": true,
  "data": { ... },
  "message": "OK"
}
```
```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "해당 사용자를 찾을 수 없습니다."
  }
}
```

### 인증 방식
- **JWT Bearer Token** (Access Token: 1시간 / Refresh Token: 30일)
- Access Token 만료 시 `/auth/refresh` 로 갱신
- 관리자 API는 별도 `ROLE_ADMIN` 권한 검증

### 페이지네이션 (목록 API 공통)
```
GET /endpoint?page=0&size=20&sort=createdAt,desc
```
```json
{
  "data": {
    "content": [ ... ],
    "page": 0,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5,
    "last": false
  }
}
```

---

## 2. 인증 API — `/auth`

### 2-1. 이메일 회원가입
```
POST /auth/signup
인증: 불필요
```

**Request Body**
```json
{
  "email": "user@gachatrip.app",
  "password": "password1234!",
  "nickname": "여행자이은지"
}
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "email": "user@gachatrip.app",
    "nickname": "여행자이은지",
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

**Validation**
- `email`: 이메일 형식 필수
- `password`: 8자 이상
- `nickname`: 2~10자, 한글·영문·숫자, 중복 불가

---

### 2-2. 이메일 로그인
```
POST /auth/login
인증: 불필요
```

**Request Body**
```json
{
  "email": "user@gachatrip.app",
  "password": "password1234!"
}
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "nickname": "여행자이은지",
    "profileImageUrl": "https://cdn.gachatrip.app/profiles/...",
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

---

### 2-3. 소셜 로그인 (카카오 / Google / Apple)
```
POST /auth/oauth/{provider}
인증: 불필요
provider: kakao | google | apple
```

**Request Body**
```json
{
  "authorizationCode": "oauth_code_from_client",
  "redirectUri": "gachatrip://oauth/callback"
}
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "userId": 42,
    "nickname": "카카오유저",
    "isNewUser": true,
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```
> `isNewUser: true`이면 프론트에서 온보딩/프로필 초기 설정 화면으로 이동

---

### 2-4. 토큰 갱신
```
POST /auth/refresh
인증: 불필요
```

**Request Body**
```json
{
  "refreshToken": "eyJhbGci..."
}
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

---

### 2-5. 로그아웃
```
POST /auth/logout
인증: 필요
```

**Request Body**
```json
{
  "refreshToken": "eyJhbGci..."
}
```

**Response 200**
```json
{
  "success": true,
  "message": "로그아웃 완료"
}
```

---

### 2-6. 닉네임 중복 확인
```
GET /auth/check-nickname?nickname={value}
인증: 불필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "available": true
  }
}
```

---

## 3. 회원 API — `/users`

### 3-1. 내 프로필 조회
```
GET /users/me
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@gachatrip.app",
    "nickname": "여행자이은지",
    "bio": "가챠트립으로 새로운 여행지 탐험 중!",
    "profileImageUrl": "https://cdn.gachatrip.app/...",
    "authProvider": "KAKAO",
    "travelStyles": ["HEALING", "FOOD"],
    "preference": {
      "departureRegion": "서울/경기",
      "budgetMin": 100000,
      "budgetMax": 500000,
      "recommendAlert": true,
      "locationBasedRecommend": false
    },
    "stats": {
      "visitedRegionCount": 4,
      "totalTripCount": 10,
      "badgeCount": 4
    },
    "nicknameChangedAt": "2026-08-20",
    "createdAt": "2026-01-15T09:00:00"
  }
}
```

---

### 3-2. 프로필 수정
```
PATCH /users/me
인증: 필요
```

**Request Body**
```json
{
  "bio": "새 소개글",
  "travelStyles": ["ACTIVITY", "MOOD"],
  "preference": {
    "departureRegion": "부산",
    "budgetMin": 200000,
    "budgetMax": 800000,
    "recommendAlert": true,
    "locationBasedRecommend": true
  }
}
```

**Response 200** — 수정된 프로필 전체 반환

---

### 3-3. 닉네임 변경
```
PATCH /users/me/nickname
인증: 필요
```

**Request Body**
```json
{
  "nickname": "은지의여행상자"
}
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "nickname": "은지의여행상자",
    "nicknameChangedAt": "2026-09-20"
  }
}
```

**Error Cases**
| 에러 코드 | 상황 |
|---|---|
| `NICKNAME_CHANGE_TOO_SOON` | 변경 후 30일 미경과 |
| `NICKNAME_DUPLICATE` | 이미 사용 중인 닉네임 |
| `NICKNAME_INVALID_FORMAT` | 형식 오류 (2~10자, 한글·영문·숫자) |

---

### 3-4. 비밀번호 변경
```
PATCH /users/me/password
인증: 필요
```

**Request Body**
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password123!"
}
```

---

### 3-5. 프로필 이미지 업로드
```
POST /users/me/profile-image
인증: 필요
Content-Type: multipart/form-data
```

**Request Body (form-data)**
```
file: [이미지 파일]
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "profileImageUrl": "https://cdn.gachatrip.app/profiles/uuid.jpg"
  }
}
```

---

### 3-6. 연동 소셜 계정 목록
```
GET /users/me/linked-accounts
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": [
    { "provider": "KAKAO", "linkedAt": "2026-01-15T09:00:00" },
    { "provider": "GOOGLE", "linkedAt": null }
  ]
}
```

---

### 3-7. 회원 탈퇴
```
DELETE /users/me
인증: 필요
```

**Request Body**
```json
{
  "reason": "서비스를 이용하지 않게 됐어요"
}
```

---

## 4. 여행지 API — `/destinations`

### 4-1. 여행지 목록 조회
```
GET /destinations?region={region}&tag={tag}&page=0&size=20
인증: 불필요
```

**Query Parameters**
| 파라미터 | 필수 | 설명 |
|---|---|---|
| `region` | ❌ | 지역 필터 (서울, 부산, 제주 등) |
| `tag` | ❌ | 태그 필터 (바다여행, 힐링 등) |
| `isActive` | ❌ | 활성 여행지만 조회 (기본값 true) |

**Response 200**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "name": "제주도",
        "region": "제주",
        "description": "푸른 바다와 낭만이 가득한 여행지",
        "thumbnailUrl": "https://cdn.gachatrip.app/destinations/jeju.jpg",
        "capsuleImageUrl": "https://cdn.gachatrip.app/capsules/jeju.png",
        "tags": ["바다여행", "야경", "낭만"],
        "isActive": true
      }
    ],
    "totalElements": 50
  }
}
```

---

### 4-2. 여행지 상세 조회
```
GET /destinations/{destinationId}
인증: 불필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "제주도",
    "region": "제주",
    "description": "푸른 바다와 커피 향이 어우러진 제주도...",
    "thumbnailUrl": "...",
    "capsuleImageUrl": "...",
    "tags": ["바다여행", "야경", "낭만"],
    "latitude": 33.4996,
    "longitude": 126.5312,
    "places": [
      {
        "id": 10,
        "name": "함덕해수욕장",
        "category": "ATTRACTION",
        "address": "제주 제주시 조천읍",
        "imageUrl": "...",
        "latitude": 33.5437,
        "longitude": 126.6698
      }
    ],
    "isActive": true
  }
}
```

---

## 5. 가챠 뽑기 API — `/gacha`

### 5-1. 개인 뽑기 실행
```
POST /gacha/solo/draw
인증: 필요
```

**Request Body**
```json
{
  "travelStyle": "HEALING",
  "departureRegion": "서울/경기",
  "budgetMin": 100000,
  "budgetMax": 500000,
  "duration": "1박2일",
  "desiredDestination": "바다가 보이는 곳"
}
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "gachaResultId": 101,
    "roomId": 55,
    "destination": {
      "id": 1,
      "name": "제주도",
      "region": "제주",
      "description": "푸른 바다와 낭만이 가득한, 지금 떠나기 좋은 여행지에요.",
      "thumbnailUrl": "...",
      "tags": ["바다여행", "야경", "낭만"]
    },
    "isConfirmed": false,
    "drawnAt": "2026-09-20T14:30:00"
  }
}
```

---

### 5-2. 개인 뽑기 — 가본 곳 제외 후 재뽑기
```
POST /gacha/solo/redraw
인증: 필요
```

**Request Body**
```json
{
  "roomId": 55,
  "excludeDestinationId": 1
}
```

**Response 200** — 5-1과 동일한 형식의 새 뽑기 결과

---

### 5-3. 뽑기 결과 확정
```
POST /gacha/results/{gachaResultId}/confirm
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "gachaResultId": 101,
    "destinationId": 1,
    "destinationName": "제주도",
    "isConfirmed": true,
    "confirmedAt": "2026-09-20T14:35:00"
  }
}
```

---

### 5-4. 뽑기 결과 공유 링크 생성
```
POST /gacha/results/{gachaResultId}/share
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "shareUrl": "https://gachatrip.app/share/result/abc123"
  }
}
```

---

### 5-5. 그룹 방 생성 (방장)
```
POST /gacha/group/rooms
인증: 필요
```

**Request Body**
```json
{
  "maxMembers": 4
}
```

**Response 201**
```json
{
  "success": true,
  "data": {
    "roomId": 20,
    "roomCode": "R8K2Q1",
    "inviteUrl": "https://gachatrip.app/join/R8K2Q1",
    "hostUserId": 1,
    "maxMembers": 4,
    "status": "WAITING",
    "step": "대기실",
    "createdAt": "2026-09-20T14:00:00"
  }
}
```

---

### 5-6. 그룹 방 참여 (초대 코드)
```
POST /gacha/group/rooms/join
인증: 필요
```

**Request Body**
```json
{
  "roomCode": "R8K2Q1"
}
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "roomId": 20,
    "roomCode": "R8K2Q1",
    "members": [
      {
        "userId": 1,
        "nickname": "김가현",
        "profileImageUrl": "...",
        "isHost": true,
        "status": "ONLINE"
      },
      {
        "userId": 2,
        "nickname": "이민수",
        "isHost": false,
        "status": "ONLINE"
      }
    ]
  }
}
```

---

### 5-7. 그룹 방 정보 조회
```
GET /gacha/group/rooms/{roomId}
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "roomId": 20,
    "roomCode": "R8K2Q1",
    "status": "WAITING",
    "step": "대기실",
    "maxMembers": 4,
    "members": [ ... ],
    "conditions": [ ... ]
  }
}
```

---

### 5-8. 그룹 뽑기 조건 입력
```
POST /gacha/group/rooms/{roomId}/conditions
인증: 필요
```

**Request Body**
```json
{
  "travelStyle": "FOOD",
  "departureRegion": "서울/경기",
  "budgetMin": 200000,
  "budgetMax": 600000,
  "duration": "2박3일",
  "desiredDestination": "바다"
}
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "conditionId": 80,
    "roomId": 20,
    "userId": 2
  }
}
```

---

### 5-9. 그룹 뽑기 시작 (방장 전용)
```
POST /gacha/group/rooms/{roomId}/draw
인증: 필요 (방장만 가능)
```

**Response 200** — 서버가 뽑기 실행 후 WebSocket으로 결과 Push

```json
{
  "success": true,
  "data": {
    "message": "뽑기가 시작되었습니다."
  }
}
```

---

### 5-10. 그룹 뽑기 결과 투표
```
POST /gacha/group/rooms/{roomId}/vote
인증: 필요
```

**Request Body**
```json
{
  "gachaResultId": 105,
  "isAgreed": true
}
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "voteId": 200,
    "totalVotes": 3,
    "agreedCount": 3,
    "isFinalized": false
  }
}
```

---

### 5-11. 개인 뽑기 여행 조건 설정 화면 데이터 조회
```
GET /gacha/solo/condition-options
인증: 불필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "travelStyles": ["HEALING", "FOOD", "ACTIVITY", "MOOD"],
    "departureRegions": ["서울/경기", "강원도", "충청도", "전라도", "경상도", "제주도"],
    "durations": ["당일치기", "1박2일", "2박3일", "3박4일이상"],
    "budgetRanges": [
      { "label": "10만원 이하", "min": 0, "max": 100000 },
      { "label": "10~30만원", "min": 100000, "max": 300000 },
      { "label": "30~50만원", "min": 300000, "max": 500000 },
      { "label": "50만원 이상", "min": 500000, "max": 9999999 }
    ]
  }
}
```

---

### 5-12. AI 랜덤 미션 생성
```
POST /gacha/results/{gachaResultId}/missions
인증: 필요
```

**Response 201**
```json
{
  "success": true,
  "data": {
    "missionId": 30,
    "gachaResultId": 101,
    "missions": [
      { "id": 1, "content": "현지 재래시장에서 점심을 해결하세요!", "isCompleted": false },
      { "id": 2, "content": "해가 질 때 해변에서 사진을 찍어보세요!", "isCompleted": false },
      { "id": 3, "content": "처음 보는 메뉴를 주문해보세요!", "isCompleted": false }
    ],
    "generatedAt": "2026-09-20T14:40:00"
  }
}
```

---

### 5-13. 미션 완료 처리
```
PATCH /gacha/missions/{missionId}/complete
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "missionId": 1,
    "isCompleted": true,
    "completedAt": "2026-09-21T12:30:00"
  }
}
```

---

## 6. AI 큐레이션 API — `/curation`

### 6-1. AI 큐레이션 생성 요청
```
POST /curation
인증: 필요
```

**Request Body**
```json
{
  "gachaResultId": 101,
  "travelStart": "2026-10-01",
  "travelEnd": "2026-10-02"
}
```

**Response 202 (Accepted — 비동기 처리)**
```json
{
  "success": true,
  "data": {
    "curationPlanId": 50,
    "status": "GENERATING",
    "message": "AI가 맞춤 코스를 생성 중입니다. 완료되면 알림을 보내드릴게요."
  }
}
```
> 생성 완료 시 Push Notification + WebSocket 이벤트 발송

---

### 6-2. AI 큐레이션 생성 상태 확인
```
GET /curation/{curationPlanId}/status
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "curationPlanId": 50,
    "status": "DONE",
    "aiGeneratedAt": "2026-09-20T14:45:00"
  }
}
```
> `status`: `GENERATING` | `DONE` | `FAILED`

---

### 6-3. 큐레이션 목록 조회
```
GET /curation?status={status}&page=0&size=20
인증: 필요
status: UPCOMING | ONGOING | PAST (미입력 시 전체)
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "curationPlanId": 50,
        "destination": {
          "id": 1,
          "name": "강원도 강릉",
          "thumbnailUrl": "..."
        },
        "travelStart": "2026-10-01",
        "travelEnd": "2026-10-02",
        "duration": "1박 2일",
        "dday": 12,
        "status": "UPCOMING",
        "tags": ["바다여행", "카페투어", "힐링"],
        "aiRecommendedPlaceCount": 12,
        "isSaved": true
      }
    ],
    "totalElements": 5
  }
}
```

---

### 6-4. 큐레이션 상세 조회
```
GET /curation/{curationPlanId}
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "curationPlanId": 50,
    "destination": { "id": 1, "name": "강원도 강릉", "thumbnailUrl": "..." },
    "travelStart": "2026-10-01",
    "travelEnd": "2026-10-02",
    "status": "UPCOMING",
    "isSaved": true,
    "dailyCourses": [
      {
        "dayNumber": 1,
        "places": [
          {
            "order": 1,
            "place": {
              "id": 10,
              "name": "함덕해수욕장",
              "category": "ATTRACTION",
              "address": "강릉시 주문진읍",
              "imageUrl": "...",
              "latitude": 37.7749,
              "longitude": 128.8922
            },
            "tip": "오전 일찍 방문하면 사람이 적어요!"
          }
        ]
      },
      {
        "dayNumber": 2,
        "places": [ ... ]
      }
    ],
    "aiGeneratedAt": "2026-09-20T14:45:00"
  }
}
```

---

### 6-5. 큐레이션 마이트립에 저장
```
POST /curation/{curationPlanId}/save
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "curationPlanId": 50,
    "isSaved": true,
    "savedAt": "2026-09-20T15:00:00"
  }
}
```

---

### 6-6. 큐레이션 공유 링크 생성
```
POST /curation/{curationPlanId}/share
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "shareUrl": "https://gachatrip.app/share/curation/xyz789"
  }
}
```

---

## 7. 마이트립 API — `/mytrip`

### 7-1. 여행 지도 데이터 조회
```
GET /mytrip/map
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "visitedRegions": ["서울", "부산", "제주", "대구"],
    "stats": {
      "visitedRegionCount": 4,
      "totalTripCount": 10,
      "badgeCount": 4
    }
  }
}
```

---

### 7-2. 지역별 여행 기록 조회
```
GET /mytrip/map/{region}
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "region": "제주",
    "visitedDestinations": [
      {
        "destinationId": 1,
        "name": "제주도",
        "visitedDate": "2026-07-04",
        "thumbnailUrl": "..."
      }
    ]
  }
}
```

---

### 7-3. 여행 기록 목록 조회 (연도별)
```
GET /mytrip/records?year={year}&page=0&size=20
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "year": 2026,
    "content": [
      {
        "recordId": 1,
        "destination": {
          "id": 1,
          "name": "강원도 강릉",
          "thumbnailUrl": "..."
        },
        "travelDate": "2026-09-14",
        "duration": "1박 2일",
        "memo": "파도 소리 들으며 커피 한 잔...",
        "photoUrl": "...",
        "curationPlanId": 50
      }
    ],
    "totalElements": 10
  }
}
```

---

### 7-4. 여행 기록 추가
```
POST /mytrip/records
인증: 필요
Content-Type: multipart/form-data
```

**Request Body (form-data)**
```
destinationId: 1
travelDate: 2026-09-14
duration: 1박2일
memo: 파도 소리 들으며...
photo: [이미지 파일, 선택]
curationPlanId: 50 (선택)
```

**Response 201**
```json
{
  "success": true,
  "data": {
    "recordId": 15,
    "destinationId": 1,
    "destinationName": "강원도 강릉",
    "travelDate": "2026-09-14"
  }
}
```

---

### 7-5. 여행 기록 수정
```
PATCH /mytrip/records/{recordId}
인증: 필요
```

**Request Body**
```json
{
  "memo": "수정된 여행 메모",
  "travelDate": "2026-09-15"
}
```

---

### 7-6. 여행 기록 삭제
```
DELETE /mytrip/records/{recordId}
인증: 필요
```

---

### 7-7. 배지(키링) 목록 조회
```
GET /mytrip/badges
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "earned": [
      {
        "badgeId": 1,
        "name": "제주 키링",
        "description": "제주도 첫 방문!",
        "imageUrl": "...",
        "region": "제주",
        "acquiredAt": "2026-07-04T20:00:00"
      }
    ],
    "locked": [
      {
        "badgeId": 10,
        "name": "강원 키링",
        "description": "강원도를 방문하면 획득할 수 있어요",
        "imageUrl": "...",
        "region": "강원",
        "unlockCondition": "강원도 방문"
      }
    ]
  }
}
```

---

## 8. 알림 API — `/notifications`

### 8-1. 알림 목록 조회
```
GET /notifications?page=0&size=20
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "notificationId": 1,
        "type": "CURATION_READY",
        "title": "AI 큐레이션 완성!",
        "body": "강원도 강릉 여행 코스가 생성되었어요.",
        "isRead": false,
        "createdAt": "2026-09-20T15:00:00"
      }
    ],
    "unreadCount": 3
  }
}
```

---

### 8-2. 알림 읽음 처리
```
PATCH /notifications/{notificationId}/read
인증: 필요
```

---

### 8-3. 알림 전체 읽음 처리
```
PATCH /notifications/read-all
인증: 필요
```

---

### 8-4. FCM 토큰 등록
```
POST /notifications/fcm-token
인증: 필요
```

**Request Body**
```json
{
  "fcmToken": "firebase_token_string",
  "deviceType": "IOS"
}
```

---

## 9. 운영 API — `/support`

### 9-1. 1:1 문의 작성
```
POST /support/inquiries
인증: 필요
```

**Request Body**
```json
{
  "title": "뽑기가 작동하지 않아요",
  "content": "뽑기 버튼을 눌러도 결과가 나오지 않습니다."
}
```

---

### 9-2. 내 문의 목록
```
GET /support/inquiries
인증: 필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "inquiryId": 1,
        "title": "뽑기가 작동하지 않아요",
        "status": "ANSWERED",
        "answer": "안녕하세요, 확인 후 처리해드렸습니다.",
        "createdAt": "2026-09-19T10:00:00",
        "answeredAt": "2026-09-19T13:00:00"
      }
    ]
  }
}
```

---

### 9-3. 신고 접수
```
POST /support/reports
인증: 필요
```

**Request Body**
```json
{
  "targetUserId": 99,
  "reason": "스팸/광고성 메시지"
}
```

---

### 9-4. 공지사항 목록
```
GET /support/notices?page=0&size=20
인증: 불필요
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "noticeId": 1,
        "title": "가챠트립 v1.8 업데이트 안내",
        "isPublished": true,
        "createdAt": "2026-09-15T10:00:00"
      }
    ]
  }
}
```

---

### 9-5. 공지사항 상세
```
GET /support/notices/{noticeId}
인증: 불필요
```

---

## 10. 관리자 API — `/admin`

> 모든 관리자 API는 `ROLE_ADMIN` 권한 필요  
> Base: `/admin`

---

### 10-1. 대시보드 지표 조회
```
GET /admin/dashboard
인증: 필요 (ADMIN)
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "todaySignups": 45,
    "todayGachaCount": 312,
    "activeGroupRooms": 24,
    "pendingInquiries": 7,
    "pendingReports": 3
  }
}
```

---

### 10-2. 여행지 목록 조회 (관리자)
```
GET /admin/destinations?page=0&size=20&isActive={bool}
인증: 필요 (ADMIN)
```

---

### 10-3. 여행지 등록
```
POST /admin/destinations
인증: 필요 (ADMIN)
Content-Type: multipart/form-data
```

**Request Body (form-data)**
```
name: 제주도
region: 제주
description: 설명 텍스트
latitude: 33.4996
longitude: 126.5312
thumbnail: [이미지]
capsuleImage: [이미지]
tags: 바다여행,야경,낭만
```

---

### 10-4. 여행지 수정
```
PUT /admin/destinations/{destinationId}
인증: 필요 (ADMIN)
```

---

### 10-5. 여행지 활성/비활성 처리
```
PATCH /admin/destinations/{destinationId}/status
인증: 필요 (ADMIN)
```

**Request Body**
```json
{
  "isActive": false
}
```

---

### 10-6. 가챠 정책 조회 (현재 Live)
```
GET /admin/gacha/policy/live
인증: 필요 (ADMIN)
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "policyId": 5,
    "version": "v1.8.3",
    "deployStatus": "LIVE",
    "weights": {
      "userPreference": 0.35,
      "distance": 0.25,
      "weather": 0.15,
      "budget": 0.15,
      "discovery": 0.10
    },
    "rules": {
      "excludeRecent30Days": true,
      "excludeInactive": true,
      "penalizeBadWeather": true,
      "limitSameRegion": true,
      "correctMetroBias": false
    },
    "deployedAt": "2026-09-15T10:20:00"
  }
}
```

---

### 10-7. 가챠 정책 임시 저장
```
POST /admin/gacha/policy/draft
인증: 필요 (ADMIN)
```

**Request Body**
```json
{
  "weights": {
    "userPreference": 0.40,
    "distance": 0.20,
    "weather": 0.15,
    "budget": 0.15,
    "discovery": 0.10
  },
  "rules": {
    "excludeRecent30Days": true,
    "excludeInactive": true,
    "penalizeBadWeather": true,
    "limitSameRegion": true,
    "correctMetroBias": true
  }
}
```

**Validation**: `weights` 값의 합계 = 1.0 (100%)

---

### 10-8. 가챠 정책 시뮬레이션 실행
```
POST /admin/gacha/policy/{policyId}/simulate
인증: 필요 (ADMIN)
```

**Request Body**
```json
{
  "sampleCount": 10000
}
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "sampleCount": 10000,
    "distribution": [
      { "category": "자연", "ratio": 0.324 },
      { "category": "도심", "ratio": 0.276 },
      { "category": "바다", "ratio": 0.221 },
      { "category": "이색", "ratio": 0.179 }
    ]
  }
}
```

---

### 10-9. 가챠 정책 배포 (Draft → Live)
```
POST /admin/gacha/policy/{policyId}/deploy
인증: 필요 (ADMIN)
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "policyId": 6,
    "version": "v1.8.4",
    "deployStatus": "LIVE",
    "deployedAt": "2026-09-20T15:30:00"
  }
}
```

---

### 10-10. 가챠 정책 롤백
```
POST /admin/gacha/policy/{policyId}/rollback
인증: 필요 (ADMIN)
```

---

### 10-11. 가챠 정책 변경 이력 조회
```
GET /admin/gacha/policy/history?page=0&size=10
인증: 필요 (ADMIN)
```

---

### 10-12. 그룹 가챠방 목록 조회 (실시간 모니터링)
```
GET /admin/gacha/rooms?status={status}&page=0&size=20
인증: 필요 (ADMIN)
status: WAITING | DRAWING | RESULT | CLOSED | ERROR
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "activeSummary": {
      "activeRooms": 24,
      "waitingRooms": 9,
      "votingRooms": 11,
      "errorRooms": 2
    },
    "content": [
      {
        "roomId": 20,
        "roomCode": "R8K2Q1",
        "hostNickname": "김가현",
        "memberCount": 4,
        "maxMembers": 4,
        "step": "결과 확인",
        "status": "RESULT",
        "statusLabel": "정상",
        "createdAt": "2026-09-20T14:32:00"
      }
    ]
  }
}
```

---

### 10-13. 그룹 가챠방 상세 조회
```
GET /admin/gacha/rooms/{roomId}
인증: 필요 (ADMIN)
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "roomId": 20,
    "roomCode": "R8K2Q1",
    "step": "결과 확인",
    "progressPercent": 85,
    "members": [
      {
        "userId": 1,
        "nickname": "김가현",
        "isHost": true,
        "memberStatus": "선택 완료",
        "isOnline": true
      }
    ],
    "recentEvents": [
      { "timestamp": "14:36:12", "event": "추천 결과 생성 완료" },
      { "timestamp": "14:35:48", "event": "투표 집계 완료" }
    ]
  }
}
```

---

### 10-14. 그룹 가챠방 강제 종료
```
POST /admin/gacha/rooms/{roomId}/force-close
인증: 필요 (ADMIN)
```

---

### 10-15. 그룹 뽑기 결과 재전송
```
POST /admin/gacha/rooms/{roomId}/resend-result
인증: 필요 (ADMIN)
```

---

### 10-16. 회원 목록 조회
```
GET /admin/users?keyword={keyword}&page=0&size=20
인증: 필요 (ADMIN)
```

---

### 10-17. 회원 상세 조회
```
GET /admin/users/{userId}
인증: 필요 (ADMIN)
```

---

### 10-18. 회원 제재 (경고 / 정지 / 탈퇴)
```
POST /admin/users/{userId}/sanction
인증: 필요 (ADMIN)
```

**Request Body**
```json
{
  "action": "SUSPEND",
  "reason": "허위 정보 게시",
  "suspendUntil": "2026-10-20T00:00:00"
}
```
> `action`: `WARN` | `SUSPEND` | `WITHDRAW`

---

### 10-19. 1:1 문의 목록 조회 (관리자)
```
GET /admin/inquiries?status={status}&page=0&size=20
인증: 필요 (ADMIN)
status: PENDING | ANSWERED
```

---

### 10-20. 1:1 문의 답변
```
POST /admin/inquiries/{inquiryId}/answer
인증: 필요 (ADMIN)
```

**Request Body**
```json
{
  "answer": "안녕하세요, 확인 후 처리해드렸습니다."
}
```

---

### 10-21. 신고 목록 조회
```
GET /admin/reports?status={status}&page=0&size=20
인증: 필요 (ADMIN)
```

---

### 10-22. 신고 처리
```
PATCH /admin/reports/{reportId}
인증: 필요 (ADMIN)
```

**Request Body**
```json
{
  "status": "RESOLVED",
  "memo": "규정 위반 확인, 7일 계정 정지 조치"
}
```

---

### 10-23. 공지사항 등록
```
POST /admin/notices
인증: 필요 (ADMIN)
```

**Request Body**
```json
{
  "title": "가챠트립 v1.9 업데이트",
  "content": "마이트립 배지 시스템이 추가되었습니다.",
  "isPublished": true
}
```

---

### 10-24. 통계 조회
```
GET /admin/statistics?type={type}&from={date}&to={date}
인증: 필요 (ADMIN)
type: daily | weekly | monthly
```

**Response 200**
```json
{
  "success": true,
  "data": {
    "gachaStats": {
      "totalDraws": 3120,
      "soloDraws": 2400,
      "groupDraws": 720
    },
    "regionDistribution": [
      { "region": "제주", "count": 820, "ratio": 0.263 },
      { "region": "강원", "count": 650, "ratio": 0.209 }
    ],
    "newUsers": 145,
    "activeUsers": 890
  }
}
```

---

## 11. WebSocket 명세 — 그룹 가챠방

**연결 URL**
```
ws://api.gachatrip.app/ws/gacha-room/{roomId}
Header: Authorization: Bearer {accessToken}
```

**사용 라이브러리**: Spring WebSocket (STOMP) / SockJS

---

### Subscribe 채널 (클라이언트 → 서버 구독)

| 채널 | 설명 |
|---|---|
| `/topic/room/{roomId}` | 방 전체 브로드캐스트 (참여자 입장/퇴장, 뽑기 시작/완료) |
| `/user/queue/room/{roomId}` | 개인별 메시지 (투표 결과, 에러 등) |

---

### Publish 채널 (클라이언트 → 서버 전송)

| 채널 | 설명 |
|---|---|
| `/app/room/{roomId}/ready` | 조건 입력 완료 (준비됨) 신호 |
| `/app/room/{roomId}/vote` | 투표 전송 |

---

### 서버 → 클라이언트 이벤트 메시지 형식

**멤버 참여 이벤트**
```json
{
  "type": "MEMBER_JOINED",
  "data": {
    "userId": 3,
    "nickname": "박서연",
    "memberCount": 3,
    "maxMembers": 4
  }
}
```

**뽑기 시작 이벤트**
```json
{
  "type": "DRAW_STARTED",
  "data": {
    "message": "뽑기가 시작되었어요!"
  }
}
```

**뽑기 결과 이벤트**
```json
{
  "type": "DRAW_RESULT",
  "data": {
    "gachaResultId": 105,
    "destination": {
      "id": 1,
      "name": "제주도",
      "region": "제주",
      "thumbnailUrl": "...",
      "tags": ["바다여행", "야경"]
    }
  }
}
```

**투표 현황 이벤트**
```json
{
  "type": "VOTE_UPDATE",
  "data": {
    "totalVotes": 3,
    "agreedCount": 3,
    "disagreeCount": 0,
    "isFinalized": true,
    "finalResult": "AGREED"
  }
}
```

**방 오류 이벤트**
```json
{
  "type": "ROOM_ERROR",
  "data": {
    "errorCode": "DRAW_FAILED",
    "message": "뽑기 중 오류가 발생했어요. 다시 시도해주세요."
  }
}
```

---

## 12. 에러 코드 정의

### HTTP 상태 코드 규칙
| 상태 코드 | 의미 |
|---|---|
| `200 OK` | 성공 |
| `201 Created` | 생성 성공 |
| `202 Accepted` | 비동기 처리 시작 |
| `400 Bad Request` | 요청 파라미터 오류 |
| `401 Unauthorized` | 인증 토큰 없음 / 만료 |
| `403 Forbidden` | 권한 부족 |
| `404 Not Found` | 리소스 없음 |
| `409 Conflict` | 중복 / 상태 충돌 |
| `500 Internal Server Error` | 서버 오류 |

---

### 비즈니스 에러 코드

| 에러 코드 | HTTP | 설명 |
|---|---|---|
| `EMAIL_DUPLICATE` | 409 | 이미 사용 중인 이메일 |
| `NICKNAME_DUPLICATE` | 409 | 이미 사용 중인 닉네임 |
| `NICKNAME_CHANGE_TOO_SOON` | 409 | 닉네임 변경 30일 미경과 |
| `NICKNAME_INVALID_FORMAT` | 400 | 닉네임 형식 오류 |
| `INVALID_PASSWORD` | 400 | 현재 비밀번호 불일치 |
| `USER_NOT_FOUND` | 404 | 사용자 없음 |
| `TOKEN_EXPIRED` | 401 | 액세스 토큰 만료 |
| `TOKEN_INVALID` | 401 | 유효하지 않은 토큰 |
| `REFRESH_TOKEN_EXPIRED` | 401 | 리프레시 토큰 만료 → 재로그인 |
| `DESTINATION_NOT_FOUND` | 404 | 여행지 없음 |
| `DESTINATION_INACTIVE` | 400 | 비활성 여행지 |
| `GACHA_ROOM_NOT_FOUND` | 404 | 가챠 방 없음 |
| `GACHA_ROOM_FULL` | 409 | 방 정원 초과 |
| `GACHA_ROOM_CLOSED` | 409 | 이미 종료된 방 |
| `GACHA_ROOM_NOT_HOST` | 403 | 방장 권한 없음 |
| `GACHA_RESULT_NOT_FOUND` | 404 | 뽑기 결과 없음 |
| `GACHA_ALREADY_CONFIRMED` | 409 | 이미 확정된 뽑기 결과 |
| `CURATION_NOT_FOUND` | 404 | 큐레이션 없음 |
| `CURATION_STILL_GENERATING` | 409 | AI 생성 진행 중 |
| `TRAVEL_RECORD_NOT_FOUND` | 404 | 여행 기록 없음 |
| `TRAVEL_RECORD_FORBIDDEN` | 403 | 본인 기록이 아님 |
| `POLICY_WEIGHT_INVALID` | 400 | 가중치 합계가 100%가 아님 |
| `INQUIRY_NOT_FOUND` | 404 | 문의 없음 |
| `REPORT_DUPLICATE` | 409 | 이미 신고한 사용자 |
| `ADMIN_ONLY` | 403 | 관리자 전용 API |
| `FILE_TOO_LARGE` | 400 | 이미지 파일 크기 초과 |
| `FILE_INVALID_TYPE` | 400 | 지원하지 않는 파일 형식 |
