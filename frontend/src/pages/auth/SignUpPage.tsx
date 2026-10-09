import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/auth/Header';
import { Footer } from '../../components/auth/Footer';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  // 폼 입력 상태 관리
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('회원가입 시도:', { nickname, email, password });
    alert(`${nickname || '여행자'}님, 가챠트립에 오신 것을 환영합니다! 🎉`);
    navigate('/home');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} 소셜 로그인 시도`);
    alert(`${provider} 간편 로그인으로 이동합니다.`);
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-y-auto select-none">
      
      {/* 1. 상단 공통 인증 도메인 Header */}
      <Header />

      {/* 2. 본문 컨텐츠 (헤더 바로 밑 mt-1 간격 피그마 1:1 완벽 정렬) */}
      <div className="w-full mt-1 flex flex-col flex-1">
        
        {/* 타이틀 & 서브타이틀 */}
        <div className="text-center mb-6">
          <h1 className="text-[26px] font-bold text-[#151B3F] tracking-[-0.03em] leading-tight">
            가챠트립 시작하기
          </h1>
          <p className="text-[15px] font-normal text-[#687091] mt-1 tracking-tight">
            여행을 뽑는 새로운 방법
          </p>
        </div>

        {/* 3. 직접 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* 닉네임 입력 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#687091] px-1">
              닉네임
            </label>
            <input
              type="text"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="여행자 이름을 입력해주세요"
              className="w-full h-[52px] rounded-[16px] border border-[#E5E7EB] bg-[#FFFFFF] px-4 text-[15px] text-[#151B3F] placeholder:text-[#A0A7BA] focus:border-[#5863FF] focus:ring-2 focus:ring-[#5863FF]/15 focus:outline-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            />
          </div>

          {/* 이메일 입력 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#687091] px-1">
              이메일
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gachatrip.app"
              className="w-full h-[52px] rounded-[16px] border border-[#E5E7EB] bg-[#FFFFFF] px-4 text-[15px] text-[#151B3F] placeholder:text-[#A0A7BA] focus:border-[#5863FF] focus:ring-2 focus:ring-[#5863FF]/15 focus:outline-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#687091] px-1">
              비밀번호
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상 입력해주세요"
              className="w-full h-[52px] rounded-[16px] border border-[#E5E7EB] bg-[#FFFFFF] px-4 text-[15px] text-[#151B3F] placeholder:text-[#A0A7BA] focus:border-[#5863FF] focus:ring-2 focus:ring-[#5863FF]/15 focus:outline-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            />
          </div>

          {/* 회원가입 메인 CTA 버튼 (인증 도메인 Footer) */}
          <Footer
            type="submit"
            className="w-full max-w-none h-[54px] rounded-[16px] text-[16px] font-bold mt-2 shadow-[0_6px_16px_rgba(88,99,255,0.25)] hover:brightness-105 active:scale-[0.99]"
          >
            회원가입
          </Footer>
        </form>

        {/* 4. '또는' 구분선 */}
        <div className="my-5 flex items-center justify-between gap-4">
          <div className="flex-1 h-[1px] bg-[#EAECEF]" />
          <span className="text-[13px] font-medium text-[#A0A7BA]">또는</span>
          <div className="flex-1 h-[1px] bg-[#EAECEF]" />
        </div>

        {/* 5. 소셜 로그인 버튼 3종 (네이버 / 카카오 / 구글) */}
        <div className="flex flex-col gap-2.5">
          {/* 네이버 */}
          <button
            type="button"
            onClick={() => handleSocialLogin('네이버')}
            className="relative w-full h-[50px] rounded-[16px] bg-[#03C75A] text-[#FFFFFF] text-[15px] font-bold flex items-center justify-center hover:brightness-95 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
          >
            <span className="absolute left-4 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M12.24 9.69L5.43 0H0V18H5.76V8.31L12.57 18H18V0H12.24V9.69Z" fill="white"/>
              </svg>
            </span>
            <span>네이버로 계속하기</span>
          </button>

          {/* 카카오 */}
          <button
            type="button"
            onClick={() => handleSocialLogin('카카오')}
            className="relative w-full h-[50px] rounded-[16px] bg-[#FEE500] text-[#191919] text-[15px] font-bold flex items-center justify-center hover:brightness-95 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
          >
            <span className="absolute left-4 flex items-center justify-center">
              <svg width="19" height="19" viewBox="0 0 18 18" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 1.5C4.85786 1.5 1.5 4.12056 1.5 7.35417C1.5 9.43125 2.8725 11.2483 4.96688 12.2742L4.086 15.5008C4.008 15.7871 4.33575 16.0226 4.58288 15.8606L8.44875 13.3132C8.63025 13.3271 8.814 13.3342 9 13.3342C13.1421 13.3342 16.5 10.7136 16.5 7.48C16.5 4.24644 13.1421 1.5 9 1.5Z"
                  fill="#191919"
                />
              </svg>
            </span>
            <span>카카오로 계속하기</span>
          </button>

          {/* 구글 */}
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="relative w-full h-[50px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] text-[#191919] text-[15px] font-bold flex items-center justify-center hover:bg-[#F9FAFB] active:scale-[0.99] transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            <span className="absolute left-4 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                  fill="#34A853"
                />
                <path
                  d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                  fill="#EA4335"
                />
              </svg>
            </span>
            <span>Google로 계속하기</span>
          </button>
        </div>

        {/* 6. 하단 푸터 (로그인 전환 링크) */}
        <div className="mt-7 mb-4 text-center text-[13px] text-[#687091]">
          이미 계정이 있나요?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-bold text-[#5863FF] hover:underline ml-1 cursor-pointer"
          >
            로그인
          </button>
        </div>

      </div>

    </div>
  );
};
