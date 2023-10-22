import React from 'react';
import { useOutletContext } from 'react-router-dom';
import InputWithNum from '../../../../components/InputWithNum';
import StyledTextarea from '../../../../components/StyledTextarea';
import NextButton from '../../../../components/NextButton';

function Detail() {
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

  const handleTitle = (e) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, name: e.target.value },
    }));
  };

  const handleContent = (e) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, boardContent: e.target.value },
    }));
  };

  const isMovable =
    data.goodsDto.name === '' && data.goodsDto.boardContent === '';

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div className="pb-24">
        <div className="text-lg font-bold pb-12">
          공동 구매 팔로워를 모으려면?
          <br />
          끌리는 제목과 내용으로 폼을 만들어요!
        </div>

        <div className="pb-10">
          <div className="text-sm mb-2 font-thin">폼 제목</div>
          <InputWithNum
            value={data.goodsDto.name}
            maxLength={30}
            onChange={handleTitle}
          />
        </div>
        <div>
          <div className="text-sm mb-2 font-thin">폼 내용</div>
          <StyledTextarea
            value={data.goodsDto.boardContent}
            onChange={handleContent}
          />
        </div>
      </div>

      <NextButton isDisabled={isMovable} linkTo="/register/link" />
    </div>
  );
}

export default Detail;
