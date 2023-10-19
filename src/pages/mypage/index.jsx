import React from 'react';
import { useResetRecoilState } from 'recoil';
import { authState } from '../../recoil';

export default function Mypage() {
  const resetAuth = useResetRecoilState(authState);
  return (
    <div>
      Mypage
      <button
        className='
        className="h-12 text-red-600 text-center w-full text-md p-3 rounded-lg active:scale-[99%] transition-all ease-in-out duration-300 disabled:bg-gray-300 active:disabled:scale-100"'
        onClick={resetAuth}
      >
        로그아웃
      </button>
    </div>
  );
}
