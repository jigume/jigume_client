import React from 'react';

export default function HeaderProfile() {
  return (
    <div className="mt-8 mb-3 flex flex-col gap-3 animate-pulse">
      {/* 상품 제목 등 */}
      <div className="flex items-center gap-2">
        <div className="w-14 py-1 px-2 bg-gray-100 text-gray-700 rounded-2xl text-center text-sm">
          {`D- `}
        </div>
        <div className="w-full h-4 bg-gray-200 rounded" />
      </div>

      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 pb-[20px] border-b border-gray-300">
        <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
        <div className="w-1/2 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
