import React from 'react';
import InfoTitle from './component/infoTitle';
import InfoContent from './component/infoContent';

export default function Information({
  link,
  goodsPrice,
  deliveryFee,
  orderCount,
  introduction,
}) {
  return (
    <div className="flex flex-col place-content-center px-6">
      <InfoTitle
        link={link}
        goodsPrice={goodsPrice}
        deliveryFee={deliveryFee}
        orderCount={orderCount}
        introduction={introduction}
      />
      <InfoContent introduction={introduction} />
    </div>
  );
}
