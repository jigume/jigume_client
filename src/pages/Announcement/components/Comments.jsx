import React from 'react';
import UserName from '../../Introduce/components/titleBox/components/userName';
import UserImage from '../../Introduce/components/titleBox/components/userImage';
import CommentsContent from './CommentsContent';
import SendIcon from '../../../asset/icon/SendIcon.svg';
// import SendIcon from '../../../../../asset/icon/SendIcon.svg';

export default function Comments() {
  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      <div className="flex flex-row pb-[20px] mb-[12px] place-content-center">
        <UserImage />
        <div className="flex flex-col justify-center">
          <div className="flex flex-row w-[297px] h-[36px]">
            <UserName />
          </div>
          <div className="flex flex-row w-[297px]">
            <CommentsContent />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-[16px] pb-[16px]">
        <form className="flex flex-col w-[343px] px-[12px] py-[8px] border-[1px] rounded-[8px]">
          <div className="flex place-content-center">
            <input
              placeholder="댓글을 입력하세요"
              className="flex w-[270px] mr-[12px] items-center bg-slate-50 border-none"
            />
            <button
              className="flex w-[37px] justify-center items-center h-[36px] bg-gray100 rounded-[8px]"
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
