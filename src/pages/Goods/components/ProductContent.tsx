import { GoodsPageDTO } from '@src/types/goods';
import React from 'react';

export default function ProductContent({
  data,
}: {
  data: GoodsPageDTO | undefined;
}) {
  return (
    <div
      className={`flex flex-col gap-2 border-b border-gray-300 py-8 ${
        !data ? 'animate-pulse' : ''
      }`}
    >
      {data ? (
        <div>{data.introduction}</div>
      ) : (
        <>
          <div className="h-3 w-3/4 rounded bg-gray-300" />
          <div className="h-3 w-3/4 rounded bg-gray-300" />
          <div className="h-3 w-1/2 rounded bg-gray-300" />
        </>
      )}
    </div>
  );
}
