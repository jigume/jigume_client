import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Postcode from './components/postcode';
import NextButton from '../../../../components/NextButton';

function Place() {
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
  const { data } = useOutletContext();

  const isMovable = data.address !== '';
  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div className="pb-24">
        <div className="text-lg font-bold pb-10">
          어디서 공구 물품을 전달할까요?
          <br />
          팔로워들과 만날 픽업 장소를 알려주세요.
        </div>

        <div className="align-top text-sm mb-2 font-thin">픽업 위치 지정</div>
        <Postcode />
      </div>

      <NextButton isDisabled={!isMovable} linkTo="/register/notice" />
    </div>
  );
}

export default Place;
