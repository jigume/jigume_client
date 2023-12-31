import React from 'react';
import Avatar from 'boring-avatars';
import { useNavigate } from 'react-router-dom';
import {
  primaryBlue,
  primaryJade,
  primaryPurple,
  primaryYello,
} from '../../../../../common';

export default function ItemComponent({ item, index }) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex w-full cursor-pointer flex-row gap-4 px-4 pb-4 ${
        !item ? 'animate-pulse' : ''
      }`}
      onClick={() => navigate(`/goods/${index}`)}
    >
      {!item ? (
        <div className="border-gray50 h-32 w-32 flex-none rounded-lg border bg-gray-100" />
      ) : (
        <img
          src={item.goodsImagesList[0].goodsImgUrl}
          className="border-gray50 h-32 w-32 flex-none rounded-lg border bg-gray-100"
        />
      )}
      <div className="flex flex-col truncate pt-1">
        {!item ? (
          <div className="mb-[12px] h-[12px] w-48 rounded-sm bg-gray-100" />
        ) : (
          <div className="truncate text-lg">{item.goodsName}</div>
        )}

        <div className="flex flex-row items-center gap-2 pb-2">
          {!item ? (
            <div className="h-[18px] w-[18px] rounded-full bg-gray-100" />
          ) : (
            <Avatar
              size={18}
              name={item.sellerInfoDto.sellerNickname}
              variant="beam"
              colors={[
                primaryYello,
                primaryJade,
                primaryPurple,
                '#C271B4',
                primaryBlue,
              ]}
            />
          )}
          {/* <div className="w-[18px] h-[18px] rounded-full bg-gray-100" /> */}
          <div className="caption flex flex-row items-center gap-1">
            {!item ? (
              <div className="h-[12px] w-16 rounded-sm bg-gray-100" />
            ) : (
              <>
                <div>{item.sellerInfoDto.sellerNickname}</div>
                <div className="h-3 w-[1px] bg-gray-500" />
                {item.sellerInfoDto.sellCount < -1 ? (
                  <div className="h-[12px] w-20 rounded-sm bg-gray-100" />
                ) : (
                  <div className="text-gray-500">
                    {item.sellerInfoDto.sellCount} 번째 구매 리드
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="paragraph-sm text-gray-500">
          {!item ? (
            <div className="mb-[6px] h-[12px] w-12 rounded-sm bg-gray-100" />
          ) : (
            <div>구매가: {item.goodsPrice}</div>
          )}
          <div className="flex flex-row items-center gap-1 font-light">
            {!item ? (
              <div className="h-[12px] w-12 rounded-sm bg-gray-100" />
            ) : (
              <span>배송비: {item.realDeliveryFee}</span>
            )}
            <span>/</span>
            {!item ? (
              <div className="h-[12px] w-20 rounded-sm bg-gray-100" />
            ) : (
              <span>
                <span className="font-bold text-[#FFAE39]">
                  {item.realDeliveryFee}
                </span>{' '}
                명 분할 중
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
