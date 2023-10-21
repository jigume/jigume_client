import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import StyledCurrencyInput from '../../../../components/StyledCurrencyInput';
import NextButton from '../../../../components/NextButton';

function ProductAmount() {
  /** @type {{data:{
   * boardContent: string
   *  goodsDto: {
   *    goodsId: number
   *    name: string
   *    introduction: string
   *    link: string
   *    goodsPrice: number
   *    deliveryFee: number
   *    position: {lat: number, lng: number} | undefined
   *    goodsLimitCount: number
   *    goodsLimitTime: Date
   *    category: number
   *    realDeliveryFee: number
   *    end: boolean
   *  }
   * }}} 등록할 상품 정보  */
  const { data, setData } = useOutletContext();

  const handleProductCost = (value) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, goodsPrice: value },
    }));
  };

  const handleDeliveryCost = (value) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, deliveryFee: value },
    }));
  };

  const isMove = data.goodsDto.goodsPrice && data.goodsDto.deliveryFee;

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div className="text-lg font-bold pb-12">
        구매처에서 기재한 상품의 가격과
        <br />
        추가 배송료가 포함된 배송비는 얼마인가요?
        <div className="text-sm mb-2 pt-10 font-thin">상품 구매가</div>
        <StyledCurrencyInput
          value={data.goodsDto.goodsPrice}
          onChange={handleProductCost}
        />
        <div className="pt-10">
          <div className="text-sm mb-2 font-thin">
            배송비 (도서산간 비용 포함)
          </div>
          <StyledCurrencyInput
            value={data.goodsDto.deliveryFee}
            onChange={handleDeliveryCost}
          />
        </div>
      </div>

      <div className="mb-6">
        <NextButton isDisabled={!isMove} linkTo="/register/ProductDeadline" />
      </div>
    </div>
  );
}

export default ProductAmount;
