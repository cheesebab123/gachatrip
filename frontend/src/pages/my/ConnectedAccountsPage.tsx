import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/my/Header';
import { Footer } from '../../components/my/Footer';

interface SocialAccount {
  id: string;
  provider: string;
  email?: string;
  desc?: string;
  connected: boolean;
}

export const ConnectedAccountsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 소셜 계정 연결 상태 관리
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      id: 'kakao',
      provider: 'Kakao',
      email: user.email ? user.email.replace(/(.{4})(.*)(@.*)/, '$1****$3') : 'eunji****@kakao.com',
      connected: true,
    },
    {
      id: 'google',
      provider: 'Google',
      desc: '간편 로그인을 사용할 수 있어요',
      connected: false,
    },
    {
      id: 'apple',
      provider: 'Apple',
      desc: '개인정보 보호 로그인을 지원해요',
      connected: false,
    },
  ]);

  // 연결/해제 토글 핸들러
  const handleToggleConnect = (id: string, provider: string, currentlyConnected: boolean) => {
    if (currentlyConnected) {
      // 적어도 하나는 연결되어 있어야 하는 정책
      const connectedCount = accounts.filter((acc) => acc.connected).length;
      if (connectedCount <= 1) {
        alert('최소 1개 이상의 로그인 계정이 연결되어 있어야 합니다.');
        return;
      }

      if (window.confirm(`${provider} 계정 연결을 해제하시겠습니까?`)) {
        setAccounts((prev) =>
          prev.map((acc) =>
            acc.id === id ? { ...acc, connected: false, desc: '간편 로그인을 사용할 수 있어요' } : acc
          )
        );
      }
    } else {
      alert(`${provider} 간편 로그인 연결을 완료했습니다.`);
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === id ? { ...acc, connected: true, email: `${id}_user****@domain.com`, desc: undefined } : acc
        )
      );
    }
  };

  const handleSave = () => {
    alert('연결 계정 정보가 성공적으로 저장되었습니다! 🎉');
    navigate('/my');
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-hidden select-none !p-0 bg-[#FAFBFF]">
      
      {/* 1. 상단 통일된 마이페이지 Header */}
      <Header title="연결 계정 변경" />

      {/* 2. 스크롤 가능한 본문 영역 */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-6 pb-6 flex flex-col">
        
        {/* 상단 타이틀 */}
        <div className="flex flex-col mb-6">
          <h1 className="text-[22px] font-bold text-[#151B3F] tracking-tight leading-snug">
            로그인에 사용할 계정을 연결하세요
          </h1>
        </div>

        {/* 연결 계정 목록 카드 */}
        <div className="w-full bg-white rounded-[24px] border border-[#E8ECF4] px-5 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)] divide-y divide-[#F0F2F7]">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="py-4 flex items-center justify-between"
            >
              {/* 계정 이름 및 상태/이메일 설명 */}
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-[#151B3F]">
                  {acc.provider}
                </span>
                <span className="text-[13px] text-[#8C94A6] mt-0.5">
                  {acc.connected ? acc.email : acc.desc}
                </span>
              </div>

              {/* 연결 상태 버튼 (연결됨 = 보라색 알약 버튼 / 연결 = 회색 알약 버튼) */}
              <button
                type="button"
                onClick={() => handleToggleConnect(acc.id, acc.provider, acc.connected)}
                className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer active:scale-95 ${
                  acc.connected
                    ? 'bg-[#5863FF] text-white shadow-sm hover:brightness-105'
                    : 'bg-[#F0F2F7] text-[#151B3F] hover:bg-[#E4E7F0]'
                }`}
              >
                {acc.connected ? '연결됨' : '연결'}
              </button>
            </div>
          ))}
        </div>

        {/* 계정 연결 안내 카드 */}
        <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-1.5 mt-3.5">
          <h2 className="text-[14px] font-bold text-[#434EEA] tracking-tight mb-0.5">
            계정 연결 안내
          </h2>
          <p className="text-[13px] text-[#8C94A6] leading-relaxed">
            연결된 계정으로 동일한 여행 기록과 키링을 안전하게 불러올 수 있어요.
          </p>
        </div>

      </main>

      {/* 3. 하단 연결 정보 저장 고정 Footer */}
      <Footer
        text="연결 정보 저장"
        onClick={handleSave}
      />

    </div>
  );
};
