import React, { useEffect } from 'react';
import shareIconSystem from '../../assets/images/gacha/share_icon_system.png';
import shareIconCopy from '../../assets/images/gacha/share_icon_copy.png';
import shareIconMore from '../../assets/images/gacha/share_icon_more.png';

interface ResultShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationName?: string;
  onShowToast: (msg: string) => void;
}

export const ResultShareModal: React.FC<ResultShareModalProps> = ({
  isOpen,
  onClose,
  destinationName = '제주도',
  onShowToast,
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

  const shareUrl = window.location.href;
  const shareText = `[가챠트립] 두근두근 여행지 뽑기 결과! 🎉\n나의 랜덤 여행지는 바로 [${destinationName}]입니다 🌊\n지금 확인하기: ${shareUrl}`;

  // 1) 시스템 공유창 또는 링크 복사
  const handleSystemShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `가챠트립 - ${destinationName} 여행지 당첨!`,
          text: shareText,
          url: shareUrl,
        });
        onClose();
        return;
      } catch {
        return;
      }
    }
    // 폴백 링크 복사
    try {
      await navigator.clipboard.writeText(shareText);
      onShowToast('여행지 정보가 복사되었습니다! 카톡에 공유해보세요 💬');
      onClose();
    } catch {
      onShowToast('공유에 실패했습니다.');
    }
  };

  // 2) 링크 복사 (클립보드)
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      onShowToast('여행지 링크가 복사되었습니다! 🔗');
      onClose();
    } catch {
      onShowToast('링크 복사에 실패했습니다.');
    }
  };

  // 3) 기타 공유 (다른 앱으로 공유)
  const handleOtherShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `가챠트립 - ${destinationName} 뽑기 결과`,
          text: shareText,
          url: shareUrl,
        });
        onClose();
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      onShowToast('공유 메시지가 복사되었습니다! 💌');
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
            여행지 공유하기
          </h2>
          <p className="text-[13px] text-[#8C94A6] mt-1">
            뽑힌 여행지를 친구에게 알려보세요!
          </p>
        </div>

        {/* 옵션 카드 목록 */}
        <div className="space-y-3">
          {/* 1) 공유하기 */}
          <div
            onClick={handleSystemShare}
            className="w-full p-4 rounded-[22px] bg-white border border-[#E8ECF4] hover:bg-[#F4F6FF] hover:border-[#5863FF] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] shadow-[0_2px_8px_rgba(0,0,0,0.02)] group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden bg-transparent">
                <img
                  src={shareIconSystem}
                  alt="공유하기"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[15.5px] font-bold text-[#151B3F] group-hover:text-[#5863FF] transition-colors">
                  공유하기
                </span>
                <span className="text-[12px] text-[#8C94A6] mt-0.5">
                  시스템 공유창 또는 링크 복사
                </span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#F2F4F8] group-hover:bg-[#5863FF] text-[#8C94A6] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-200">
              <svg className="w-4 h-4 ml-0.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* 2) 링크 복사 */}
          <div
            onClick={handleCopyLink}
            className="w-full p-4 rounded-[22px] bg-white border border-[#E8ECF4] hover:bg-[#F4F6FF] hover:border-[#5863FF] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] shadow-[0_2px_8px_rgba(0,0,0,0.02)] group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden bg-transparent">
                <img
                  src={shareIconCopy}
                  alt="링크 복사"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[15.5px] font-bold text-[#151B3F] group-hover:text-[#5863FF] transition-colors">
                  링크 복사
                </span>
                <span className="text-[12px] text-[#8C94A6] mt-0.5">
                  클립보드에 복사해요
                </span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#F2F4F8] group-hover:bg-[#5863FF] text-[#8C94A6] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-200">
              <svg className="w-4 h-4 ml-0.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* 3) 기타 공유 */}
          <div
            onClick={handleOtherShare}
            className="w-full p-4 rounded-[22px] bg-white border border-[#E8ECF4] hover:bg-[#F4F6FF] hover:border-[#5863FF] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] shadow-[0_2px_8px_rgba(0,0,0,0.02)] group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden bg-transparent">
                <img
                  src={shareIconMore}
                  alt="기타 공유"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[15.5px] font-bold text-[#151B3F] group-hover:text-[#5863FF] transition-colors">
                  기타 공유
                </span>
                <span className="text-[12px] text-[#8C94A6] mt-0.5">
                  다른 앱으로 공유해요
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

        {/* 4) 닫기 버튼 */}
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
