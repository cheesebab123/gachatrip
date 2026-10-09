import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { ResultShareModal } from '../../components/gacha/ResultShareModal';

// Assets
import resultBgBubbles from '../../assets/images/gacha/result/result_bg_bubbles.png';
import resultCapsuleJeju from '../../assets/images/gacha/result/result_capsule_jeju.png';

export const GachaResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // 토스트 메시지 헬퍼
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2200);
  };

  // 여행지 확정하기
  const handleConfirmTrip = () => {
    // 여행지 확정 완료 안내 화면으로 이동
    navigate('/gacha/confirmed?destination=' + encodeURIComponent('제주도'));
  };

  // 다시 뽑기
  const handleReroll = () => {
    navigate('/gacha/solo');
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#F7F9FD] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 배경 버블 그래픽 */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={resultBgBubbles}
          alt="배경 버블"
          className="w-full h-full object-cover opacity-80"
        />
        {/* 은은한 배경 그라데이션 블렌딩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFBFF]/40 via-transparent to-[#FAFBFF]/80" />
      </div>

      {/* 2. 상단 네비게이션 헤더 */}
      <header className="w-full h-[60px] px-5 flex items-center justify-between z-20 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate('/gacha/solo')}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#151B3F] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[17px] font-bold text-[#151B3F]">뽑기 결과</h1>
        <div className="w-10" /> {/* 좌우 밸런스용 빈 공간 */}
      </header>

      {/* 3. 메인 컨텐츠 영역 */}
      <main className="flex-1 flex flex-col items-center justify-between px-6 pt-2 pb-6 z-10 overflow-y-auto">
        {/* [A] 상단 텍스트 안내 영역 */}
        <div className="flex flex-col items-center text-center mt-2 animate-fadeIn">
          {/* 부드러운 상단 서브 라벨 */}
          <span className="text-[14px] font-bold text-[#5863FF] tracking-tight mb-1">
            여행지가 뽑혔어요!
          </span>

          {/* 메인 목적지 타이틀 */}
          <h2 className="text-[34px] font-black text-[#151B3F] tracking-tight mb-2">
            제주도
          </h2>

          {/* 감성적인 한 줄 설명 */}
          <p className="text-[14.5px] text-[#424F75] font-medium leading-relaxed max-w-[280px] mb-4">
            푸른 바다와 낭만이 가득한,
            <br />
            지금 떠나기 좋은 여행지에요.
          </p>

          {/* 해시태그 뱃지 목록 */}
          <div className="flex items-center gap-2">
            {['#바다여행', '#야경', '#낭만'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-[#EEF1FF] text-[#5863FF] text-[13px] font-bold tracking-tight shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* [B] 중앙 3D 오픈 캡슐 그래픽 (플로팅 입체 애니메이션) */}
        <div className="w-full flex-1 max-h-[380px] flex items-center justify-center relative my-2">
          {/* 부드러운 스파클 백그라운드 글로우 */}
          <div className="absolute w-64 h-64 bg-gradient-to-tr from-[#5863FF]/20 via-[#A2AAFF]/15 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse" />

          {/* 3D 캡슐 본체 */}
          <div className="relative w-[82%] max-w-[320px] aspect-square flex items-center justify-center animate-float">
            <img
              src={resultCapsuleJeju}
              alt="제주도 뽑기 캡슐"
              className="w-full h-full object-contain drop-shadow-[0_24px_48px_rgba(88,99,255,0.22)]"
            />
          </div>
        </div>

        {/* [C] 하단 액션 버튼 그룹 */}
        <div className="w-full flex flex-col gap-3 pt-2">
          {/* 2단 버튼 행: [다시 뽑기] + [이 여행지로 확정하기] */}
          <div className="flex items-center gap-2.5 w-full">
            {/* 다시 뽑기 버튼 */}
            <button
              type="button"
              onClick={handleReroll}
              className="h-[54px] px-5 rounded-[18px] bg-white border border-[#E8ECF4] text-[#151B3F] text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:bg-[#F8F9FD] hover:border-[#CCD4E5] active:scale-[0.98] transition-all cursor-pointer flex-shrink-0"
            >
              <svg className="w-4 h-4 text-[#151B3F] stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>다시 뽑기</span>
            </button>

            {/* 이 여행지로 확정하기 */}
            <div className="flex-1">
              <PrimaryButton onClick={handleConfirmTrip} className="!h-[54px] !rounded-[18px] !text-[15px]">
                이 여행지로 확정하기
              </PrimaryButton>
            </div>
          </div>

          {/* 공유하기 텍스트 버튼 ➔ 누르면 시안 1:1 바텀시트 모달 오픈! */}
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center justify-center gap-1.5 text-[14px] font-medium text-[#8C94A6] hover:text-[#5863FF] py-2 transition-colors cursor-pointer active:scale-98"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>공유하기</span>
          </button>
        </div>
      </main>

      {/* 4. 여행지 공유하기 바텀시트 모달 */}
      <ResultShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        destinationName="제주도"
        onShowToast={showToast}
      />

      {/* 5. 토스트 알림 */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-[#151B3F]/90 text-white text-[13px] font-bold px-4 py-2.5 rounded-full shadow-lg z-50 animate-fadeIn whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
