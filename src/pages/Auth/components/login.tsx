import { useRecoilState } from 'recoil';
import { AuthType } from '@src/types/data';
import logo from '@src/asset/images/login/login_logo.png';
import kakaoImg from '@src/asset/images/login/kakao_login.png';
import naverImg from '@src/asset/images/login/naver_login.png';
import { authState } from '@src/data';
import { useEffect } from 'react';

export default function Login() {
  const KAKAO_KEY = import.meta.env.VITE_KAKAO_REST_KEY;
  const NAVER_KEY = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_SECRET = import.meta.env.VITE_NAVER_SECRET;
  const REDIRECT_URI = import.meta.env.DEV
    ? 'http://localhost:5173/auth'
    : 'https://www.jigume.site/auth';

  const [, setAuth] = useRecoilState<AuthType>(authState);

  const handleKakaoLogin = async () => {
    setAuth((prev) => ({
      ...prev,
      domain: 'kakao',
    }));
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URI}`;
  };

  const handleNaverLogin = async () => {
    setAuth((prev) => ({
      ...prev,
      domain: 'naver',
    }));
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_KEY}&state=${NAVER_SECRET}&redirect_uri=${REDIRECT_URI}`;
  };

  useEffect(() => {
    fetch('/api/check').then((res) => console.log(res));
  }, []);

  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      <div className="flex h-svh flex-col justify-evenly px-4">
        <div className="flex flex-col gap-5">
          <img src={logo} className="mx-auto max-w-[210px]" alt="JIGUME" />
          <p className="text-center font-light">
            한 명만 모여도 추가 배송비가 내려가는,
            <br /> 제주도만의 지도 공동구매 플랫폼
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div role="button" onClick={handleNaverLogin}>
            <img
              src={naverImg}
              className="mx-auto w-full active:opacity-80"
              alt="네이버 로그인"
            />
          </div>
          <div role="button" onClick={handleKakaoLogin}>
            <img
              src={kakaoImg}
              className="mx-auto w-full active:opacity-80"
              alt="카카오 로그인"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
