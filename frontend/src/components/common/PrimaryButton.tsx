import React from 'react';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
  style,
  ...props
}) => {
  const baseClasses =
    'w-full h-[54px] rounded-[18px] text-[16px] font-bold transition-all duration-300 flex items-center justify-center cursor-pointer select-none active:scale-[0.99] hover:brightness-105 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variantClasses = {
    primary:
      'text-white bg-gradient-to-b from-[#5863FF] to-[#7361FF] shadow-[0_6px_16px_rgba(88,99,255,0.25)]',
    secondary:
      'bg-[#F0F2F7] text-[#151B3F] hover:bg-[#E5E8EF]',
    outline:
      'bg-transparent border-2 border-[#5863FF] text-[#5863FF] hover:bg-[#F0F2FF]',
  };

  const primaryStyle: React.CSSProperties =
    variant === 'primary'
      ? {
          background: 'linear-gradient(180deg, #5863FF 0%, #7361FF 100%)',
          boxShadow: '0 6px 16px rgba(88, 99, 255, 0.25)',
          ...style,
        }
      : style || {};

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={primaryStyle}
      {...props}
    >
      {children}
    </button>
  );
};
