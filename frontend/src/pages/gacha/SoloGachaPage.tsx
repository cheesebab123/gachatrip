import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';

// Assets
import soloTitleImg from '../../assets/images/gacha/solo_gacha_title.png';
import gachaMachineImg from '../../assets/images/gacha/gacha_machine_3d.png';
import machineEmptyImg from '../../assets/images/gacha/gacha_machine_empty.png';
import handleImg from '../../assets/images/gacha/gacha_handle.png';
import capsuleBusanImg from '../../assets/images/gacha/capsule_busan.png';
import capsuleJejuImg from '../../assets/images/gacha/capsule_jeju.png';
import capsuleChungbukImg from '../../assets/images/gacha/capsule_chungbuk.png';
import capsuleGwangjuImg from '../../assets/images/gacha/capsule_gwangju.png';
import capsuleGyeonggiImg from '../../assets/images/gacha/capsule_gyeonggi.png';

type GachaPhase = 'idle' | 'inserting_coin' | 'spinning' | 'capsule_emerge' | 'completed';

export const SoloGachaPage: React.FC = () => {
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
        navigate('/gacha/result');
      }, 1300);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [phase, navigate]);

  const handleOpenCondition = () => {
    if (phase !== 'idle') return;
    navigate('/gacha/condition');
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative">
      {/* 1. 상단 네비게이션 헤더 */}
      <header className="w-full h-[60px] px-5 pt-3 flex items-center justify-between z-20 flex-shrink-0">
        {/* 뒤로가기 버튼 */}
        <button
          type="button"
          onClick={() => navigate('/home')}
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

        {/* 우측 상단 '조건 설정하기' 필터 버튼 */}
        <button
          type="button"
          onClick={handleOpenCondition}
          disabled={phase !== 'idle'}
          className="h-[36px] px-3.5 rounded-full border border-[#E8ECF4] bg-white text-[#151B3F] text-[13px] font-bold flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-[#F8F9FD] hover:border-[#CCD4E5] transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
        >
          <svg
            className="w-3.5 h-3.5 text-[#151B3F]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span>조건 설정하기</span>
        </button>
      </header>

      {/* 2. 중앙 컨텐츠 영역 (타이틀 + 파츠별 3D 가챠 머신 및 리얼 물리 애니메이션) */}
      <main className="flex-1 flex flex-col items-center justify-between px-5 pt-4 pb-2 z-10 overflow-hidden min-h-0 relative">
        {/* 타이틀 그래픽 & 서브텍스트 */}
        <div className="flex flex-col items-center text-center mt-2 mb-2 flex-shrink-0">
          <div className="h-[50px] sm:h-[54px] flex items-center justify-center">
            <img
              src={soloTitleImg}
              alt="개인 뽑기"
              className="h-full w-auto object-contain drop-shadow-sm"
            />
          </div>
          <p className="text-[14px] font-semibold text-[#8C94A6] mt-2.5 tracking-tight">
            조건에 맞는 여행지를 랜덤으로 뽑아보세요.
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
                    className={`absolute left-[20%] top-[37%] w-[34%] transition-transform duration-300 ${
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
                    className={`absolute right-[20%] top-[37%] w-[34%] transition-transform duration-300 ${
                      phase === 'spinning' ? 'animate-tumble-d' : 'rotate-[-10deg]'
                    }`}
                  >
                    <img
                      src={capsuleGwangjuImg}
                      alt="광주 캡슐"
                      className="w-full h-auto object-contain drop-shadow-md"
                    />
                  </div>

                  {/* (5) 제주 캡슐 (중앙 앞쪽 주인공 배치) */}
                  <div
                    className={`absolute left-1/2 top-[32%] -translate-x-1/2 w-[38%] transition-transform duration-300 z-10 ${
                      phase === 'spinning' ? 'animate-tumble-center' : 'rotate-[0deg]'
                    }`}
                  >
                    <img
                      src={capsuleJejuImg}
                      alt="제주 캡슐"
                      className="w-full h-auto object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* 3) 골드 코인 투입 애니메이션 (슬롯 우측 상단에서 쏙!) */}
                {phase === 'inserting_coin' && (
                  <div className="absolute right-[22%] top-[68%] z-30 pointer-events-none animate-coinInsert">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FFE875] via-[#FFD026] to-[#E5A800] border-2 border-[#FFF4A8] shadow-[0_4px_12px_rgba(255,200,0,0.6)] flex items-center justify-center">
                      <span className="text-[11px] font-black text-[#875500]">★</span>
                    </div>
                  </div>
                )}

                {/* 4) 실제 3D 손잡이 파츠 (360도 실제 회전 연출) */}
                <div
                  className={`absolute left-[49.8%] top-[75.8%] -translate-x-1/2 -translate-y-1/2 w-[41%] aspect-square rounded-full overflow-hidden z-25 pointer-events-none flex items-center justify-center ${
                    phase === 'spinning' ? 'animate-handleSpin' : ''
                  }`}
                >
                  <img
                    src={handleImg}
                    alt="가챠 손잡이"
                    className="w-full h-full object-contain rounded-full drop-shadow-sm"
                  />
                </div>
              </>
            )}

            {/* 5) 캡슐 배출구에서 튀어나오는 당첨 캡슐 애니메이션 */}
            {phase === 'capsule_emerge' && (
              <div className="absolute left-1/2 bottom-[12%] z-40 pointer-events-none animate-capsulePopOut">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <img
                    src={capsuleJejuImg}
                    alt="뽑힌 캡슐"
                    className="w-full h-full object-contain drop-shadow-[0_14px_30px_rgba(88,99,255,0.5)]"
                  />
                  {/* 스파클 글로우 효과 */}
                  <div className="absolute inset-0 bg-[#5863FF]/25 rounded-full blur-xl animate-pulse" />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 3. 하단 CTA 버튼 또는 두근두근 기대 문구 */}
      <footer className="p-5 pt-2 pb-6 z-20 flex-shrink-0 min-h-[82px] flex items-center justify-center">
        {phase === 'idle' ? (
          <PrimaryButton onClick={handleStartGacha}>
            개인 뽑기 시작
          </PrimaryButton>
        ) : (
          <div className="flex flex-col items-center justify-center animate-textPulse text-center select-none py-1">
            <span className="text-[17px] font-bold text-[#5863FF] tracking-tight">
              두근두근
            </span>
            <span className="text-[14px] font-semibold text-[#8C94A6] mt-0.5">
              어떤 여행지가 나올까요?
            </span>
          </div>
        )}
      </footer>
    </div>
  );
};
