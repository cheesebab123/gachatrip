import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import characterCapsules from '../../assets/images/splash/character_capsules.png';
import gachatripLogo from '../../assets/images/splash/gachatrip_logo.png';
import splashGlow from '../../assets/images/splash/splash_glow.svg';

export const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // 3초 후 온보딩 화면(/onboarding)으로 자연스럽게 이동
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // 터치 스와이프 제스처 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // 왼쪽으로 40px 이상 스와이프 시 즉시 온보딩 이동
    if (diff > 40) {
      navigate('/onboarding');
    }
    touchStartX.current = null;
  };

  return (
    <div 
      onClick={() => navigate('/onboarding')} 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="mobile-container flex flex-col items-center justify-center cursor-pointer select-none touch-pan-y"
    >
      {/* 1. 배경 방사형 블루 글로우 */}
      <img 
        src={splashGlow} 
        alt="background glow" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[304px] h-[304px] pointer-events-none z-[1]" 
      />

      {/* 2. 중앙 컨텐츠 블록 */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* 상단 3색 캐릭터 캡슐 */}
        <div className="mb-3.5 flex items-center justify-center">
          <img 
            src={characterCapsules} 
            alt="가챠트립 캐릭터" 
            className="w-[98px] h-auto object-contain" 
          />
        </div>

        {/* 중앙 gachatrip 로고 배너 */}
        <div className="mb-2.5 flex items-center justify-center">
          <img 
            src={gachatripLogo} 
            alt="gachatrip" 
            className="w-[189px] h-auto object-contain" 
          />
        </div>

        {/* 하단 슬로건 텍스트 */}
        <p className="text-center text-[16px]/[26px] font-semibold tracking-[-0.35px] text-[#121F42]">
          어디로 갈지 고민될 땐, 가챠트립
        </p>
      </div>
    </div>
  );
};
