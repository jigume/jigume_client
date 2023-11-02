import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { StaticMap } from 'react-kakao-maps-sdk';
import CarouselBox from './components/CarouselBox';
import HeaderProfile from './components/HeaderProfile';
import ProductInfo from './components/ProductInfo';
import ProductContent from './components/ProductContent';
import IntroStaticMap from './components/IntroStaticMap';
import ChevronLeft from '../../asset/icon/chevron-left.svg';
import getIntroduce from '../../api/introduce';

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

  // const data = useQuery('itemDetail', () => getIntroduce(idx), {
  //   onSuccess: (res) => {
  //     console.log(res);
  //   },
  //   onError: () => navigate('/err'),
  // });

  return (
    <div
      className={`container mx-auto h-[100svh] w-full max-w-screen-sm overflow-y-scroll px-0 pb-20 ${
        isSubmitted ? 'touch-none overflow-hidden' : ''
      }`}
    >
      <div
        onClick={() => navigate(-1)}
        className="absolute top-0 z-50 pr-2 pt-2"
      >
        <img className="h-12 w-12 cursor-pointer p-2" src={ChevronLeft} />
      </div>
      <CarouselBox />

      <div className="px-4">
        <HeaderProfile />
        <ProductInfo />
        <ProductContent />
      </div>

      <div className="px-4 pt-12">
        <div className="pb-5 text-xl font-bold">
          잠깐! 이것만은 꼭 확인하고 가세요
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 rounded-xl bg-gray-50 p-4">
            {/* <div className="aspect-[1.9197] w-full animate-pulse rounded-xl bg-gray-300" /> */}
            <div className="relative aspect-[1.9197] w-full rounded-xl bg-gray-300">
              <IntroStaticMap />
            </div>
            <div className="mx-auto h-3 w-4/5 animate-pulse rounded-lg bg-gray-300" />
          </div>

          <div className="rounded-xl bg-gray-50 p-6">
            <div className="mx-auto h-3 w-3/4 animate-pulse rounded-lg bg-gray-300" />
          </div>

          <div className="rounded-xl bg-gray-50 p-6">
            <div className="mx-auto h-3 w-full animate-pulse rounded-lg bg-gray-300" />
          </div>

          <div className="rounded-xl bg-gray-50 p-6 text-center leading-7">
            <p>
              3자 에스크로 방식 결제로 안전하게 거래할 수 있어요.
              <br />
              환불 및 취소가 어려우니, 신중하게 참여해주세요.
            </p>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
