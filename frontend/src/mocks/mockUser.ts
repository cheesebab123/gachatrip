import type { UserProfile } from '../types/user';

// 기본 임시 사용자 (홍길동) 목업 데이터
export const DEFAULT_MOCK_USER: UserProfile = {
  id: 'usr_hong_001',
  name: '여행자 홍길동',
  email: 'hong@naver.com',
  avatarUrl: '', // 캐릭터 로고 아바타 사용
  bio: '가챠트립으로 새로운 여행지 탐험 중!',
  preferredStyles: ['힐링', '맛집'],
  stats: {
    totalTrips: 12,
    visitedPlaces: 3,
    badgesCount: 3,
    groupTrips: 2,
  },
  travelSettings: {
    departureLocation: '서울/경기',
    travelStyle: '힐링',
    defaultBudget: '30만원 이하',
  },
  appSettings: {
    tripRecommendationAlert: true,
    locationBasedRecommendation: true,
    language: '한국어',
    appVersion: '1.0.0',
  },
};
