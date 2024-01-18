import React from 'react';
import User from './User';

export default function CommentsContent() {
  return (
    <div className="container mx-auto max-w-screen-sm mt-8 bg-white">
      <div className="border-b-2 border-gray-100 px-5 py-5 font-medium text-[14px]">
        댓글
      </div>
      <User />
      <div className="text-[14px] px-5">
        <div className="flex flex-row m-4 pl-7">
          현대수산 앞 맞죠?? 저는 10일이든 13일이든 6시 이후기만 하면 시간 다
          괜찮습니다.
        </div>
        <div className="flex flex-row m-4 pl-7">
          <div className="align-middle p-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 1.5V5.26125L9 6L1.5 6.73875V10.5L11.25 6L1.5 1.5Z"
                fill="#858899"
              />
            </svg>
          </div>
          <div className="align-middle text-gray-600">답글달기</div>
        </div>
        <div className="m-4 pl-7 align-middle text-gray-600 text-cyan-400 font-medium">
          이전 답글 n개 더보기
        </div>
      </div>
      <div className="mt-24"> </div>
    </div>
  );
}
