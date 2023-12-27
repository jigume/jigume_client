import React from 'react';

export default function ProgressJoin() {
  return (
    <div className="py-4">
      <div className="pb-3 text-sm">
        <div className="text-sm">
          [오늘의딜/15%쿠폰] 논슬립 방수 가죽 데스크매트 마우스패드
          모니터받침대(스크래치방지)
        </div>
        <div className="text-base font-light text-gray-600">
          구매가 : 29,900 원
        </div>
      </div>
      <div className="flex gap-2 font-light">
        <div className="w-full rounded-lg border py-4 text-center text-xs">
          예상 결제 내역 확인하기
        </div>
        <div className="w-full rounded-lg bg-gray-100 py-4 text-center text-xs">
          구매 <span className="text-primaryBlue">공지방</span>으로 이동하기
        </div>
      </div>
    </div>
  );
}
