import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeLogoIcon from '../../assets/images/home/home_logo_icon.png';
import homeLogoText from '../../assets/images/home/home_logo_text.png';

interface HeaderProps {
  onNotificationClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNotificationClick }) => {
  const navigate = useNavigate();

  return (
    <header className="top-header justify-between relative bg-transparent w-full">
      {/* 1. 좌측 메인 로고 (캡슐 아이콘 + 가챠트립 텍스트 로고) */}
      <div
        onClick={() => navigate('/home')}
        className="flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
      >
        <img
          src={homeLogoIcon}
          alt="가챠트립 아이콘"
          className="w-[30px] h-[30px] object-contain"
        />
        <img
          src={homeLogoText}
          alt="gachatrip"
          className="h-[24px] w-auto object-contain"
        />
      </div>

      {/* 2. 우측 알림 버튼 (종 아이콘 + 미확인 레드 닷 뱃지) */}
      <button
        type="button"
        onClick={onNotificationClick || (() => alert('새로운 알림이 없습니다.'))}
        className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#E8ECF4] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-[#F8FAFF] active:scale-95 transition-all cursor-pointer"
        aria-label="알림 확인"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#151B3F"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FF4B4B] ring-2 ring-white" />
      </button>
    </header>
  );
};
