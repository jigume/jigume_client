import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import ChevronLeft from '../../asset/icon/chevron-left.svg';
import { vaildRegister } from '../../utils';

const initData = {
  image: [],
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
    category: -1,
  },
};

function Register() {
  /** @type {[
   * {
   * image: any[]
   * address: string
   *  goodsDto: {
   *    goodsName: string
   *    boardContent: string
   *    introduction: string
   *    link: string
   *    goodsPrice: number
   *    deliveryFee: number
   *    mapX: number | undefined
   *    mapY: number | undefined
   *    goodsLimitCount: number
   *    goodsLimitTime: Date
   *    category: number
   *  }
   * }
   * ]} 등록할 상품 정보  */
  const [data, setData] = useState(initData);
  const location = useLocation();
  const navigate = useNavigate();

  // 데이터의 유효성 확인하여 입력 데이터가 없는 페이지로 이동
  useEffect(() => {
    const url = vaildRegister(location.pathname, data);
    if (url !== undefined) navigate(url);
  }, [location]);

  return (
    <>
      <div className="w-full h-[48px] px-4 flex flex-row items-center">
        <div onClick={() => navigate(-1)} className="pr-2">
          <img className="w-[32px] h-[32px]" src={ChevronLeft} />
        </div>
      </div>

      <div className="container mx-auto max-w-screen-sm px-4">
        <Outlet context={{ data, setData }} />
      </div>
    </>
  );
}

export default Register;
