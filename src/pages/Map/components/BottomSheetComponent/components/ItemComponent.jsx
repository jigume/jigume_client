import React from 'react';
import Avatar from 'boring-avatars';
import { useNavigate } from 'react-router-dom';
import {
  primaryBlue,
  primaryJade,
  primaryPurple,
  primaryYello,
} from '../../../../../common';

const nickname = [
  'jeju',
  'hackathon',
  'goorm',
  'kakao',
  '카카dh',
  '구름좋아',
  '클라우드',
  '눈사람',
  '무지',
  '라이언',
  '춘식이',
  '춘삼이',
  '카카오맵',
];

export default function ItemComponent({
  image,
  title,
  username,
  count,
  itemCost,
  deliveryCost,
  people,
  index,
}) {
  const navigate = useNavigate();
  const num = Math.floor(Math.random() * 10);
  return (
    <div
      className={`flex w-full cursor-pointer flex-row gap-4 px-4 pb-4 ${
        !title ? 'animate-pulse' : ''
      }`}
      onClick={() => navigate(`/introduce/${index}`)}
    >
      {!image ? (
        <div className="border-gray50 h-32 w-32 flex-none rounded-lg border bg-gray-100" />
      ) : (
        <img
          src={image}
          className="border-gray50 h-32 w-32 flex-none rounded-lg border bg-gray-100"
        />
      )}
      <div className="flex flex-col truncate pt-1">
        {!title ? (
          <div className="mb-[12px] h-[12px] w-48 rounded-sm bg-gray-100" />
        ) : (
          <div className="truncate text-lg">{title}</div>
        )}

        <div className="flex flex-row items-center gap-2 pb-2">
          {!username ? (
            <div className="h-[18px] w-[18px] rounded-full bg-gray-100" />
          ) : (
            <Avatar
              size={18}
              name={title}
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
            {!username ? (
              <div className="h-[12px] w-16 rounded-sm bg-gray-100" />
            ) : (
              <div>{nickname[num]}</div>
            )}
            <div className="h-3 w-[1px] bg-gray-500" />
            {!count ? (
              <div className="h-[12px] w-20 rounded-sm bg-gray-100" />
            ) : (
              <div className="text-gray-500">{count} 번째 구매 리드</div>
            )}
          </div>
        </div>

        <div className="paragraph-sm text-gray-500">
          {!itemCost ? (
            <div className="mb-[6px] h-[12px] w-12 rounded-sm bg-gray-100" />
          ) : (
            <div>구매가: {itemCost}</div>
          )}
          <div className="flex flex-row items-center gap-1 font-light">
            {!deliveryCost ? (
              <div className="h-[12px] w-12 rounded-sm bg-gray-100" />
            ) : (
              <span>배송비: {deliveryCost}</span>
            )}
            <span>/</span>
            {!people ? (
              <div className="h-[12px] w-20 rounded-sm bg-gray-100" />
            ) : (
              <span>
                <span className="font-bold text-[#FFAE39]">{people}</span> 명
                분할 중
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
