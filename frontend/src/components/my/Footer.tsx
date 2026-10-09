import React from 'react';
import { PrimaryButton } from '../common/PrimaryButton';

interface FooterProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export const Footer: React.FC<FooterProps> = ({
  text = '저장하기',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  return (
    <div className="relative z-20 w-full px-5 pb-6 pt-3 bg-gradient-to-t from-[#FAFBFF] via-[#FAFBFF]/95 to-transparent">
      <PrimaryButton
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="w-full shadow-[0_6px_20px_rgba(88,99,255,0.28)]"
      >
        {text}
      </PrimaryButton>
    </div>
  );
};
