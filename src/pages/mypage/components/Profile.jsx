import { useNavigate, useOutletContext } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import { authState } from '../../../recoil';
import { kakaoLogout } from '../../../api/user';
import getProfile from '../../../api/mypage';
import EditIcon from '../../../asset/icon/EditIconBlack.svg';
import chevronLeftBlue from '../../../asset/icon/chevronLeftBlue.svg';
import ProgressLead from './ProgressLead';
import ProgressJoin from './ProgressJoin';

export default function Profile() {
  const navigate = useNavigate();
  const resetAuth = useResetRecoilState(authState);

  const { setTitle } = useOutletContext();

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

  useEffect(() => {
    setTitle('마이페이지');
  }, []);

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between gap-4 pb-8 pt-4">
        <div className="flex items-center gap-4">
          <img className="h-14 w-14 rounded-full bg-zinc-300" />
          <div>
            <div className="text-base">
              <span>졸린 춘식이</span>
              <img
                aria-hidden
                onClick={() => navigate('/mypage/edit')}
                className="inline-block aspect-square cursor-pointer pb-1 pl-1 active:scale-75"
                src={EditIcon}
              />
            </div>
            <div className="text-sm text-zinc-500">아직은 공동구매 새싹이</div>
          </div>
        </div>
        <button
          className="rounded-lg bg-[#E8E8EE] px-3 py-2 text-sm"
          onClick={() => resetAuth()}
        >
          로그아웃
        </button>
      </div>

      <div className="py-2">
        <div className="text-zinc-500">활동</div>
      </div>

      <div className="flex justify-between py-1">
        <div className="text-lg text-zinc-900">구매 리드 내역</div>
        <div>
          <span className="text-sm font-light text-primaryBlue">내역 상세</span>
          <img className="inline-block w-6 pb-[1px]" src={chevronLeftBlue} />
        </div>
      </div>
      <div className="h-[1px] w-full bg-zinc-200" />
      <ProgressLead />

      <div className="flex justify-between py-1">
        <div className="text-lg text-zinc-900">구매 참여 내역</div>
        <div>
          <span className="text-sm font-light text-primaryBlue">내역 상세</span>
          <img className="inline-block w-6 pb-[1px]" src={chevronLeftBlue} />
        </div>
      </div>
      <div className="h-[1px] w-full bg-zinc-200" />
      <ProgressJoin />
    </div>
  );
}
