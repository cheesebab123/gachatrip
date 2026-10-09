import React from 'react';
import { useNavigate } from 'react-router-dom';
import headerLogo from '../../assets/images/common/header_logo.png';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showBack = false, onBack }) => {
  const navigate = useNavigate();

  return (
    <header className="top-header justify-between relative bg-transparent">
      {/* 좌측 뒤로가기 버튼 */}
      <div className="w-8 flex items-center justify-start">
        {showBack && (
          <button
            type="button"
            onClick={onBack || (() => navigate(-1))}
            className="text-[20px] font-bold text-[#687091] hover:text-[#151B3F] transition-colors cursor-pointer py-1 px-1.5 flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5"
            aria-label="뒤로가기"
          >
            ‹
          </button>
        )}
      </div>

      {/* 중앙 3D 캐릭터 로고 */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={headerLogo}
          alt="가챠트립 캐릭터 로고"
          className="w-[68px] h-[68px] object-contain"
        />
      </div>

      {/* 우측 빈 공간 (대칭 유지) */}
      <div className="w-8" />
    </header>
  );
};
