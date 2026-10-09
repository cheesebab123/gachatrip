import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import type { MainLayoutContextType } from '../../layouts/MainLayout';

// Assets
import gachaBallImg from '../../assets/images/home/gacha_capsule_ball.png';
import keyringImg from '../../assets/images/home/keyring_collection.png';
import aiCourseImg from '../../assets/images/home/ai_course_icon.png';
import mapImg from '../../assets/images/home/home_map_icon.png';
import sunsetImg from '../../assets/images/home/ganghwado_sunset.png';
import arrowRightImg from '../../assets/images/home/arrow_right.png';
import homeTitleText from '../../assets/images/home/home_title_text.png';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext<MainLayoutContextType>();

  return (
    <div className="flex flex-col gap-4 relative">
      {/* 1. 타이포그래피 안내 섹션 */}
      <div className="mt-1 mb-6 flex flex-col">
        <span className="text-[14px] font-bold text-[#151B3F] tracking-tight">
          오늘의 랜덤 여행
        </span>
        <h1 className="mt-2 mb-1">
          <img
            src={homeTitleText}
            alt="어디로 떠나볼까요?"
            className="h-[74px] w-auto object-contain"
          />
        </h1>
        <p className="text-[14px] font-normal text-[#687091] tracking-tight">
          여행 가챠가 오늘의 목적지를 골라드려요
        </p>
      </div>

      {/* 2. [큰 박스] 상단 메인 대형 카드 (여행지 뽑기) */}
      <div className="w-full bg-white rounded-[24px] border border-[#E8ECF4] p-5 shadow-[0_8px_24px_rgba(88,99,255,0.06)] flex flex-col justify-between">
        {/* 상단: 좌측(텍스트) / 우측(3D 가챠볼) */}
        <div className="flex items-center justify-between gap-3">
          {/* 좌측 텍스트 묶음 */}
          <div className="flex flex-col flex-1 min-w-0 pr-1">
            <span className="bg-[#EEF1FF] text-[#5863FF] text-[11px] font-bold px-2.5 py-1 rounded-full w-fit">
              GACHA GO!
            </span>
            <h2 className="text-[20px] font-bold text-[#151B3F] mt-2 mb-1 tracking-tight">
              여행지 뽑기
            </h2>
            <p className="text-[13px] font-normal text-[#687091] leading-snug">
              조건을 고르고 가챠 뽑기를 하면<br />
              AI가 맞춤 여행 코스를 추천해줘요 !
            </p>
          </div>

          {/* 우측 3D 가챠볼 이미지 (고정 크기) */}
          <div className="w-[94px] h-[94px] flex-shrink-0 flex items-center justify-center">
            <img
              src={gachaBallImg}
              alt="가챠 캡슐"
              className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(88,99,255,0.2)]"
            />
          </div>
        </div>

        {/* 하단: 풀 너비 그라데이션 CTA 버튼 */}
        <PrimaryButton
          onClick={() => {
            if (outletContext?.openGachaModal) {
              outletContext.openGachaModal();
            } else {
              navigate('/gacha');
            }
          }}
          className="mt-4"
        >
          여행지 뽑기
        </PrimaryButton>
      </div>

      {/* 3. [중간 2분할 영역] (좌측: 중간박스 내 키링 / 우측: 작은박스 2개) */}
      <div className="w-full grid grid-cols-2 gap-3">
        
        {/* 3-1. 좌측 [중간 박스] 내 키링 */}
        <div
          onClick={() => navigate('/my/collection')}
          className="bg-white rounded-[22px] border border-[#E8ECF4] p-4 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.03)] cursor-pointer hover:border-[#5863FF]/30 transition-all active:scale-[0.99]"
        >
          {/* 상단: 타이틀 + 키링 이미지 */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#5863FF] tracking-wider uppercase">
                MY COLLECTION
              </span>
              <h3 className="text-[18px] font-bold text-[#151B3F] mt-0.5">
                내 키링
              </h3>
            </div>
            <img
              src={keyringImg}
              alt="키링 컬렉션"
              className="w-[80px] h-[80px] object-contain flex-shrink-0"
            />
          </div>

          {/* 중단: 수집 상태 & 게이지 바 */}
          <div className="mt-3">
            <div className="text-[12px] text-[#687091]">
              <strong className="text-[13px] font-bold text-[#151B3F]">8</strong> / 12 수집
            </div>
            <div className="w-full h-[6px] bg-[#EAECEF] rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-[#A3E635] rounded-full"
                style={{ width: `${(8 / 12) * 100}%` }}
              />
            </div>
          </div>

          {/* 하단: 모두 보기 링크 */}
          <div className="mt-3 text-right">
            <span className="text-[12px] font-semibold text-[#5863FF] hover:underline inline-flex items-center gap-0.5">
              모두 보기 ›
            </span>
          </div>
        </div>

        {/* 3-2. 우측 [작은 박스 2개 세로 스택] */}
        <div className="flex flex-col gap-3">
          {/* 작은 박스 1: AI 여행 코스 */}
          <div
            onClick={() => navigate('/mytrip')}
            className="flex-1 bg-white rounded-[20px] border border-[#E8ECF4] p-3.5 flex items-center justify-between gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.03)] cursor-pointer hover:border-[#5863FF]/30 transition-all active:scale-[0.99]"
          >
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-[#151B3F] tracking-tight">
                AI 여행 코스
              </h3>
              <p className="text-[11px] text-[#8C94A6] mt-0.5">
                맞춤 여행 코스 보기
              </p>
            </div>
            {aiCourseImg ? (
              <img
                src={aiCourseImg}
                alt="AI 여행 코스"
                className="w-10 h-10 object-contain flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#EEF1FF] flex items-center justify-center flex-shrink-0">
                <span className="text-[18px]">✨</span>
              </div>
            )}
          </div>

          {/* 작은 박스 2: 여행 지도 */}
          <div
            onClick={() => navigate('/mytrip/map')}
            className="flex-1 bg-white rounded-[20px] border border-[#E8ECF4] p-3.5 flex items-center justify-between gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.03)] cursor-pointer hover:border-[#5863FF]/30 transition-all active:scale-[0.99]"
          >
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-[#151B3F] tracking-tight">
                여행 지도
              </h3>
              <p className="text-[11px] text-[#8C94A6] mt-0.5">
                다녀온 지역 보기
              </p>
            </div>
            {mapImg ? (
              <img
                src={mapImg}
                alt="여행 지도"
                className="w-[46px] h-[46px] object-contain flex-shrink-0 scale-110"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#EEF1FF] flex items-center justify-center flex-shrink-0">
                <span className="text-[18px]">🗺️</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 4. [하단 긴 박스] 추천 코스 (강화도 · 노을 산책) */}
      <div
        onClick={() => navigate('/course/detail/ganghwado')}
        className="w-full bg-white rounded-[22px] border border-[#E8ECF4] p-3.5 flex items-center justify-between gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] cursor-pointer hover:border-[#5863FF]/30 transition-all active:scale-[0.99]"
      >
        {/* 좌측 썸네일 */}
        <img
          src={sunsetImg}
          alt="강화도 노을 산책"
          className="w-[56px] h-[56px] rounded-[16px] object-cover flex-shrink-0 shadow-sm"
        />

        {/* 중앙 텍스트 컨텐츠 */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[11px] font-semibold text-[#5863FF]">
            지금 떠나기 좋은 곳
          </span>
          <h4 className="text-[15px] font-bold text-[#151B3F] mt-0.5 truncate">
            강화도 · 노을 산책
          </h4>
          <span className="text-[12px] text-[#8C94A6] mt-0.5">
            차로 58분 · 맑음 24°
          </span>
        </div>

        {/* 우측 화살표 아이콘 */}
        <div className="flex-shrink-0 flex items-center justify-center pr-1">
          {arrowRightImg ? (
            <img
              src={arrowRightImg}
              alt="이동"
              className="w-4 h-4 object-contain opacity-70"
            />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5863FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </div>
      </div>

    </div>
  );
};
