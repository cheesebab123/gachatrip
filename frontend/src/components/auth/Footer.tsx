import React from 'react';
import { PrimaryButton } from '../common/PrimaryButton';

interface FooterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  children,
  className = '',
  type = 'submit',
  ...props
}) => {
  return (
    <PrimaryButton
      type={type}
      className={`w-full ${className}`}
      {...props}
    >
      {children}
    </PrimaryButton>
  );
};
