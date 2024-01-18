import React from 'react';
import SendIcon from '../../../asset/icon/SendIcon.svg';
// import SendIcon from '../../../../../asset/icon/SendIcon.svg';

export default function CommentsInput() {
  return (
    <div className="fixed bottom-0 left-0 right-0 container mx-auto max-w-screen-sm p-6 pt-3 bg-white border-t-2 border-gray-100">
      <form className="flex flex-col w-auto px-[12px] py-[8px] border-[1px] rounded-[8px]">
        <div className="flex place-content-center">
          <input
            placeholder="댓글을 입력하세요"
            className="flex w-[270px] mr-[12px] items-center border-none"
          />
          <button
            className="flex w-[37px] justify-center items-center h-[36px] bg-gray-100 rounded-[8px]"
            type="submit"
          >
            <img src={SendIcon} />
          </button>
        </div>
      </form>
    </div>
  );
}
