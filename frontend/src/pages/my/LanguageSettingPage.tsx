import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/my/Header';
import { PrimaryButton } from '../../components/common/PrimaryButton';

interface LanguageOption {
  code: string;
  name: string;
  subtext: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: '한국어', name: '한국어', subtext: '기본 언어' },
  { code: 'English', name: 'English', subtext: 'English' },
  { code: '日本語', name: '日本語', subtext: '日本語' },
];

export const LanguageSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateAppSettings } = useAuth();

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    user?.appSettings?.language || '한국어'
  );

  const handleSave = () => {
    updateAppSettings({ language: selectedLanguage });
    alert(`언어가 '${selectedLanguage}'(으)로 저장되었습니다.`);
    navigate(-1);
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0">
      {/* 1. 상단 헤더 */}
      <Header title="언어" onBack={() => navigate(-1)} />

      {/* 2. 본문 컨텐츠 */}
      <main className="flex-1 overflow-y-auto px-5 py-5 flex flex-col">
        {/* 타이틀 */}
        <h2 className="text-[18px] font-bold text-[#151B3F] tracking-tight mb-5">
          앱에서 사용할 언어를 선택하세요
        </h2>

        {/* 언어 선택 리스트 */}
        <div className="flex flex-col gap-3">
          {LANGUAGES.map((item) => {
            const isSelected = selectedLanguage === item.code;
            return (
              <div
                key={item.code}
                onClick={() => setSelectedLanguage(item.code)}
                className={`w-full p-4 rounded-[20px] transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#F4F6FF] border-[1.8px] border-[#5863FF] shadow-[0_4px_14px_rgba(88,99,255,0.08)]'
                    : 'bg-white border border-[#E8ECF4] hover:border-[#CCD4E5]'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#151B3F]">
                    {item.name}
                  </span>
                  <span className="text-[12px] text-[#8C94A6] mt-0.5">
                    {item.subtext}
                  </span>
                </div>

                {/* 라디오 체크 아이콘 */}
                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-[#5863FF] flex items-center justify-center text-white shadow-sm">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-[#D1D5DB] bg-white" />
                )}
              </div>
            );
          })}
        </div>

        {/* 안내 카드 */}
        <div className="mt-6 bg-[#F0F3FF] rounded-[20px] p-4 flex flex-col gap-1">
          <p className="text-[13px] font-bold text-[#5863FF]">
            언어를 변경하면 앱이 다시 시작돼요.
          </p>
          <p className="text-[12px] text-[#687091] leading-relaxed">
            여행지 이름과 추천 콘텐츠도 선택한 언어로 표시됩니다.
          </p>
        </div>
      </main>

      {/* 3. 하단 CTA 버튼 */}
      <footer className="p-5 pt-2 bg-gradient-to-t from-[#FAFBFF] via-[#FAFBFF] to-transparent">
        <PrimaryButton onClick={handleSave}>
          언어 저장
        </PrimaryButton>
      </footer>
    </div>
  );
};
