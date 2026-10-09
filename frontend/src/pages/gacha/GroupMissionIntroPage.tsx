import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import missionCameraIllust from '../../assets/images/gacha/mission_camera_illust.png';

export const GroupMissionIntroPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(5);

  // 5초 자동 시작 타이머
  useEffect(() => {
    if (countdown <= 0) {
      // 0초가 되면 자동으로 미션 수행 화면으로 이동
      handleStartMission();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // 미션 시작 핸들러
  const handleStartMission = () => {
    // 다음 단계(미션 인증/카메라 업로드 화면 또는 미션 진행 화면)로 이동
    navigate('/gacha/group/mission/play');
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 상단 네비게이션 헤더 */}
      <header className="w-full h-[60px] px-5 flex items-center justify-between border-b border-[#F0F2FA] bg-white sticky top-0 z-30 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate('/gacha/group/lobby')}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#151B3F] hover:bg-[#F0F2FA] transition-colors cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-[17px] font-bold text-[#151B3F]">AI 랜덤 미션</h1>

        {/* 밸런스용 스페이서 */}
        <div className="w-10" />
      </header>

      {/* 2. 본문 컨텐츠 영역 */}
      <main className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5">
        {/* [A] AI 랜덤 미션 메인 카드 */}
        <div className="bg-white rounded-[28px] border border-[#E8ECF4] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center animate-fadeIn relative overflow-hidden">
          {/* 상단 미션 라벨 */}
          <span className="text-[14px] font-bold text-[#5863FF] tracking-tight mb-1.5">
            이번 미션
          </span>

          {/* 메인 미션 제목 */}
          <h2 className="text-[22px] font-black text-[#151B3F] text-center tracking-tight leading-snug mb-3.5">
            빨간색 물건을 가장 먼저
            <br />
            찍어 올려주세요!
          </h2>

          {/* 태그 뱃지 행: [제한시간 03:00] + [사진 인증] */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E5FF4D] text-[#151B3F] text-[12.5px] font-black shadow-sm">
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>제한시간 03:00</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF2FF] text-[#5863FF] text-[12.5px] font-bold shadow-sm">
              <svg className="w-4 h-4 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>사진 인증</span>
            </div>
          </div>

          {/* 중앙 전달받은 고화질 카메라 일러스트 */}
          <div className="relative w-52 h-52 flex items-center justify-center my-1">
            <img
              src={missionCameraIllust}
              alt="미션 카메라 일러스트"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(88,99,255,0.18)] animate-bounceSubtle"
            />
          </div>

          {/* 하단 보너스 안내 배너 (navy gr: #172050 -> #2A3570) */}
          <div className="w-full mt-3 bg-gradient-to-br from-[#172050] to-[#2A3570] text-white rounded-[20px] p-4 flex items-center gap-3.5 shadow-[0_4px_16px_rgba(23,32,80,0.18)]">
            <div className="w-8 h-8 rounded-full bg-[#C2F800] text-[#151B3F] flex items-center justify-center flex-shrink-0 font-black shadow-sm">
              <svg className="w-4 h-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <p className="text-[12.5px] font-medium leading-relaxed text-[#E0E4F5]">
              가장 먼저 미션을 성공한 멤버에게
              <br />
              <strong className="text-white font-bold">여행지 뽑기 확률 보너스</strong>가 주어져요.
            </p>
          </div>
        </div>

        {/* [B] 참여 인원 안내 카드 */}
        <div className="bg-white rounded-[22px] border border-[#E8ECF4] p-3.5 px-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* 겹치는 프로필 캐릭터 아바타 버블 (나연, 민지, 수현/지우) */}
            <div className="flex -space-x-2 overflow-hidden items-center">
              {/* 1) 퍼플 캐릭터 (나연) */}
              <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-tr from-[#5863FF] to-[#7B86FF] items-center justify-center shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>

              {/* 2) 스카이블루 캐릭터 (민지) */}
              <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-tr from-[#4EA8FE] to-[#3B92F5] items-center justify-center shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>

              {/* 3) 라임그린 캐릭터 (수현) */}
              <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-tr from-[#C8F026] to-[#AEE000] items-center justify-center shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
            </div>

            <span className="text-[14px] font-bold text-[#313B63]">
              3명이 미션에 참여해요
            </span>
          </div>

          <span className="text-[12px] font-bold text-[#5863FF] bg-[#EEF2FF] px-2.5 py-1 rounded-full">
            준비 완료
          </span>
        </div>
      </main>

      {/* 3. 하단 자동 시작 카운트다운 타이머 & 액션 푸터 */}
      <footer className="w-full px-5 pb-8 pt-2 bg-white border-t border-[#F0F2FA] space-y-2.5 z-20">
        {/* 상단 5초 카운트다운 안내 텍스트 & 프로그레스 바 */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#5863FF]">
            <span className="animate-spin text-[14px]">⏱</span>
            <span>
              <strong className="text-[15px] font-black text-[#5863FF] mr-0.5">{countdown}초</strong> 뒤 미션이 자동으로 시작돼요
            </span>
          </div>
          <span className="text-[12px] font-medium text-[#8C94A6]">
            {countdown}/5s
          </span>
        </div>

        {/* 미션 자동 시작 카운트다운 게이지 바 */}
        <div className="w-full h-1.5 bg-[#EEF2FF] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#5863FF] to-[#7361FF] rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 5) * 100}%` }}
          />
        </div>

        {/* 미션 시작 버튼 (클릭 시 즉시 시작) */}
        <PrimaryButton onClick={handleStartMission}>
          <div className="flex items-center justify-center gap-2">
            <span>미션 시작하기</span>
            <span className="text-[13px] opacity-80 font-normal">({countdown}초)</span>
          </div>
        </PrimaryButton>
      </footer>
    </div>
  );
};
