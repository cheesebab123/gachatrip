import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';

export const GachaConfirmedPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('destination') || '제주도';
  const mode = searchParams.get('mode') || 'solo'; // 'solo' | 'group'
  const isGroup = mode === 'group';

  // 1) AI 여행 코스 만들기
  const handleCreateAICourse = () => {
    // AI 맞춤 코스 생성 로직 또는 로딩/코스 화면으로 이동
    navigate('/course');
  };

  // 2) 나중에 할게요 ➔ 메인 홈으로 이동
  const handleLater = () => {
    navigate('/home');
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 상단 빈 영역 (정돈된 레이아웃) */}
      <div className="h-[60px]" />

      {/* 2. 중앙 컨텐츠 영역 (체크 뱃지 + 타이틀 + 설명 + 그룹 참여 멤버 카드) */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-10 animate-fadeIn">
        {/* 체크 아이콘 원형 뱃지 */}
        <div className="w-[84px] h-[84px] rounded-full bg-gradient-to-tr from-[#5863FF] to-[#6C77FF] flex items-center justify-center text-white shadow-[0_12px_28px_rgba(88,99,255,0.35)] mb-8 animate-bounceSubtle">
          <svg className="w-10 h-10 stroke-[3.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* 확정 여행지 타이틀 */}
        <div className="text-center space-y-1">
          <h1 className="text-[28px] font-black text-[#151B3F] tracking-tight leading-tight">
            {destination}
          </h1>
          <h2 className="text-[28px] font-black text-[#151B3F] tracking-tight leading-tight">
            여행이 확정되었어요!
          </h2>
        </div>

        {/* AI 코스 안내 서브텍스트 */}
        <p className="text-[15px] font-medium text-[#8C94A6] text-center mt-3.5">
          AI가 맞춤 여행 코스를 만들어드릴게요.
        </p>

        {/* 그룹 모드 시 표시되는 3인 멤버 참여 카드 */}
        {isGroup && (
          <div className="w-full max-w-[340px] bg-white rounded-[22px] px-5 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-[#E8ECF4] flex items-center justify-center gap-3 mt-6 animate-fadeIn">
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

            <span className="text-[14px] font-bold text-[#717A9B]">
              여름 우정여행 · 3명이 함께 뽑았어요
            </span>
          </div>
        )}
      </main>

      {/* 3. 하단 액션 버튼 그룹 */}
      <footer className="w-full px-6 pb-12 pt-4 flex flex-col gap-3.5 z-10">
        {/* AI 여행 코스 만들기 버튼 (공통 PrimaryButton 디자인 적용) */}
        <PrimaryButton onClick={handleCreateAICourse}>
          <span className="flex items-center justify-center gap-1.5">
            <span className="text-[17px]">✨</span>
            <span>AI 여행 코스 만들기</span>
          </span>
        </PrimaryButton>

        {/* 나중에 할게요 버튼 */}
        <button
          type="button"
          onClick={handleLater}
          className="w-full h-[54px] rounded-[18px] bg-white border border-[#E8ECF4] hover:bg-[#F8F9FD] active:scale-[0.98] text-[#151B3F] text-[16px] font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all cursor-pointer"
        >
          나중에 할게요
        </button>
      </footer>
    </div>
  );
};
