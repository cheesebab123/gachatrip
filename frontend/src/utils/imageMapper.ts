// 1. 전국 20종 캡슐 이미지 Import
import capsuleSeoul from '../assets/images/capsules/1. 서울.png';
import capsuleIncheon from '../assets/images/capsules/2. 인천.png';
import capsuleGyeonggi from '../assets/images/capsules/3. 경기.png';
import capsuleGangwon from '../assets/images/capsules/4. 강원.png';
import capsuleChungbuk from '../assets/images/capsules/5. 충북.png';
import capsuleChungnam from '../assets/images/capsules/6. 충남.png';
import capsuleDaejeon from '../assets/images/capsules/7. 대전.png';
import capsuleSejong from '../assets/images/capsules/8. 세종.png';
import capsuleJeonbuk from '../assets/images/capsules/9. 전북.png';
import capsuleJeonnam from '../assets/images/capsules/10. 전남.png';
import capsuleGwangju from '../assets/images/capsules/11. 광주.png';
import capsuleGyeongbuk from '../assets/images/capsules/12. 경북.png';
import capsuleGyeongnam from '../assets/images/capsules/13. 경남.png';
import capsuleDaegu from '../assets/images/capsules/14. 대구.png';
import capsuleUlsan from '../assets/images/capsules/15. 울산.png';
import capsuleBusan from '../assets/images/capsules/16. 부산.png';
import capsuleJeju from '../assets/images/capsules/17. 제주.png';
import capsuleUlleung from '../assets/images/capsules/18. 울릉도.png';
import capsuleDokdo from '../assets/images/capsules/19. 독도.png';
import capsuleBaengnyeong from '../assets/images/capsules/20. 백령도.png';

// 2. 전국 20종 확정 카드 이미지 Import
import cardSeoul from '../assets/images/cards/1. 서울.png';
import cardIncheon from '../assets/images/cards/2. 인천.png';
import cardGyeonggi from '../assets/images/cards/3. 경기.png';
import cardGangwon from '../assets/images/cards/4. 강원.png';
import cardChungbuk from '../assets/images/cards/5. 충북.png';
import cardChungnam from '../assets/images/cards/6. 충남.png';
import cardDaejeon from '../assets/images/cards/7. 대전.png';
import cardSejong from '../assets/images/cards/8. 세종.png';
import cardJeonbuk from '../assets/images/cards/9. 전북.png';
import cardJeonnam from '../assets/images/cards/10. 전남.png';
import cardGwangju from '../assets/images/cards/11. 광주.png';
import cardGyeongbuk from '../assets/images/cards/12. 경북.png';
import cardGyeongnam from '../assets/images/cards/13. 경남.png';
import cardDaegu from '../assets/images/cards/14. 대구.png';
import cardUlsan from '../assets/images/cards/15. 울산.png';
import cardBusan from '../assets/images/cards/16. 부산.png';
import cardJeju from '../assets/images/cards/17. 제주.png';
import cardUlleung from '../assets/images/cards/18. 울릉도.png';
import cardDokdo from '../assets/images/cards/19. 독도.png';
import cardBaengnyeong from '../assets/images/cards/20. 백령도.png';

// 캡슐 매핑 테이블
export const CAPSULE_IMAGE_MAP: Record<string, string> = {
  '서울': capsuleSeoul,
  '인천': capsuleIncheon,
  '경기': capsuleGyeonggi,
  '강원': capsuleGangwon,
  '충북': capsuleChungbuk,
  '충남': capsuleChungnam,
  '대전': capsuleDaejeon,
  '세종': capsuleSejong,
  '전북': capsuleJeonbuk,
  '전남': capsuleJeonnam,
  '광주': capsuleGwangju,
  '경북': capsuleGyeongbuk,
  '경남': capsuleGyeongnam,
  '대구': capsuleDaegu,
  '울산': capsuleUlsan,
  '부산': capsuleBusan,
  '제주': capsuleJeju,
  '울릉도': capsuleUlleung,
  '독도': capsuleDokdo,
  '백령도': capsuleBaengnyeong,
};

// 확정 카드 매핑 테이블
export const CONFIRMED_CARD_MAP: Record<string, string> = {
  '서울': cardSeoul,
  '인천': cardIncheon,
  '경기': cardGyeonggi,
  '강원': cardGangwon,
  '충북': cardChungbuk,
  '충남': cardChungnam,
  '대전': cardDaejeon,
  '세종': cardSejong,
  '전북': cardJeonbuk,
  '전남': cardJeonnam,
  '광주': cardGwangju,
  '경북': cardGyeongbuk,
  '경남': cardGyeongnam,
  '대구': cardDaegu,
  '울산': cardUlsan,
  '부산': cardBusan,
  '제주': cardJeju,
  '울릉도': cardUlleung,
  '독도': cardDokdo,
  '백령도': cardBaengnyeong,
};

/**
 * 지역명 또는 목적지명 텍스트에서 매핑되는 캡슐 이미지 추출
 */
export const getCapsuleImageByRegion = (regionOrName?: string): string => {
  if (!regionOrName) return capsuleJeju;

  const text = regionOrName.trim();
  for (const [key, img] of Object.entries(CAPSULE_IMAGE_MAP)) {
    if (text.includes(key)) {
      return img;
    }
  }

  // 강화도, 백령도 등 특수 지역 매핑
  if (text.includes('강화')) return capsuleIncheon;
  if (text.includes('울릉')) return capsuleUlleung;
  if (text.includes('독도')) return capsuleDokdo;
  if (text.includes('백령')) return capsuleBaengnyeong;

  return capsuleJeju;
};

/**
 * 지역명 또는 목적지명 텍스트에서 매핑되는 확정 카드 이미지 추출
 */
export const getConfirmedCardByRegion = (regionOrName?: string): string => {
  if (!regionOrName) return cardJeju;

  const text = regionOrName.trim();
  for (const [key, img] of Object.entries(CONFIRMED_CARD_MAP)) {
    if (text.includes(key)) {
      return img;
    }
  }

  if (text.includes('강화')) return cardIncheon;
  if (text.includes('울릉')) return cardUlleung;
  if (text.includes('독도')) return cardDokdo;
  if (text.includes('백령')) return cardBaengnyeong;

  return cardJeju;
};
