import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/my/Header';
import { Footer } from '../../components/my/Footer';

interface BudgetOption {
  id: string;
  title: string;
  description: string;
  displaySummary: string;
}

const BUDGET_OPTIONS: BudgetOption[] = [
  {
    id: '10만원 이하',
    title: '10만원 이하',
    description: '가볍게 떠나는 근거리 여행',
    displaySummary: '10만원 이하',
  },
  {
    id: '10-20만원',
    title: '10-20만원',
    description: '당일치기 또는 1박 여행',
    displaySummary: '10~20만원',
  },
  {
    id: '20-30만원',
    title: '20-30만원',
    description: '여유 있는 1박 2일',
    displaySummary: '30만원 이하',
  },
  {
    id: '30-50만원',
    title: '30-50만원',
    description: '숙소까지 즐기는 여행',
    displaySummary: '30~50만원',
  },
  {
    id: '제한 없음',
    title: '제한 없음',
    description: '예산보다 취향을 우선',
    displaySummary: '제한 없음',
  },
];

export const BudgetSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateTravelSettings } = useAuth();

  const [selectedBudget, setSelectedBudget] = useState<string>(
    user.travelSettings.defaultBudget || '20-30만원'
  );

  const currentOption =
    BUDGET_OPTIONS.find((b) => b.id === selectedBudget || b.title === selectedBudget) ||
    BUDGET_OPTIONS[2];

  const handleSave = () => {
    updateTravelSettings({
      defaultBudget: selectedBudget,
    });
    alert(`기본 예산이 '${selectedBudget}'(으)로 저장되었습니다!`);
    navigate('/my');
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-hidden select-none !p-0 bg-[#FAFBFF]">
      
      {/* 1. 상단 통일된 마이페이지 Header */}
      <Header title="기본 예산" />

      {/* 2. 스크롤 본문 영역 */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-6 pb-6 flex flex-col">
        
        {/* 타이틀 & 서브타이틀 */}
        <div className="mb-6">
          <h2 className="text-[20px] font-bold text-[#151B3F] tracking-tight">
            한 번의 여행에서 사용할 예산을 골라주세요
          </h2>
          <p className="text-[13px] text-[#8C94A6] mt-1">
            추천 결과의 숙소·맛집 범위를 조정해요.
          </p>
        </div>

        {/* 5개 예산 카드 목록 (단일 선택 라디오) */}
        <div className="flex flex-col gap-3 mb-6">
          {BUDGET_OPTIONS.map((option) => {
            const isSelected = selectedBudget === option.id;
            return (
              <div
                key={option.id}
                onClick={() => setSelectedBudget(option.id)}
                className={`p-4 rounded-[22px] border transition-all cursor-pointer flex items-center gap-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-[0.99] ${
                  isSelected
                    ? 'border-[#5863FF] bg-[#F0F2FF]'
                    : 'border-[#E8ECF4] bg-white hover:border-[#D1D5DB]'
                }`}
              >
                {/* 라디오 서클 */}
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

        {/* 현재 기본 예산 다크 블루 요약 카드 (navy gr: #172050 -> #2A3570) */}
        <div className="w-full bg-gradient-to-br from-[#172050] to-[#2A3570] rounded-[22px] p-5 text-white shadow-[0_8px_20px_rgba(23,32,80,0.2)] flex items-center justify-between">
          <span className="text-[14px] font-bold text-white/90">
            현재 기본 예산
          </span>
          <span className="text-[16px] font-extrabold text-white">
            {currentOption.displaySummary}
          </span>
        </div>

      </main>

      {/* 3. 하단 고정 Footer */}
      <Footer text="예산 저장" onClick={handleSave} />

    </div>
  );
};
