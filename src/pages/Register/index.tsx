import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RegisterDataType } from '@src/types/register';
import ChevronLeft from '@src/asset/icon/chevronLeft.svg';
import { vaildRegister } from '@src/utils';

export const initData: RegisterDataType = {
  image: [],
  imageInput: [],
  address: '',
  goodsDto: {
    goodsName: '',
    boardContent: '',
    introduction: '',
    link: '',
    goodsPrice: 0,
    deliveryFee: 0,
    goodsLimitCount: 0,
    goodsLimitTime: new Date(),
    categoryId: -1,
  },
  position: {
    lat: 0,
    lng: 0,
  },
};

function Register() {
  const [data, setData] = useState(initData);
  const location = useLocation();
  const navigate = useNavigate();

  const withoutPadding = location.pathname.includes('confirm');

  const handleBackward = () => {
    // navigate(-1);
    if (location.pathname === '/register') navigate('/');
    else if (location.pathname === '/register/detail') navigate('/register');
    else if (location.pathname === '/register/link')
      navigate('/register/detail');
    else if (location.pathname === '/register/cost') navigate('/register/link');
    else if (location.pathname === '/register/deadline')
      navigate('/register/link');
    else if (location.pathname === '/register/place')
      navigate('/register/deadline');
    else if (location.pathname === '/register/notice')
      navigate('/register/place');
    else if (location.pathname === '/register/confirm')
      navigate('/register/notice');
  };

  // 데이터의 유효성 확인하여 입력 데이터가 없는 페이지로 이동
  useEffect(() => {
    // console.log(location.pathname);
    const url = vaildRegister(location.pathname, data);
    if (url !== undefined) navigate(url);
  }, [location]);

  // 마운트 이벤트 시 폼 초기화
  useEffect(() => {
    setData(initData);
    setData((prev) => ({ ...prev, image: [], imageInput: [] }));

    return () => {
      setData(initData);
      setData((prev) => ({ ...prev, image: [], imageInput: [] }));
    };
  }, []);

  return (
    <>
      <div className="relative z-10 mx-auto flex h-[48px] w-full max-w-screen-sm flex-row items-center px-4">
        <div onClick={handleBackward} className="pr-2">
          <img
            className="size-12 cursor-pointer p-2"
            src={ChevronLeft}
            alt="뒤로가기"
          />
        </div>
      </div>

      <div
        className={`container mx-auto max-w-screen-sm ${withoutPadding ? 'absolute top-0' : 'px-4'}`}
      >
        <Outlet context={{ data, setData }} />
      </div>
    </>
  );
}

export default Register;
