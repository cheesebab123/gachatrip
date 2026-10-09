import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import userAvatarImg from '../../assets/images/common/user_avatar.png';

export const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // 이메일 마스킹 함수 (예: hong@naver.com -> hong****@naver.com)
  const maskEmail = (email: string) => {
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const name = parts[0];
    const domain = parts[1];
    if (name.length <= 4) {
      return `${name}****@${domain}`;
    }
    return `${name.slice(0, 4)}****@${domain}`;
  };

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* 1. 상단 메인 프로필 카드 */}
      <div className="w-full bg-white rounded-[24px] border border-[#E8ECF4] p-5 shadow-[0_8px_24px_rgba(88,99,255,0.06)] flex flex-col">
        {/* 상단: 아바타 + 이름/이메일 + 수정 버튼 */}
        <div className="flex items-center justify-between">
          {/* 좌측 아바타 + 유저 정보 */}
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            {/* 캐릭터 3D 아바타 원형 박스 */}
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
              <img
                src={user.avatarUrl || userAvatarImg}
                alt={user.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* 이름 & 이메일 */}
            <div className="flex flex-col min-w-0 pr-2">
              <h2 className="text-[18px] font-bold text-[#151B3F] tracking-tight truncate">
                {user.name}
              </h2>
              <span className="text-[13px] text-[#8C94A6] tracking-tight truncate mt-0.5">
                {maskEmail(user.email)}
              </span>
            </div>
          </div>

          {/* 우측 수정 버튼 */}
          <button
            type="button"
            onClick={() => navigate('/my/profile')}
            className="bg-[#5863FF] hover:bg-[#4853F0] text-white text-[12px] font-bold px-3.5 py-1.5 rounded-[12px] transition-all active:scale-95 cursor-pointer shadow-sm flex-shrink-0"
          >
            수정
          </button>
        </div>

        {/* 하단: 4개 통계 칩 (총 여행, 방문 지역, 뱃지, 그룹 여행) */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-1">
          {/* 1. 총 여행 */}
          <div className="bg-[#F4F6FC] rounded-[16px] py-2.5 px-1 flex flex-col items-center justify-center text-center">
            <span className="text-[15px] font-extrabold text-[#151B3F] leading-tight">
              {user.stats.totalTrips}회
            </span>
            <span className="text-[11px] font-medium text-[#8C94A6] mt-1">
              총 여행
            </span>
          </div>

          {/* 2. 방문 지역 */}
          <div className="bg-[#F4F6FC] rounded-[16px] py-2.5 px-1 flex flex-col items-center justify-center text-center">
            <span className="text-[15px] font-extrabold text-[#151B3F] leading-tight">
              {user.stats.visitedPlaces}곳
            </span>
            <span className="text-[11px] font-medium text-[#8C94A6] mt-1">
              방문 지역
            </span>
          </div>

          {/* 3. 뱃지 */}
          <div className="bg-[#F4F6FC] rounded-[16px] py-2.5 px-1 flex flex-col items-center justify-center text-center">
            <span className="text-[15px] font-extrabold text-[#151B3F] leading-tight">
              {user.stats.badgesCount}개
            </span>
            <span className="text-[11px] font-medium text-[#8C94A6] mt-1">
              뱃지
            </span>
          </div>

          {/* 4. 그룹 여행 */}
          <div className="bg-[#F4F6FC] rounded-[16px] py-2.5 px-1 flex flex-col items-center justify-center text-center">
            <span className="text-[15px] font-extrabold text-[#151B3F] leading-tight">
              {user.stats.groupTrips}회
            </span>
            <span className="text-[11px] font-medium text-[#8C94A6] mt-1">
              그룹 여행
            </span>
          </div>
        </div>
      </div>

      {/* 2. 섹션 1: 계정 */}
      <div className="flex flex-col">
        <span className="text-[13px] font-bold text-[#687091] px-1 mb-2 tracking-tight">
          계정
        </span>
        <div className="w-full bg-white rounded-[22px] border border-[#E8ECF4] px-4 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.02)] divide-y divide-[#F0F2F7]">
          {/* 프로필 수정 */}
          <div
            onClick={() => navigate('/my/profile')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              프로필 수정
            </span>
            <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
          </div>

          {/* 닉네임 변경 */}
          <div
            onClick={() => navigate('/my/nickname')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              닉네임 변경
            </span>
            <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
          </div>

          {/* 비밀번호 변경 */}
          <div
            onClick={() => navigate('/my/password')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              비밀번호 변경
            </span>
            <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
          </div>

          {/* 연결 계정 관리 */}
          <div
            onClick={() => navigate('/my/accounts')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              연결 계정 관리
            </span>
            <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
          </div>
        </div>
      </div>

      {/* 3. 섹션 2: 여행 설정 */}
      <div className="flex flex-col">
        <span className="text-[13px] font-bold text-[#687091] px-1 mb-2 tracking-tight">
          여행 설정
        </span>
        <div className="w-full bg-white rounded-[22px] border border-[#E8ECF4] px-4 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.02)] divide-y divide-[#F0F2F7]">
          {/* 출발 지역 설정 */}
          <div
            onClick={() => navigate('/my/departure')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              출발 지역 설정
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-medium text-[#8C94A6]">
                {user.travelSettings.departureLocation}
              </span>
              <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
            </div>
          </div>

          {/* 기본 여행 스타일 */}
          <div
            onClick={() => navigate('/my/style')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              기본 여행 스타일
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-medium text-[#8C94A6]">
                {user.travelSettings.travelStyle}
              </span>
              <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
            </div>
          </div>

          {/* 기본 예산 */}
          <div
            onClick={() => navigate('/my/budget')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              기본 예산
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-medium text-[#8C94A6]">
                {user.travelSettings.defaultBudget}
              </span>
              <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 섹션 3: 알림 · 앱 설정 */}
      <div className="flex flex-col">
        <span className="text-[13px] font-bold text-[#687091] px-1 mb-2 tracking-tight">
          알림 · 앱 설정
        </span>
        <div className="w-full bg-white rounded-[22px] border border-[#E8ECF4] px-4 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.02)] divide-y divide-[#F0F2F7]">
          {/* 여행 추천 알림 */}
          <div
            onClick={() => navigate('/my/notification')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              여행 추천 알림
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-medium text-[#8C94A6]">
                {user.appSettings.tripRecommendationAlert ? '켜짐' : '꺼짐'}
              </span>
              <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
            </div>
          </div>

          {/* 위치 기반 설정 */}
          <div
            onClick={() => navigate('/my/location')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              위치 기반 설정
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-medium text-[#8C94A6]">
                {user.appSettings.locationBasedRecommendation ? '켜짐' : '꺼짐'}
              </span>
              <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
            </div>
          </div>

          {/* 언어 */}
          <div
            onClick={() => navigate('/my/language')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              언어
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-medium text-[#8C94A6]">
                {user.appSettings.language}
              </span>
              <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
            </div>
          </div>

          {/* 앱 버전 */}
          <div
            onClick={() => navigate('/my/version')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#151B3F]">
              앱 버전
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-medium text-[#8C94A6]">
                {user.appSettings.appVersion}
              </span>
              <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* 로그아웃 버튼 (우측 정렬) */}
      <div className="w-full flex justify-end pr-1 pt-1">
        <button
          type="button"
          onClick={() => {
            if (confirm('로그아웃 하시겠습니까?')) {
              logout();
              navigate('/login');
            }
          }}
          className="text-[13px] font-medium text-[#8C94A6] hover:text-[#5863FF] underline cursor-pointer py-1"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};
