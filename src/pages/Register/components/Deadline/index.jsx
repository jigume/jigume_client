import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CalendarDate from './components/calendarDate';
import StyledCountInput from '../../../../components/StyledCountInput';
import NextButton from '../../../../components/NextButton';

function Deadline() {
  /** @type {{data:{
   * image: any[]
   * imageInput: File[]
   * address: string
   *  goodsDto: {
   *    goodsName: string
   *    boardContent: string
   *    introduction: string
   *    link: string
   *    goodsPrice: number
   *    deliveryFee: number
   *    mapX: number | undefined
   *    mapY: number | undefined
   *    goodsLimitCount: number
   *    goodsLimitTime: Date
   *    categoryName: number
   *  }
   * }}} 등록할 상품 정보  */
  const { data, setData } = useOutletContext();

  const handleTargetCount = (value) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, goodsLimitCount: value },
    }));
  };

  const isMovable = Number(data.goodsDto.goodsLimitCount) !== 0;

  return (
    <div className="flex h-[calc(100svh-48px)] w-full flex-col justify-between">
      <div />
      <div className="pb-24">
        <div className="pb-12 text-lg font-bold">
          구매 수량과 종료 시점을 정해요.
          <br />
          목표에 도달하면 공동 구매 폼이 마감돼요.
        </div>

        <div className="pb-10">
          <div className="mb-2 text-sm font-thin">폼 목표 공동 구매 수량</div>
          <StyledCountInput
            value={data.goodsDto.goodsLimitCount}
            onChange={handleTargetCount}
          />
        </div>
        <div>
          <div className="mb-2 text-sm font-thin">공동구매 종료 시간</div>
          <CalendarDate />
        </div>
      </div>

      <NextButton isDisabled={!isMovable} linkTo="/register/place" />
    </div>
  );
}

export default Deadline;
