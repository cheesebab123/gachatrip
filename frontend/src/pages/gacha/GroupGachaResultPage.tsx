import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import resultCapsuleJeju from '../../assets/images/gacha/result/result_capsule_jeju.png';
import resultBgBubbles from '../../assets/images/gacha/result/result_bg_bubbles.png';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { GroupShareDetailModal } from '../../components/gacha/GroupShareDetailModal';

export const GroupGachaResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // 확정하기 이동 (GachaConfirmedPage로 이동)
  const handleConfirmDestination = () => {
    navigate('/gacha/confirmed?destination=jeju&mode=group');
  };

  // 재추첨 (가본 곳이에요)
  const handleReroll = () => {
    navigate('/gacha/group/play');
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 배경 장식 은은한 버블 일러스트 */}
      <img
        src={resultBgBubbles}
        alt="배경 버블"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60 z-0"
      />

      {/* 1. 상단 네비게이션 헤더 */}
      <header className="w-full h-14 px-5 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-[#F0F2F7] sticky top-0 z-30 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate('/gacha/group/play')}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#151B3F] hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[17px] font-bold text-[#151B3F] tracking-tight">
          뽑기 결과
        </h1>
        <div className="w-8" />
      </header>

      {/* 2. 본문 컨텐츠 영역 */}
      <main className="flex-1 flex flex-col items-center justify-between px-5 pt-4 pb-2 z-10 overflow-y-auto">
        {/* 상단 텍스트 및 태그 */}
        <div className="flex flex-col items-center text-center space-y-1.5 animate-fadeIn">
          <span className="text-[14px] font-extrabold text-[#5863FF] tracking-tight">
            여행지가 뽑혔어요!
          </span>
          <h2 className="text-[36px] font-black text-[#151B3F] tracking-tight">
            제주도
          </h2>
          <p className="text-[13px] text-[#717A9B] font-medium leading-relaxed">
            푸른 바다와 낭만이 가득한,<br />
            지금 떠나기 좋은 여행지에요.
          </p>

          {/* 여행 테마 태그 */}
          <div className="flex items-center gap-1.5 pt-1.5">
            <span className="bg-[#EEF2FF] text-[#5863FF] text-[12px] font-black px-3 py-1 rounded-full shadow-sm">
              #바다여행
            </span>
            <span className="bg-[#EEF2FF] text-[#5863FF] text-[12px] font-black px-3 py-1 rounded-full shadow-sm">
              #야경
            </span>
            <span className="bg-[#EEF2FF] text-[#5863FF] text-[12px] font-black px-3 py-1 rounded-full shadow-sm">
              #낭만
            </span>
          </div>
        </div>

        {/* 중앙 3D 제주도 캡슐 카드 */}
        <div className="relative w-full max-w-[320px] flex items-center justify-center my-auto py-1 animate-scaleUp">
          <img
            src={resultCapsuleJeju}
            alt="제주도 뽑기 캡슐"
            className="w-full h-auto drop-shadow-[0_20px_40px_rgba(88,99,255,0.25)]"
          />
        </div>

        {/* 그룹 멤버 참여 정보 카드 */}
        <div className="w-full max-w-[340px] bg-white/90 backdrop-blur-md rounded-[20px] px-4.5 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#E8ECF4] flex items-center justify-center gap-3 mb-2 animate-fadeIn">
          {/* 3명의 겹친 2-dot 캐릭터 아바타 */}
          <div className="flex -space-x-2 flex-shrink-0">
            {/* 나연 (Purple) */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5863FF] to-[#7B86FF] ring-2 ring-white flex items-center justify-center text-white shadow-sm relative z-30">
              <div className="flex gap-1">
                <div className="w-1 h-1.5 bg-white rounded-full" />
                <div className="w-1 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            {/* 민지 (Sky Blue) */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4EA8FE] to-[#3B92F5] ring-2 ring-white flex items-center justify-center text-white shadow-sm relative z-20">
              <div className="flex gap-1">
                <div className="w-1 h-1.5 bg-white rounded-full" />
                <div className="w-1 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            {/* 수현 (Lime Green) */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C8F026] to-[#AEE000] ring-2 ring-white flex items-center justify-center text-white shadow-sm relative z-10">
              <div className="flex gap-1">
                <div className="w-1 h-1.5 bg-white rounded-full" />
                <div className="w-1 h-1.5 bg-white rounded-full" />
              </div>
            </div>
          </div>

          <span className="text-[13.5px] font-bold text-[#151B3F]">
            여름 우정여행 · 3명이 함께 뽑았어요
          </span>
        </div>
      </main>

      {/* 3. 하단 액션 버튼 영역 */}
      <footer className="w-full bg-white/95 backdrop-blur-md border-t border-[#EEF1F8] p-5 pb-6 sticky bottom-0 z-30 flex flex-col items-center space-y-3">
        <div className="w-full flex items-center gap-2.5">
          {/* 가본 곳이에요 (재추첨 버튼) */}
          <button
            type="button"
            onClick={handleReroll}
            className="flex-shrink-0 h-[52px] px-4 rounded-[18px] bg-white border border-[#E2E6EE] hover:bg-[#F4F6FB] active:scale-[0.98] transition-all flex items-center gap-1.5 text-[14px] font-bold text-[#151B3F] shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4 stroke-[2.2] text-[#5863FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>가본 곳이에요</span>
          </button>

          {/* 이 여행지로 확정하기 버튼 */}
          <div className="flex-1">
            <PrimaryButton onClick={handleConfirmDestination}>
              이 여행지로 확정하기
            </PrimaryButton>
          </div>
        </div>

        {/* 공유하기 텍스트 버튼 */}
        <button
          type="button"
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-1.5 text-[13px] font-bold text-[#717A9B] hover:text-[#5863FF] transition-colors cursor-pointer py-0.5"
        >
          <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>공유하기</span>
        </button>
      </footer>

      {/* 그룹 공유 상세 모달 */}
      <GroupShareDetailModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        roomName="여름 우정여행"
        inviteCode="GN4T29"
      />
    </div>
  );
};
