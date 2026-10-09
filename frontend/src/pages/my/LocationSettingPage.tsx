import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/my/Header';
import { Footer } from '../../components/my/Footer';

const RADIUS_OPTIONS = ['50km', '100km', '150km', '전국'];

export const LocationSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateAppSettings } = useAuth();

  const [locationEnabled, setLocationEnabled] = useState<boolean>(
    user.appSettings.locationBasedRecommendation
  );
  const [selectedRadius, setSelectedRadius] = useState<string>('150km');
  const [currentLocation, setCurrentLocation] = useState<string>('인천광역시');

  const handleRefreshLocation = () => {
    alert('현재 위치 정보를 새로고침했습니다: 인천광역시 연수구');
    setCurrentLocation('인천광역시');
  };

  const handleSave = () => {
    updateAppSettings({
      locationBasedRecommendation: locationEnabled,
    });
    alert(`위치 기반 설정이 저장되었습니다! (추천 반경: ${selectedRadius})`);
    navigate('/my');
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-hidden select-none !p-0 bg-[#FAFBFF]">
      
      {/* 1. 상단 통일된 마이페이지 Header */}
      <Header title="위치 기반 설정" />

      {/* 2. 스크롤 본문 영역 */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-6 pb-6 flex flex-col">
        
        {/* 현재 위치 다크 블루 카드 (navy gr: #172050 -> #2A3570) */}
        <div className="w-full bg-gradient-to-br from-[#172050] to-[#2A3570] rounded-[24px] p-6 text-white shadow-[0_8px_20px_rgba(23,32,80,0.2)] flex flex-col mb-4">
          <span className="text-[12px] font-medium text-[#A0A6B8] block mb-1">
            현재 위치
          </span>
          <h2 className="text-[22px] font-bold tracking-tight mb-1">
            {currentLocation}
          </h2>
          <p className="text-[13px] text-[#A0A6B8] mb-4">
            내 주변 {selectedRadius === '전국' ? '전국' : `${selectedRadius} 안`}의 여행지를 추천해요
          </p>

          <button
            type="button"
            onClick={handleRefreshLocation}
            className="w-fit px-4 py-2 rounded-full bg-white text-[#151B3F] text-[13px] font-bold shadow-sm hover:bg-[#F2F4F8] active:scale-95 transition-all cursor-pointer"
          >
            위치 다시 확인
          </button>
        </div>

        {/* 위치 기반 추천 사용 토글 카드 */}
        <div className="bg-white rounded-[22px] border border-[#E8ECF4] p-5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] mb-6">
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-[#151B3F]">
              위치 기반 추천 사용
            </span>
            <span className="text-[12px] text-[#8C94A6] mt-0.5">
              앱을 열 때 가까운 여행지를 우선 표시
            </span>
          </div>

          <button
            type="button"
            onClick={() => setLocationEnabled(!locationEnabled)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
              locationEnabled ? 'bg-[#CCFF00]' : 'bg-[#D1D5DB]'
            }`}
            aria-label="위치 기반 추천 토글"
          >
            <div
              className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                locationEnabled
                  ? 'bg-white translate-x-6'
                  : 'bg-white translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 추천 반경 선택 */}
        <div className="flex flex-col gap-2.5 mb-6">
          <span className="text-[13px] font-bold text-[#687091] px-0.5">
            추천 반경
          </span>
          <div className="grid grid-cols-4 gap-2">
            {RADIUS_OPTIONS.map((radius) => {
              const isSelected = selectedRadius === radius;
              return (
                <button
                  key={radius}
                  type="button"
                  onClick={() => setSelectedRadius(radius)}
                  className={`h-[46px] rounded-[18px] text-[14px] font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                    isSelected
                      ? 'bg-[#5863FF] text-white shadow-sm'
                      : 'bg-[#F2F4F8] text-[#151B3F] hover:bg-[#E5E8EF]'
                  }`}
                >
                  {radius}
                </button>
              );
            })}
          </div>
        </div>

        {/* 안내 알림 카드 (연보라색 배경) */}
        <div className="bg-[#F0F2FF] rounded-[22px] p-5 flex flex-col gap-1 border border-[#E0E4FF]">
          <h3 className="text-[13px] font-bold text-[#5863FF]">
            위치 정보는 추천을 위해서만 사용돼요.
          </h3>
          <p className="text-[12px] text-[#8C94A6] leading-relaxed">
            정확한 주소는 저장하지 않으며 언제든지 설정에서 권한을 끌 수 있어요.
          </p>
        </div>

      </main>

      {/* 3. 하단 고정 Footer */}
      <Footer text="위치 설정 저장" onClick={handleSave} />

    </div>
  );
};
