import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/my/Header';
import { Footer } from '../../components/my/Footer';

interface StyleOption {
  id: string;
  title: string;
  description: string;
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    id: '힐링',
    title: '힐링',
    description: '조용한 자연과 여유로운 쉼',
  },
  {
    id: '액티비티',
    title: '액티비티',
    description: '몸을 움직이는 짜릿한 경험',
  },
  {
    id: '맛집',
    title: '맛집',
    description: '지역의 맛을 따라가는 여행',
  },
  {
    id: '감성',
    title: '감성',
    description: '사진과 분위기를 담는 여행',
  },
];

export const TravelStyleSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateTravelSettings } = useAuth();

  // 기존 저장된 스타일 파싱 (예: "힐링, 맛집" -> ['힐링', '맛집'])
  const initialStyles = user.travelSettings.travelStyle
    ? user.travelSettings.travelStyle.split(',').map((s) => s.trim())
    : ['힐링', '맛집'];

  const [selectedStyles, setSelectedStyles] = useState<string[]>(initialStyles);

  const handleToggleStyle = (id: string) => {
    if (selectedStyles.includes(id)) {
      if (selectedStyles.length === 1) {
        alert('최소 1개의 여행 스타일을 선택해주세요.');
        return;
      }
      setSelectedStyles(selectedStyles.filter((s) => s !== id));
    } else {
      if (selectedStyles.length >= 2) {
        // 이미 2개 선택된 경우 -> 첫 번째 것을 빼고 새로 선택하거나 2개 제한 안내
        // 피그마 UI 동작: 오래된 1개 교체
        setSelectedStyles([selectedStyles[1], id]);
      } else {
        setSelectedStyles([...selectedStyles, id]);
      }
    }
  };

  const handleSave = () => {
    const styleString = selectedStyles.join(', ');
    updateTravelSettings({
      travelStyle: styleString,
    });
    alert(`기본 여행 스타일이 '${selectedStyles.join(' + ')}'(으)로 저장되었습니다!`);
    navigate('/my');
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-hidden select-none !p-0 bg-[#FAFBFF]">
      
      {/* 1. 상단 통일된 마이페이지 Header */}
      <Header title="기본 여행 스타일" />

      {/* 2. 스크롤 본문 영역 */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-6 pb-6 flex flex-col">
        
        {/* 타이틀 & 서브타이틀 */}
        <div className="mb-6">
          <h2 className="text-[20px] font-bold text-[#151B3F] tracking-tight">
            나에게 맞는 여행 스타일을 골라주세요
          </h2>
          <p className="text-[13px] text-[#8C94A6] mt-1">
            최대 2개까지 선택할 수 있어요.
          </p>
        </div>

        {/* 4대 스타일 선택 카드 목록 */}
        <div className="flex flex-col gap-3 mb-6">
          {STYLE_OPTIONS.map((option) => {
            const isSelected = selectedStyles.includes(option.id);
            return (
              <div
                key={option.id}
                onClick={() => handleToggleStyle(option.id)}
                className={`p-4 rounded-[22px] border transition-all cursor-pointer flex items-center gap-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-[0.99] ${
                  isSelected
                    ? 'border-[#5863FF] bg-[#F0F2FF]'
                    : 'border-[#E8ECF4] bg-white hover:border-[#D1D5DB]'
                }`}
              >
                {/* 라디오/체크 인디케이터 서클 */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[6px] border-[#5863FF] bg-white'
                      : 'border-2 border-[#D1D5DB] bg-white'
                  }`}
                />

                {/* 텍스트 영역 */}
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#151B3F]">
                    {option.title}
                  </span>
                  <span className="text-[12px] text-[#8C94A6] mt-0.5">
                    {option.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 선택된 스타일 요약 보라색 카드 */}
        <div className="w-full bg-[#5863FF] rounded-[24px] p-5 text-white shadow-[0_8px_20px_rgba(88,99,255,0.25)]">
          <span className="text-[12px] font-medium text-white/80 block mb-1">
            선택한 스타일
          </span>
          <h3 className="text-[20px] font-bold tracking-tight">
            {selectedStyles.length > 0 ? selectedStyles.join(' + ') : '선택된 스타일 없음'}
          </h3>
        </div>

      </main>

      {/* 3. 하단 고정 Footer */}
      <Footer text="스타일 저장" onClick={handleSave} />

    </div>
  );
};
