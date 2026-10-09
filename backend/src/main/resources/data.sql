-- ========================================================
-- 🎲 가챠트립 (GachaTrip) 20개 테이블 초기 완성형 데이터 (data.sql)
-- ========================================================

SET REFERENTIAL_INTEGRITY FALSE;

-- 1. 기본 테스트 유저 및 관리자
MERGE INTO users (id, email, password_hash, nickname, bio, profile_image_url, auth_provider, role, is_active, language)
KEY (id)
VALUES 
(1, 'traveler@gachatrip.com', '$2a$10$dummyHashPassword1234', '행복한 여행가', '가챠트립으로 낭만 여행을 떠나요!', NULL, 'LOCAL', 'ROLE_USER', TRUE, 'ko'),
(2, 'admin@gachatrip.com', '$2a$10$dummyHashPasswordAdmin', '가챠트립 관리자', '가챠트립 시스템 관리자입니다.', NULL, 'LOCAL', 'ROLE_ADMIN', TRUE, 'ko');

-- 2. 유저 여행 설정
MERGE INTO user_preferences (id, user_id, departure_region, budget_min, budget_max, recommend_alert, location_based_recommend)
KEY (id)
VALUES (1, 1, '인천광역시', 0, 300000, TRUE, TRUE);

-- 3. 유저 관심 여행 스타일
MERGE INTO user_travel_styles (id, user_id, style) KEY (id) VALUES (1, 1, '힐링');
MERGE INTO user_travel_styles (id, user_id, style) KEY (id) VALUES (2, 1, '맛집');

