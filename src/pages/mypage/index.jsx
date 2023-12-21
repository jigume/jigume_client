import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useResetRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import { authState } from '../../recoil';
import { kakaoLogout } from '../../api/user';
import MyPageHeader from './components/MyPageHeader';
import getProfile from '../../api/mypage';

export default function Mypage() {
  const resetAuth = useResetRecoilState(authState);

  const logout = useMutation('logout', () => kakaoLogout(), {
    onMutate: () => console.log('RUN logout'),
    onSuccess: () => {
      resetAuth();
      console.log('SUCCESS logout');
    },
  });

  // useQuery를 사용하여 fetch 함수 실행 (getProfile)
  const { data: profile } = useQuery('getProfile', () => getProfile(), {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <>
      <MyPageHeader />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 p-4">
          <img className="h-14 w-14 rounded-xl bg-zinc-300" />
          <div>
            <div className="text-base">졸린 춘식이 &gt;</div>
            <div className="text-sm text-zinc-500">아직은 공동구매 새싹이</div>
          </div>
        </div>

        <div className="p-4">
          <div className="text-zinc-700">활동</div>
        </div>

        <div className="p-4">
          <div className="text-lg text-zinc-900">판매내역</div>
        </div>
        <div className="h-[1px] w-full bg-zinc-200" />
        <div className="p-4">
          <div className="text-lg text-zinc-900">구매내역</div>
        </div>
        <div className="h-[1px] w-full bg-zinc-200" />

        <button
          className='
        className="h-12 text-md active:disabled:scale-100" w-full rounded-lg p-3 text-center text-red-600 transition-all duration-300 ease-in-out active:scale-[99%] disabled:bg-gray-300'
          onClick={() => resetAuth()}
        >
          로그아웃
        </button>
      </div>
    </>
  );
}
