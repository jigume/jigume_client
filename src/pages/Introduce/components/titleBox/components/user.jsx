import React from 'react';
import UserName from './userName';
import UserImage from './userImage';

export default function User() {
  return (
    <div className="flex flex-row pb-[20px] mb-[12px] place-content-center">
      <UserImage />
      <div className="flex flex-row w-[295px] text-[14px]">
        <UserName />
        <div className="flex flex-col justify-center text-center text-gray-600 pl-[3px] text-[14px]">
          <div>| 6번째 구매 리드</div>
        </div>
      </div>
      {/* <div>leadCount</div> */}
    </div>
  );
}
