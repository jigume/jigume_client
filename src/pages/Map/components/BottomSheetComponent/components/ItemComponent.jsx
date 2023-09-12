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
      className={`flex flex-row py-[20px] w-[calc(100vw-32px)] gap-4 cursor-pointer ${
        !title ? 'animate-pulse' : ''
      }`}
      onClick={() => navigate(`/introduce/${index}`)}
    >
      {!image ? (
        <div className="border border-gray50 w-32 h-32 rounded-lg bg-gray-100 flex-none" />
      ) : (
        <img
          src={image}
          className="border border-gray50 w-32 h-32 rounded-lg bg-gray-100 flex-none"
        />
      )}
      <div className="flex flex-col truncate pt-1">
        {!title ? (
          <div className="w-48 h-[12px] mb-[12px] bg-gray-100 rounded-sm" />
        ) : (
          <div className="text-lg truncate">{title}</div>
        )}

        <div className="flex flex-row items-center gap-2 pb-2">
          {!username ? (
            <div className="w-[18px] h-[18px] rounded-full bg-gray-100" />
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
          <div className="flex flex-row caption gap-1">
            {!username ? (
              <div className="w-16 h-[12px] bg-gray-100 rounded-sm" />
            ) : (
              <div>{nickname[num]}</div>
            )}
            <div className="text-gray-500">|</div>
            {!count ? (
              <div className="w-20 h-[12px] bg-gray-100 rounded-sm" />
            ) : (
              <div className="text-gray-500">{count} 번째 구매 리드</div>
            )}
          </div>
        </div>

        <div className="paragraph-sm text-gray-500">
          {!itemCost ? (
            <div className="w-12 h-[12px] mb-[6px] bg-gray-100 rounded-sm" />
          ) : (
            <div>구매가: {itemCost}</div>
          )}
          <div className="flex flex-row gap-1 font-light">
            {!deliveryCost ? (
              <div className="w-12 h-[12px] mb-4 bg-gray-100 rounded-sm" />
            ) : (
              <span>배송비: {deliveryCost}</span>
            )}
            <span>/</span>
            {!people ? (
              <div className="w-20 h-[12px] bg-gray-100 rounded-sm" />
            ) : (
              <span>
                <span className="text-[#FFAE39] font-bold">{people}</span> 명
                분할 중
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
