import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../asset/images/login/login_logo.png';

export default function NotMatch() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      <div className="h-[100svh] flex flex-col justify-evenly px-4">
        <div className="text-sm text-center">
          <img src={logo} className="max-w-[210px] w-full mx-auto py-4" />
          <p>옳바른 접근이 아닙니다.</p>
        </div>
        <div
          className="max-w-[320px] w-full bg-primaryJade rounded mx-auto text-center py-4 active:scale-[99%] transition-all cursor-pointer"
          onClick={() => navigate('/')}
        >
          홈으로 바로가기
        </div>
      </div>
    </div>
  );
}
