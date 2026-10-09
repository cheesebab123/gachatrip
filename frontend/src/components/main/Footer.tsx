import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FooterProps {
  currentTab?: 'home' | 'gacha' | 'mytrip' | 'my';
  onGachaClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentTab: propTab, onGachaClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    propTab ||
    (location.pathname.startsWith('/gacha')
      ? 'gacha'
      : location.pathname.startsWith('/mytrip')
      ? 'mytrip'
      : location.pathname.startsWith('/my')
      ? 'my'
      : 'home');

  const navItems = [
    {
      id: 'home',
      label: '홈',
      path: '/home',
      icon: (isActive: boolean) =>
        isActive ? (
          <svg className="w-[20px] h-[20px] text-[#5863FF]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        ) : (
          <svg
            className="w-[20px] h-[20px] text-[#8C94A6]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9.5L12 3l9 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-4.5a1 1 0 0 1-1-1v-4.5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1V21a1 1 0 0 1-1 1H4.5A1.5 1.5 0 0 1 3 20V9.5z" />
          </svg>
        ),
    },
    {
      id: 'gacha',
      label: '뽑기',
      path: '/gacha',
      icon: (isActive: boolean) =>
        isActive ? (
          <svg
            className="w-[20px] h-[20px] text-[#5863FF]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5863FF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#5863FF" />
          </svg>
        ) : (
          <svg
            className="w-[20px] h-[20px] text-[#8C94A6]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        ),
    },
    {
      id: 'mytrip',
      label: '마이트립',
      path: '/mytrip',
      icon: (isActive: boolean) =>
        isActive ? (
          <svg
            className="w-[20px] h-[20px] text-[#5863FF]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5863FF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#5863FF" />
            <circle cx="12" cy="10" r="3" fill="white" />
          </svg>
        ) : (
          <svg
            className="w-[20px] h-[20px] text-[#8C94A6]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        ),
    },
    {
      id: 'my',
      label: '마이',
      path: '/my',
      icon: (isActive: boolean) =>
        isActive ? (
          <svg
            className="w-[20px] h-[20px] text-[#5863FF]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5863FF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="#5863FF" />
            <circle cx="12" cy="7" r="4" fill="#5863FF" />
          </svg>
        ) : (
          <svg
            className="w-[20px] h-[20px] text-[#8C94A6]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ),
    },
  ];

  return (
    <nav className="relative w-full h-[76px] bg-white border-t border-[#F0F2F7] flex items-center justify-around px-4 z-30 flex-shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (item.id === 'gacha' && onGachaClick) {
                onGachaClick();
              } else {
                navigate(item.path);
              }
            }}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 transition-all duration-200 cursor-pointer select-none active:scale-95 ${
              isActive
                ? 'bg-[#EEF2FF] text-[#5863FF] px-4 rounded-[18px]'
                : 'text-[#8C94A6] hover:text-[#5863FF] px-3'
            }`}
          >
            {item.icon(isActive)}
            <span
              className={`text-[11px] tracking-tight ${
                isActive ? 'text-[#5863FF] font-bold' : 'text-[#8C94A6] font-medium'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
