import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import CarouselBox from './components/CarouselBox';
import HeaderProfile from './components/HeaderProfile';
import ProductInfo from './components/ProductInfo';
import ProductContent from './components/ProductContent';

export default function Introduce() {
  const { idx } = useParams();
  const location = useLocation();

  const isSubmitted = location.pathname.includes('submitted');

  const [goods, setGoods] = useState({
    name: '',
    link: '',
    goodsPrice: '',
    deliveryFee: '',
    orderCount: '',
    introduction: '',
    nickName: '',
    goodsLimitTime: '',
  });

  useEffect(() => {
    console.log(goods, idx);
  }, [goods]);

  return (
    <div
      className={`w-full container mx-auto max-w-screen-sm px-0 ${
        isSubmitted ? 'h-[100svh] overflow-hidden touch-none' : ''
      }`}
    >
      <CarouselBox />

      <div className="px-4">
        <HeaderProfile />
        <ProductInfo />
        <ProductContent />
      </div>

      {/* 등록완료 이벤트 */}
      <Outlet />
    </div>
  );
}
