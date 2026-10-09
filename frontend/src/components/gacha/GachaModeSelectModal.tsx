import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import soloIcon from '../../assets/images/gacha/solo_gacha_icon.png';
import groupIcon from '../../assets/images/gacha/group_gacha_icon.png';
import { PrimaryButton } from '../common/PrimaryButton';

interface GachaModeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = 'main' | 'group_type' | 'invite_code';

export const GachaModeSelectModal: React.FC<GachaModeSelectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ModalStep>('main');
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string>('GN4T29');

  // ESC 키로 모달 닫기 지원 및 모달 열릴 때 스텝 초기화
  useEffect(() => {
    if (isOpen) {
      setStep('main');
      setInviteCode('GN4T29');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 1) 개인 뽑기 선택
  const handleSelectSolo = () => {
    onClose();
    navigate('/gacha/solo');
  };

  // 2) 그룹 뽑기 선택 ➔ 참여 방식 선택 스텝으로 전환
  const handleSelectGroup = () => {
    setStep('group_type');
  };

  // 3) 그룹방 만들기 선택
  const handleCreateGroupRoom = () => {
    onClose();
    navigate('/gacha/group/create');
  };

  // 4) 초대코드로 참가 선택 ➔ 코드 입력창 오픈
  const handleOpenInviteCodeInput = () => {
    setStep('invite_code');
  };

  // 5) 초대코드로 방 입장 핸들러 ➔ 대기방으로 바로 입장!
  const handleJoinByCode = () => {
    if (!inviteCode.trim() || inviteCode.length < 4) return;
    onClose();
    navigate('/gacha/group/lobby?role=guest');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center select-none animate-fadeIn">
      {/* 1. 배경 블러 오버레이 (클릭 시 닫힘) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0F142E]/40 backdrop-blur-[18px] transition-all duration-300"
        style={{
          WebkitBackdropFilter: 'blur(18px)',
          backdropFilter: 'blur(18px)',
        }}
      />

      {/* 2. 바텀시트 슬라이딩 모달 컨테이너 (모바일 프레임 폭 제한) */}
      <div className="relative w-full max-w-[440px] bg-white rounded-t-[32px] px-6 pt-3 pb-8 z-10 shadow-[0_-12px_40px_rgba(0,0,0,0.18)] flex flex-col animate-slideUp">
        {/* 상단 드래그 핸들 */}
        <div className="w-12 h-1 bg-[#E0E2EC] rounded-full mx-auto my-1.5" />

        {/* [STEP 1] 메인: 개인 뽑기 vs 그룹 뽑기 선택 */}
        {step === 'main' && (
          <div className="animate-fadeIn">
            {/* 타이틀 & 설명 */}
            <div className="mt-2 mb-5">
              <h2 className="text-[20px] font-bold text-[#151B3F] tracking-tight">
                랜덤 여행지 뽑기
              </h2>
              <p className="text-[13px] text-[#8C94A6] mt-1">
                여행 스타일에 맞는 뽑기 방식을 선택해보세요.
              </p>
            </div>

            {/* 1) 개인 뽑기 카드 */}
            <div
              onClick={handleSelectSolo}
              onMouseEnter={() => setHoveredOption('solo')}
              onMouseLeave={() => setHoveredOption(null)}
              className={`w-full p-4 rounded-[22px] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] ${
                hoveredOption === 'solo'
                  ? 'bg-[#F4F6FF] border-[1.8px] border-[#5863FF] shadow-[0_4px_16px_rgba(88,99,255,0.12)]'
                  : 'bg-white border border-[#E8ECF4] shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-[50px] h-[50px] rounded-[16px] flex items-center justify-center overflow-hidden flex-shrink-0 p-1.5 transition-colors duration-200 ${
                    hoveredOption === 'solo' ? 'bg-[#5863FF]' : 'bg-[#EEF2FF]'
                  }`}
                >
                  <img
                    src={soloIcon}
                    alt="개인 뽑기"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-[16px] font-bold transition-colors duration-200 ${
                      hoveredOption === 'solo' ? 'text-[#5863FF]' : 'text-[#151B3F]'
                    }`}
                  >
                    개인 뽑기
                  </span>
                  <span className="text-[12px] text-[#8C94A6] mt-0.5">
                    나만의 조건으로 떠나는 여행
                  </span>
                </div>
              </div>

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  hoveredOption === 'solo'
                    ? 'bg-[#5863FF] text-white shadow-sm'
                    : 'bg-[#F2F4F8] text-[#8C94A6]'
                }`}
              >
                <svg
                  className="w-5 h-5 ml-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* 2) 그룹 뽑기 카드 */}
            <div
              onClick={handleSelectGroup}
              onMouseEnter={() => setHoveredOption('group')}
              onMouseLeave={() => setHoveredOption(null)}
              className={`w-full p-4 rounded-[22px] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] mt-3 ${
                hoveredOption === 'group'
                  ? 'bg-[#F4F6FF] border-[1.8px] border-[#5863FF] shadow-[0_4px_16px_rgba(88,99,255,0.12)]'
                  : 'bg-white border border-[#E8ECF4] shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-[50px] h-[50px] rounded-[16px] flex items-center justify-center overflow-hidden flex-shrink-0 p-1.5 transition-colors duration-200 ${
                    hoveredOption === 'group' ? 'bg-[#5863FF]' : 'bg-[#EEF2FF]'
                  }`}
                >
                  <img
                    src={groupIcon}
                    alt="그룹 뽑기"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-[16px] font-bold transition-colors duration-200 ${
                      hoveredOption === 'group' ? 'text-[#5863FF]' : 'text-[#151B3F]'
                    }`}
                  >
                    그룹 뽑기
                  </span>
                  <span className="text-[12px] text-[#8C94A6] mt-0.5">
                    함께 조건을 맞춰 떠나는 여행
                  </span>
                </div>
              </div>

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  hoveredOption === 'group'
                    ? 'bg-[#5863FF] text-white shadow-sm'
                    : 'bg-[#F2F4F8] text-[#8C94A6]'
                }`}
              >
                <svg
                  className="w-5 h-5 ml-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* 시안 1:1 '이전으로 돌아가기' 하단 와이드 버튼 */}
            <button
              type="button"
              onClick={onClose}
              className="w-full h-[56px] mt-4 rounded-[22px] bg-[#F4F6FB] hover:bg-[#EAEFF8] active:scale-[0.98] text-[#151B3F] text-[16px] font-bold transition-all cursor-pointer flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              이전으로 돌아가기
            </button>
          </div>
        )}

        {/* [STEP 2] 그룹 뽑기 선택 시: 그룹방 만들기 vs 초대코드로 참가 */}
        {step === 'group_type' && (
          <div className="animate-fadeIn">
            <div className="mt-2 mb-5">
              <h2 className="text-[20px] font-bold text-[#151B3F] tracking-tight">
                그룹 뽑기 참여 방식
              </h2>
              <p className="text-[13px] text-[#8C94A6] mt-1">
                방을 새로 만들거나 공유받은 코드로 참여해보세요.
              </p>
            </div>

            {/* 1) 그룹방 만들기 카드 (파티장) */}
            <div
              onClick={handleCreateGroupRoom}
              onMouseEnter={() => setHoveredOption('create_room')}
              onMouseLeave={() => setHoveredOption(null)}
              className={`w-full p-4 rounded-[22px] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] ${
                hoveredOption === 'create_room'
                  ? 'bg-[#F4F6FF] border-[1.8px] border-[#5863FF] shadow-[0_4px_16px_rgba(88,99,255,0.12)]'
                  : 'bg-white border border-[#E8ECF4] shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-[50px] h-[50px] rounded-[16px] flex items-center justify-center overflow-hidden flex-shrink-0 transition-colors duration-200 ${
                    hoveredOption === 'create_room' ? 'bg-[#5863FF] text-white' : 'bg-[#EEF2FF] text-[#5863FF]'
                  }`}
                >
                  <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-[16px] font-bold transition-colors duration-200 ${
                      hoveredOption === 'create_room' ? 'text-[#5863FF]' : 'text-[#151B3F]'
                    }`}
                  >
                    그룹방 만들기
                  </span>
                  <span className="text-[12px] text-[#8C94A6] mt-0.5">
                    새로운 방을 개설해 친구들을 초대해요
                  </span>
                </div>
              </div>

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  hoveredOption === 'create_room'
                    ? 'bg-[#5863FF] text-white shadow-sm'
                    : 'bg-[#F2F4F8] text-[#8C94A6]'
                }`}
              >
                <svg
                  className="w-5 h-5 ml-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* 2) 초대코드로 참가 카드 */}
            <div
              onClick={handleOpenInviteCodeInput}
              onMouseEnter={() => setHoveredOption('join_code')}
              onMouseLeave={() => setHoveredOption(null)}
              className={`w-full p-4 rounded-[22px] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] mt-3 ${
                hoveredOption === 'join_code'
                  ? 'bg-[#F4F6FF] border-[1.8px] border-[#5863FF] shadow-[0_4px_16px_rgba(88,99,255,0.12)]'
                  : 'bg-white border border-[#E8ECF4] shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-[50px] h-[50px] rounded-[16px] flex items-center justify-center overflow-hidden flex-shrink-0 transition-colors duration-200 ${
                    hoveredOption === 'join_code' ? 'bg-[#5863FF] text-white' : 'bg-[#EEF2FF] text-[#5863FF]'
                  }`}
                >
                  {/* 여행 초대 티켓 / 입장권 아이콘 */}
                  <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-[16px] font-bold transition-colors duration-200 ${
                      hoveredOption === 'join_code' ? 'text-[#5863FF]' : 'text-[#151B3F]'
                    }`}
                  >
                    초대코드로 참가
                  </span>
                  <span className="text-[12px] text-[#8C94A6] mt-0.5">
                    공유받은 코드를 입력하고 바로 입장해요
                  </span>
                </div>
              </div>

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  hoveredOption === 'join_code'
                    ? 'bg-[#5863FF] text-white shadow-sm'
                    : 'bg-[#F2F4F8] text-[#8C94A6]'
                }`}
              >
                <svg
                  className="w-5 h-5 ml-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* 3) 시안 1:1 '이전으로 돌아가기' 하단 와이드 버튼 */}
            <button
              type="button"
              onClick={() => setStep('main')}
              className="w-full h-[56px] mt-4 rounded-[22px] bg-[#F4F6FB] hover:bg-[#EAEFF8] active:scale-[0.98] text-[#151B3F] text-[16px] font-bold transition-all cursor-pointer flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              이전으로 돌아가기
            </button>
          </div>
        )}

        {/* [STEP 3] 초대코드 직접 입력창 */}
        {step === 'invite_code' && (
          <div className="animate-fadeIn">
            <div className="mt-2 mb-4">
              <h2 className="text-[20px] font-bold text-[#151B3F] tracking-tight">
                초대코드 입력
              </h2>
              <p className="text-[13px] text-[#8C94A6] mt-1">
                친구에게 공유받은 초대코드를 입력해주세요.
              </p>
            </div>

            <div className="space-y-3.5">
              <input
                type="text"
                value={inviteCode}
                maxLength={8}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="초대코드 (예: GN4T29)"
                autoFocus
                className="w-full h-[54px] px-4 rounded-[16px] bg-[#F8F9FD] border border-[#E8ECF4] focus:border-[#5863FF] focus:bg-white text-[17px] font-black tracking-widest text-center text-[#151B3F] placeholder-[#A0A8BA] focus:outline-none transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] uppercase"
              />

              <PrimaryButton onClick={handleJoinByCode} disabled={inviteCode.trim().length < 4}>
                그룹방 입장하기
              </PrimaryButton>

              <button
                type="button"
                onClick={() => setStep('group_type')}
                className="w-full h-[54px] rounded-[18px] bg-[#F4F6FB] hover:bg-[#EAEFF8] active:scale-[0.98] text-[#151B3F] text-[15px] font-bold transition-all cursor-pointer flex items-center justify-center"
              >
                이전으로 돌아가기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
