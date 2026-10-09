import React from 'react';

interface HeaderProps {
  currentStep: number;
  onPrev: () => void;
  onSkip: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onPrev, onSkip }) => {
  return (
    <header className="top-header justify-between relative bg-transparent">
      {/* 좌측: 뒤로가기 버튼 (1단계에서는 투명 처리하여 중앙 정렬 보장) */}
      <div className="w-8 flex items-center justify-start">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onPrev}
            className="text-[20px] font-bold text-[#687091] hover:text-[#151B3F] transition-colors cursor-pointer py-1 px-1.5 flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5"
            aria-label="이전 단계로"
          >
            ‹
          </button>
        )}
      </div>

      {/* 중앙: 여백 */}
      <div className="flex-1" />

      {/* 우측: 건너뛰기 텍스트 버튼 */}
      <button
        type="button"
        onClick={onSkip}
        className="text-[14px] font-medium text-[#687091] hover:text-[#151B3F] transition-colors cursor-pointer py-1.5 px-2 rounded-lg hover:bg-black/5 active:scale-95"
      >
        건너뛰기
      </button>
    </header>
  );
};
