import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, rightElement }) => {
  const navigate = useNavigate();

  return (
    <div className="top-header justify-between relative bg-white border-b border-[#F0F2F7] px-4">
      {/* ‹ 뒤로가기 버튼 */}
      <button
        type="button"
        onClick={onBack || (() => navigate(-1))}
        className="text-[22px] font-bold text-[#687091] hover:text-[#151B3F] transition-colors cursor-pointer py-1 px-1.5 flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5"
        aria-label="뒤로가기"
      >
        ‹
      </button>

      {/* 중앙 타이틀 */}
      <h1 className="text-[17px] font-bold text-[#151B3F] tracking-tight">
        {title}
      </h1>

      {/* 우측 슬롯 (균형 유지용 빈 8px 또는 전달된 엘리먼트) */}
      <div className="w-8 flex items-center justify-end">
        {rightElement}
      </div>
    </div>
  );
};
