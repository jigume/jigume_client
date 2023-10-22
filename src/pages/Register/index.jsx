import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChevronLeft from '../../asset/icon/chevron-left.svg';

function Register() {
  const navigate = useNavigate();
  /** @type {[
   * {
   * image: any[]
   * address: string
   *  goodsDto: {
   *    goodsId: number
   *    name: string
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
   *    realDeliveryFee: number
   *    end: boolean
   *  }
   * }
   * ]} 등록할 상품 정보  */
  const [data, setData] = useState({
    image: [],
    address: '',
    goodsDto: {
      goodsId: 0,
      name: '',
      boardContent: '',
      introduction: '',
      link: '',
      goodsPrice: 0,
      deliveryFee: 0,
      mapX: undefined,
      mapY: undefined,
      goodsLimitCount: 0,
      goodsLimitTime: new Date(),
      category: 0,
      realDeliveryFee: 0,
      end: true,
    },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="w-full h-[48px] px-[1rem] flex flex-row items-center">
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
