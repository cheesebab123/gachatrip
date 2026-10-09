import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/my/Header';
import { Footer } from '../../components/my/Footer';

const REGIONS = [
  '서울/경기',
  '인천',
  '강원도',
  '충청도',
  '전라도',
  '경상도',
  '제주도',
  '직접 입력',
];

export const DepartureSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateTravelSettings } = useAuth();

  const [selectedRegion, setSelectedRegion] = useState<string>(
    user.travelSettings.departureLocation || '인천'
  );
  const [autoLocation, setAutoLocation] = useState<boolean>(true);

  const handleSelectRegion = (region: string) => {
    if (region === '직접 입력') {
      const custom = prompt('출발 지역을 직접 입력해주세요:', selectedRegion);
      if (custom && custom.trim()) {
        setSelectedRegion(custom.trim());
      }
    } else {
      setSelectedRegion(region);
    }
  };

  const handleSave = () => {
    updateTravelSettings({
      departureLocation: selectedRegion,
    });
    alert(`출발 지역이 '${selectedRegion}'(으)로 저장되었습니다!`);
    navigate('/my');
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-hidden select-none !p-0 bg-[#FAFBFF]">
      
      {/* 1. 상단 통일된 마이페이지 Header */}
      <Header title="출발 지역 설정" />

      {/* 2. 스크롤 본문 영역 */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-6 pb-6 flex flex-col">
        
        {/* 서브 카테고리 라벨 */}
        <span className="text-[13px] font-bold text-[#8C94A6] mb-2 px-0.5">
          기본 출발 지역
        </span>

        {/* 현재 설정 다크 블루 카드 (navy gr: #172050 -> #2A3570) */}
        <div className="w-full bg-gradient-to-br from-[#172050] to-[#2A3570] rounded-[24px] p-6 text-white shadow-[0_8px_20px_rgba(23,32,80,0.2)] mb-7">
          <span className="text-[12px] font-medium text-[#A0A6B8] block mb-1.5">
            현재 설정
          </span>
          <h2 className="text-[22px] font-bold tracking-tight">
            {selectedRegion.includes('광역') || selectedRegion.includes('도') || selectedRegion.includes('특별')
              ? selectedRegion
              : `${selectedRegion}광역시`}
          </h2>
        </div>

        {/* 지역 선택 헤드라인 */}
        <h3 className="text-[18px] font-bold text-[#151B3F] tracking-tight mb-3 px-0.5">
          지역을 선택해주세요
        </h3>

        {/* 2열 그리드 지역 선택 버튼들 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => handleSelectRegion(region)}
                className={`h-[50px] rounded-[18px] text-[14px] font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                  isSelected
                    ? 'border-2 border-[#5863FF] bg-[#F0F2FF] text-[#151B3F] shadow-sm'
                    : 'bg-white text-[#151B3F] border border-[#E8ECF4] hover:border-[#D1D5DB] shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>

        {/* 현재 위치로 자동 설정 토글 카드 */}
        <div className="bg-white rounded-[22px] border border-[#E8ECF4] p-4 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#151B3F]">
              현재 위치로 자동 설정
            </span>
            <span className="text-[12px] text-[#8C94A6] mt-0.5">
              앱을 열 때 출발 지역을 업데이트
            </span>
          </div>

          <button
            type="button"
            onClick={() => setAutoLocation(!autoLocation)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
              autoLocation ? 'bg-[#5863FF]' : 'bg-[#D1D5DB]'
            }`}
            aria-label="현재 위치 자동 설정 토글"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                autoLocation ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

      </main>

      {/* 3. 하단 고정 Footer */}
      <Footer text="출발 지역 저장" onClick={handleSave} />

    </div>
  );
};
