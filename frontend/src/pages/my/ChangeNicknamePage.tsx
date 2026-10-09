import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/my/Header';
import { Footer } from '../../components/my/Footer';

export const ChangeNicknamePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const currentNickname = user.name || '여행자 홍길동';
  const [newNickname, setNewNickname] = useState('');

  // 닉네임 유효성 검사 (2~10자, 한글/영문/숫자 허용)
  const isValidLength = newNickname.trim().length >= 2 && newNickname.trim().length <= 10;
  const isSameAsCurrent = newNickname.trim() === currentNickname;
  const isValidFormat = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/.test(newNickname.trim());
  const isValid = isValidLength && !isSameAsCurrent && isValidFormat;

  const handleSave = () => {
    if (!newNickname.trim()) {
      alert('새 닉네임을 입력해주세요.');
      return;
    }

    if (newNickname.trim().length < 2 || newNickname.trim().length > 10) {
      alert('닉네임은 2~10자 사이로 입력해주세요.');
      return;
    }

    if (isSameAsCurrent) {
      alert('현재 닉네임과 다른 닉네임을 입력해주세요.');
      return;
    }

    // 닉네임 저장 및 세션 갱신
    updateUser({
      name: newNickname.trim(),
    });

    alert('닉네임이 성공적으로 변경되었습니다! 🎉');
    navigate('/my');
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-hidden select-none !p-0 bg-[#FAFBFF]">
      
      {/* 1. 상단 통일된 마이페이지 Header */}
      <Header title="닉네임 변경" />

      {/* 2. 스크롤 가능한 본문 영역 */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-6 pb-6 flex flex-col">
        
        {/* 상단 타이틀 & 안내 문구 */}
        <div className="flex flex-col mb-7">
          <h1 className="text-[22px] font-bold text-[#151B3F] tracking-tight leading-snug">
            여행에서 사용할 이름을 정해주세요
          </h1>
          <p className="text-[13px] text-[#8C94A6] mt-1.5 font-normal tracking-tight">
            2~10자, 한글·영문·숫자를 사용할 수 있어요.
          </p>
        </div>

        {/* 닉네임 입력 카드 목록 */}
        <div className="flex flex-col gap-3.5">
          
          {/* 1) 현재 닉네임 카드 (읽기 전용) */}
          <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
            <span className="text-[12px] font-semibold text-[#8C94A6] mb-1">
              현재 닉네임
            </span>
            <div className="text-[15px] font-bold text-[#151B3F]">
              {currentNickname}
            </div>
          </div>

          {/* 2) 새 닉네임 입력 카드 */}
          <div className="flex flex-col">
            <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col focus-within:border-[#5863FF] focus-within:ring-2 focus-within:ring-[#5863FF]/10 transition-all">
              <label className="text-[12px] font-semibold text-[#8C94A6] mb-1">
                새 닉네임
              </label>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="은지의 여행상자"
                maxLength={10}
                className="text-[15px] font-bold text-[#151B3F] bg-transparent outline-none placeholder:text-[#A0A6B8]"
              />
            </div>

            {/* 입력 피드백 상태 메시지 */}
            {newNickname.length > 0 && (
              <div className="px-2 mt-2">
                {isSameAsCurrent ? (
                  <span className="text-[12px] text-[#FF5A5A] font-medium">
                    현재 사용 중인 닉네임과 동일해요.
                  </span>
                ) : !isValidLength ? (
                  <span className="text-[12px] text-[#FF5A5A] font-medium">
                    2~10자 이내로 입력해주세요.
                  </span>
                ) : isValid ? (
                  <span className="text-[12px] text-[#5863FF] font-medium">
                    사용 가능한 닉네임이에요
                  </span>
                ) : null}
              </div>
            )}
          </div>

          {/* 3) 닉네임 변경 정책 안내 카드 */}
          <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-1.5 mt-2">
            <h2 className="text-[14px] font-bold text-[#434EEA] tracking-tight">
              닉네임은 30일에 한 번 변경할 수 있어요.
            </h2>
            <p className="text-[13px] text-[#8C94A6] leading-relaxed">
              다른 여행자에게 프로필과 여행 기록에 표시됩니다.
            </p>
          </div>

        </div>

      </main>

      {/* 3. 하단 닉네임 저장 고정 Footer */}
      <Footer
        text="닉네임 저장"
        onClick={handleSave}
        disabled={!isValid && newNickname.length > 0}
      />

    </div>
  );
};
