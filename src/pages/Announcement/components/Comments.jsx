import React from 'react';
import CommentsContent from './CommentsContent';
import SendIcon from '../../../asset/icon/SendIcon.svg';
// import SendIcon from '../../../../../asset/icon/SendIcon.svg';

export default function Comments() {
  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      <div className="mb-[12px] flex flex-row place-content-center pb-[20px]">
        {/* <UserImage /> */}
        <div className="flex flex-col justify-center">
          <div className="flex h-[36px] w-[297px] flex-row">
            {/* <UserName /> */}
          </div>
          <div className="flex w-[297px] flex-row">
            <CommentsContent />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-[16px] pb-[16px]">
        <form className="flex w-[343px] flex-col rounded-[8px] border-[1px] px-[12px] py-[8px]">
          <div className="flex place-content-center">
            <input
              placeholder="댓글을 입력하세요"
              className="mr-[12px] flex w-[270px] items-center border-none bg-slate-50"
            />
            <button
              className="flex h-[36px] w-[37px] items-center justify-center rounded-[8px] bg-gray-100"
              type="submit"
            >
              <img src={SendIcon} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
