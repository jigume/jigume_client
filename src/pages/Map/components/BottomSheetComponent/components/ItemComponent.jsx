import React from 'react';
import { primaryYello } from '../../../../../common';

export default function ItemComponent({
  image,
  title,
  username,
  count,
  itemCost,
  deliveryCost,
  people,
}) {
  return (
    <div
      className={`flex flex-row px-[16px] py-[20px] gap-4  ${
        !title ? 'animate-pulse' : ''
      }`}
    >
      {!image ? (
        <div className="border border-gray50 w-32 h-32 rounded-lg bg-gray100 flex-none" />
      ) : (
        ''
      )}
      <div className="flex flex-col truncate pt-2">
        {!title ? (
          <div className="w-48 h-[12px] mb-[12px] bg-gray100 rounded-sm" />
        ) : (
          <div className="h6 truncate">
            오늘의 집에서 이거 같이 구매하실 제주도 사람 구해용
          </div>
        )}

        <div className="flex flex-row items-center gap-2  pb-[14px]">
          <div className="w-[18px] h-[18px] rounded-full bg-gray100" />
          <div className="flex flex-row caption gap-1">
            {!username ? (
              <div className="w-16 h-[12px] bg-gray100 rounded-sm" />
            ) : (
              <div>졸린 춘식이</div>
            )}
            <div className="text-gray600">|</div>
            {!count ? (
              <div className="w-20 h-[12px] bg-gray100 rounded-sm" />
            ) : (
              <div className="text-gray600">7 번째 구매 리드</div>
            )}
          </div>
        </div>

        <div className="paragraph-sm text-gray600">
          {!itemCost ? (
            <div className="w-12 h-[12px] mb-[6px] bg-gray100 rounded-sm" />
          ) : (
            <div>구매가:</div>
          )}
          <div className="flex flex-row gap-1">
            {!deliveryCost ? (
              <div className="w-12 h-[12px] mb-4 bg-gray100 rounded-sm" />
            ) : (
              <span>배송비: {deliveryCost}</span>
            )}
            <span>/</span>
            {!people ? (
              <div className="w-20 h-[12px] bg-gray100 rounded-sm" />
            ) : (
              <span>
                <span className={`text-[${primaryYello}]`}>7</span> 명 분할 중
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
