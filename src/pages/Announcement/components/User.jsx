import React from 'react';
import Avatar from 'boring-avatars';
import {
  primaryBlue,
  primaryJade,
  primaryPurple,
  primaryYello,
} from '../../../common';

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

export default function User({ title, username, count }) {
  const num = Math.floor(Math.random() * 10);
  return (
    <div className="flex flex-row items-center gap-2 pt-4 px-5">
      {!username ? (
        <div className="w-[36px] h-[36px] rounded-full bg-gray-100" />
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
      <div className="flex flex-row caption gap-1 items-center">
        {!username ? (
          <div className="w-32 h-[36px] bg-gray-100 rounded-sm" />
        ) : (
          <div>{nickname[num]}</div>
        )}
      </div>
    </div>
  );
}