-- 4. 대표 여행지 6선 (destinations)
MERGE INTO destinations (id, content_id, title, region, address, overview, image_url, capsule_image_url, latitude, longitude, is_active)
KEY (id)
VALUES 
(1, 'GANGHWA_01', '강화도 노을 산책', '인천', '인천광역시 강화군 화도면 해안남로', '서해안의 붉은 노을과 함께하는 평화로운 해변 산책 코스', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', NULL, 37.595, 126.442, TRUE),
(2, 'GANGNEUNG_01', '강릉 안목해변 커피거리', '강원', '강원특별자치도 강릉시 창해로 14번길', '파도 소리와 진한 핸드드립 커피 향이 가득한 동해안 힐링 명소', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80', NULL, 37.771, 128.948, TRUE),
(3, 'JEJU_01', '제주 협재 바다 피크닉', '제주', '제주특별자치도 제주시 한림읍 한림로 329', '에메랄드빛 바다와 비양도를 바라보며 즐기는 감성 피크닉', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', NULL, 33.394, 126.239, TRUE),
(4, 'GYEONGJU_01', '경주 황리단길 & 첨성대 야경', '경북', '경상북도 경주시 첨성로', '천년 고도의 낭만적인 한옥 카페와 별빛 아래 반짝이는 첨성대', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80', NULL, 35.834, 129.219, TRUE),
(5, 'BUSAN_01', '부산 광안리 드론쇼 & 해변', '부산', '부산광역시 수영구 광안해변로 219', '광안대교의 화려한 야경과 밤바다 버스킹이 어우러진 활기찬 여행지', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80', NULL, 35.153, 129.118, TRUE),
(6, 'YEOSU_01', '여수 낭만포차 & 밤바다', '전남', '전라남도 여수시 하멜로 102', '버스커버스커 노래와 함께 즐기는 돌산대교 야경과 해물삼합', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', NULL, 34.760, 127.662, TRUE);

-- 5. 여행지 태그 매핑 (destination_tags)
MERGE INTO destination_tags (id, destination_id, tag_name) KEY (id) VALUES (1, 1, '노을');
MERGE INTO destination_tags (id, destination_id, tag_name) KEY (id) VALUES (2, 1, '힐링');
MERGE INTO destination_tags (id, destination_id, tag_name) KEY (id) VALUES (3, 2, '바다');
MERGE INTO destination_tags (id, destination_id, tag_name) KEY (id) VALUES (4, 2, '카페');
MERGE INTO destination_tags (id, destination_id, tag_name) KEY (id) VALUES (5, 3, '에메랄드바다');
MERGE INTO destination_tags (id, destination_id, tag_name) KEY (id) VALUES (6, 4, '야경');
MERGE INTO destination_tags (id, destination_id, tag_name) KEY (id) VALUES (7, 5, '드론쇼');
MERGE INTO destination_tags (id, destination_id, tag_name) KEY (id) VALUES (8, 6, '밤바다');

-- 6. 추천 장소 목록 (places)
MERGE INTO places (id, destination_id, name, category, address, description, latitude, longitude)
KEY (id)
VALUES 
(1, 1, '동막해변', 'ATTRACTION', '인천 강화군 화도면 해안남로 1481', '세계 5대 갯벌 중 하나이자 환상적인 일몰 명소', 37.595, 126.442),
(2, 1, '토크라피 카페', 'CAFE', '인천 강화군 화도면 해안남로 1691번길', '바다가 한눈에 내려다보이는 유럽풍 감성 오션뷰 카페', 37.590, 126.450),
(3, 2, '안목해변 산책로', 'ATTRACTION', '강원 강릉시 창해로 14번길', '끝없이 펼쳐진 에메랄드 동해 바다를 따라 걷는 데크길', 37.771, 128.948),
(4, 2, '보사노바 커피로스터스', 'CAFE', '강원 강릉시 창해로 14번길 28', '루프탑에서 파도를 감상할 수 있는 스페셜티 커피 전문점', 37.772, 128.949);

-- 7. 피그마 키링 / 배지 도감 (badges)
MERGE INTO badges (id, name, description, region, unlock_condition)
KEY (id)
VALUES 
(1, '인천 강화도 일몰 키링', '강화도 노을 산책 여행을 완료하고 획득한 영롱한 3D 키링', '인천', '강화도 여행 완료'),
(2, '강릉 바다 커피 키링', '향긋한 안목해변 커피거리 가챠를 확정하여 획득한 키링', '강원', '강릉 여행 완료'),
(3, '제주 감귤 하르방 키링', '푸른 제주 협재 바다 피크닉에 다녀와 수집한 한정판 키링', '제주', '제주 여행 완료'),
(4, '경주 첨성대 달빛 키링', '천년의 별빛 아래 첨성대 야경을 감상하고 얻은 키링', '경북', '경주 여행 완료');

-- 8. 유저 획득 키링 (user_badges)
MERGE INTO user_badges (id, user_id, badge_id) KEY (id) VALUES (1, 1, 1);
MERGE INTO user_badges (id, user_id, badge_id) KEY (id) VALUES (2, 1, 2);

-- 9. 대한민국 지도 방문 지역 기록 (visited_destinations)
MERGE INTO visited_destinations (id, user_id, destination_id, visited_date)
KEY (id)
VALUES 
(1, 1, 1, '2026-09-15'),
(2, 1, 2, '2026-09-20');

-- 10. AI 코스 큐레이션 플랜 샘플 (curation_plans)
MERGE INTO curation_plans (id, user_id, destination_id, title, travel_start, travel_end, status, is_saved)
KEY (id)
VALUES (1, 1, 1, '강화도 낭만 노을 당일치기 힐링 코스', '2026-09-25', '2026-09-25', 'UPCOMING', TRUE);

-- 11. 가챠 정책 (gacha_policies)
MERGE INTO gacha_policies (id, weight_user_preference, weight_distance, weight_weather, weight_budget, weight_discovery, version, deploy_status)
KEY (id)
VALUES (1, 0.35, 0.25, 0.15, 0.15, 0.10, 'v1.0.0', 'LIVE');

SET REFERENTIAL_INTEGRITY TRUE;
