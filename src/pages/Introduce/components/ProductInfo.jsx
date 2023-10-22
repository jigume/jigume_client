import React from 'react';

export default function ProductInfo() {
  return (
    <div className="py-3 flex flex-col gap-4 animate-pulse">
      <div>상품정보</div>
      <div className="flex gap-8 rounded-lg overflow-hidden border border-gray-300">
        <div className="w-20 aspect-square bg-gray-200 shrink-0" />
        <div className="w-full flex flex-col justify-center gap-4">
          <div className="w-3/4 h-4 rounded bg-gray-300" />
          <div className="w-1/2 h-3 rounded bg-gray-100" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-1/2 h-3 rounded bg-gray-300" />
        <div className="w-3/4 h-3 rounded bg-gray-300" />
        <div className="w-1/2 h-3 rounded bg-gray-300" />
      </div>
    </div>
  );
}
