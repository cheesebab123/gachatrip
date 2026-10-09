import React, { useEffect } from 'react';
import inviteIconLink from '../../assets/images/gacha/invite_icon_link.png';
import inviteIconCode from '../../assets/images/gacha/invite_icon_code.png';
import inviteIconShare from '../../assets/images/gacha/invite_icon_share.png';

interface InviteShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteCode: string;
  roomName: string;
  onShowToast: (msg: string) => void;
  onOpenDetailShare?: () => void;
}

export const InviteShareModal: React.FC<InviteShareModalProps> = ({
  isOpen,
  onClose,
  inviteCode,
  roomName,
  onShowToast,
  onOpenDetailShare,
}) => {
  // ESC 키로 닫기
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

  const shareUrl = `https://gachatrip.app/join/${inviteCode}`;
  const shareText = `[가챠트립] '${roomName}' 그룹방에 초대되었어요!\n함께 여행지를 뽑고 떠나봐요 🎲\n초대코드: ${inviteCode}\n참여하기: ${shareUrl}`;

  // 1) 초대 링크 복사
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      onShowToast('초대 링크가 복사되었습니다! 🔗');
      onClose();
    } catch {
      onShowToast('링크 복사에 실패했습니다.');
    }
  };

  // 2) 초대 코드 복사
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      onShowToast(`초대 코드 [${inviteCode}]가 복사되었습니다! 📋`);
      onClose();
    } catch {
      onShowToast('코드 복사에 실패했습니다.');
    }
  };

  // 3) 모바일/웹 공유하기 ➔ 상세 공유 바텀시트 열기 또는 Web Share API
  const handleNativeShare = async () => {
    if (onOpenDetailShare) {
      onClose();
      onOpenDetailShare();
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: `가챠트립 - '${roomName}' 그룹방 초대`,
          text: `함께 여행지를 뽑아봐요! 초대코드: ${inviteCode}`,
          url: shareUrl,
        });
        onClose();
        return;
      } catch {
        // 취소된 경우
        return;
      }
    }
    // Web Share API를 지원하지 않는 브라우저 대응 폴백
    try {
      await navigator.clipboard.writeText(shareText);
      onShowToast('초대 메시지가 복사되었습니다. 카카오톡에 붙여넣어보세요! 💬');
      onClose();
    } catch {
      onShowToast('공유에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center select-none animate-fadeIn">
      {/* 1. 배경 블러 오버레이 (클릭 시 닫힘) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0F142E]/40 backdrop-blur-[16px] transition-all duration-300"
        style={{
          WebkitBackdropFilter: 'blur(16px)',
          backdropFilter: 'blur(16px)',
        }}
      />

      {/* 2. 바텀시트 슬라이딩 모달 컨테이너 */}
      <div className="relative w-full max-w-[440px] bg-white rounded-t-[32px] px-6 pt-3 pb-8 z-10 shadow-[0_-12px_40px_rgba(0,0,0,0.18)] flex flex-col animate-slideUp">
        {/* 상단 드래그 핸들 */}
        <div className="w-12 h-1 bg-[#E0E2EC] rounded-full mx-auto my-1.5" />

        {/* 타이틀 & 설명 헤더 */}
        <div className="mt-2 mb-5">
          <h2 className="text-[20px] font-bold text-[#151B3F] tracking-tight">
            친구 초대하기
          </h2>
          <p className="text-[13px] text-[#8C94A6] mt-1">
            아래 방법으로 그룹방에 초대하세요.
          </p>
        </div>

        {/* 옵션 카드 목록 */}
        <div className="space-y-3">
          {/* 1) 초대 링크 복사 */}
          <div
            onClick={handleCopyLink}
            className="w-full p-4 rounded-[22px] bg-white border border-[#E8ECF4] hover:bg-[#F4F6FF] hover:border-[#5863FF] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] shadow-[0_2px_8px_rgba(0,0,0,0.02)] group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden bg-transparent">
                <img
                  src={inviteIconLink}
                  alt="초대 링크 복사"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[15.5px] font-bold text-[#151B3F] group-hover:text-[#5863FF] transition-colors">
                  초대 링크 복사
                </span>
                <span className="text-[12px] text-[#8C94A6] mt-0.5">
                  링크를 복사해서 카카오톡으로 공유해요
                </span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#F2F4F8] group-hover:bg-[#5863FF] text-[#8C94A6] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-200">
              <svg className="w-4 h-4 ml-0.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* 2) 초대 코드 복사 */}
          <div
            onClick={handleCopyCode}
            className="w-full p-4 rounded-[22px] bg-white border border-[#E8ECF4] hover:bg-[#F4F6FF] hover:border-[#5863FF] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] shadow-[0_2px_8px_rgba(0,0,0,0.02)] group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden bg-transparent">
                <img
                  src={inviteIconCode}
                  alt="초대 코드 복사"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[15.5px] font-bold text-[#151B3F] group-hover:text-[#5863FF] transition-colors">
                  초대 코드 복사
                </span>
                <span className="text-[12px] text-[#8C94A6] mt-0.5">
                  코드 {inviteCode}를 친구에게 알려주세요
                </span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#F2F4F8] group-hover:bg-[#5863FF] text-[#8C94A6] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-200">
              <svg className="w-4 h-4 ml-0.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* 3) 공유하기 */}
          <div
            onClick={handleNativeShare}
            className="w-full p-4 rounded-[22px] bg-white border border-[#E8ECF4] hover:bg-[#F4F6FF] hover:border-[#5863FF] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] shadow-[0_2px_8px_rgba(0,0,0,0.02)] group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden bg-transparent">
                <img
                  src={inviteIconShare}
                  alt="공유하기"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[15.5px] font-bold text-[#151B3F] group-hover:text-[#5863FF] transition-colors">
                  공유하기
                </span>
                <span className="text-[12px] text-[#8C94A6] mt-0.5">
                  다른 앱으로 공유하거나 메시지를 보내요
                </span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#F2F4F8] group-hover:bg-[#5863FF] text-[#8C94A6] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-200">
              <svg className="w-4 h-4 ml-0.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 4) 닫기 / 이전으로 돌아가기 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="w-full h-[54px] mt-4 rounded-[20px] bg-[#F4F6FB] hover:bg-[#EAEFF8] active:scale-[0.98] text-[#151B3F] text-[15.5px] font-bold transition-all cursor-pointer flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
