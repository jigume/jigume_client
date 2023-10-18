import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ChevronLeft from '../../../../../asset/icon/chevron-left.svg';

export default function InitUser() {
  const navigate = useNavigate();
  const { nickname, setNickname } = useOutletContext();

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };
  return (
    <div className="h-[calc(100svh-48px)] container mx-auto max-w-screen-sm px-4 mt-[48px] py-6">
      <div className="w-full h-[48px] px-[1rem] flex flex-row items-center fixed top-0 left-0 bg-white">
        <div onClick={() => navigate(-1)} className="pr-2">
          <img className="w-[32px] h-[32px]" src={ChevronLeft} />
        </div>
      </div>

      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="pb-3">닉네임을 알려주세요.</div>
          <div className="flex flex-row justify-between">
            <input
              type="text"
              placeholder="입력해 주세요"
              value={nickname}
              onChange={handleNickname}
              maxLength={20}
              className="mt-1 block w-full py-3 pl-3 pr-16 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            />
            <div className="text-gray-500 absolute right-7 translate-y-[calc(50%+2px)]">
              {nickname.length}/20
            </div>
          </div>
        </div>
        <div className="bg-success text-white text-center w-full text-md p-3 rounded-lg active:scale-[98%] transition-all ease-in-out duration-300">
          다음으로
        </div>
      </div>
    </div>
  );
}
