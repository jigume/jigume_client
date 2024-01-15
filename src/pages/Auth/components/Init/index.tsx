import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChevronLeft from '../../../../asset/icon/chevronLeft.svg';
import { InitUserType } from './components';

export default function Init() {
  const navigate = useNavigate();
  const [initUser, setInitUser] = useState<InitUserType>({
    nickname: '',
    position: undefined,
    image: undefined,
  });

  return (
    <div className="container mx-auto mt-12 h-[calc(100svh-48px)] max-w-screen-sm">
      <div className="absolute left-1/2 top-0 mx-auto flex h-[48px] w-full max-w-screen-sm -translate-x-1/2 flex-row items-center bg-white px-4">
        <div onClick={() => navigate(-1)} className="pr-2">
          <img className="h-[32px] w-[32px]" src={ChevronLeft} alt="뒤로가기" />
        </div>
      </div>
      <Outlet context={{ initUser, setInitUser }} />
    </div>
  );
}
