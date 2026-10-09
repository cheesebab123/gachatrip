import React from 'react';

export const GachaPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
      <div className="w-20 h-20 bg-[#EEF1FF] rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl">🎯</span>
      </div>
      <h2 className="text-[20px] font-bold text-[#151B3F]">
        여행지 뽑기 (가챠)
      </h2>
      <p className="text-[14px] text-[#687091] mt-2">
        가챠 머신 화면이 준비 중입니다.
      </p>
    </div>
  );
};
