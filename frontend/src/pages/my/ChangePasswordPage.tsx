import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/my/Header';
import { Footer } from '../../components/my/Footer';

export const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 비밀번호 조건 실시간 체크
  const hasMinLength = newPassword.length >= 8;
  const hasLetterAndNumber = /[a-zA-Z]/.test(newPassword) && /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isPasswordMatch = newPassword.length > 0 && newPassword === confirmPassword;

  // 전체 유효성 충족 여부
  const isAllValid =
    currentPassword.length > 0 &&
    hasMinLength &&
    hasLetterAndNumber &&
    hasSpecialChar &&
    isPasswordMatch;

  const handleSave = () => {
    if (!currentPassword) {
      alert('현재 비밀번호를 입력해주세요.');
      return;
    }

    if (!hasMinLength || !hasLetterAndNumber || !hasSpecialChar) {
      alert('비밀번호 조건을 모두 충족해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    alert('비밀번호가 성공적으로 변경되었습니다! 🎉');
    navigate('/my');
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-hidden select-none !p-0 bg-[#FAFBFF]">
      
      {/* 1. 상단 통일된 마이페이지 Header */}
      <Header title="비밀번호 변경" />

      {/* 2. 스크롤 가능한 본문 영역 */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-6 pb-6 flex flex-col">
        
        {/* 상단 타이틀 (부타이틀이 없으므로 mb-6 여백으로 시각적 균형 유지) */}
        <div className="flex flex-col mb-6">
          <h1 className="text-[22px] font-bold text-[#151B3F] tracking-tight leading-snug">
            안전한 비밀번호로 계정을 보호하세요
          </h1>
        </div>

        {/* 입력 카드 목록 */}
        <div className="flex flex-col gap-3.5">
          
          {/* 1) 현재 비밀번호 입력 카드 */}
          <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col focus-within:border-[#5863FF] focus-within:ring-2 focus-within:ring-[#5863FF]/10 transition-all">
            <label className="text-[12px] font-semibold text-[#8C94A6] mb-1">
              현재 비밀번호
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="text-[15px] font-bold text-[#151B3F] bg-transparent outline-none placeholder:text-[#A0A6B8] tracking-widest placeholder:tracking-normal"
            />
          </div>

          {/* 2) 새 비밀번호 입력 카드 */}
          <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col focus-within:border-[#5863FF] focus-within:ring-2 focus-within:ring-[#5863FF]/10 transition-all">
            <label className="text-[12px] font-semibold text-[#8C94A6] mb-1">
              새 비밀번호
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="text-[15px] font-bold text-[#151B3F] bg-transparent outline-none placeholder:text-[#A0A6B8] tracking-widest placeholder:tracking-normal"
            />
          </div>

          {/* 3) 새 비밀번호 확인 입력 카드 */}
          <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col focus-within:border-[#5863FF] focus-within:ring-2 focus-within:ring-[#5863FF]/10 transition-all">
            <label className="text-[12px] font-semibold text-[#8C94A6] mb-1">
              새 비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="text-[15px] font-bold text-[#151B3F] bg-transparent outline-none placeholder:text-[#A0A6B8] tracking-widest placeholder:tracking-normal"
            />
          </div>

          {/* 4) 비밀번호 조건 안내 카드 (실시간 충족 체크 반영) */}
          <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-2.5 mt-2">
            <h2 className="text-[14px] font-bold text-[#434EEA] tracking-tight mb-0.5">
              비밀번호 조건
            </h2>

            {/* 조건 1: 8자 이상 */}
            <div className="flex items-center gap-2">
              {hasMinLength ? (
                <span className="text-[14px] text-[#434EEA] font-bold">✓</span>
              ) : (
                <span className="text-[12px] text-[#A0A6B8]">○</span>
              )}
              <span
                className={`text-[13px] font-medium transition-colors ${
                  hasMinLength ? 'text-[#434EEA] font-bold' : 'text-[#687091]'
                }`}
              >
                8자 이상
              </span>
            </div>

            {/* 조건 2: 영문과 숫자 조합 */}
            <div className="flex items-center gap-2">
              {hasLetterAndNumber ? (
                <span className="text-[14px] text-[#434EEA] font-bold">✓</span>
              ) : (
                <span className="text-[12px] text-[#A0A6B8]">○</span>
              )}
              <span
                className={`text-[13px] font-medium transition-colors ${
                  hasLetterAndNumber ? 'text-[#434EEA] font-bold' : 'text-[#687091]'
                }`}
              >
                영문과 숫자 조합
              </span>
            </div>

            {/* 조건 3: 특수문자 1개 이상 */}
            <div className="flex items-center gap-2">
              {hasSpecialChar ? (
                <span className="text-[14px] text-[#434EEA] font-bold">✓</span>
              ) : (
                <span className="text-[12px] text-[#A0A6B8]">○</span>
              )}
              <span
                className={`text-[13px] font-medium transition-colors ${
                  hasSpecialChar ? 'text-[#434EEA] font-bold' : 'text-[#687091]'
                }`}
              >
                특수문자 1개 이상
              </span>
            </div>
          </div>

        </div>

      </main>

      {/* 3. 하단 비밀번호 변경 고정 Footer */}
      <Footer
        text="비밀번호 변경"
        onClick={handleSave}
        disabled={!isAllValid && (currentPassword.length > 0 || newPassword.length > 0)}
      />

    </div>
  );
};
