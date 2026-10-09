import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';

export const GroupDestinationSubmitPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'guest';

  // 1. 희망 여행지 1곳 (기본 목업: 강릉)
  const [destinations, setDestinations] = useState<string[]>(['강릉']);
  const [inputPlace, setInputPlace] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');

  const maxCount = 1;

  // 인기 추천 여행지 목록 (원클릭 추가/교체용)
  const popularPlaces = ['제주', '강릉', '부산', '경주', '전주', '속초', '여수', '남해'];

  // 토스트 메시지 헬퍼
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  // 여행지 추가 (1곳 제한 - 이미 있으면 교체)
  const handleAddDestination = (placeName: string) => {
    const trimmed = placeName.trim();
    if (!trimmed) return;
    setDestinations([trimmed]);
    setInputPlace('');
  };

  // 엔터 키 입력 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDestination(inputPlace);
    }
  };

  // 여행지 삭제
  const handleRemoveDestination = () => {
    setDestinations([]);
  };

  // 최종 제출 및 대기실로 이동
  const handleSubmit = () => {
    if (destinations.length === 0) {
      showToast('가고 싶은 여행지를 1곳 입력해주세요.');
      return;
    }
    // 대기실(우리 여행방)로 이동
    navigate(`/gacha/group/lobby?role=${role}&submitted=true`);
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 상단 네비게이션 헤더 */}
      <header className="w-full h-[60px] px-5 flex items-center justify-between border-b border-[#F0F2FA] bg-white sticky top-0 z-30 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#151B3F] hover:bg-[#F0F2FA] transition-colors cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-[17px] font-bold text-[#151B3F]">희망 여행지</h1>

        <button
          type="button"
          className="text-[14px] font-medium text-[#8C94A6] hover:text-[#151B3F] transition-colors cursor-pointer"
        >
          필터
        </button>
      </header>

      {/* 2. 본문 컨텐츠 영역 */}
      <main className="flex-1 overflow-y-auto px-5 py-6">
        {/* 메인 타이틀 & 가이드 설명 */}
        <div className="mb-6">
          <h2 className="text-[26px] font-black text-[#151B3F] tracking-tight leading-tight">
            어디로 떠나고 싶나요?
          </h2>
          <p className="text-[14px] text-[#8C94A6] mt-2 leading-relaxed">
            가고 싶은 여행지를 1곳 입력해주세요.<br />
            입력한 여행지는 다른 멤버에게 공개되지 않아요.
          </p>
        </div>

        {/* 나만 볼 수 있어요 (보안/비공개 안내 배너) */}
        <div className="bg-white rounded-[22px] p-4.5 border border-[#E8ECF4] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-3.5 mb-6 animate-fadeIn">
          <div className="w-10 h-10 rounded-full bg-[#E2F800] flex items-center justify-center flex-shrink-0 shadow-sm text-[#151B3F]">
            <svg className="w-5 h-5 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <span className="text-[15px] font-bold text-[#151B3F] block">
              나만 볼 수 있어요
            </span>
            <span className="text-[12.5px] text-[#8C94A6] mt-0.5 block">
              그룹원에게 여행지명은 공개 되지 않아요
            </span>
          </div>
        </div>

        {/* 여행지 직접 입력 인풋 & 추가 버튼 */}
        <div className="space-y-4">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputPlace}
              onChange={(e) => setInputPlace(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="가고 싶은 여행지 입력 (예: 강릉, 제주)"
              className="w-full h-[54px] pl-4 pr-16 rounded-[18px] bg-white border border-[#E2E6F2] focus:border-[#5863FF] focus:outline-none text-[15px] font-bold text-[#151B3F] placeholder-[#A0A8BA] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all"
            />
            <button
              type="button"
              onClick={() => handleAddDestination(inputPlace)}
              disabled={!inputPlace.trim()}
              className="absolute right-2 px-3.5 py-2 rounded-[14px] bg-[#5863FF] text-white text-[13px] font-bold disabled:opacity-30 disabled:pointer-events-none hover:bg-[#4853E8] active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              {destinations.length > 0 ? '변경' : '등록'}
            </button>
          </div>

          {/* 선택된 여행지 칩 리스트 (1곳) */}
          <div className="flex flex-wrap gap-2.5 pt-1 min-h-[48px]">
            {destinations.map((place) => (
              <div
                key={place}
                className="h-[42px] pl-4 pr-3 rounded-full bg-[#5863FF] text-white flex items-center gap-2 shadow-[0_3px_10px_rgba(88,99,255,0.25)] animate-fadeIn transition-all"
              >
                <span className="text-[15px] font-bold tracking-tight">{place}</span>
                <button
                  type="button"
                  onClick={handleRemoveDestination}
                  className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={`${place} 삭제`}
                >
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* 빠른 추천 여행지 태그 (원클릭 선택) */}
          <div className="pt-3">
            <span className="text-[12px] font-bold text-[#8C94A6] block mb-2">
              추천 여행지 빠른 선택
            </span>
            <div className="flex flex-wrap gap-2">
              {popularPlaces.map((pop) => {
                const isSelected = destinations.includes(pop);
                return (
                  <button
                    key={pop}
                    type="button"
                    onClick={() => handleAddDestination(pop)}
                    className={`px-3 py-1.5 rounded-full text-[13px] font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#5863FF] border-[#5863FF] text-white shadow-sm'
                        : 'bg-white border-[#E8ECF4] text-[#424F75] hover:border-[#5863FF] hover:text-[#5863FF] shadow-sm active:scale-95'
                    }`}
                  >
                    {pop}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* 3. 하단 고정 CTA 버튼 및 카운트 */}
      <footer className="fixed bottom-0 left-0 right-0 sm:static bg-white/95 backdrop-blur-md border-t border-[#F0F2FA] p-5 pb-6 z-30 shadow-[0_-8px_20px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between text-[13px] mb-3 px-1">
          <span className="text-[#8C94A6] flex items-center gap-1 font-medium">
            입력한 여행지는 비밀이에요
            <span role="img" aria-label="lock">🔒</span>
          </span>
          <span className="text-[14px] font-black text-[#151B3F]">
            <span className="text-[#5863FF]">{destinations.length}</span> / {maxCount}
          </span>
        </div>

        <PrimaryButton onClick={handleSubmit} disabled={destinations.length === 0}>
          희망 여행지 제출하기
        </PrimaryButton>

        <p className="text-[12px] text-[#8C94A6] text-center mt-2.5">
          제출한 여행지는 그룹원에게 공개되지 않아요
        </p>
      </footer>

      {/* 4. 토스트 팝업 알림 */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-[#151B3F]/90 text-white text-[13px] font-bold px-4 py-2.5 rounded-full shadow-lg z-50 animate-fadeIn whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
