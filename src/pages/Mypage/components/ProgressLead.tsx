import React from 'react';

export default function ProgressLead() {
  return (
    <div className="py-2">
      <div className="flex gap-4 pb-3">
        <div className="aspect-square size-16 rounded-md bg-zinc-300" />
        <div className="text-sm">
          <div>오늘의 집에 이거 같이 사실 분~!!</div>
          <div className="flex gap-1 pt-1 font-light text-gray-600">
            <div>배송비: 7,500원</div> /
            <div>
              <span className="text-yellow-400">5</span>명 분할 중
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 font-light">
        <div className="w-full rounded-lg border py-4 text-center text-xs">
          공지방 관리하기
        </div>
        <div className="w-full rounded-lg bg-success py-4 text-center text-xs text-white">
          구매폼으로 이동하기
        </div>
      </div>
    </div>
  );
}
