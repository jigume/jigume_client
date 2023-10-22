import React from 'react';
import { useOutletContext } from 'react-router-dom';
import StyledCurrencyInput from '../../../../components/StyledCurrencyInput';
import NextButton from '../../../../components/NextButton';

function Cost() {
  /** @type {{data:{
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

  const isMovable = data.goodsDto.goodsPrice && data.goodsDto.deliveryFee;

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div className="pb-24">
        <div className="text-lg font-bold pb-12">
          구매처에서 기재한 상품의 가격과
          <br />
          추가 배송료가 포함된 배송비는 얼마인가요?
        </div>

        <div className="pb-10">
          <div className="text-sm mb-2  font-thin">상품 구매가</div>
          <StyledCurrencyInput
            value={data.goodsDto.goodsPrice}
            onChange={handleProductCost}
          />
        </div>
        <div>
          <div className="text-sm mb-2 font-thin">
            배송비 (도서산간 비용 포함)
          </div>
          <StyledCurrencyInput
            value={data.goodsDto.deliveryFee}
            onChange={handleDeliveryCost}
          />
        </div>
      </div>

      <NextButton isDisabled={!isMovable} linkTo="/register/deadline" />
    </div>
  );
}

export default Cost;
