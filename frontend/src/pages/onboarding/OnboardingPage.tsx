import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/onboarding/Header';
import { Footer } from '../../components/onboarding/Footer';

import gachaImage from '../../assets/images/onboarding/onboarding_01_gacha.png';
import courseImage from '../../assets/images/onboarding/onboarding_02_course.png';
import mapImage from '../../assets/images/onboarding/onboarding_03_map.png';
import collectionImage from '../../assets/images/onboarding/onboarding_04_collection.png';

import { OnboardingStep_01 } from './steps/OnboardingStep_01';
import { OnboardingStep_02 } from './steps/OnboardingStep_02';
import { OnboardingStep_03 } from './steps/OnboardingStep_03';
import { OnboardingStep_04 } from './steps/OnboardingStep_04';

export const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();

  const touchStartX = useRef<number | null>(null);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate('/signup');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    navigate('/signup');
  };

  // 터치 & 마우스 스와이프 제스처 핸들러
  const onStart = (clientX: number) => {
    touchStartX.current = clientX;
  };

  const onEnd = (clientX: number) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - clientX;

    // 왼쪽으로 40px 이상 밀었을 때 -> 다음 단계 (4단계에서는 동작 안함)
    if (diff > 40 && currentStep < totalSteps) {
      handleNext();
    }
    // 오른쪽으로 40px 이상 밀었을 때 -> 이전 단계 (1단계에서는 동작 안함)
    else if (diff < -40 && currentStep > 1) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div 
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseUp={(e) => onEnd(e.clientX)}
      className="mobile-container relative flex flex-col justify-between select-none overflow-hidden touch-pan-y"
    >
      
      {/* 1. 배경 3D 일러스트: 여백 없이 화면 100% 풀스크린 핏 (Cross-Fade 전환) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={gachaImage}
          alt="온보딩 1단계 가챠 머신"
          className={`absolute inset-0 w-full h-full object-cover object-bottom transition-opacity duration-300 ease-in-out ${
            currentStep === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <img
          src={courseImage}
          alt="온보딩 2단계 AI 맞춤 여행 코스"
          className={`absolute inset-0 w-full h-full object-cover object-bottom transition-opacity duration-300 ease-in-out ${
            currentStep === 2 ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <img
          src={mapImage}
          alt="온보딩 3단계 나만의 지도"
          className={`absolute inset-0 w-full h-full object-cover object-bottom transition-opacity duration-300 ease-in-out ${
            currentStep === 3 ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <img
          src={collectionImage}
          alt="온보딩 4단계 나만의 컬렉션"
          className={`absolute inset-0 w-full h-full object-cover object-bottom transition-opacity duration-300 ease-in-out ${
            currentStep === 4 ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* 2. 상단 네비게이션: 온보딩 도메인 Header */}
      <Header
        currentStep={currentStep}
        onPrev={handlePrev}
        onSkip={handleSkip}
      />

      {/* 3. 헤드라인 타이포그래피 (상단 헤더 바로 밑 mt-1 완벽 고정) */}
      <div className="relative z-10 w-full mt-1 flex flex-col items-center pointer-events-none">
        <OnboardingStep_01 isActive={currentStep === 1} />
        <OnboardingStep_02 isActive={currentStep === 2} />
        <OnboardingStep_03 isActive={currentStep === 3} />
        <OnboardingStep_04 isActive={currentStep === 4} />
      </div>

      {/* 4. 중앙 빈 공간 (3D 일러스트 노출) */}
      <div className="flex-1 pointer-events-none" />

      {/* 5. 하단 네비게이션: 온보딩 도메인 Footer (도트 인디케이터 + 다음/시작 버튼) */}
      <Footer
        totalSteps={totalSteps}
        currentStep={currentStep}
        onStepClick={(step: number) => setCurrentStep(step)}
        onNext={handleNext}
      />

    </div>
  );
};
