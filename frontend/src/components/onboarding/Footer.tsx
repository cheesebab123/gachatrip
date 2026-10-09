import React from 'react';
import { StepDots } from './StepDots';
import { PrimaryButton } from '../common/PrimaryButton';

interface FooterProps {
  totalSteps: number;
  currentStep: number;
  onStepClick: (step: number) => void;
  onNext: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  totalSteps,
  currentStep,
  onStepClick,
  onNext,
}) => {
  return (
    <footer className="relative z-10 w-full flex flex-col items-center gap-6 pb-2">
      {/* 4단계 도트 인디케이터 */}
      <StepDots
        totalSteps={totalSteps}
        currentStep={currentStep}
        onStepClick={onStepClick}
      />

      {/* 다음 / 시작하기 메인 CTA 버튼 */}
      <PrimaryButton
        onClick={onNext}
        className="w-full shadow-[0_6px_20px_rgba(88,99,255,0.28)]"
      >
        {currentStep === totalSteps ? '가챠트립 시작하기' : '다음'}
      </PrimaryButton>
    </footer>
  );
};
