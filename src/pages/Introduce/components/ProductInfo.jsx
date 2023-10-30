import React from 'react';

export default function ProductInfo() {
  return (
    <div className="flex animate-pulse flex-col gap-4 py-3">
      <div>상품정보</div>
      <div className="flex gap-8 overflow-hidden rounded-lg border border-gray-300">
        <div className="aspect-square w-20 shrink-0 bg-gray-200" />
        <div className="flex w-full flex-col justify-center gap-4">
          <div className="h-4 w-3/4 rounded bg-gray-300" />
          <div className="h-3 w-1/2 rounded bg-gray-100" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3 w-1/2 rounded bg-gray-300" />
        <div className="h-3 w-3/4 rounded bg-gray-300" />
        <div className="h-3 w-1/2 rounded bg-gray-300" />
      </div>
    </div>
  );
}
