import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation, useParams } from 'react-router-dom';
import CarouselBox from './components/CarouselBox';
import HeaderProfile from './components/HeaderProfile';
import ProductInfo from './components/ProductInfo';
import ProductContent from './components/ProductContent';
import ChevronLeft from '../../asset/icon/chevron-left.svg';

export default function Introduce() {
  const { idx } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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
      <div
        onClick={() => navigate(-1)}
        className="pr-2 absolute top-0 z-50 pt-2"
      >
        <img className="w-12 h-12 p-2 cursor-pointer" src={ChevronLeft} />
      </div>
      <CarouselBox />

      <div className="px-4">
        <HeaderProfile />
        <ProductInfo />
        <ProductContent />
      </div>

      <div className="px-4 pt-12">
        <div className="font-bold text-xl pb-5">
          잠깐! 이것만은 꼭 확인하고 가세요
        </div>

        <div className="flex flex-col gap-2">
          <div className="p-4 bg-gray-50 rounded-xl flex flex-col gap-4">
            <div className="bg-gray-300 w-full aspect-[1.9197] rounded-xl animate-pulse" />
            <div className="w-3/4 h-3 mx-auto bg-gray-300 rounded-lg animate-pulse" />
          </div>
          <div className="p-4 bg-gray-300" />
        </div>
      </div>

      {/* 등록완료 이벤트 */}
      <Outlet />
    </div>
  );
}
