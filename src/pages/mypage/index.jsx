import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useResetRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import { authState } from '../../recoil';
import { kakaoLogout } from '../../api/user';
import MyPageHeader from './components/MyPageHeader';
import getProfile from '../../api/mypage';
import EditIcon from '../../asset/icon/EditIconBlack.svg';
import chevronLeftBlue from '../../asset/icon/chevronLeftBlue.svg';
import ProgressLead from './components/ProgressLead';
import ProgressJoin from './components/ProgressJoin';

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
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 p-4">
          <img className="h-14 w-14 rounded-full bg-zinc-300" />
          <div>
            <div className="text-base">
              <span>졸린 춘식이</span>
              <img className="inline-block pb-1 pl-1" src={EditIcon} />
            </div>
            <div className="text-sm text-zinc-500">아직은 공동구매 새싹이</div>
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="text-zinc-700">활동</div>
        </div>

        <div className="flex justify-between px-4 py-2">
          <div className="text-lg text-zinc-900">구매 리드 내역</div>
          <div>
            <span className="text-base font-light text-primaryBlue">
              내역 상세
            </span>
            <img className="inline-block w-6 pb-[1px]" src={chevronLeftBlue} />
          </div>
        </div>
        <div className="h-[1px] w-full bg-zinc-200" />

        <div className="px-4 py-2">
          <div>공동 구매 리드 진행 중</div>
          <ProgressLead />
        </div>

        <div className="flex justify-between px-4 py-2">
          <div className="text-lg text-zinc-900">구매 참여 내역</div>
          <div>
            <span className="text-base font-light text-primaryBlue">
              내역 상세
            </span>
            <img className="inline-block w-6 pb-[1px]" src={chevronLeftBlue} />
          </div>
        </div>
        <div className="h-[1px] w-full bg-zinc-200" />

        <div className="px-4 py-2">
          <div>공동 구매 참여 중</div>
          <ProgressJoin />
        </div>

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
