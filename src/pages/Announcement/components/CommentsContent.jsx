import React from 'react';
import User from './User';
import CommentsText from './CommentsText';
import addCommentIcon from '../../../asset/icon/addCommentIcon.svg';

export default function CommentsContent() {
  return (
    <div className="container mx-auto max-w-screen-sm mt-8 bg-white">
      <div className="border-b-2 border-gray-100 px-5 py-5 font-medium text-[14px]">
        댓글 23
      </div>
      <User />
      <div className="text-[14px] px-5">
        <CommentsText />
        <div className="flex flex-row m-4 pl-7">
          <div className="align-middle p-1">
            <img src={addCommentIcon} />
          </div>
          <div className="align-middle text-gray-600">답글달기</div>
        </div>
        <div className="m-4 pl-7 align-middle text-gray-600 text-cyan-400 font-medium">
          이전 답글 1개 더보기
        </div>
      </div>
      <div className="mt-24"> </div>
    </div>
  );
}
