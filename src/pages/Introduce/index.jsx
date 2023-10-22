import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CarouselBox from './components/CarouselBox';

export default function Introduce() {
  const { idx } = useParams();
  const [searchParams] = useSearchParams();
  const isSubmitted = searchParams.get('submit'); // 1 == 상품 등록 후
  const navigate = useNavigate();
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
    console.log(goods, idx, isSubmitted);
  }, [goods]);

  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      <CarouselBox />

      {isSubmitted && <div>등록 완료</div>}
    </div>
  );
}
