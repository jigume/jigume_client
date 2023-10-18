import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function InitUser() {
  const navigate = useNavigate();
  const { nickname, setNickname } = useOutletContext();

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };
  return (
    <>
      <div>
        <div className="pb-3">닉네임을 알려주세요.</div>
        <div className="flex flex-row justify-between">
          <input
            type="text"
            placeholder="입력해 주세요"
            value={nickname}
            onChange={handleNickname}
            maxLength={20}
            className="mt-1 block w-full py-3 pl-3 pr-16 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-success focus:ring-1 focus:ring-success disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          />
          <div className="text-gray-500 absolute right-7 translate-y-[calc(50%+2px)]">
            {nickname.length}/20
          </div>
        </div>
      </div>

      <button
        disabled={!nickname.length}
        className="bg-success text-white text-center w-full text-md p-3 rounded-lg active:scale-[99%] transition-all ease-in-out duration-300 disabled:bg-gray-300 active:disabled:scale-100"
        onClick={() => navigate('/auth/init/address')}
      >
        다음으로 넘어가기
      </button>
    </>
  );
}
