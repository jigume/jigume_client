import Avatar from 'boring-avatars';
import { differenceInDays } from 'date-fns';
import React from 'react';

export default function HeaderProfile({ data }) {
  const today = new Date();

  const getdDay = () => {
    const dDay = differenceInDays(today, new Date(data.goodsLimitTime));
    if (dDay > 99) return '99+';
    return dDay;
  };

  return (
    <div
      className={`mb-3 mt-8 flex flex-col gap-3 ${
        !data ? 'animate-pulse' : ''
      }`}
    >
      {/* 상품 제목 등 */}
      <div className="flex items-center gap-2">
        <div className="w16 rounded-2xl bg-gray-100 px-2 py-1 text-center text-sm text-gray-700">
          {`D-${data ? getdDay() : ''}`}
        </div>
        {data ? (
          <div className="font-bold">{data.goodsName}</div>
        ) : (
          <div className="h-4 w-full rounded bg-gray-200" />
        )}
      </div>

      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 border-b border-gray-300 pb-[20px]">
        {data ? (
          <Avatar variant="beam" />
        ) : (
          <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
        )}
        {data ? (
          <div>{data.sellerInfoDto.sellerNickname} | </div>
        ) : (
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        )}
      </div>
    </div>
  );
}
