import React from 'react';

interface StepDotsProps {
  totalSteps: number;
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export const StepDots: React.FC<StepDotsProps> = ({
  totalSteps,
  currentStep,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;

        return (
          <button
            key={stepNumber}
            type="button"
            onClick={() => onStepClick && onStepClick(stepNumber)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              isActive
                ? 'w-6 bg-gradient-to-r from-[#5863FF] to-[#6B75FF] shadow-[0_2px_8px_rgba(88,99,255,0.3)]'
                : 'w-2 bg-[#D1D5DB] hover:bg-[#A0A7BA]'
            }`}
            aria-label={`${totalSteps}단계 중 ${stepNumber}단계로 이동`}
          />
        );
      })}
    </div>
  );
};
