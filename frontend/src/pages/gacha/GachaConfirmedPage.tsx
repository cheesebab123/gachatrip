import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { getConfirmedCardByRegion } from '../../utils/imageMapper';

export const GachaConfirmedPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('destination') || '제주도';
  const mode = searchParams.get('mode') || 'solo'; // 'solo' | 'group'
  const isGroup = mode === 'group';

  // 확정 카드 이미지 (20종 지역별 1:1 매핑)
  const confirmedCardImage = getConfirmedCardByRegion(destination);

  // 1) AI 여행 코스 만들기
  const handleCreateAICourse = () => {
    navigate('/course');
  };

  // 2) 나중에 할게요 ➔ 메인 홈으로 이동
  const handleLater = () => {
    navigate('/home');
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 상단 네비게이션 헤더 */}
      <header className="w-full h-[60px] px-5 flex items-center justify-between z-20 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#151B3F] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          aria-label="홈으로"
        >
          <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <h1 className="text-[17px] font-bold text-[#151B3F]">여행지 확정</h1>
        <div className="w-10" />
      </header>

      {/* 2. 중앙 컨텐츠 영역 (확정 카드 + 타이틀 + 설명) */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-2 animate-fadeIn overflow-y-auto">
        {/* 체크 아이콘 원형 뱃지 */}
        <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-tr from-[#5863FF] to-[#6C77FF] flex items-center justify-center text-white shadow-[0_12px_28px_rgba(88,99,255,0.35)] mb-4 animate-bounceSubtle">
          <svg className="w-8 h-8 stroke-[3.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* 확정 여행지 타이틀 */}
        <div className="text-center space-y-1">
          <h1 className="text-[26px] font-black text-[#151B3F] tracking-tight leading-tight">
            {destination}
          </h1>
          <h2 className="text-[24px] font-black text-[#151B3F] tracking-tight leading-tight">
            여행이 확정되었어요!
          </h2>
        </div>

        {/* 20종 지역별 확정 카드 그래픽 */}
        <div className="w-full max-w-[280px] my-4 aspect-[4/5] flex items-center justify-center rounded-[24px] overflow-hidden shadow-[0_16px_36px_rgba(88,99,255,0.18)] border border-[#E8ECF4] bg-white animate-float">
          <img
            src={confirmedCardImage}
            alt={`${destination} 확정 카드`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* AI 코스 안내 서브텍스트 */}
        <p className="text-[14px] font-medium text-[#8C94A6] text-center">
          선택된 여행지에 어울리는 맞춤 여행 코스를 확인해보세요.
        </p>

        {/* 그룹 모드 시 표시되는 3인 멤버 참여 카드 */}
        {isGroup && (
          <div className="w-full max-w-[340px] bg-white rounded-[22px] px-5 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-[#E8ECF4] flex items-center justify-center gap-3 mt-4 animate-fadeIn">
            <div className="flex -space-x-2 flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#5863FF] to-[#7B86FF] ring-2 ring-white flex items-center justify-center text-white shadow-sm relative z-30">
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#4EA8FE] to-[#3B92F5] ring-2 ring-white flex items-center justify-center text-white shadow-sm relative z-20">
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#C8F026] to-[#AEE000] ring-2 ring-white flex items-center justify-center text-white shadow-sm relative z-10">
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
            </div>

            <span className="text-[13px] font-bold text-[#717A9B]">
              친구들과 함께 확정한 여행지에요
            </span>
          </div>
        )}
      </main>

      {/* 3. 하단 액션 버튼 그룹 */}
      <footer className="w-full px-6 pb-8 pt-3 flex flex-col gap-2.5 z-10">
        <PrimaryButton onClick={handleCreateAICourse}>
          <span className="flex items-center justify-center gap-1.5">
            <span className="text-[17px]">✨</span>
            <span>AI 여행 코스 만들기</span>
          </span>
        </PrimaryButton>

        <button
          type="button"
          onClick={handleLater}
          className="w-full h-[52px] rounded-[18px] bg-white border border-[#E8ECF4] hover:bg-[#F8F9FD] active:scale-[0.98] text-[#151B3F] text-[15px] font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all cursor-pointer"
        >
          나중에 할게요
        </button>
      </footer>
    </div>
  );
};
