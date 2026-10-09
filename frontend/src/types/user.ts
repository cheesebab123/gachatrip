// 사용자 프로필 및 통계/설정 인터페이스 (REST API DTO 규격)
export interface UserStats {
  totalTrips: number;    // 총 여행 횟수 (예: 12)
  visitedPlaces: number; // 방문 지역 수 (예: 3)
  badgesCount: number;   // 획득 뱃지 수 (예: 3)
  groupTrips: number;    // 그룹 여행 횟수 (예: 2)
}

export interface TravelSettings {
  departureLocation: string; // 출발 지역 (예: '인천', '서울/경기')
  travelStyle: string;       // 기본 여행 스타일 (예: '힐링')
  defaultBudget: string;     // 기본 예산 (예: '30만원 이하')
}

export interface AppSettings {
  tripRecommendationAlert: boolean;     // 여행 추천 알림
  locationBasedRecommendation: boolean; // 위치 기반 추천
  language: string;                     // 언어 (예: '한국어')
  appVersion: string;                   // 앱 버전 (예: '1.0.0')
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;                     // 한 줄 소개
  preferredStyles?: string[];       // 관심 여행 스타일 (최대 2개)
  stats: UserStats;
  travelSettings: TravelSettings;
  appSettings: AppSettings;
}
