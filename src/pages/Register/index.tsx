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
    mapX: undefined,
    mapY: undefined,
    goodsLimitCount: 0,
    goodsLimitTime: new Date(),
    categoryId: -1,
  },
};

function Register() {
  const [data, setData] = useState(initData);
  const location = useLocation();
  const navigate = useNavigate();

  // 데이터의 유효성 확인하여 입력 데이터가 없는 페이지로 이동
  // useEffect(() => {
  //   const url = vaildRegister(location.pathname, data);
  //   if (url !== undefined) navigate(url);
  // }, [location]);

  // 마운트 이벤트 시 폼 초기화
  useEffect(() => {
    setData(initData);
    return () => {
      console.log('unmount');
      setData(initData);
    };
  }, []);

  return (
    <>
      <div className="mx-auto flex h-[48px] w-full max-w-screen-sm flex-row items-center px-4">
        <div
          onClick={() =>
            location.pathname === '/register' ? navigate('/') : navigate(-1)
          }
          className="pr-2"
        >
          <img
            className="size-12 cursor-pointer p-2"
            src={ChevronLeft}
            alt="뒤로가기"
          />
        </div>
      </div>

      <div className="container mx-auto max-w-screen-sm px-4">
        <Outlet context={{ data, setData }} />
      </div>
    </>
  );
}

export default Register;
