import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';

interface ParticipantRank {
  rank: number;
  name: string;
  submissionOrder: string;
  avatarColor: string;
  percentage: number;
  bonusLabel: string;
  badgeBg: string;
  badgeTextColor: string;
  gaugeGradient: string;
  gaugeWidth: string;
  description: string;
}

export const GroupMissionResultPage: React.FC = () => {
  const navigate = useNavigate();

  // 등수별 균일 차등 가중치 데이터 (1등 50%, 2등 30%, 3등 20%)
  const participants: ParticipantRank[] = [
    {
      rank: 1,
      name: '민지',
      submissionOrder: '1번째 제출',
      avatarColor: 'from-[#4EA8FE] to-[#3B92F5]',
      percentage: 50,
      bonusLabel: '+25% UP',
      badgeBg: 'bg-[#D2F800]',
      badgeTextColor: 'text-[#151B3F]',
      gaugeGradient: 'from-[#C8F026] to-[#D2F800]',
      gaugeWidth: 'w-[75%]',
      description: '뽑기 보너스 대폭 적용',
    },
    {
      rank: 2,
      name: '나연',
      submissionOrder: '2번째 제출',
      avatarColor: 'from-[#5863FF] to-[#7B86FF]',
      percentage: 30,
      bonusLabel: '+10% UP',
      badgeBg: 'bg-[#E5E9FF]',
      badgeTextColor: 'text-[#5863FF]',
      gaugeGradient: 'from-[#5863FF] to-[#7B86FF]',
      gaugeWidth: 'w-[48%]',
      description: '뽑기 보너스 적용',
    },
    {
      rank: 3,
      name: '수현',
      submissionOrder: '3번째 제출',
      avatarColor: 'from-[#C8F026] to-[#AEE000]',
      percentage: 20,
      bonusLabel: '기본 확률',
      badgeBg: 'bg-[#F0F2F8]',
      badgeTextColor: 'text-[#717A9B]',
      gaugeGradient: 'from-[#8E9AB8] to-[#A0A6B8]',
      gaugeWidth: 'w-[30%]',
      description: '기본 참여 확률',
    },
  ];

  const handleGoToGacha = () => {
    // 그룹 뽑기 머신 화면으로 이동
    navigate('/gacha/group/play');
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 상단 네비게이션 헤더 */}
      <header className="w-full h-14 px-5 flex items-center justify-between bg-white border-b border-[#F0F2F7] sticky top-0 z-30 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate('/gacha/group/mission/play')}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#151B3F] hover:bg-[#F4F6FB] transition-colors cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[17px] font-bold text-[#151B3F] tracking-tight">
          AI 미션 발표
        </h1>
        <div className="w-8" />
      </header>

      {/* 2. 본문 컨텐츠 영역 */}
      <main className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {/* [A] 상단 1등 하이라이트 히어로 카드 (Figma gradient: #242F68 -> #455BC8) */}
        <section className="bg-gradient-to-b from-[#242F68] to-[#455BC8] rounded-[26px] p-6 text-white text-center shadow-[0_10px_28px_rgba(36,47,104,0.25)] relative overflow-hidden animate-fadeIn">
          {/* 장식용 은은한 글로우 원형 */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#D2F800]/15 rounded-full blur-2xl pointer-events-none" />

          {/* 1등 트로피 뱃지 */}
          <div className="inline-flex items-center gap-1 bg-[#D2F800] text-[#151B3F] font-black text-[13px] px-3.5 py-1 rounded-full shadow-sm mb-4">
            <span>🏆</span>
            <span>1등</span>
          </div>

          {/* 1등 대형 캐릭터 아바타 */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#4EA8FE] to-[#3B92F5] ring-4 ring-white/30 flex items-center justify-center shadow-lg relative">
              <div className="flex gap-2">
                <div className="w-2.5 h-4 bg-white rounded-full shadow-sm" />
                <div className="w-2.5 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>

          {/* 타이틀 및 설명 문구 */}
          <h2 className="text-[22px] font-black tracking-tight leading-snug mb-2 text-white">
            민지님이<br />가장 먼저 성공했어요!
          </h2>
          <p className="text-[13px] text-white/85 font-medium leading-relaxed">
            민지님이 입력한 여행지의 당첨 확률이 올라갑니다!
          </p>
          <p className="text-[11.5px] text-white/60 mt-1 font-normal">
            입력한 여행지는 아직 공개되지 않아요.
          </p>
        </section>

        {/* [B] 등수별 균일 차등 가중치 카드 리스트 */}
        <section className="space-y-3">
          {participants.map((user) => (
            <div
              key={user.rank}
              className={`bg-white rounded-[22px] p-4.5 border transition-all ${
                user.rank === 1
                  ? 'border-[#D2F800]/70 shadow-[0_4px_16px_rgba(210,248,0,0.18)]'
                  : 'border-[#E8ECF4] shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
              }`}
            >
              {/* 상단: 아바타, 이름, 확률 뱃지 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  {/* 귀여운 2-dot 캡슐 아바타 */}
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-tr ${user.avatarColor} ring-2 ring-white flex items-center justify-center text-white shadow-sm flex-shrink-0`}
                  >
                    <div className="flex gap-1">
                      <div className="w-1 h-1.5 bg-white rounded-full" />
                      <div className="w-1 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14.5px] font-black text-[#151B3F]">
                        {user.name}님의 선호 여행지 확률
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8C94A6] font-medium block">
                      {user.submissionOrder} · 예상 당첨 확률 {user.percentage}%
                    </span>
                  </div>
                </div>

                {/* 확률 뱃지 */}
                <span
                  className={`${user.badgeBg} ${user.badgeTextColor} font-black text-[12px] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 flex-shrink-0`}
                >
                  <span>{user.percentage}%</span>
                  <span className="text-[10.5px] font-bold opacity-80">({user.bonusLabel})</span>
                </span>
              </div>

              {/* 하단: 프로그레스 게이지 바 & 가중치 단계 텍스트 */}
              <div className="space-y-1.5 pt-0.5">
                <div className="w-full h-3 bg-[#EEF2F8] rounded-full overflow-hidden p-0.5 relative">
                  <div
                    className={`h-full bg-gradient-to-r ${user.gaugeGradient} rounded-full transition-all duration-1000 ${user.gaugeWidth}`}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] px-0.5 font-medium">
                  <span className="text-[#8C94A6]">기본 확률 (20%)</span>
                  <span
                    className={`font-bold ${
                      user.rank === 1 ? 'text-[#151B3F]' : user.rank === 2 ? 'text-[#5863FF]' : 'text-[#8C94A6]'
                    }`}
                  >
                    {user.description}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* 하단 안내 텍스트 */}
          <p className="text-[11.5px] text-[#5863FF] text-center font-medium pt-1">
            * 확률이 올라갈 뿐, 최종 여행지는 여전히 랜덤으로 결정돼요.
          </p>
        </section>
      </main>

      {/* 3. 하단 CTA 버튼 */}
      <footer className="w-full bg-white/95 backdrop-blur-md border-t border-[#EEF1F8] p-5 pb-6 sticky bottom-0 z-30">
        <PrimaryButton onClick={handleGoToGacha}>
          여행지 뽑으러 가기
        </PrimaryButton>
      </footer>
    </div>
  );
};
