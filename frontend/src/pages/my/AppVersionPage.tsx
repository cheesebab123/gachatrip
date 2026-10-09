import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/my/Header';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import appIconImg from '../../assets/images/common/app_icon.png';

export const AppVersionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCheckUpdate = () => {
    alert('현재 최신 버전(v1.0.0)을 사용하고 있습니다.');
  };

  return (
    <div className="mobile-container flex flex-col justify-between overflow-hidden select-none bg-[#FAFBFF] !p-0">
      {/* 1. 상단 헤더 */}
      <Header title="앱 버전" onBack={() => navigate(-1)} />

      {/* 2. 본문 컨텐츠 */}
      <main className="flex-1 overflow-y-auto px-5 py-4 flex flex-col">
        {/* 상단 3D 앱 아이콘 및 버전 타이틀 */}
        <div className="flex flex-col items-center mt-3">
          <div className="w-[110px] h-[110px] rounded-[28px] overflow-hidden shadow-[0_8px_24px_rgba(88,99,255,0.12)] flex items-center justify-center bg-white">
            <img
              src={appIconImg}
              alt="가챠트립 앱 아이콘"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-[20px] font-bold text-[#151B3F] tracking-tight mt-4">
            가챠트립 1.0.0
          </h2>
          <p className="text-[13px] text-[#8C94A6] mt-1">
            현재 최신 버전을 사용하고 있어요
          </p>
        </div>

        {/* 최신 버전 뱃지 카드 */}
        <div className="mt-6 bg-[#F0F3FF] rounded-[16px] px-4 py-3 flex items-center gap-2">
          <span className="text-[#5863FF] font-bold text-[14px]">✓</span>
          <span className="text-[14px] font-bold text-[#5863FF]">
            최신 버전
          </span>
        </div>

        {/* 이번 업데이트 내역 카드 */}
        <div className="mt-4 bg-white rounded-[20px] border border-[#E8ECF4] p-4.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-2.5">
          <span className="text-[13px] font-bold text-[#687091]">
            이번 업데이트
          </span>
          <ul className="text-[13px] text-[#151B3F] flex flex-col gap-1.5 leading-relaxed">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#151B3F]" />
              블루 톤 디자인 시스템 개선
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#151B3F]" />
              AI 여행 코스 추천 정확도 향상
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#151B3F]" />
              키링 컬렉션 정렬 기능 추가
            </li>
          </ul>
        </div>

        {/* 이용약관 / 개인정보 처리방침 링크 카드 */}
        <div className="mt-4 bg-white rounded-[20px] border border-[#E8ECF4] px-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] divide-y divide-[#F0F2F7]">
          <div
            onClick={() => alert('이용약관 안내 페이지입니다.')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-bold text-[#151B3F]">
              이용약관
            </span>
            <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
          </div>

          <div
            onClick={() => alert('개인정보 처리방침 안내 페이지입니다.')}
            className="py-3.5 flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[14px] font-bold text-[#151B3F]">
              개인정보 처리방침
            </span>
            <span className="text-[14px] text-[#A0A6B8] font-bold">›</span>
          </div>
        </div>
      </main>

      {/* 3. 하단 CTA 버튼 */}
      <footer className="p-5 pt-2 bg-gradient-to-t from-[#FAFBFF] via-[#FAFBFF] to-transparent">
        <PrimaryButton onClick={handleCheckUpdate}>
          업데이트 확인
        </PrimaryButton>
      </footer>
    </div>
  );
};
