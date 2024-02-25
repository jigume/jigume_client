import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import { authState } from '../../../data';
import { kakaoLogout } from '../../../api/user';

import EditIcon from '../../../asset/icon/EditIconBlack.svg';
import chevronLeftBlue from '../../../asset/icon/chevronLeftBlue.svg';
import ProgressLead from './ProgressLead';
import ProgressJoin from './ProgressJoin';
import { MyPageContextType } from '../index.d';

export default function Profile() {
  const navigate = useNavigate();
  const resetAuth = useResetRecoilState(authState);
  const { setProfileHeader, profile, isSuccess } =
    useOutletContext<MyPageContextType>();

  const logout = useMutation('logout', () => kakaoLogout(), {
    onMutate: () => console.log('RUN logout'),
    onSuccess: () => {
      resetAuth();
      console.log('SUCCESS logout');
    },
  });

  useEffect(() => {
    setProfileHeader({ title: '마이페이지', isAlert: true });
  }, []);

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between gap-4 pb-8 pt-4">
        <div className="flex items-center gap-4">
          {isSuccess ? (
            <img
              className="size-14 rounded-full bg-zinc-300 text-[0px]"
              src={profile.profileImgUrl}
              alt="프로필 이미지"
            />
          ) : (
            <div className="size-14 animate-pulse rounded-full bg-zinc-300" />
          )}

          <div>
            <div className="flex items-center text-base">
              {isSuccess ? (
                <span>{profile.nickname}</span>
              ) : (
                <div className="inline-block h-4 w-14 animate-pulse rounded-sm bg-zinc-300" />
              )}
              <img
                aria-hidden
                onClick={() => navigate('/mypage/edit')}
                className="inline-block aspect-square cursor-pointer pb-1 pl-1 active:scale-75"
                src={EditIcon}
                alt="프로필 수정"
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
        <Link to="/mypage/lead">
          <span className="text-sm font-light text-primaryBlue">내역 상세</span>
          <img
            className="inline-block w-6 pb-[1px]"
            src={chevronLeftBlue}
            alt="상세 내역 확인"
          />
        </Link>
      </div>
      <div className="h-[1px] w-full bg-zinc-200" />
      <ProgressLead />

      <div className="flex justify-between py-1">
        <div className="text-lg text-zinc-900">구매 참여 내역</div>
        <Link to="/mypage/join">
          <span className="text-sm font-light text-primaryBlue">내역 상세</span>
          <img
            className="inline-block w-6 pb-[1px]"
            src={chevronLeftBlue}
            alt="상세 내역 확인"
          />
        </Link>
      </div>
      <div className="h-[1px] w-full bg-zinc-200" />
      <ProgressJoin />
    </div>
  );
}
