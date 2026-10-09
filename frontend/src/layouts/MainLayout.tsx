import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/main/Header';
import { Footer } from '../components/main/Footer';
import { GachaModeSelectModal } from '../components/gacha/GachaModeSelectModal';
import homeBg from '../assets/images/home/home_bg.png';

export interface MainLayoutContextType {
  openGachaModal: () => void;
}

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/home';
  const [isGachaModalOpen, setIsGachaModalOpen] = useState(false);

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-hidden select-none !p-0 bg-[#FAFBFF]">
      
      {/* 🌌 홈 화면일 때 헤더 뒤편 최상단부터 자연스럽게 깔리는 은은한 배경 일러스트 */}
      {isHome && (
        <div className="absolute top-0 left-0 right-0 h-[280px] pointer-events-none z-0 overflow-hidden">
          {homeBg ? (
            <img
              src={homeBg}
              alt="홈 배경"
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-[#EDF1FF] via-[#F4F6FF] to-transparent opacity-80" />
          )}
        </div>
      )}

      {/* 1. 메인 도메인 Header (배경 일러스트 위에 투명하게 위치) */}
      <div className="px-5 pt-3 z-20">
        <Header />
      </div>

      {/* 2. 각 탭별 본문 컨텐츠 (Outlet을 통해 홈, 뽑기, 마이트립, 마이 페이지 렌더링) */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-1 pb-6 flex flex-col">
        <Outlet context={{ openGachaModal: () => setIsGachaModalOpen(true) }} />
      </main>

      {/* 3. 메인 도메인 Footer (4-탭 네비게이션 바) */}
      <Footer onGachaClick={() => setIsGachaModalOpen(true)} />

      {/* 4. 랜덤 여행지 뽑기 방식 선택 바텀시트 슬라이딩 모달 */}
      <GachaModeSelectModal
        isOpen={isGachaModalOpen}
        onClose={() => setIsGachaModalOpen(false)}
      />
      
    </div>
  );
};
