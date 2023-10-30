import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChevronLeft from '../../../../asset/icon/chevron-left.svg';

export default function Init() {
  const navigate = useNavigate();
  const [initUser, setInitUser] = useState({
    nickname: '',
    position: undefined,
    image: undefined,
  });
  return (
    <div className="container mx-auto mt-[48px] flex h-[calc(100svh-48px)] max-w-screen-sm flex-col justify-between px-4 py-6">
      <div className="fixed left-0 top-0 flex h-[48px] w-full flex-row items-center bg-white px-[1rem]">
        <div onClick={() => navigate(-1)} className="pr-2">
          <img className="h-[32px] w-[32px]" src={ChevronLeft} />
        </div>
      </div>
      <Outlet context={{ initUser, setInitUser }} />
    </div>
  );
}
