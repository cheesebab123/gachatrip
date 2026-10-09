import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { CalendarBottomSheet } from '../../components/common/CalendarBottomSheet';

// Assets: Travel Styles
import styleHealingImg from '../../assets/images/gacha/condition/style_healing.png';
import styleActivityImg from '../../assets/images/gacha/condition/style_activity.png';
import styleFoodImg from '../../assets/images/gacha/condition/style_food.png';
import styleVibeImg from '../../assets/images/gacha/condition/style_vibe.png';

// Assets: Companions
import companionAloneImg from '../../assets/images/gacha/condition/companion_alone.png';
import companionFriendImg from '../../assets/images/gacha/condition/companion_friend.png';
import companionCoupleImg from '../../assets/images/gacha/condition/companion_couple.png';
import companionFamilyImg from '../../assets/images/gacha/condition/companion_family.png';

export const GachaConditionPage: React.FC = () => {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [selectedStyle, setSelectedStyle] = useState<string>('healing');
  const [travelDate, setTravelDate] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [budget, setBudget] = useState<string>('10만원 이하');
  const [isBudgetOpen, setIsBudgetOpen] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(150);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [companion, setCompanion] = useState<string>('alone');
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [isExcludeOpen, setIsExcludeOpen] = useState<boolean>(true);
  const [excludedOptions, setExcludedOptions] = useState<string[]>([]);

  // 여행 스타일 목록
  const travelStyles = [
    { id: 'healing', label: '힐링', img: styleHealingImg },
    { id: 'activity', label: '액티비티', img: styleActivityImg },
    { id: 'food', label: '맛집', img: styleFoodImg },
    { id: 'vibe', label: '감성', img: styleVibeImg },
  ];

  // 누구와 가나요 목록
  const companions = [
    { id: 'alone', label: '혼자', img: companionAloneImg },
    { id: 'friend', label: '친구', img: companionFriendImg },
    { id: 'couple', label: '연인', img: companionCoupleImg },
    { id: 'family', label: '가족', img: companionFamilyImg },
  ];

  // 선호 지역 목록
  const regions = ['서울/경기', '강원도', '충청도', '전라도', '경상도', '제주도'];

  // 제외 조건 목록
  const excludeList = ['비행기 필요', '혼잡한 관광지', '장거리 이동', '야외 활동 필수'];

  // 예산 옵션 목록
  const budgetOptions = ['5만원 이하', '10만원 이하', '20만원 이하', '30만원 이하', '50만원 이상', '예산 상관없음'];

  // 지역 선택 토글 (최대 3개)
  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      if (selectedRegions.length < 3) {
        setSelectedRegions([...selectedRegions, region]);
      }
    }
  };

  // 제외 조건 토글
  const toggleExclude = (option: string) => {
    if (excludedOptions.includes(option)) {
      setExcludedOptions(excludedOptions.filter((o) => o !== option));
    } else {
      setExcludedOptions([...excludedOptions, option]);
    }
  };

  // 초기화 핸들러
  const handleReset = () => {
    setSelectedStyle('healing');
    setTravelDate('');
    setBudget('10만원 이하');
    setDistance(150);
    setSelectedRegions([]);
    setCompanion('alone');
    setPeopleCount(2);
    setExcludedOptions([]);
  };

  // 적용 후 개인 뽑기로 복귀
  const handleApply = () => {
    // 로컬 스토리지에 조건 저장
    const conditions = {
      selectedStyle,
      travelDate,
      budget,
      distance,
      selectedRegions,
      companion,
      peopleCount,
      excludedOptions,
    };
    localStorage.setItem('gacha_conditions', JSON.stringify(conditions));
    navigate('/gacha/solo');
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden bg-[#FAFBFF] select-none !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 상단 네비게이션 헤더 */}
      <header className="w-full h-[60px] px-5 flex items-center justify-between border-b border-[#F0F2FA] bg-white sticky top-0 z-30 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-[15px] font-medium text-[#6B7280] hover:text-[#151B3F] transition-colors py-2"
        >
          취소
        </button>
        <h1 className="text-[17px] font-bold text-[#151B3F]">여행 조건 설정</h1>
        <button
          type="button"
          onClick={handleReset}
          className="text-[15px] font-medium text-[#6B7280] hover:text-[#5863FF] transition-colors py-2"
        >
          초기화
        </button>
      </header>

      {/* 2. 스크롤 가능한 본문 영역 */}
      <main className="flex-1 overflow-y-auto px-5 py-5 space-y-6 pb-32">
        {/* [섹션 1] 여행 스타일 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold text-[#151B3F]">여행 스타일</h2>
            <span className="text-[12px] font-medium text-[#8C94A6]">1개 선택</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {travelStyles.map((item) => {
              const isSelected = selectedStyle === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedStyle(item.id)}
                  className={`relative rounded-[20px] overflow-hidden aspect-[1.7/1] transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? 'ring-2 ring-[#5863FF] shadow-[0_4px_16px_rgba(88,99,255,0.25)] scale-[1.01]'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#5863FF] text-white flex items-center justify-center shadow-sm">
                      <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* [섹션 2] 여행 날짜 */}
        <section>
          <h2 className="text-[15px] font-bold text-[#151B3F] mb-2.5">여행 날짜</h2>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(true)}
            className="w-full h-[52px] px-4 rounded-[16px] bg-white border border-[#E8ECF4] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#CCD4E5] active:scale-[0.99] transition-all cursor-pointer text-left"
          >
            <span className={`text-[15px] ${travelDate ? 'text-[#151B3F] font-bold' : 'text-[#A0A8BA] font-medium'}`}>
              {travelDate || '날짜를 선택해주세요'}
            </span>
            <svg
              className="w-5 h-5 text-[#8C94A6]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </section>

        {/* [섹션 3] 예산 (1인 기준) */}
        <section>
          <h2 className="text-[15px] font-bold text-[#151B3F] mb-2.5">예산 (1인 기준)</h2>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsBudgetOpen(!isBudgetOpen)}
              className="w-full h-[52px] px-4 rounded-[16px] bg-white border border-[#E8ECF4] text-[15px] font-bold text-[#151B3F] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#CCD4E5] transition-all"
            >
              <span>{budget}</span>
              <svg
                className={`w-5 h-5 text-[#8C94A6] transition-transform duration-200 ${
                  isBudgetOpen ? 'rotate-180 text-[#5863FF]' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* 드롭다운 메뉴 */}
            {isBudgetOpen && (
              <div className="absolute top-[58px] left-0 w-full bg-white rounded-[16px] border border-[#E8ECF4] shadow-[0_12px_28px_rgba(0,0,0,0.08)] py-1.5 z-40 animate-fadeIn">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setBudget(opt);
                      setIsBudgetOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-[14px] font-medium transition-colors flex items-center justify-between ${
                      budget === opt
                        ? 'text-[#5863FF] font-bold bg-[#F4F6FF]'
                        : 'text-[#151B3F] hover:bg-[#F9FAFC]'
                    }`}
                  >
                    <span>{opt}</span>
                    {budget === opt && (
                      <svg className="w-4 h-4 text-[#5863FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* [섹션 4] 이동 거리 슬라이더 */}
        <section className="bg-white rounded-[20px] p-5 border border-[#E8ECF4] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold text-[#8C94A6]">이동 거리</span>
            <span className="text-[16px] font-bold text-[#151B3F]">{distance}km 이내</span>
          </div>

          <div className="relative flex items-center my-2">
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-[#E8ECF4] rounded-lg appearance-none cursor-pointer accent-[#5863FF]"
              style={{
                background: `linear-gradient(to right, #5863FF 0%, #5863FF ${
                  (distance / 500) * 100
                }%, #E8ECF4 ${(distance / 500) * 100}%, #E8ECF4 100%)`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-[12px] font-medium text-[#A0A8BA] mt-2">
            <span>0km</span>
            <span>500km</span>
          </div>
        </section>

        {/* [섹션 5] 선호 지역 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold text-[#151B3F]">선호 지역</h2>
            <span className="text-[12px] font-medium text-[#8C94A6]">
              최대 3개 · {selectedRegions.length}/3
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {regions.map((region) => {
              const isSelected = selectedRegions.includes(region);
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleRegion(region)}
                  className={`h-[48px] rounded-[16px] text-[14px] font-bold transition-all duration-150 cursor-pointer active:scale-95 flex items-center justify-center ${
                    isSelected
                      ? 'bg-white text-[#5863FF] border-2 border-[#5863FF] shadow-[0_2px_10px_rgba(88,99,255,0.18)]'
                      : 'bg-white text-[#151B3F] border border-[#E8ECF4] hover:border-[#CCD4E5]'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </section>

        {/* [섹션 6] 누구와 가나요? */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold text-[#151B3F]">누구와 가나요?</h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {companions.map((item) => {
              const isSelected = companion === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCompanion(item.id)}
                  className={`relative rounded-[20px] overflow-hidden aspect-[1.7/1] transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? 'ring-2 ring-[#5863FF] shadow-[0_4px_16px_rgba(88,99,255,0.25)] scale-[1.01]'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#5863FF] text-white flex items-center justify-center shadow-sm">
                      <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* [섹션 7] 몇 명이서 가나요? */}
        <section className="bg-white rounded-[20px] px-5 py-4 border border-[#E8ECF4] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <span className="text-[15px] font-bold text-[#151B3F]">몇 명이서 가나요?</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
              disabled={peopleCount <= 1}
              className="w-8 h-8 rounded-full bg-[#F0F2F7] text-[#151B3F] font-black text-[18px] flex items-center justify-center hover:bg-[#E5E8F0] active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              -
            </button>
            <span className="text-[16px] font-bold text-[#151B3F] min-w-[32px] text-center">
              {peopleCount}명
            </span>
            <button
              type="button"
              onClick={() => setPeopleCount(peopleCount + 1)}
              className="w-8 h-8 rounded-full bg-[#151B3F] text-white font-black text-[18px] flex items-center justify-center hover:bg-[#252E5E] active:scale-95 transition-all"
            >
              +
            </button>
          </div>
        </section>

        {/* [섹션 8] 제외 조건 (아코디언) */}
        <section className="bg-white rounded-[20px] p-5 border border-[#E8ECF4] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <button
            type="button"
            onClick={() => setIsExcludeOpen(!isExcludeOpen)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <span className="text-[15px] font-bold text-[#151B3F]">제외 조건</span>
            <svg
              className={`w-5 h-5 text-[#8C94A6] transition-transform duration-200 ${
                isExcludeOpen ? 'rotate-180 text-[#5863FF]' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExcludeOpen && (
            <div className="grid grid-cols-2 gap-2.5 mt-4 pt-1 animate-fadeIn">
              {excludeList.map((item) => {
                const isSelected = excludedOptions.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleExclude(item)}
                    className={`h-[46px] rounded-[14px] text-[13px] font-bold transition-all duration-150 cursor-pointer active:scale-95 flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#F0F2FF] text-[#5863FF] border border-[#5863FF]'
                        : 'bg-[#F8F9FD] text-[#151B3F] border border-transparent hover:border-[#E0E4F0]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* 3. 하단 고정 CTA 버튼 및 요약 */}
      <footer className="fixed bottom-0 left-0 right-0 sm:static bg-white/95 backdrop-blur-md border-t border-[#F0F2FA] p-5 pt-3 pb-6 z-30 shadow-[0_-8px_20px_rgba(0,0,0,0.03)]">
        <div className="text-[12px] font-medium text-[#8C94A6] text-center mb-2.5">
          선택한 조건 {budget} · {distance}km
          {selectedRegions.length > 0 && ` · ${selectedRegions.join(', ')}`}
        </div>
        <PrimaryButton onClick={handleApply}>
          뽑기 조건 적용하기
        </PrimaryButton>
      </footer>

      {/* 4. 여행 일정 선택 캘린더 바텀시트 모달 */}
      <CalendarBottomSheet
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectDate={(formattedDate) => setTravelDate(formattedDate)}
        initialDate={travelDate}
      />
    </div>
  );
};
