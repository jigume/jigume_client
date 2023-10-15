import React from 'react';
import { useRecoilState } from 'recoil';
import logo from '../../asset/images/login/login_logo.png';
import kakaoLogin from '../../asset/images/login/kakao_login.png';
import userState from '../../recoli/userState';

export default function Login() {
  const [, setUser] = useRecoilState(userState);
  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      <div className="h-[100svh] flex flex-col justify-around px-4">
        <div className="flex flex-col gap-5">
          <img src={logo} className="mx-auto" />
          <p className="text-center font-light">
            한 명만 모여도 추가 배송비가 내려가는,
            <br /> 제주도만의 지도 공동구매 플랫폼
          </p>
        </div>
        {/* login button */}
        <div
          role="button"
          onClick={() =>
            setUser((prev) => {
              return {
                ...prev,
                role: 'USER',
              };
            })
          }
          aria-hidden
        >
          <img src={kakaoLogin} className="active:opacity-80" />
        </div>
      </div>
    </div>
  );
}
