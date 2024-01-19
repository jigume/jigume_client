import React from 'react';
import SendIcon from '../../../asset/icon/SendIcon.svg';
// import SendIcon from '../../../../../asset/icon/SendIcon.svg';

export default function CommentsInput() {
  return (
    <div className="container fixed inset-x-0 bottom-0 mx-auto max-w-screen-sm border-t-2 border-gray-100 bg-white p-6 pt-3">
      <form className="flex w-auto flex-col rounded-[8px] border-[1px] px-[12px] py-[8px]">
        <div className="flex place-content-center">
          <input
            placeholder="댓글을 입력하세요"
            className="mr-[12px] flex w-[270px] items-center border-none"
          />
          <button
            className="flex h-[36px] w-[37px] items-center justify-center rounded-[8px] bg-gray-100"
            type="submit"
          >
            <img src={SendIcon} alt="검색" />
          </button>
        </div>
      </form>
    </div>
  );
}
