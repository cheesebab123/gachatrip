import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { InviteShareModal } from '../../components/gacha/InviteShareModal';
import { GroupShareDetailModal } from '../../components/gacha/GroupShareDetailModal';

interface Member {
  id: string;
  name: string;
  isHost: boolean;
  avatarColor: string;
  isSubmitted: boolean;
}

export const GroupLobbyPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [isDetailShareModalOpen, setIsDetailShareModalOpen] = useState<boolean>(false);

  // URL 파라미터에서 역할 및 제출 상태 파악
  const role = searchParams.get('role') || 'host'; // 'host' | 'guest'
  const isHost = role === 'host';
  const isSubmittedParam = searchParams.get('submitted') === 'true';

  // 1. 방 기본 정보 (목업 데이터: 총 3인 여행방)
  const roomName = '여름 우정여행';
  const inviteCode = 'GN4T29';
  const maxMembers = 3;

  // 2. 참여 멤버 리스트 상태
  const [members, setMembers] = useState<Member[]>(() => {
    if (isHost) {
      // 방장 시점: 3명 전원 제출 완료 상태
      return [
        {
          id: '1',
          name: '나연',
          isHost: true,
          avatarColor: 'from-[#5863FF] to-[#7B86FF]',
          isSubmitted: true,
        },
        {
          id: '2',
          name: '민지',
          isHost: false,
          avatarColor: 'from-[#4EA8FE] to-[#3B92F5]',
          isSubmitted: true,
        },
        {
          id: '3',
          name: '수현',
          isHost: false,
          avatarColor: 'from-[#C8F026] to-[#AEE000]',
          isSubmitted: true,
        },
      ];
    } else {
      // 게스트 시점: 방장(민지) + 나(나연) 2명 먼저 참여
      return [
        {
          id: '1',
          name: '민지',
          isHost: true,
          avatarColor: 'from-[#4EA8FE] to-[#3B92F5]',
          isSubmitted: true,
        },
        {
          id: '2',
          name: '나연 (나)',
          isHost: false,
          avatarColor: 'from-[#5863FF] to-[#7B86FF]',
          isSubmitted: isSubmittedParam,
        },
      ];
    }
  });

  // 게스트 본인의 제출 여부
  const guestSubmitted = isSubmittedParam;

  // 게스트 입장 후 여행지 제출 완료 시 ➔ 1초 뒤 수현(3번째 멤버) 입장 및 자동 미션 시작 연동
  useEffect(() => {
    if (!isHost && guestSubmitted) {
      // 1초 후 3번째 멤버(수현) 입장 및 준비 완료
      const timer1 = setTimeout(() => {
        setMembers((prev) => {
          if (prev.some((m) => m.id === '3')) return prev;
          return [
            ...prev,
            {
              id: '3',
              name: '수현',
              isHost: false,
              avatarColor: 'from-[#C8F026] to-[#AEE000]',
              isSubmitted: true,
            },
          ];
        });
        showToast('✨ 수현님이 입장하여 여행지 선택을 완료했습니다! (3/3)');
      }, 1000);

      // 3번째 멤버 입장 후 1.2초 뒤 방장의 미션 자동 시작
      const timer2 = setTimeout(() => {
        showToast('🚀 모든 멤버 준비 완료! 방장이 미션을 시작합니다...');
      }, 2200);

      // 미션 인트로 화면으로 자동 이동
      const timer3 = setTimeout(() => {
        navigate('/gacha/group/mission?role=guest');
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isHost, guestSubmitted, navigate]);

  // 모든 멤버가 여행지 제출을 완료했는지 여부
  const allSubmitted = members.length === maxMembers && members.every((m) => m.isSubmitted);

  // 토스트 메시지 헬퍼
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2200);
  };

  // 초대 코드 복사
  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(inviteCode);
    showToast(`초대 코드 [${inviteCode}]가 복사되었습니다! 📋`);
  };

  // 1) 게스트: 여행지 선택하러 가기
  const handleGoToSubmit = () => {
    navigate('/gacha/group/submit?role=guest');
  };

  // 2) 방장: 미션 시작하기
  const handleStartMission = () => {
    navigate('/gacha/group/mission');
  };

  const emptySlots = maxMembers - members.length;

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 상단 네비게이션 헤더 */}
      <header className="w-full h-[60px] px-5 flex items-center justify-between border-b border-[#F0F2FA] bg-white sticky top-0 z-30 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#151B3F] hover:bg-[#F0F2FA] transition-colors cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-[17px] font-bold text-[#151B3F]">우리 여행방</h1>

        {/* 타이틀 중앙 정렬 스페이서 */}
        <div className="w-10" />
      </header>

      {/* 2. 본문 컨텐츠 영역 */}
      <main className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {/* [A] 상단 네이비-블루 방 정보 & 초대 카드 (Figma: #242F68 -> #455BC8) */}
        <section className="bg-gradient-to-b from-[#242F68] to-[#455BC8] rounded-[26px] p-5 text-white shadow-[0_8px_24px_rgba(36,47,104,0.25)] relative overflow-hidden animate-fadeIn">
          {/* 장식용 은은한 글로우 원형 */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#D2F800]/15 rounded-full blur-2xl pointer-events-none" />

          {/* 방 이름 라벨 & 타이틀 */}
          <div className="mb-4 relative z-10">
            <span className="text-[12.5px] font-black text-[#D2F800] tracking-tight block mb-1">
              방 이름
            </span>
            <h2 className="text-[23px] font-black tracking-tight text-white">
              {roomName}
            </h2>
          </div>

          {/* 화이트 인너 박스: 초대 코드 & 친구 초대하기 버튼 */}
          <div className="bg-white rounded-[20px] p-3.5 px-4 flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.06)] mb-3 text-[#151B3F] relative z-10">
            <div>
              <span className="text-[11px] font-bold text-[#5863FF] tracking-tight block">
                초대 코드
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[24px] font-black tracking-wider text-[#151B3F]">
                  {inviteCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="w-7 h-7 rounded-full bg-[#F0F2FA] hover:bg-[#E2E6F5] flex items-center justify-center text-[#5863FF] transition-colors cursor-pointer active:scale-95"
                  title="코드 복사"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 라임 옐로우 친구 초대하기 버튼 */}
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(true)}
              className="bg-[#D2F800] hover:bg-[#C2E800] active:scale-95 text-[#151B3F] font-black text-[13.5px] px-4 py-2.5 rounded-full shadow-[0_3px_10px_rgba(210,248,0,0.45)] transition-all cursor-pointer"
            >
              친구 초대하기
            </button>
          </div>

          {/* 반투명 화이트 초대 링크 바 (Figma: #FFFFFF with opacity) */}
          <div
            onClick={() => setIsInviteModalOpen(true)}
            className="bg-white/15 hover:bg-white/22 backdrop-blur-sm rounded-[14px] px-3.5 py-2.5 flex items-center justify-between text-[12px] text-white/90 cursor-pointer transition-all relative z-10 active:scale-[0.99]"
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="truncate font-medium text-white/90">https://gachatrip.app/join/{inviteCode}</span>
            </div>
            <svg className="w-4 h-4 flex-shrink-0 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        </section>

        {/* [B] 참여 멤버 리스트 카드 */}
        <section className="bg-white rounded-[24px] p-5 border border-[#E8ECF4] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-[#F4F6FB]">
            <h3 className="text-[16px] font-bold text-[#151B3F]">참여 멤버</h3>
            <span className="text-[14px] font-bold text-[#8C94A6]">
              <span className="text-[#5863FF]">{members.length}</span> / {maxMembers}명
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {/* 참여 완료된 멤버 목록 */}
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* 귀여운 캐릭터 원형 아바타 */}
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-tr ${member.avatarColor} flex items-center justify-center text-white shadow-sm flex-shrink-0 relative`}
                  >
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-2 bg-white rounded-full" />
                      <div className="w-1.5 h-2 bg-white rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[15px] font-bold text-[#151B3F]">
                        {member.name}
                      </span>
                      {member.isHost && (
                        <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#F0F2FA] text-[#5863FF]">
                          방장
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[12px] font-medium ${
                        member.isSubmitted ? 'text-[#8C94A6]' : 'text-[#FF8A65] font-bold'
                      }`}
                    >
                      {member.isSubmitted ? '희망 여행지 제출 완료' : '여행지 선택 대기 중'}
                    </span>
                  </div>
                </div>

                {/* 우측 상태 뱃지 */}
                <div className="flex items-center">
                  {member.isSubmitted ? (
                    <span className="h-[32px] px-3 rounded-[10px] bg-[#F2F4F8] text-[#151B3F] text-[12px] font-bold flex items-center gap-1 shadow-sm">
                      <svg className="w-3.5 h-3.5 text-[#151B3F] stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>입력 완료</span>
                    </span>
                  ) : (
                    <span className="h-[32px] px-3 rounded-[10px] bg-[#FFF2EE] text-[#FF7043] text-[12px] font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#FF7043] animate-pulse" />
                      <span>작성 중</span>
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* 빈 슬롯: 친구 초대하기 (방장 시점 또는 자리가 남았을 때) */}
            {emptySlots > 0 && (
              <div
                onClick={() => setIsInviteModalOpen(true)}
                className="flex items-center justify-between p-2 rounded-[16px] hover:bg-[#F8F9FD] transition-colors cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-[#5863FF] text-[#5863FF] flex items-center justify-center font-bold text-[20px] flex-shrink-0 bg-[#F4F6FF]">
                    +
                  </div>
                  <div>
                    <span className="text-[15px] font-bold text-[#5863FF] block">
                      친구 초대하기
                    </span>
                    <span className="text-[12px] font-medium text-[#8C94A6]">
                      빈 자리 {emptySlots}명 · 초대 링크 또는 코드 공유
                    </span>
                  </div>
                </div>

                <svg className="w-5 h-5 text-[#5863FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 3. 하단 고정 푸터 영역 */}
      <footer className="fixed bottom-0 left-0 right-0 sm:static bg-white/95 backdrop-blur-md border-t border-[#F0F2FA] p-5 pb-6 z-30 shadow-[0_-8px_20px_rgba(0,0,0,0.03)]">
        {/* [경우 1] 방장(Host)인 경우: 미션 시작하기 버튼 */}
        {isHost && (
          <div>
            <PrimaryButton
              onClick={handleStartMission}
              disabled={!allSubmitted}
              className={!allSubmitted ? '!opacity-60 !cursor-not-allowed' : ''}
            >
              미션 시작하기
            </PrimaryButton>
            {!allSubmitted && (
              <p className="text-[12px] text-[#8C94A6] text-center mt-2.5 font-medium">
                모든 멤버가 여행지를 선택하면 시작할 수 있어요
              </p>
            )}
          </div>
        )}

        {/* [경우 2] 참가자(Guest)인 경우 */}
        {!isHost && (
          <div>
            {!guestSubmitted ? (
              // 2-1. 아직 여행지 미제출 시 ➔ '여행지 선택하기' 버튼
              <PrimaryButton onClick={handleGoToSubmit}>
                여행지 선택하기
              </PrimaryButton>
            ) : (
              // 2-2. 여행지 제출 완료 시 ➔ '준비 완료' 버튼
              <button
                type="button"
                disabled
                className={`w-full h-[54px] rounded-[18px] text-[15px] font-bold flex items-center justify-center gap-2 cursor-default shadow-sm transition-all ${
                  members.length === 3
                    ? 'bg-[#E5FF4D] text-[#151B3F] ring-2 ring-[#C8F026] animate-pulse'
                    : 'bg-[#EEF2FF] border border-[#CCD4F8] text-[#5863FF]'
                }`}
              >
                {members.length === 3 ? (
                  <>
                    <span className="text-[17px]">🚀</span>
                    <span>모든 멤버 준비 완료! 미션을 시작합니다...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-[#5863FF] stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>준비 완료 (다른 멤버 기다리는 중 2/3)</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </footer>

      {/* 4. 친구 초대하기 바텀시트 모달 */}
      <InviteShareModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        inviteCode={inviteCode}
        roomName={roomName}
        onShowToast={showToast}
        onOpenDetailShare={() => setIsDetailShareModalOpen(true)}
      />

      {/* 4-1. 친구 초대 상세 공유 (카카오/메시지/기타앱/QR) 바텀시트 모달 */}
      <GroupShareDetailModal
        isOpen={isDetailShareModalOpen}
        onClose={() => setIsDetailShareModalOpen(false)}
        inviteCode={inviteCode}
        roomName={roomName}
        hostName="나연"
        onShowToast={showToast}
      />

      {/* 5. 토스트 팝업 알림 */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-[#151B3F]/90 text-white text-[13px] font-bold px-4 py-2.5 rounded-full shadow-lg z-50 animate-fadeIn flex items-center gap-2 whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
