import React from 'react';

export default function User() {
  return (
    <div className="flex flex-row pb-[20px] mb-[12px] place-content-center">
      <div className="flex flex-col justify-center w-[36px] h-[36px] mr-[12px] rounded-[18px] text-center bg-gray100">
        image
      </div>
      <div className="flex flex-row w-[295px]">
        <div className="flex flex-col justify-center text-center pr-[1px] text-gray950">
          <div>졸린 춘식이 | </div>
        </div>
        <div className="flex flex-col justify-center text-center text-gray600">
          <div>6번째 구매 리드</div>
        </div>
      </div>
      {/* <div>leadCount</div> */}
    </div>
  );
}
