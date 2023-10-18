import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChevronLeft from '../../../../asset/icon/chevron-left.svg';

export default function Init() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  return (
    <div className="h-[calc(100svh-48px)] container mx-auto max-w-screen-sm px-4 mt-[48px] py-6 flex flex-col justify-between">
      <div className="w-full h-[48px] px-[1rem] flex flex-row items-center fixed top-0 left-0 bg-white">
        <div onClick={() => navigate(-1)} className="pr-2">
          <img className="w-[32px] h-[32px]" src={ChevronLeft} />
        </div>
      </div>
      <Outlet context={{ nickname, setNickname }} />
    </div>
  );
}
