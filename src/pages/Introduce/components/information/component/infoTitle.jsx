import React from 'react';
import { Link } from 'react-router-dom';
import InfoContent from './infoContent';

export default function InfoTitle({
  link,
  goodsPrice,
  deliveryFee,
  orderCount,
}) {
  return (
    <div className="flex flex-col my-[12px] place-content-center">
      <div className="w-[343px] mb-[16px] text-left align-middle text-gray-950 font-bold">
        상품 정보
      </div>
      <Link
        className="w-[343px] h-[92px] mb-[16px] text-[18px] font-bold text-gray-950"
        to={link}
      >
        상품 페이지 이동
      </Link>
      <div className="w-[343px] font-normal text-gray950 text-[146x]">
        <div>구매가 : {goodsPrice} 원</div>
        <div>
          배송비 : {deliveryFee}원 / {orderCount}명 분할 중
        </div>
        <div>보증금 : 7,500 원</div>
      </div>
      <InfoContent />
    </div>
  );
}
