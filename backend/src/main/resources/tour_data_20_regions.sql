-- =========================================================================
-- 가챠트립 (GachaTrip) 전국 20개 대표 지역/섬 여행지 데이터셋 (ID 1 ~ 20)
-- =========================================================================

-- 기존 더미 데이터 정리
DELETE FROM destinations WHERE id <= 20;

INSERT INTO destinations (id, content_id, title, region, address, image_url, capsule_image_url, overview, is_active) VALUES
(1, 'DEST_001', '서울 경복궁 & 북촌 한옥마을', '서울', '서울특별시 종로구 사직로 161', 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/1. 서울.png', '조선 왕조의 중심이자 고즈넉한 한옥 돌담길의 정취를 느낄 수 있는 도심 힐링 코스', TRUE),
(2, 'DEST_002', '인천 강화도 노을 산책 (동막해변)', '인천', '인천광역시 강화군 화도면 해안남로', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/2. 인천.png', '서해안 최고의 일몰 명소 동막해변과 고즈넉한 강화도 카페 산책', TRUE),
(3, 'DEST_003', '경기 파주 헤이리 예술마을 & 출판단지', '경기', '경기도 파주시 탄현면 헤이리마을길 70-21', 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/3. 경기.png', '갤러리와 독특한 건축물, 책과 커피 향이 머무는 감성 복합 문화 공간', TRUE),
(4, 'DEST_004', '강원 강릉 안목해변 커피거리', '강원', '강원특별자치도 강릉시 창해로 14번길', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/4. 강원.png', '푸른 동해 바다를 바라보며 향긋한 핸드드립 커피를 즐기는 낭만 여행', TRUE),
(5, 'DEST_005', '충북 단양 도담삼봉 & 만천하스카이워크', '충북', '충청북도 단양군 매포읍 삼봉로 644', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/5. 충북.png', '남한강 위에 솟은 신비로운 세 봉우리와 아찔한 절벽 전망대 힐링', TRUE),
(6, 'DEST_006', '충남 태안 꽃지해수욕장 & 붉은 노을', '충남', '충청남도 태안군 안면읍 꽃지해안로 284', 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/6. 충남.png', '할미·할아비 바위 사이로 지는 황홀한 붉은빛 서해 낙조', TRUE),
(7, 'DEST_007', '대전 엑스포 한빛탑 & 한밭수목원', '대전', '대전광역시 서구 둔산대로 169', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/7. 대전.png', '도심 속 거대한 녹음과 야간 음악분수가 반짝이는 과학과 자연의 도시', TRUE),
(8, 'DEST_008', '세종 국립세종수목원 & 금강보행교', '세종', '세종특별자치시 수목원로 136', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/8. 세종.png', '사계절 온실과 금강을 가로지르는 둥근 원형 보행교 야경 산책', TRUE),
(9, 'DEST_009', '전북 전주 한옥마을 & 경기전', '전북', '전북특별자치도 전주시 완산구 기린대로 99', 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/9. 전북.png', '한국의 맛과 멋이 담긴 700여 채의 한옥과 대나무 숲길 힐링', TRUE),
(10, 'DEST_010', '전남 여수 오동도 & 해상 케이블카', '전남', '전라남도 여수시 오동도로 222', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/10. 전남.png', '여수 밤바다의 낭만과 붉은 동백꽃길, 바다 위를 나는 케이블카', TRUE),
(11, 'DEST_011', '광주 국립아시아문화전당 & 양림동 펭귄마을', '광주', '광주광역시 동구 문화전당로 38', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/11. 광주.png', '근대 역사와 예술 감성이 공존하는 문화 중심지이자 골목길 투어', TRUE),
(12, 'DEST_012', '경북 경주 황리단길 & 첨성대 야경', '경북', '경상북도 경주시 첨성로 140-25', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/12. 경북.png', '신라 천년의 달빛 아래 빛나는 첨성대와 레트로 감성 가득한 황리단길', TRUE),
(13, 'DEST_013', '경남 통영 동피랑 벽화마을 & 디피랑', '경남', '경상남도 통영시 동피랑길 78', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/13. 경남.png', '바다가 한눈에 내려다보이는 아기자기한 벽화와 밤을 수놓는 디지털 빛의 숲', TRUE),
(14, 'DEST_014', '대구 김광석 다시그리기길 & 근대골목', '대구', '대구광역시 중구 달구벌대로 2238', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/14. 대구.png', '영원한 가객 김광석의 노래와 벽화가 울려 퍼지는 감성 골목길', TRUE),
(15, 'DEST_015', '울산 대왕암공원 & 해상 출렁다리', '울산', '울산광역시 동구 등대로 95', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/15. 울산.png', '기암괴석과 해송 숲 사이를 건너는 짜릿한 출렁다리와 푸른 바다', TRUE),
(16, 'DEST_016', '부산 광안리 드론쇼 & 해변 산책', '부산', '부산광역시 수영구 광안해변로 219', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/16. 부산.png', '광안대교의 환상적인 야경과 매주 펼쳐지는 웅장한 밤하늘 드론 라이트쇼', TRUE),
(17, 'DEST_017', '제주 협재 에메랄드 바다 & 금능 피크닉', '제주', '제주특별자치도 제주시 한림읍 한림로 329', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/17. 제주.png', '비양도가 그림처럼 떠 있는 에메랄드빛 바다와 하얀 모래사장', TRUE),
(18, 'DEST_018', '울릉도 행남 해안산책로 & 독도전망대', '울릉도', '경상북도 울릉군 울릉읍 도동길', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/18. 울릉도.png', '화산섬의 태고의 신비를 그대로 간직한 깎아지른 해안 절벽 산책로', TRUE),
(19, 'DEST_019', '독도 몽돌해변 & 천연기념물 탐방', '독도', '경상북도 울릉군 울릉읍 독도리', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/19. 독도.png', '대한민국 동쪽 제일 끝, 푸른 동해를 지키는 아름다운 화산섬', TRUE),
(20, 'DEST_020', '백령도 두무진 해식절벽 유람선 투어', '백령도', '인천광역시 옹진군 백령면 두무진길', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', '/assets/images/capsules/20. 백령도.png', '신선이 빚어놓은 듯한 천혜의 해상 비경, 두무진의 웅장한 선대암 바위들', TRUE);
