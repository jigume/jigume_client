import React from 'react';

export default function GetPlan() {
  return (
    <div className="w-[343px] p-[16px] mb-[8px] rounded-[8px] bg-gray100">
      <div className="w-[311px] h-[162px] mb-[8px] rounded-[8px]">지도</div>
      <div className="flex flex-row text-center justify-center">
        <div className="text-center font-normal pr-1 text-gray600">
          픽업 예정 장소:
        </div>
        <div className="text-center font-semibold text-gray950">
          제주 서귀포시 성산읍 동류암로 20
        </div>
      </div>
    </div>
  );
}
