import React, { useEffect, useState } from 'react';
import Avatar from 'boring-avatars';
import { useNavigate } from 'react-router-dom';
import {
  primaryBlue,
  primaryJade,
  primaryPurple,
  primaryYello,
} from '../../../../../common';

export default function ItemComponent({
  goodsName,
  goodsImagesList,
  hostNickname,
  goodsOrderCount,
  goodsPrice,
  realDeliveryFee,
  index,
}) {
  const [item, setItem] = useState({
    goodsName: undefined,
    goodsImagesList: undefined,
    hostNickname: undefined,
    goodsOrderCount: undefined,
    goodsPrice: undefined,
    realDeliveryFee: undefined,
    index: undefined,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setItem({
      goodsName,
      goodsImagesList,
      hostNickname,
      goodsOrderCount,
      goodsPrice,
      realDeliveryFee,
      index,
    });

    return () => {
      setItem({
        goodsName: undefined,
        goodsImagesList: undefined,
        hostNickname: undefined,
        goodsOrderCount: undefined,
        goodsPrice: undefined,
        realDeliveryFee: undefined,
        index: undefined,
      });
    };
  }, []);
  return (
    <div
      className={`flex w-full cursor-pointer flex-row gap-4 px-4 pb-4 ${
        !item.goodsName ? 'animate-pulse' : ''
      }`}
      onClick={() => navigate(`/goods/${index}`)}
    >
      {!item.goodsImagesList ? (
        <div className="border-gray50 h-32 w-32 flex-none rounded-lg border bg-gray-100" />
      ) : (
        <img
          src={item.goodsImagesList[0].goodsImgUrl}
          className="border-gray50 h-32 w-32 flex-none rounded-lg border bg-gray-100"
        />
      )}
      <div className="flex flex-col truncate pt-1">
        {!item.goodsName ? (
          <div className="mb-[12px] h-[12px] w-48 rounded-sm bg-gray-100" />
        ) : (
          <div className="truncate text-lg">{item.goodsName}</div>
        )}

        <div className="flex flex-row items-center gap-2 pb-2">
          {!item.hostNickname ? (
            <div className="h-[18px] w-[18px] rounded-full bg-gray-100" />
          ) : (
            <Avatar
              size={18}
              name={item.hostNickname}
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
            {!item.hostNickname ? (
              <div className="h-[12px] w-16 rounded-sm bg-gray-100" />
            ) : (
              <div>{item.hostNickname}</div>
            )}
            <div className="h-3 w-[1px] bg-gray-500" />
            {item.goodsOrderCount < -1 ? (
              <div className="h-[12px] w-20 rounded-sm bg-gray-100" />
            ) : (
              <div className="text-gray-500">
                {item.goodsOrderCount} 번째 구매 리드
              </div>
            )}
          </div>
        </div>

        <div className="paragraph-sm text-gray-500">
          {!item.goodsPrice ? (
            <div className="mb-[6px] h-[12px] w-12 rounded-sm bg-gray-100" />
          ) : (
            <div>구매가: {item.goodsPrice}</div>
          )}
          <div className="flex flex-row items-center gap-1 font-light">
            {!item.realDeliveryFee ? (
              <div className="h-[12px] w-12 rounded-sm bg-gray-100" />
            ) : (
              <span>배송비: {item.realDeliveryFee}</span>
            )}
            <span>/</span>
            {!item.realDeliveryFee ? (
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
