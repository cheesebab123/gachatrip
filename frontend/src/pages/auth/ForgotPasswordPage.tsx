import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/auth/Header';
import { Footer } from '../../components/auth/Footer';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  // 단계 상태: 1 = 이메일 & 인증번호 입력, 2 = 새 비밀번호 재설정
  const [step, setStep] = useState<1 | 2>(1);

  // 1단계 상태값
  const [email, setEmail] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3분 타이머

  // 2단계 상태값
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 인증번호 타이머 처리
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isCodeSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCodeSent, timeLeft]);

  // 타이머 분:초 포맷팅
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 1단계: 인증번호 발송 요청
  const handleSendCode = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    setIsCodeSent(true);
    setTimeLeft(180);
    alert(`${email} 주소로 6자리 인증번호가 발송되었습니다! (테스트용: 123456)`);
  };

  // 1단계: 인증번호 확인 및 다음 단계 이동
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCodeSent) {
      handleSendCode();
      return;
    }
    if (authCode.length < 6) {
      alert('6자리 인증번호를 정확히 입력해주세요.');
      return;
    }
    // 인증 성공 시 2단계로 부드럽게 전환
    setStep(2);
  };

  // 2단계: 새 비밀번호 변경 완료
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      alert('비밀번호는 8자 이상 입력해주세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 서로 일치하지 않습니다.');
      return;
    }
    alert('비밀번호가 성공적으로 변경되었습니다! 🎉\n새 비밀번호로 로그인해주세요.');
    navigate('/login');
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-y-auto select-none">
      
      {/* 1. 상단 공통 인증 도메인 Header */}
      <Header
        onBack={() => {
          if (step === 2) setStep(1);
          else navigate(-1);
        }}
      />

      {/* 2. 본문 컨텐츠 (헤더 바로 밑 mt-1 간격 1:1 완벽 정렬) */}
      <div className="w-full mt-1 flex flex-col flex-1">
        
        {step === 1 ? (
          /* =================== [1단계: 이메일 인증] =================== */
          <div className="flex flex-col flex-1 animate-fadeIn">
            {/* 타이틀 & 서브타이틀 */}
            <div className="text-center mb-6">
              <h1 className="text-[26px] font-bold text-[#151B3F] tracking-[-0.03em] leading-tight">
                비밀번호를 잊으셨나요?
              </h1>
              <p className="text-[15px] font-normal text-[#687091] mt-1.5 tracking-tight leading-relaxed">
                가입하신 이메일로 인증번호를 보내드려요
              </p>
            </div>

            {/* 1단계 폼 */}
            <form onSubmit={handleVerifyCode} className="flex flex-col gap-3.5">
              
              {/* 이메일 입력 + 전송 버튼 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#687091] px-1">
                  가입한 이메일
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isCodeSent}
                    placeholder="example@gachatrip.app"
                    className="flex-1 h-[52px] rounded-[16px] border border-[#E5E7EB] bg-[#FFFFFF] px-4 text-[15px] text-[#151B3F] placeholder:text-[#A0A7BA] focus:border-[#5863FF] focus:ring-2 focus:ring-[#5863FF]/15 focus:outline-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] disabled:bg-[#F8F9FB] disabled:text-[#687091]"
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="h-[52px] px-4 rounded-[16px] bg-[#EFF1F9] hover:bg-[#E2E6F5] text-[#5863FF] text-[14px] font-bold transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                  >
                    {isCodeSent ? '재전송' : '인증요청'}
                  </button>
                </div>
              </div>

              {/* 인증번호 입력창 (이메일 발송 시 노출) */}
              {isCodeSent && (
                <div className="flex flex-col gap-1.5 animate-fadeIn mt-1">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[13px] font-medium text-[#687091]">
                      인증번호 6자리
                    </label>
                    <span className="text-[13px] font-bold text-[#FF5A5A] tabular-nums">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="인증번호 6자리 입력"
                    className="w-full h-[52px] rounded-[16px] border border-[#E5E7EB] bg-[#FFFFFF] px-4 text-[15px] text-[#151B3F] tracking-widest placeholder:tracking-normal placeholder:text-[#A0A7BA] focus:border-[#5863FF] focus:ring-2 focus:ring-[#5863FF]/15 focus:outline-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                  />
                  <p className="text-[12px] text-[#A0A7BA] px-1 mt-0.5">
                    이메일이 오지 않았다면 스팸 메일함을 확인해주세요.
                  </p>
                </div>
              )}

              {/* 메인 CTA 버튼 (인증 도메인 Footer) */}
              <Footer
                type="submit"
                className="w-full max-w-none h-[54px] rounded-[16px] text-[16px] font-bold mt-3 shadow-[0_6px_16px_rgba(88,99,255,0.25)] hover:brightness-105 active:scale-[0.99]"
              >
                {isCodeSent ? '인증 확인' : '인증번호 받기'}
              </Footer>
            </form>
          </div>
        ) : (
          /* =================== [2단계: 새 비밀번호 설정] =================== */
          <div className="flex flex-col flex-1 animate-fadeIn">
            {/* 타이틀 & 서브타이틀 */}
            <div className="text-center mb-6">
              <h1 className="text-[26px] font-bold text-[#151B3F] tracking-[-0.03em] leading-tight">
                새 비밀번호 설정
              </h1>
              <p className="text-[15px] font-normal text-[#687091] mt-1.5 tracking-tight leading-relaxed">
                새로 사용할 비밀번호를 입력해주세요
              </p>
            </div>

            {/* 2단계 폼 */}
            <form onSubmit={handleResetPassword} className="flex flex-col gap-3.5">
              
              {/* 새 비밀번호 입력 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#687091] px-1">
                  새 비밀번호
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="8자 이상 입력해주세요"
                  className="w-full h-[52px] rounded-[16px] border border-[#E5E7EB] bg-[#FFFFFF] px-4 text-[15px] text-[#151B3F] placeholder:text-[#A0A7BA] focus:border-[#5863FF] focus:ring-2 focus:ring-[#5863FF]/15 focus:outline-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                />
              </div>

              {/* 새 비밀번호 확인 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#687091] px-1">
                  새 비밀번호 확인
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="새 비밀번호를 다시 입력해주세요"
                  className={`w-full h-[52px] rounded-[16px] border bg-[#FFFFFF] px-4 text-[15px] text-[#151B3F] placeholder:text-[#A0A7BA] focus:outline-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${
                    confirmPassword && newPassword !== confirmPassword
                      ? 'border-[#FF5A5A] focus:ring-2 focus:ring-[#FF5A5A]/15'
                      : 'border-[#E5E7EB] focus:border-[#5863FF] focus:ring-2 focus:ring-[#5863FF]/15'
                  }`}
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-[12px] text-[#FF5A5A] px-1 mt-0.5">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </div>

              {/* 비밀번호 변경 완료 버튼 (인증 도메인 Footer) */}
              <Footer
                type="submit"
                className="w-full max-w-none h-[54px] rounded-[16px] text-[16px] font-bold mt-3 shadow-[0_6px_16px_rgba(88,99,255,0.25)] hover:brightness-105 active:scale-[0.99]"
              >
                비밀번호 변경 완료
              </Footer>
            </form>
          </div>
        )}

        {/* 3. 하단 로그인 복귀 푸터 링크 */}
        <div className="mt-8 mb-4 text-center text-[13px] text-[#687091]">
          기억나셨나요?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-bold text-[#5863FF] hover:underline ml-1 cursor-pointer"
          >
            로그인하기
          </button>
        </div>

      </div>

    </div>
  );
};
