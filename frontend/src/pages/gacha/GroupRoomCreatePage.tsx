import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';

export const GroupRoomCreatePage: React.FC = () => {
  const navigate = useNavigate();

  // 방 이름 및 최대 참여 인원 상태 관리
  const [roomName, setRoomName] = useState<string>('여름 우정여행');
  const [maxMembers, setMaxMembers] = useState<number>(4);

  // 초기화
  const handleReset = () => {
    setRoomName('');
    setMaxMembers(4);
  };

  // 다음 (방 생성 완료 및 방 대기실 이동)
  const handleNext = () => {
    if (!roomName.trim()) return;

    // 그룹방 정보 임시 저장
    const groupRoomData = {
      roomName: roomName.trim(),
      maxMembers,
      createdAt: new Date().toISOString(),
      roomId: Math.random().toString(36).substring(2, 8).toUpperCase(),
    };
    localStorage.setItem('current_group_room', JSON.stringify(groupRoomData));

    // 다음 2단계: 방장의 희망 여행지 제출 화면으로 이동!
    navigate('/gacha/group/submit?role=host');
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 상단 네비게이션 헤더 */}
      <header className="w-full h-[60px] px-5 flex items-center justify-between border-b border-[#F0F2FA] bg-white sticky top-0 z-30 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-[15px] font-medium text-[#6B7280] hover:text-[#151B3F] transition-colors py-2 cursor-pointer"
        >
          취소
        </button>
        <h1 className="text-[17px] font-bold text-[#151B3F]">그룹방 만들기</h1>
        <button
          type="button"
          onClick={handleReset}
          className="text-[15px] font-medium text-[#6B7280] hover:text-[#5863FF] transition-colors py-2 cursor-pointer"
        >
          초기화
        </button>
      </header>

      {/* 2. 본문 설정 영역 */}
      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        {/* 방 이름 & 최대 참여 인원 설정 카드 */}
        <section className="bg-white rounded-[24px] p-5 border border-[#E8ECF4] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
          {/* [1] 방 이름 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="roomNameInput" className="text-[15px] font-bold text-[#151B3F]">
                방 이름
              </label>
            </div>
            <div className="relative">
              <input
                id="roomNameInput"
                type="text"
                value={roomName}
                maxLength={20}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="방 이름을 입력해주세요"
                className="w-full h-[54px] pl-4 pr-16 rounded-[16px] bg-[#F8F9FD] border border-transparent focus:border-[#5863FF] focus:bg-white text-[15px] font-bold text-[#151B3F] placeholder-[#A0A8BA] focus:outline-none transition-all shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#8C94A6] pointer-events-none">
                {roomName.length} / 20
              </span>
            </div>
          </div>

          {/* [2] 최대 참여 인원 */}
          <div>
            <label className="text-[15px] font-bold text-[#151B3F] block mb-2">
              최대 참여 인원
            </label>
            <div className="w-full h-[54px] px-4 rounded-[16px] bg-[#F8F9FD] flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.01)]">
              <span className="text-[16px] font-bold text-[#151B3F]">{maxMembers}명</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMaxMembers(Math.max(2, maxMembers - 1))}
                  disabled={maxMembers <= 2}
                  className="w-8 h-8 rounded-full bg-white border border-[#E0E4F0] text-[#151B3F] font-black text-[18px] flex items-center justify-center hover:bg-[#F0F2F7] active:scale-95 disabled:opacity-35 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setMaxMembers(Math.min(10, maxMembers + 1))}
                  disabled={maxMembers >= 10}
                  className="w-8 h-8 rounded-full bg-[#151B3F] text-white font-black text-[18px] flex items-center justify-center hover:bg-[#252E5E] active:scale-95 disabled:opacity-35 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. 하단 고정 CTA 버튼 */}
      <footer className="fixed bottom-0 left-0 right-0 sm:static bg-white/95 backdrop-blur-md border-t border-[#F0F2FA] p-5 pb-6 z-30 shadow-[0_-8px_20px_rgba(0,0,0,0.03)]">
        <PrimaryButton onClick={handleNext} disabled={!roomName.trim()}>
          다음
        </PrimaryButton>
      </footer>
    </div>
  );
};
