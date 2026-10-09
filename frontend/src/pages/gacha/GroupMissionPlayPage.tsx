import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import missionCocaCola from '../../assets/images/gacha/mission_coca_cola.png';
import missionFireExtinguisher from '../../assets/images/gacha/mission_fire_extinguisher.png';
import missionUmbrella from '../../assets/images/gacha/mission_umbrella.png';

interface ChatMessage {
  id: string;
  senderId: 'me' | 'minji' | 'suhyun';
  senderName: string;
  avatarColor: string;
  time: string;
  text?: string;
  image?: string;
  submissionRank?: number; // 1, 2, 3
}

export const GroupMissionPlayPage: React.FC = () => {
  const navigate = useNavigate();
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // 상단바 & 미션 카드 공통 타이머: 3분 10초(190초)에서 시작 -> 3분 00초(180초)가 되면 AI Mission 카드 출제
  const [totalSeconds, setTotalSeconds] = useState<number>(190);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // 1초 단위 타이머 감소 및 경과 시간 기록
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTotalSeconds((prev) => Math.max(0, prev - 1));
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // 현재 시각 포맷 (HH:mm)
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 2초 간격 채팅 릴레이 시뮬레이션
  // 0s: 나연(Me)
  // 2s: 민지
  // 4s: 수현
  // 10s (03:00 도달): AI MISSION 배너 오픈
  // 12s: 수현 "빨간 거 어디 있지..."
  // 14s: 나연 "찾았다ㅋㅋ 잠만"
  // 16s: 민지 (1번째 제출: 코카콜라)
  // 18s: 나연 (2번째 제출: 소화기)
  // 20s: 수현 (3번째 제출: 업로드 사진)
  useEffect(() => {
    const currentTime = getCurrentTime();

    if (elapsedSeconds === 0) {
      setMessages([
        {
          id: '1',
          senderId: 'me',
          senderName: '나연',
          avatarColor: 'from-[#5863FF] to-[#7B86FF]',
          time: currentTime,
          text: '다들 준비됐어?',
        },
      ]);
    } else if (elapsedSeconds === 2) {
      setMessages((prev) => [
        ...prev,
        {
          id: '2',
          senderId: 'minji',
          senderName: '민지',
          avatarColor: 'from-[#4EA8FE] to-[#3B92F5]',
          time: currentTime,
          text: 'ㅋㅋㅋ 준비완료 🍺',
        },
      ]);
    } else if (elapsedSeconds === 4) {
      setMessages((prev) => [
        ...prev,
        {
          id: '3',
          senderId: 'suhyun',
          senderName: '수현',
          avatarColor: 'from-[#C8F026] to-[#AEE000]',
          time: currentTime,
          text: '무슨 미션 나오려나 🤔',
        },
      ]);
    } else if (elapsedSeconds === 12) {
      setMessages((prev) => [
        ...prev,
        {
          id: '4',
          senderId: 'suhyun',
          senderName: '수현',
          avatarColor: 'from-[#C8F026] to-[#AEE000]',
          time: currentTime,
          text: '빨간 거 어디 있지...',
        },
      ]);
    } else if (elapsedSeconds === 14) {
      setMessages((prev) => [
        ...prev,
        {
          id: '5',
          senderId: 'me',
          senderName: '나연',
          avatarColor: 'from-[#5863FF] to-[#7B86FF]',
          time: currentTime,
          text: '찾았다ㅋㅋ 잠만',
        },
      ]);
    } else if (elapsedSeconds === 16) {
      setMessages((prev) => [
        ...prev,
        {
          id: '6',
          senderId: 'minji',
          senderName: '민지',
          avatarColor: 'from-[#4EA8FE] to-[#3B92F5]',
          time: currentTime,
          image: missionCocaCola,
          submissionRank: 1,
        },
      ]);
    } else if (elapsedSeconds === 18) {
      setMessages((prev) => [
        ...prev,
        {
          id: '7',
          senderId: 'me',
          senderName: '나연',
          avatarColor: 'from-[#5863FF] to-[#7B86FF]',
          time: currentTime,
          image: missionFireExtinguisher,
          submissionRank: 2,
        },
      ]);
    } else if (elapsedSeconds === 20) {
      setMessages((prev) => [
        ...prev,
        {
          id: '8',
          senderId: 'suhyun',
          senderName: '수현',
          avatarColor: 'from-[#C8F026] to-[#AEE000]',
          time: currentTime,
          image: missionUmbrella,
          submissionRank: 3,
        },
      ]);
    }
  }, [elapsedSeconds]);

  // 새 메시지가 오면 자동 스크롤
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, elapsedSeconds]);

  // 타이머 형식 변환 (mm:ss)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 사용자 수동 메시지 전송
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        senderId: 'me',
        senderName: '나연',
        avatarColor: 'from-[#5863FF] to-[#7B86FF]',
        time: getCurrentTime(),
        text: inputText.trim(),
      },
    ]);
    setInputText('');
  };

  // 미션 결과 보기 이동
  const handleViewMissionResult = () => {
    navigate('/gacha/group/mission/result');
  };

  // 정확히 3분 00초(180초 이하)가 되면 AI 미션 카드 오픈
  const isMissionActive = totalSeconds <= 180;
  const isMissionEnded = elapsedSeconds >= 22;

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0 relative min-h-screen sm:min-h-[900px]">
      {/* 1. 상단 다크 네이비 헤더 바 */}
      <header className="w-full h-[62px] px-5 flex items-center justify-between bg-[#182153] text-white sticky top-0 z-30 flex-shrink-0 shadow-sm">
        <button
          type="button"
          onClick={() => navigate('/gacha/group/mission')}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="뒤로가기"
        >
          <svg className="w-6 h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 중앙 방 이름 & LIVE 뱃지 */}
        <div className="flex flex-col items-center">
          <span className="text-[15px] font-bold tracking-tight text-white">
            여름 우정여행
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span className="text-[11px] font-black text-[#34D399] tracking-wider">
              LIVE
            </span>
          </div>
        </div>

        {/* 우측 상단 카운트다운 타이머 뱃지 */}
        <div className="px-3.5 py-1 rounded-full bg-[#E5FF4D] text-[#151B3F] text-[13px] font-black tracking-tight shadow-sm font-mono">
          {formatTime(totalSeconds)}
        </div>
      </header>

      {/* 2. 실시간 채팅 & 미션 피드 영역 */}
      <main
        ref={chatScrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
      >
        {/* 사전 준비 대화 (인덱스 0~2) */}
        {messages.slice(0, 3).map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 animate-fadeIn ${
              msg.senderId === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* 타 사용자 아바타 */}
            {msg.senderId !== 'me' && (
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-tr ${msg.avatarColor} ring-2 ring-white flex items-center justify-center text-white shadow-sm flex-shrink-0 relative mt-0.5`}
              >
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
            )}

            {/* 메시지 내용 & 타임스탬프 */}
            <div
              className={`flex flex-col ${
                msg.senderId === 'me' ? 'items-end' : 'items-start'
              }`}
            >
              {msg.senderId !== 'me' && (
                <div className="flex items-center gap-1.5 mb-1 pl-1">
                  <span className="text-[13px] font-bold text-[#151B3F]">
                    {msg.senderName}
                  </span>
                  <span className="text-[11px] text-[#A0A6B8]">{msg.time}</span>
                </div>
              )}

              <div className="flex items-end gap-1.5">
                {msg.senderId === 'me' && (
                  <span className="text-[11px] text-[#A0A6B8] mb-0.5">
                    {msg.time}
                  </span>
                )}
                <div
                  className={`px-4 py-2.5 rounded-[18px] text-[14px] leading-relaxed shadow-sm max-w-[240px] break-words ${
                    msg.senderId === 'me'
                      ? 'bg-[#1D2554] text-white rounded-tr-none font-medium'
                      : 'bg-white text-[#151B3F] border border-[#EBEFF8] rounded-tl-none font-medium'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>

            {/* 내 아바타 */}
            {msg.senderId === 'me' && (
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-tr ${msg.avatarColor} ring-2 ring-white flex items-center justify-center text-white shadow-sm flex-shrink-0 relative mt-0.5`}
              >
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* [AI MISSION 배너 카드]: 정확히 3분 00초(180초 이하)가 되면 채팅방에 출제되며 상단 타이머와 100% 동기화 */}
        {isMissionActive && (
          <div className="w-full bg-white rounded-[22px] border border-[#D5DCFB] shadow-[0_6px_20px_rgba(88,99,255,0.12)] overflow-hidden my-3 animate-scaleUp">
            {/* 배너 상단 헤더 */}
            <div className="bg-gradient-to-r from-[#2F3EA4] to-[#4A5BE8] px-4 py-2.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">
                  AI
                </div>
                <span className="text-[13.5px] font-black tracking-wide">
                  AI MISSION
                </span>
              </div>
              {/* 상단바와 완벽히 일치하는 실시간 카운트다운 뱃지 */}
              <span className="bg-[#E5FF4D] text-[#151B3F] font-black text-[12px] px-2.5 py-0.5 rounded-full shadow-sm font-mono">
                {formatTime(totalSeconds)}
              </span>
            </div>

            {/* 배너 바디 */}
            <div className="p-4 bg-[#F8F9FE]">
              <h3 className="text-[15.5px] font-black text-[#151B3F] tracking-tight leading-snug">
                빨간색 물건을 가장 먼저 찾아 사진을 올려주세요!
              </h3>
              <p className="text-[12px] text-[#6E7799] mt-1 font-medium">
                제한시간 03:00 · 가장 먼저 제출하면 확률 UP!
              </p>
            </div>
          </div>
        )}

        {/* 미션 출제 이후 채팅 및 사진 제출 피드 (인덱스 3~) */}
        {messages.slice(3).map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 animate-fadeIn ${
              msg.senderId === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* 타 사용자 아바타 */}
            {msg.senderId !== 'me' && (
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-tr ${msg.avatarColor} ring-2 ring-white flex items-center justify-center text-white shadow-sm flex-shrink-0 relative mt-0.5`}
              >
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
            )}

            {/* 메시지 내용 & 사진 인증 카드 */}
            <div
              className={`flex flex-col ${
                msg.senderId === 'me' ? 'items-end' : 'items-start'
              }`}
            >
              {/* 유저 이름 & 순위 뱃지 & 타임스탬프 */}
              <div
                className={`flex items-center gap-1.5 mb-1 ${
                  msg.senderId === 'me' ? 'pr-1' : 'pl-1'
                }`}
              >
                {msg.senderId !== 'me' && (
                  <span className="text-[13px] font-bold text-[#151B3F]">
                    {msg.senderName}
                  </span>
                )}

                {/* 제출 순위 뱃지 */}
                {msg.submissionRank && (
                  <span className="bg-[#E5FF4D] text-[#151B3F] text-[11px] font-black px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                    <span>{msg.submissionRank === 1 ? '🥇' : msg.submissionRank === 2 ? '🥈' : '🥉'}</span>
                    <span>{msg.submissionRank}번째 제출</span>
                  </span>
                )}

                <span className="text-[11px] text-[#A0A6B8]">{msg.time}</span>
              </div>

              {/* 텍스트 메시지 or 사진 카드 */}
              {msg.text && (
                <div
                  className={`px-4 py-2.5 rounded-[18px] text-[14px] leading-relaxed shadow-sm max-w-[240px] break-words ${
                    msg.senderId === 'me'
                      ? 'bg-[#1D2554] text-white rounded-tr-none font-medium'
                      : 'bg-white text-[#151B3F] border border-[#EBEFF8] rounded-tl-none font-medium'
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {msg.image && (
                <div className="rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] border-2 border-white max-w-[230px] animate-scaleUp">
                  <img
                    src={msg.image}
                    alt={`${msg.senderName} 미션 사진`}
                    className="w-full h-auto object-cover max-h-[170px]"
                  />
                </div>
              )}
            </div>

            {/* 내 아바타 */}
            {msg.senderId === 'me' && (
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-tr ${msg.avatarColor} ring-2 ring-white flex items-center justify-center text-white shadow-sm flex-shrink-0 relative mt-0.5`}
              >
                <div className="flex gap-1">
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                  <div className="w-1 h-1.5 bg-white rounded-full" />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* [미션 종료 안내 & 결과 보기 카드] */}
        {isMissionEnded && (
          <div className="w-full bg-[#182153] text-white rounded-[22px] p-4 text-center shadow-[0_8px_24px_rgba(24,33,83,0.3)] my-4 space-y-3 animate-fadeIn">
            <h4 className="text-[16px] font-black tracking-tight">미션 종료</h4>
            <button
              type="button"
              onClick={handleViewMissionResult}
              className="w-full bg-[#EEF2FF] hover:bg-white text-[#151B3F] font-black text-[14.5px] py-3 px-4 rounded-[16px] flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>미션 결과 보기</span>
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </main>

      {/* 3. 하단 실시간 채팅 입력 바 */}
      <footer className="w-full bg-white border-t border-[#EEF1F8] px-3.5 py-2.5 flex items-center gap-2 sticky bottom-0 z-30">
        {/* 갤러리 아이콘 */}
        <button
          type="button"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#8C94A6] hover:bg-[#F2F4F8] transition-colors cursor-pointer"
          aria-label="사진 첨부"
        >
          <svg className="w-5 h-5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* 카메라 아이콘 */}
        <button
          type="button"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#8C94A6] hover:bg-[#F2F4F8] transition-colors cursor-pointer"
          aria-label="카메라 촬영"
        >
          <svg className="w-5 h-5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* 입력창 */}
        <form onSubmit={handleSendMessage} className="flex-1 flex items-center bg-[#F2F4F8] rounded-full px-4 py-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="w-full bg-transparent text-[14px] text-[#151B3F] placeholder-[#A0A6B8] outline-none"
          />
        </form>

        {/* 전송 버튼 */}
        <button
          type="button"
          onClick={() => handleSendMessage()}
          className="w-9 h-9 rounded-full bg-[#E5E9F2] hover:bg-[#5863FF] text-[#8C94A6] hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
          aria-label="전송"
        >
          <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </footer>
    </div>
  );
};
