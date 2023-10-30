import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../asset/images/login/login_logo.png';

export default function NotMatch() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      <div className="flex h-[100svh] flex-col justify-evenly px-4">
        <div className="text-center text-sm">
          <img src={logo} className="mx-auto w-full max-w-[210px] py-4" />
          <p>옳바른 접근이 아닙니다.</p>
        </div>
        <div
          className="mx-auto w-full max-w-[320px] cursor-pointer rounded bg-success py-4 text-center text-white transition-all active:scale-[99%]"
          onClick={() => navigate('/')}
        >
          홈으로 바로가기
        </div>
      </div>
    </div>
  );
}
