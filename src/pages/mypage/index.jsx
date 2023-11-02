import React from 'react';
import { useResetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { authState } from '../../recoil';
import { kakaoLogout } from '../../api/user';

export default function Mypage() {
  const resetAuth = useResetRecoilState(authState);

  const logout = useMutation('logout', () => kakaoLogout(), {
    onMutate: () => console.log('RUN logout'),
    onSuccess: () => {
      resetAuth();
      console.log('SUCCESS logout');
    },
  });

  return (
    <div>
      Mypage
      <button
        className='
        className="h-12 text-md active:disabled:scale-100" w-full rounded-lg p-3 text-center text-red-600 transition-all duration-300 ease-in-out active:scale-[99%] disabled:bg-gray-300'
        onClick={() => resetAuth()}
      >
        로그아웃
      </button>
    </div>
  );
}
