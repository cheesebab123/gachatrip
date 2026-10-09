import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/my/Header';
import { Footer } from '../../components/my/Footer';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export const NotificationSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateAppSettings } = useAuth();

  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(
    user.appSettings.tripRecommendationAlert
  );
  const [selectedDays, setSelectedDays] = useState<string[]>(['금', '토']);
  const [selectedTime, setSelectedTime] = useState<string>('오후 7:30');
  const [doNotDisturb, setDoNotDisturb] = useState<boolean>(true);

  const handleToggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length === 1) {
        alert('최소 1일 이상의 알림 요일을 선택해주세요.');
        return;
      }
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSelectTime = (type: 'default' | 'custom') => {
    if (type === 'default') {
      setSelectedTime('오후 7:30');
    } else {
      const custom = prompt('원하시는 알림 시간을 입력해주세요 (예: 오후 8:00):', selectedTime);
      if (custom && custom.trim()) {
        setSelectedTime(custom.trim());
      }
    }
  };

  const handleSave = () => {
    updateAppSettings({
      tripRecommendationAlert: notificationEnabled,
    });
    alert('여행 추천 알림 설정이 저장되었습니다!');
    navigate('/my');
  };

  return (
    <div className="mobile-container relative flex flex-col justify-between overflow-hidden select-none !p-0 bg-[#FAFBFF]">
      
      {/* 1. 상단 통일된 마이페이지 Header */}
      <Header title="여행 추천 알림" />

      {/* 2. 스크롤 본문 영역 */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-6 pb-6 flex flex-col">
        
        {/* 헤드라인 타이틀 */}
        <h2 className="text-[20px] font-bold text-[#151B3F] tracking-tight mb-5 px-0.5">
          여행 기회를 놓치지 않도록 알려드릴게요
        </h2>

        {/* 메인 알림 토글 다크 블루 카드 (navy gr: #172050 -> #2A3570) */}
        <div className="w-full bg-gradient-to-br from-[#172050] to-[#2A3570] rounded-[24px] p-5 text-white shadow-[0_8px_20px_rgba(23,32,80,0.2)] flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[17px] font-bold tracking-tight">
              여행 추천 알림
            </span>
            <span className="text-[12px] text-[#A0A6B8] mt-0.5 font-normal">
              새 여행지와 시즌 추천을 받아요
            </span>
          </div>

          <button
            type="button"
            onClick={() => setNotificationEnabled(!notificationEnabled)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
              notificationEnabled ? 'bg-[#CCFF00]' : 'bg-[#4A5578]'
            }`}
            aria-label="여행 추천 알림 토글"
          >
            <div
              className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                notificationEnabled
                  ? 'bg-white translate-x-6'
                  : 'bg-white translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 상세 알림 설정 카드 (요일 / 시간 / 추천 종류) */}
        <div className="bg-white rounded-[24px] border border-[#E8ECF4] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-5 mb-4">
          
          {/* 1. 알림 받을 날 */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-bold text-[#687091]">
              알림 받을 날
            </span>
            <div className="flex items-center justify-between gap-1">
              {DAYS.map((day) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleToggleDay(day)}
                    className={`w-10 h-10 rounded-full text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                      isSelected
                        ? 'bg-[#5863FF] text-white shadow-sm'
                        : 'bg-[#F2F4F8] text-[#151B3F] hover:bg-[#E5E8EF]'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. 알림 시간 */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-bold text-[#687091]">
              알림 시간
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleSelectTime('default')}
                className={`flex-1 h-[46px] rounded-[18px] text-[14px] font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                  selectedTime === '오후 7:30'
                    ? 'bg-[#5863FF] text-white shadow-sm'
                    : 'bg-[#F2F4F8] text-[#151B3F] hover:bg-[#E5E8EF]'
                }`}
              >
                오후 7:30
              </button>
              <button
                type="button"
                onClick={() => handleSelectTime('custom')}
                className={`flex-1 h-[46px] rounded-[18px] text-[14px] font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                  selectedTime !== '오후 7:30'
                    ? 'bg-[#5863FF] text-white shadow-sm'
                    : 'bg-[#F2F4F8] text-[#151B3F] hover:bg-[#E5E8EF]'
                }`}
              >
                {selectedTime !== '오후 7:30' ? selectedTime : '직접 설정'}
              </button>
            </div>
          </div>

          {/* 3. 추천 종류 안내 */}
          <div className="flex flex-col gap-1 pt-1 border-t border-[#F0F2F7]">
            <span className="text-[12px] font-bold text-[#8C94A6]">
              추천 종류
            </span>
            <span className="text-[14px] font-bold text-[#151B3F]">
              시즌 여행지 · 내 취향 업데이트
            </span>
          </div>

        </div>

        {/* 방해 금지 시간 적용 카드 */}
        <div className="bg-white rounded-[22px] border border-[#E8ECF4] p-4 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#151B3F]">
              방해 금지 시간 적용
            </span>
            <span className="text-[12px] text-[#8C94A6] mt-0.5">
              오후 10시부터 오전 8시까지
            </span>
          </div>

          <button
            type="button"
            onClick={() => setDoNotDisturb(!doNotDisturb)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
              doNotDisturb ? 'bg-[#5863FF]' : 'bg-[#D1D5DB]'
            }`}
            aria-label="방해 금지 시간 토글"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                doNotDisturb ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

      </main>

      {/* 3. 하단 고정 Footer */}
      <Footer text="알림 설정 저장" onClick={handleSave} />

    </div>
  );
};
