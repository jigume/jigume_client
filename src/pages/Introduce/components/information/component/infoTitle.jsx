import React from 'react';
import InfoContent from './infoContent';

export default function InfoTitle() {
  return (
    <div className="flex flex-col my-[12px] place-content-center">
      <div className="w-[343px] mb-[16px] text-left align-middle font-medium text-gray950 font-normal">
        상품 정보
      </div>
      <div className="w-[343px] h-[92px] mb-[16px] text-[18px] font-bold text-gray950">
        링크
      </div>
      <div className="w-[343px] font-normal text-gray950 text-[146x]">
        <div>구매가 : 29,900 원</div>
        <div>배송비 : 7,500 원 / 5명 분할 중</div>
        <div>보증금 : 7,500 원</div>
      </div>
      <InfoContent />
    </div>
  );
}
