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
        className="h-12 text-red-600 text-center w-full text-md p-3 rounded-lg active:scale-[99%] transition-all ease-in-out duration-300 disabled:bg-gray-300 active:disabled:scale-100"'
        onClick={logout.mutate}
      >
        로그아웃
      </button>
    </div>
  );
}
