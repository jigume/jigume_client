import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ChevronLeft from '@src/asset/icon/chevronLeft.svg';
import { InitUserType } from './index.d';

export default function Init() {
  const navigate = useNavigate();
  const [initUser, setInitUser] = useState<InitUserType>({
    nickname: '',
    position: undefined,
    image: undefined,
    agreement: new Array(4).fill(false),
  });
  const location = useLocation();

  const submitable = () => {
    if (initUser.submitUser && location.pathname.includes('image')) return true;
    return false;
  };

  return (
    <div className="container mx-auto mt-12 h-[calc(100svh-48px)] max-w-screen-sm">
      <div className="absolute left-1/2 top-0 mx-auto flex h-[48px] w-full max-w-screen-sm -translate-x-1/2 flex-row items-center bg-white px-4">
        <div className="flex w-full justify-between">
          <div onClick={() => navigate(-1)} className="pr-2">
            <img className="size-[32px]" src={ChevronLeft} alt="뒤로가기" />
          </div>
          {submitable() && (
            <button className="pt-1" onClick={initUser.submitUser}>
              건너뛰기
            </button>
          )}
        </div>
      </div>
      <Outlet context={{ initUser, setInitUser }} />
    </div>
  );
}
