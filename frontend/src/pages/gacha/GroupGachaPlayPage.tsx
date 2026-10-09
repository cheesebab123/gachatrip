import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';

// Assets
import groupTitleImg from '../../assets/images/gacha/group_gacha_title.png';
import gachaMachineImg from '../../assets/images/gacha/gacha_machine_3d.png';
import machineEmptyImg from '../../assets/images/gacha/gacha_machine_empty.png';
import handleImg from '../../assets/images/gacha/gacha_handle.png';
import capsuleBusanImg from '../../assets/images/gacha/capsule_busan.png';
import capsuleJejuImg from '../../assets/images/gacha/capsule_jeju.png';
import capsuleChungbukImg from '../../assets/images/gacha/capsule_chungbuk.png';
import capsuleGwangjuImg from '../../assets/images/gacha/capsule_gwangju.png';
import capsuleGyeonggiImg from '../../assets/images/gacha/capsule_gyeonggi.png';

type GachaPhase = 'idle' | 'inserting_coin' | 'spinning' | 'capsule_emerge' | 'completed';

export const GroupGachaPlayPage: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<GachaPhase>('idle');

  const handleStartGacha = () => {
    if (phase !== 'idle') return;
    setPhase('inserting_coin');
  };

  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;
    let timer3: ReturnType<typeof setTimeout>;

    if (phase === 'inserting_coin') {
      // 1) 코인 쏙 들어가기 (0.75초 후 레버 회전 & 머신 흔들림)
      timer1 = setTimeout(() => {
        setPhase('spinning');
      }, 750);
    } else if (phase === 'spinning') {
      // 2) 레버 360도 회전 및 캡슐 믹싱 (1.8초간 지속 후 캡슐 뿅!)
      timer2 = setTimeout(() => {
        setPhase('capsule_emerge');
      }, 1800);
    } else if (phase === 'capsule_emerge') {
      // 3) 캡슐 튀어나온 후 결과 화면으로 이동 (1.3초 후)
      timer3 = setTimeout(() => {
        setPhase('completed');
        navigate('/gacha/group/result');
      }, 1300);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [phase, navigate]);

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 상단 네비게이션 헤더 (조건 설정하기 제외, 뒤로가기만 깔끔하게 배치) */}
      <header className="w-full h-[60px] px-5 pt-3 flex items-center justify-between z-20 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate('/gacha/group/mission/result')}
          disabled={phase !== 'idle'}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#151B3F] hover:bg-[#F0F2FA] transition-colors cursor-pointer active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="뒤로가기"
        >
          <svg
            className="w-6 h-6 stroke-[2.2]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 대칭용 빈 공간 */}
        <div className="w-10" />
      </header>

      {/* 2. 중앙 컨텐츠 영역 (타이틀 그래픽 + 확률 UP 카드 + 3D 가챠 머신 및 물리 애니메이션) */}
      <main className="flex-1 flex flex-col items-center justify-between px-5 pt-1 pb-2 z-10 overflow-hidden min-h-0 relative">
        {/* 타이틀 그래픽 & 멤버 1등 확률 UP 카드 */}
        <div className="flex flex-col items-center text-center mt-1 mb-2 flex-shrink-0 space-y-2">
          {/* 그룹 뽑기 타이틀 그래픽 (솔로 뽑기와 동일한 높이 규격) */}
          <div className="h-[50px] sm:h-[54px] flex items-center justify-center">
            <img
              src={groupTitleImg}
              alt="그룹 뽑기"
              className="h-full w-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* 멤버 아바타 & 1등 확률 UP 카드 */}
          <div className="bg-white rounded-[20px] px-4.5 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#E8ECF4] flex items-center justify-center gap-2.5 animate-fadeIn">
            {/* 3명의 겹친 2-dot 캐릭터 아바타 */}
            <div className="flex -space-x-2">
              {/* 나연 (Purple) */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#5863FF] to-[#7B86FF] ring-2 ring-white flex items-center justify-center text-white shadow-sm relative z-30">
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
              {/* 민지 (Sky Blue) */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#4EA8FE] to-[#3B92F5] ring-2 ring-white flex items-center justify-center text-white shadow-sm relative z-20">
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
              {/* 수현 (Lime Green) */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#C8F026] to-[#AEE000] ring-2 ring-white flex items-center justify-center text-white shadow-sm relative z-10">
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
            </div>

            {/* 확률 UP 라벨 */}
            <span className="text-[13.5px] font-black text-[#151B3F]">
              민지🔥 확률 UP
            </span>
          </div>

          <p className="text-[13px] font-semibold text-[#8C94A6] tracking-tight">
            우리의 선택과 미션 결과를 반영해 여행지를 뽑아보세요.
          </p>
        </div>

        {/* 3D 가챠 머신 조립 컨테이너 */}
        <div className="relative w-full max-w-[360px] flex-1 flex items-center justify-center my-auto min-h-0 px-1 py-1">
          {/* 가챠 머신 진동 시 양옆 파동 라인 효과 ((( 🌐 ))) */}
          {phase === 'spinning' && (
            <>
              {/* 좌측 진동 파동 */}
              <div className="absolute left-1 top-[34%] -translate-y-1/2 flex gap-1 animate-vibration pointer-events-none z-30">
                <svg className="w-5 h-12 text-[#7C88FF]" viewBox="0 0 20 48" fill="none">
                  <path d="M16 4C8 16 8 32 16 44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                </svg>
                <svg className="w-4 h-12 text-[#9BA5FF] -ml-2" viewBox="0 0 20 48" fill="none">
                  <path d="M14 10C8 18 8 30 14 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>

              {/* 우측 진동 파동 */}
              <div className="absolute right-1 top-[34%] -translate-y-1/2 flex gap-1 animate-vibration pointer-events-none z-30">
                <svg className="w-4 h-12 text-[#9BA5FF] -mr-2" viewBox="0 0 20 48" fill="none">
                  <path d="M6 10C12 18 12 30 6 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <svg className="w-5 h-12 text-[#7C88FF]" viewBox="0 0 20 48" fill="none">
                  <path d="M4 4C12 16 12 32 4 44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                </svg>
              </div>
            </>
          )}

          {/* 메인 머신 래퍼 */}
          <div
            className={`w-full h-full max-h-[440px] flex items-center justify-center relative ${
              phase === 'spinning' ? 'animate-machineShake' : ''
            }`}
          >
            {/* [A] 뽑기 시작 전 (idle 상태): 깨끗한 원본 3D 완성형 머신 이미지 노출 */}
            {phase === 'idle' ? (
              <img
                src={gachaMachineImg}
                alt="가챠 머신"
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(88,99,255,0.20)] transition-transform duration-300"
              />
            ) : (
              /* [B] 뽑기 진행 중 (코인 투입 / 회전 / 배출): 파츠별 리얼 물리 애니메이션 레이어 작동 */
              <>
                {/* 1) 빈 가챠 머신 본체 */}
                <img
                  src={machineEmptyImg}
                  alt="가챠 머신 본체"
                  className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(88,99,255,0.20)] transition-transform duration-300 relative z-10"
                />

                {/* 2) 유리구 내부 캡슐 5개 (실시간 믹싱 텀블링 애니메이션) */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  {/* (1) 부산 캡슐 (좌측 상단) */}
                  <div
                    className={`absolute left-[18%] top-[24%] w-[33%] transition-transform duration-300 ${
                      phase === 'spinning' ? 'animate-tumble-a' : 'rotate-[-12deg]'
                    }`}
                  >
                    <img
                      src={capsuleBusanImg}
                      alt="부산 캡슐"
                      className="w-full h-auto object-contain drop-shadow-md"
                    />
                  </div>

                  {/* (2) 경기 캡슐 (우측 상단) */}
                  <div
                    className={`absolute right-[18%] top-[24%] w-[33%] transition-transform duration-300 ${
                      phase === 'spinning' ? 'animate-tumble-b' : 'rotate-[14deg]'
                    }`}
                  >
                    <img
                      src={capsuleGyeonggiImg}
                      alt="경기 캡슐"
                      className="w-full h-auto object-contain drop-shadow-md"
                    />
                  </div>

                  {/* (3) 충북 캡슐 (좌측 하단) */}
                  <div
                    className={`absolute left-[20%] top-[40%] w-[31%] transition-transform duration-300 ${
                      phase === 'spinning' ? 'animate-tumble-c' : 'rotate-[8deg]'
                    }`}
                  >
                    <img
                      src={capsuleChungbukImg}
                      alt="충북 캡슐"
                      className="w-full h-auto object-contain drop-shadow-md"
                    />
                  </div>

                  {/* (4) 광주 캡슐 (우측 하단) */}
                  <div
                    className={`absolute right-[20%] top-[40%] w-[31%] transition-transform duration-300 ${
                      phase === 'spinning' ? 'animate-tumble-d' : 'rotate-[-16deg]'
                    }`}
                  >
                    <img
                      src={capsuleGwangjuImg}
                      alt="광주 캡슐"
                      className="w-full h-auto object-contain drop-shadow-md"
                    />
                  </div>

                  {/* (5) 제주 캡슐 (중앙 하단 당첨 구슬) */}
                  <div
                    className={`absolute left-[33%] top-[34%] w-[34%] transition-transform duration-300 ${
                      phase === 'spinning'
                        ? 'animate-tumble-center'
                        : phase === 'capsule_emerge'
                        ? 'opacity-0 scale-50 transition-all duration-300'
                        : 'scale-105'
                    }`}
                  >
                    <img
                      src={capsuleJejuImg}
                      alt="제주 캡슐"
                      className="w-full h-auto object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* 3) 코인 투입구 & 코인 쏙 들어가는 애니메이션 */}
                <div className="absolute right-[24%] bottom-[22%] w-[10%] h-[16%] flex items-center justify-center z-30 pointer-events-none">
                  {phase === 'inserting_coin' && (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#FFB800] via-[#FFE600] to-[#FFF59D] border border-[#E6A100] shadow-md flex items-center justify-center text-[10px] font-black text-[#8A5800] animate-coinInsert">
                      🪙
                    </div>
                  )}
                </div>

                {/* 4) 회전하는 레버 핸들 파츠 */}
                <div
                  className={`absolute left-[35%] bottom-[16%] w-[30%] h-[25%] flex items-center justify-center z-30 pointer-events-none ${
                    phase === 'spinning' ? 'animate-leverSpin' : ''
                  }`}
                >
                  <img
                    src={handleImg}
                    alt="가챠 레버"
                    className="w-full h-auto object-contain drop-shadow-md"
                  />
                </div>

                {/* 5) 하단 배출구에서 튀어나오는 당첨 캡슐 (배출구에서 뿅!) */}
                {phase === 'capsule_emerge' && (
                  <div className="absolute left-[33%] bottom-[12%] w-[34%] z-40 animate-capsuleDrop">
                    <img
                      src={capsuleJejuImg}
                      alt="당첨된 제주도 캡슐"
                      className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(88,99,255,0.4)]"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* 하단 여백 확보 */}
        <div className="w-full" />
      </main>

      {/* 3. 하단 액션 버튼 영역 */}
      <footer className="w-full px-6 pb-10 pt-3 flex flex-col items-center gap-2 z-20 flex-shrink-0">
        <PrimaryButton
          onClick={handleStartGacha}
          disabled={phase !== 'idle'}
          className={phase !== 'idle' ? '!opacity-80 !cursor-not-allowed' : ''}
        >
          {phase === 'idle'
            ? '그룹 여행지 뽑기'
            : phase === 'inserting_coin'
            ? '코인 투입 중...'
            : phase === 'spinning'
            ? '여행지 믹싱 중...'
            : '캡슐 나오는 중! ✨'}
        </PrimaryButton>
        <span className="text-[12px] text-[#8C94A6] font-normal">
          멤버들이 선택한 여행지는 공개되지 않아요
        </span>
      </footer>
    </div>
  );
};
