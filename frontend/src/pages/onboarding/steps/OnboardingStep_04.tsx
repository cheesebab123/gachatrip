import React from 'react';
import sparkleStar from '../../../assets/images/onboarding/sparkle_star.png';

interface StepProps {
  isActive: boolean;
}

export const OnboardingStep_04: React.FC<StepProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="flex flex-col items-center text-center animate-fadeIn">
      {/* 1. Title (표준 26px) */}
      <h1 className="text-[26px] font-bold text-[#151B3F] leading-[128%] tracking-[-0.03em] text-center">
        뽑은 여행이
      </h1>
      
      {/* 2. Display Hero (표준 32px) */}
      <div className="relative inline-block mt-0.5">
        <span className="text-[32px] font-bold text-[#5863FF] leading-[128%] tracking-[-0.03em]">
          나만의 컬렉션이 돼요!
        </span>
        <img
          src={sparkleStar}
          alt="sparkle"
          className="absolute left-full top-1 ml-1.5 w-[16px] h-auto object-contain pointer-events-none"
        />
      </div>

      {/* 3. Body (표준 15px) */}
      <div className="mt-3.5 text-[15px] font-normal leading-[22px] tracking-tight text-[#454545] text-center">
        <p>
          다녀온 여행을 <strong className="font-bold text-[#151B3F]">기록하고</strong>
        </p>
        <p>
          <strong className="font-bold text-[#151B3F]">지도와 키링으로</strong> 소중한 추억을 모아보세요.
        </p>
      </div>
    </div>
  );
};
