import React, { useState } from 'react';
import { PrimaryButton } from './PrimaryButton';

interface CalendarBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (formattedDate: string) => void;
  initialDate?: string;
}

export const CalendarBottomSheet: React.FC<CalendarBottomSheetProps> = ({
  isOpen,
  onClose,
  onSelectDate,
}) => {
  // 현재 기준 날짜
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-indexed

  // 선택된 날짜 (시작일, 종료일)
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedQuick, setSelectedQuick] = useState<string>('');

  if (!isOpen) return null;

  // 요일 헤더
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 월 이동
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 해당 월의 날짜 배열 계산
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // 퀵 선택 칩 핸들러
  const handleQuickSelect = (type: string) => {
    setSelectedQuick(type);
    const now = new Date();

    if (type === 'today') {
      setStartDate(now);
      setEndDate(now);
    } else if (type === 'weekend') {
      const day = now.getDay();
      const saturday = new Date(now);
      saturday.setDate(now.getDate() + ((6 - day + 7) % 7 || 7));
      const sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);
      setStartDate(saturday);
      setEndDate(sunday);
    } else if (type === '1night') {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      setStartDate(now);
      setEndDate(tomorrow);
    }
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (day: number) => {
    setSelectedQuick('');
    const clicked = new Date(currentYear, currentMonth, day);

    // 과거 날짜는 선택 불가
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (clicked < todayZero) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clicked < startDate) {
        setStartDate(clicked);
      } else {
        setEndDate(clicked);
      }
    }
  };

  // 날짜 포맷팅 유틸
  const formatDateString = (d: Date) => {
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const date = String(d.getDate()).padStart(2, '0');
    const dayName = weekDays[d.getDay()];
    return `${month}.${date} (${dayName})`;
  };

  // 선택 완료
  const handleConfirm = () => {
    if (startDate && endDate) {
      if (startDate.getTime() === endDate.getTime()) {
        onSelectDate(`${formatDateString(startDate)} 당일치기`);
      } else {
        const diffDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        onSelectDate(`${formatDateString(startDate)} ~ ${formatDateString(endDate)} (${diffDays}박 ${diffDays + 1}일)`);
      }
    } else if (startDate) {
      onSelectDate(`${formatDateString(startDate)} 출발`);
    }
    onClose();
  };

  // 날짜 상태 비교 함수
  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isInRange = (d: Date) => {
    if (!startDate || !endDate) return false;
    return d > startDate && d < endDate;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 select-none animate-fadeIn">
      {/* 1. 딥 블러 백드롭 (클릭 시 닫힘) */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0F142E]/50 backdrop-blur-[16px] transition-opacity cursor-pointer"
        aria-label="닫기"
      />

      {/* 2. 바텀 시트 컨텐츠 모달 */}
      <div className="relative w-full max-w-[440px] bg-white rounded-t-[28px] sm:rounded-[28px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] z-10 flex flex-col max-h-[85vh] animate-slideUp overflow-hidden">
        {/* 상단 드래그 인디케이터 바 */}
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-10 h-1.5 rounded-full bg-[#E5E8F0]" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-[#F0F2FA]">
          <h2 className="text-[17px] font-bold text-[#151B3F]">여행 날짜 선택</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8C94A6] hover:bg-[#F0F2FA] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 퀵 칩 선택 영역 */}
        <div className="px-6 pt-3 flex gap-2 overflow-x-auto pb-1">
          {[
            { id: 'today', label: '오늘 출발' },
            { id: 'weekend', label: '이번 주말' },
            { id: '1night', label: '1박 2일' },
          ].map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => handleQuickSelect(chip.id)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedQuick === chip.id
                  ? 'bg-[#5863FF] text-white shadow-[0_2px_8px_rgba(88,99,255,0.3)]'
                  : 'bg-[#F0F2F7] text-[#555E77] hover:bg-[#E5E8EF]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* 월 네비게이터 */}
        <div className="flex items-center justify-between px-6 py-3">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F0F2FA] text-[#151B3F] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-[16px] font-bold text-[#151B3F]">
            {currentYear}년 {currentMonth + 1}월
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F0F2FA] text-[#151B3F] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 캘린더 그리드 */}
        <div className="px-5 pb-4">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 mb-2 text-center text-[13px] font-semibold text-[#8C94A6]">
            {weekDays.map((w, idx) => (
              <span
                key={w}
                className={idx === 0 ? 'text-[#FF5C5C]' : idx === 6 ? 'text-[#5863FF]' : ''}
              >
                {w}
              </span>
            ))}
          </div>

          {/* 일자 그리드 */}
          <div className="grid grid-cols-7 gap-y-1">
            {/* 1일 전 빈 칸 */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}

            {/* 실제 일자들 */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateObj = new Date(currentYear, currentMonth, day);
              const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const isPast = dateObj < todayZero;
              const isStart = startDate && isSameDay(dateObj, startDate);
              const isEnd = endDate && isSameDay(dateObj, endDate);
              const inRange = isInRange(dateObj);
              const isToday = isSameDay(dateObj, today);

              return (
                <div
                  key={`day-${day}`}
                  className={`h-10 flex items-center justify-center relative ${
                    inRange ? 'bg-[#EEF1FF]' : ''
                  } ${isStart && endDate ? 'rounded-l-full bg-gradient-to-r from-transparent to-[#EEF1FF]' : ''} ${
                    isEnd ? 'rounded-r-full bg-gradient-to-l from-transparent to-[#EEF1FF]' : ''
                  }`}
                >
                  <button
                    type="button"
                    disabled={isPast}
                    onClick={() => handleDateClick(day)}
                    className={`w-9 h-9 rounded-full flex flex-col items-center justify-center text-[14px] font-bold transition-all relative z-10 ${
                      isPast
                        ? 'text-[#CCD2E0] cursor-not-allowed'
                        : isStart || isEnd
                        ? 'bg-[#5863FF] text-white shadow-[0_2px_10px_rgba(88,99,255,0.4)] scale-105'
                        : 'text-[#151B3F] hover:bg-[#F0F2FA] active:scale-95'
                    }`}
                  >
                    <span>{day}</span>
                    {isToday && !isStart && !isEnd && (
                      <span className="w-1 h-1 rounded-full bg-[#5863FF] absolute bottom-1" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 선택 요약 및 완료 버튼 */}
        <div className="px-6 py-4 border-t border-[#F0F2FA] bg-[#FAFBFF] flex flex-col gap-3">
          <div className="text-[13px] font-semibold text-[#5863FF] text-center min-h-[20px]">
            {startDate && endDate ? (
              startDate.getTime() === endDate.getTime() ? (
                `${formatDateString(startDate)} (당일치기)`
              ) : (
                `${formatDateString(startDate)} ~ ${formatDateString(endDate)}`
              )
            ) : startDate ? (
              `${formatDateString(startDate)} (종료일을 선택해주세요)`
            ) : (
              '원하는 날짜를 선택해주세요'
            )}
          </div>
          <PrimaryButton onClick={handleConfirm} disabled={!startDate}>
            선택 완료
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
