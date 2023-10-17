import React from 'react';
import logo from '../../asset/images/login/login_logo.png';
import kakaoLogin from '../../asset/images/login/kakao_login.png';

export default function Login() {
  // kakao oauth
  const handleLogin = async () => {
    const REST_API_KEY = import.meta.env.VITE_KAKAO_JS_KEY;
    const REDIRECT_URI = 'http://localhost:5173/auth';
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

    window.location.href = url;
  };

  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      <div className="h-[100svh] flex flex-col justify-evenly px-4">
        <div className="flex flex-col gap-5">
          <img src={logo} className="mx-auto sm:max-w-[320px]" />
          <p className="text-center font-light">
            한 명만 모여도 추가 배송비가 내려가는,
            <br /> 제주도만의 지도 공동구매 플랫폼
          </p>
        </div>

        {/* login button */}
        <div role="button" onClick={handleLogin}>
          <img
            src={kakaoLogin}
            className="active:opacity-80 sm:max-w-[320px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
