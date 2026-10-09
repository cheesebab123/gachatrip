# 📡 가챠트립 (GachaTrip) 실전 REST API 명세서 (혼자 뽑기 & 여행지)

> 본 문서는 **혼자 뽑기(솔로 가챠), 재뽑기, 여행지 확정 및 20개 지역 데이터 조회**에 사용되는 실제 백엔드 REST API 규격서입니다.  
> *(Base URL: `http://localhost:8080/api/v1`)*

---

## 1. 혼자 뽑기 (Gacha Draw) API

### 1.1 개인 가챠 뽑기 실행
* **엔드포인트**: `POST /api/v1/gacha/draw`
* **설명**: 사용자가 선택한 조건(스타일, 거리, 선호지역 등)을 기반으로 백엔드 DB에서 여행지 1곳을 랜덤 추첨하여 티켓을 발급합니다.
* **Request Header**:
  * `Content-Type`: `application/json`
  * `X-User-Id`: `1` *(선택: 로그인한 사용자 ID, 미지정 시 게스트 1번 유저)*

* **Request Body** (JSON):
```json
{
  "style": "healing",
  "date": "2026.10.15",
  "budget": "10만원 이하",
  "distance": 150,
  "preferredRegions": ["강원도", "제주도"],
  "companion": "alone",
  "memberCount": 1,
  "excludeConditions": ["비행기 필요"]
}
```

* **Response Body (200 OK)**:
```json
{
  "id": 105,
  "name": "강릉 안목해변 커피거리",
  "regionName": "강원",
  "summary": "푸른 동해 바다를 바라보며 향긋한 핸드드립 커피를 즐기는 낭만 여행",
  "description": "강원특별자치도 강릉시 창해로 14번길",
  "hashtags": ["#바다여행", "#커피거리", "#힐링"],
  "imageUrl": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
  "capsuleImageUrl": "/assets/images/capsules/4. 강원.png",
  "travelTime": "KTX 1시간 40분",
  "weather": "맑음 22°",
  "estimatedBudget": 120000,
  "confirmed": false,
  "isGroup": false
}
```

---

### 1.2 다시 뽑기 (재추첨)
* **엔드포인트**: `POST /api/v1/gacha/redraw?ticketId={ticketId}`
* **설명**: 마음에 들지 않아 [다시 뽑기]를 눌렀을 때 이전 티켓과 겹치지 않는 새로운 여행지를 재추첨합니다.
* **Query Parameters**:
  * `ticketId`: `105` (이전 티켓 번호)

* **Response Body (200 OK)**:
```json
{
  "id": 106,
  "name": "경주 황리단길 & 첨성대 야경",
  "regionName": "경북",
  "summary": "신라 천년의 달빛 아래 빛나는 첨성대와 레트로 감성 가득한 황리단길",
  "description": "경상북도 경주시 첨성로 140-25",
  "hashtags": ["#레트로", "#야경", "#감성골목"],
  "imageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
  "capsuleImageUrl": "/assets/images/capsules/12. 경북.png",
  "travelTime": "KTX 2시간",
  "weather": "선선함 20°",
  "estimatedBudget": 150000,
  "confirmed": false,
  "isGroup": false
}
```

---

### 1.3 이 여행지로 확정하기
* **엔드포인트**: `POST /api/v1/gacha/confirm/{ticketId}`
* **설명**: 뽑힌 여행지를 최종 확정하고 DB의 상태를 `CONFIRMED`로 변경합니다.
* **Path Variables**:
  * `ticketId`: `106`

* **Response Body (200 OK)**:
```json
{
  "id": 106,
  "name": "경주 황리단길 & 첨성대 야경",
  "regionName": "경북",
  "summary": "신라 천년의 달빛 아래 빛나는 첨성대와 레트로 감성 가득한 황리단길",
  "confirmed": true,
  "confirmedAt": "2026-10-09T19:10:00"
}
```

---

## 2. 여행지 (Destination) 조회 API

### 2.1 메인 홈 인기 여행지 TOP 5 조회
* **엔드포인트**: `GET /api/v1/destinations/popular`
* **설명**: 메인 홈 화면의 '인기 여행지' 섹션에 노출할 5개 대표 여행지를 조회합니다.

* **Response Body (200 OK)**:
```json
[
  {
    "id": 17,
    "title": "제주 협재 에메랄드 바다 & 금능 피크닉",
    "region": "제주",
    "address": "제주특별자치도 제주시 한림읍 한림로 329",
    "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "capsuleImageUrl": "/assets/images/capsules/17. 제주.png",
    "overview": "비양도가 그림처럼 떠 있는 에메랄드빛 바다와 하얀 모래사장",
    "tags": ["#바다", "#힐링", "#노을"]
  },
  {
    "id": 4,
    "title": "강원 강릉 안목해변 커피거리",
    "region": "강원",
    "address": "강원특별자치도 강릉시 창해로 14번길",
    "imageUrl": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    "capsuleImageUrl": "/assets/images/capsules/4. 강원.png",
    "overview": "푸른 동해 바다를 바라보며 향긋한 핸드드립 커피를 즐기는 낭만 여행",
    "tags": ["#동해", "#커피", "#카페거리"]
  }
]
```

### 2.2 여행지 단건 상세 조회
* **엔드포인트**: `GET /api/v1/destinations/{id}`
* **Path Variables**: `id` (1 ~ 20)
* **Response Body (200 OK)**:
```json
{
  "id": 1,
  "contentId": "DEST_001",
  "title": "서울 경복궁 & 북촌 한옥마을",
  "region": "서울",
  "address": "서울특별시 종로구 사직로 161",
  "imageUrl": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80",
  "capsuleImageUrl": "/assets/images/capsules/1. 서울.png",
  "overview": "조선 왕조의 중심이자 고즈넉한 한옥 돌담길의 정취를 느낄 수 있는 도심 힐링 코스",
  "isActive": true
}
```
