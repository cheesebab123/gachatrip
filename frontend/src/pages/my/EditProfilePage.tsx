import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/my/Header';
import { Footer } from '../../components/my/Footer';
import userAvatarImg from '../../assets/images/common/user_avatar.png';

const TRAVEL_STYLES = ['힐링', '맛집', '액티비티', '감성'];
const DEPARTURE_LOCATIONS = ['서울/경기', '강원도', '제주도'];

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser, updateTravelSettings } = useAuth();

  // 프로필 편집 폼 상태
  const [name, setName] = useState(user.name || '여행자 홍길동');
  const [bio, setBio] = useState(user.bio || '가챠트립으로 새로운 여행지 탐험 중!');
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    user.preferredStyles && user.preferredStyles.length > 0
      ? user.preferredStyles
      : ['힐링', '맛집']
  );
  const [departureLocation, setDepartureLocation] = useState<string>(
    user.travelSettings?.departureLocation || '서울/경기'
  );

  // 관심 여행 스타일 토글 (최대 2개 선택 가능)
  const handleToggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      if (selectedStyles.length >= 2) {
        setSelectedStyles([selectedStyles[1], style]);
      } else {
        setSelectedStyles([...selectedStyles, style]);
      }
    }
  };

  // 사진 변경 핸들러
  const handleAvatarClick = () => {
    alert('프로필 사진 변경 기능은 준비 중입니다.');
  };

  // 저장하기 핸들러
  const handleSave = () => {
    if (!name.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    updateUser({
      name: name.trim(),
      bio: bio.trim(),
      preferredStyles: selectedStyles,
    });

    updateTravelSettings({
      departureLocation,
    });

    alert('프로필이 성공적으로 저장되었습니다! 🎉');
    navigate('/my');
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-hidden select-none !p-0 bg-[#FAFBFF]">
      
      {/* 1. 마이페이지 도메인 Header */}
      <Header title="프로필 수정" />

      {/* 2. 스크롤 가능한 본문 영역 */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 flex flex-col pb-6">
        
        {/* 프로필 이미지 변경 영역 (피그마 시안과 일치하는 시원한 상하 여백) */}
        <div className="flex flex-col items-center justify-center pt-7 pb-7">
          <div
            onClick={handleAvatarClick}
            className="w-[110px] h-[110px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-[0_8px_20px_rgba(88,99,255,0.12)] hover:ring-4 hover:ring-[#5863FF]/20"
          >
            <img
              src={user.avatarUrl || userAvatarImg}
              alt="프로필 이미지"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            type="button"
            onClick={handleAvatarClick}
            className="text-[13px] text-[#8C94A6] hover:text-[#5863FF] mt-2.5 font-medium transition-colors cursor-pointer"
          >
            사진을 눌러 변경할 수 있어요
          </button>
        </div>

        {/* 입력 카드 목록 */}
        <div className="flex flex-col gap-3.5">
          {/* 닉네임 입력 카드 */}
          <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
            <label className="text-[12px] font-semibold text-[#8C94A6] mb-1">
              닉네임
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="닉네임을 입력해주세요"
              className="text-[15px] font-bold text-[#151B3F] bg-transparent outline-none placeholder:text-[#A0A6B8]"
              maxLength={20}
            />
          </div>

          {/* 한 줄 소개 입력 카드 */}
          <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
            <label className="text-[12px] font-semibold text-[#8C94A6] mb-1">
              한 줄 소개
            </label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="나를 표현하는 한 줄 소개를 입력해주세요"
              className="text-[14px] font-medium text-[#151B3F] bg-transparent outline-none placeholder:text-[#A0A6B8]"
              maxLength={50}
            />
          </div>

          {/* 관심 여행 스타일 선택 카드 (최대 2개) */}
          <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[13px] font-semibold text-[#151B3F]">
                관심 여행 스타일
              </span>
              <span className="text-[12px] text-[#8C94A6] font-normal">
                최대 2개
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {TRAVEL_STYLES.map((style) => {
                const isSelected = selectedStyles.includes(style);
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => handleToggleStyle(style)}
                    className={`px-4 py-2 rounded-full border text-[13px] transition-all cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'border-[#5863FF] bg-[#F0F2FF] text-[#5863FF] font-bold shadow-sm'
                        : 'border-[#E8ECF4] bg-white text-[#151B3F] font-medium hover:border-[#D1D5DB]'
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 자주 출발하는 지역 선택 카드 */}
          <div className="bg-white rounded-[20px] border border-[#E8ECF4] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
            <span className="text-[13px] font-semibold text-[#151B3F] mb-3">
              자주 출발하는 지역
            </span>

            <div className="flex items-center gap-2.5 flex-wrap">
              {DEPARTURE_LOCATIONS.map((loc) => {
                const isSelected = departureLocation === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setDepartureLocation(loc)}
                    className={`px-4 py-2 rounded-full border text-[13px] transition-all cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'border-[#5863FF] bg-[#F0F2FF] text-[#5863FF] font-bold shadow-sm'
                        : 'border-[#E8ECF4] bg-white text-[#151B3F] font-medium hover:border-[#D1D5DB]'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </main>

      {/* 3. 마이페이지 도메인 Footer */}
      <Footer text="저장하기" onClick={handleSave} />

    </div>
  );
};
