import React, { useEffect, useState } from 'react';
import shareCardLogo from '../../assets/images/gacha/share_card_logo.png';
import shareIconSms from '../../assets/images/gacha/share_icon_sms.png';
import shareIconKakao from '../../assets/images/gacha/share_icon_kakao.png';
import shareIconOther from '../../assets/images/gacha/share_icon_other.png';
import shareIconQr from '../../assets/images/gacha/share_icon_qr.png';

interface GroupShareDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteCode: string;
  roomName: string;
  hostName?: string;
  onShowToast?: (msg: string) => void;
}

export const GroupShareDetailModal: React.FC<GroupShareDetailModalProps> = ({
  isOpen,
  onClose,
  inviteCode,
  roomName,
  hostName = '나연',
  onShowToast = (msg: string) => console.log(msg),
}) => {
  const [showQR, setShowQR] = useState(false);

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
  const inviteMessage = `같이 여행지 뽑아볼래? 🎲 ${hostName}님이 '${roomName}' 그룹방에 초대했어요. 아래 링크를 눌러 참여해보세요!`;
  const fullShareText = `${inviteMessage}\n${shareUrl}`;

  // 1) 링크 복사
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      onShowToast('초대 링크가 복사되었습니다! 🔗');
    } catch {
      onShowToast('링크 복사에 실패했습니다.');
    }
  };

  // 2) SMS 메시지 공유
  const handleSMSShare = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // 모바일에서는 native SMS 앱 즉시 실행
      const smsUrl = `sms:?&body=${encodeURIComponent(fullShareText)}`;
      window.location.href = smsUrl;
    } else {
      // PC에서는 메시지 복사 후 토스트
      navigator.clipboard.writeText(fullShareText);
      onShowToast('초대 메시지가 복사되었습니다! 💬');
    }
  };

  // 3) 카카오톡 공유
  const handleKakaoShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `가챠트립 · '${roomName}' 그룹 초대`,
          text: inviteMessage,
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      // PC 또는 브라우저 폴백
      navigator.clipboard.writeText(fullShareText);
      onShowToast('카카오톡 초대 문구가 복사되었습니다! 카톡에 붙여넣어보세요 🟡');
    }
  };

  // 4) 기타 앱 (Web Share API)
  const handleOtherShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `가챠트립 · '${roomName}' 그룹 초대`,
          text: inviteMessage,
          url: shareUrl,
        });
      } catch {
        // 취소된 경우
      }
    } else {
      navigator.clipboard.writeText(fullShareText);
      onShowToast('초대 정보가 복사되었습니다! 💌');
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
      <div className="relative w-full max-w-[440px] bg-white rounded-t-[32px] px-6 pt-3 pb-8 z-10 shadow-[0_-12px_40px_rgba(0,0,0,0.18)] flex flex-col animate-slideUp max-h-[90vh] overflow-y-auto">
        {/* 상단 드래그 핸들 */}
        <div className="w-12 h-1 bg-[#E0E2EC] rounded-full mx-auto my-1.5" />

        {/* 타이틀 & 설명 헤더 */}
        <div className="mt-2 mb-4">
          <h2 className="text-[20px] font-bold text-[#151B3F] tracking-tight">
            공유하기
          </h2>
          <p className="text-[13px] text-[#8C94A6] mt-0.5">
            친구에게 초대 메시지를 전달해요
          </p>
        </div>

        {/* [A] 초대 메시지 미리보기 카드 (피그마 카카오톡/OG 프리뷰 카드 디자인) */}
        <div className="bg-[#FAFBFD] rounded-[22px] p-4.5 border border-[#E8ECF4] shadow-sm mb-5 space-y-3">
          {/* 가챠트립 로고 & 웹사이트 타이틀 */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[12px] flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={shareCardLogo}
                alt="가챠트립 로고"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[14px] font-bold text-[#151B3F] block leading-tight">
                가챠트립 · 그룹 초대
              </span>
              <span className="text-[11.5px] text-[#8C94A6] block">
                gachatrip.app
              </span>
            </div>
          </div>

          {/* 초대 문구 본문 */}
          <p className="text-[13.5px] text-[#333D5E] font-medium leading-relaxed">
            {inviteMessage}
          </p>

          {/* 링크 복사 칩 바 */}
          <div
            onClick={handleCopyLink}
            className="w-full h-[40px] px-3.5 rounded-[12px] bg-[#EEF2FF] hover:bg-[#E2E8FF] transition-colors flex items-center justify-between text-[#5863FF] text-[12.5px] font-bold cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center gap-1.5 truncate">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="truncate">{shareUrl}</span>
            </div>
            <svg className="w-4 h-4 flex-shrink-0 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* [B] 3가지 앱 다이렉트 공유 원형 버튼 그룹 (메시지 / 카카오톡 / 기타 앱) */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {/* 1) 메시지 (SMS / iMessage) */}
          <button
            type="button"
            onClick={handleSMSShare}
            className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-all"
          >
            <div className="w-[66px] h-[66px] rounded-[22px] flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-all duration-200">
              <img
                src={shareIconSms}
                alt="메시지"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[13px] font-bold text-[#424F75]">메시지</span>
          </button>

          {/* 2) 카카오톡 */}
          <button
            type="button"
            onClick={handleKakaoShare}
            className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-all"
          >
            <div className="w-[66px] h-[66px] rounded-[22px] flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-all duration-200">
              <img
                src={shareIconKakao}
                alt="카카오톡"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[13px] font-bold text-[#424F75]">카카오톡</span>
          </button>

          {/* 3) 기타 앱 */}
          <button
            type="button"
            onClick={handleOtherShare}
            className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-all"
          >
            <div className="w-[66px] h-[66px] rounded-[22px] flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-all duration-200">
              <img
                src={shareIconOther}
                alt="기타 앱"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[13px] font-bold text-[#424F75]">기타 앱</span>
          </button>
        </div>

        {/* [C] QR 코드로 공유하기 카드 */}
        <div
          onClick={() => setShowQR(!showQR)}
          className="w-full p-4 rounded-[22px] bg-[#FAFBFD] border border-[#E8ECF4] hover:bg-[#F4F6FF] hover:border-[#5863FF] transition-all duration-200 cursor-pointer flex items-center justify-between active:scale-[0.98] shadow-sm group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden bg-white border border-[#E8ECF4]">
              <img
                src={shareIconQr}
                alt="QR 코드로 공유하기"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[15px] font-bold text-[#151B3F] group-hover:text-[#5863FF] transition-colors">
                QR 코드로 공유하기
              </span>
              <span className="text-[12px] text-[#8C94A6]">
                QR 코드를 스캔해 간편하게 참여할 수 있어요
              </span>
            </div>
          </div>

          <svg className={`w-5 h-5 text-[#8C94A6] group-hover:text-[#5863FF] transition-transform duration-200 ${showQR ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* QR 코드 토글 박스 */}
        {showQR && (
          <div className="mt-3 p-4 bg-white rounded-[20px] border border-[#E8ECF4] flex flex-col items-center justify-center animate-fadeIn text-center shadow-sm">
            <div className="w-32 h-32 bg-[#F4F6FF] rounded-[16px] border border-[#CCD4F8] p-2 flex items-center justify-center mb-2">
              <img
                src={shareIconQr}
                alt="QR 코드"
                className="w-24 h-24 object-contain"
              />
            </div>
            <span className="text-[12px] font-bold text-[#5863FF]">
              카메라로 QR 코드를 스캔하면 방으로 이동합니다
            </span>
          </div>
        )}

        {/* 닫기 버튼 */}
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
