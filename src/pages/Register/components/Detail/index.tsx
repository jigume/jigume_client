import React from 'react';
import { RegisterContextType } from '@src/types/register.d';
import { useOutletContext } from 'react-router-dom';
import InputWithNum from '../../../../components/InputWithNum';
import StyledTextarea from '../../../../components/StyledTextarea';
import NextButton from '../../../../components/NextButton';

function Detail() {
  const { data, setData } = useOutletContext<RegisterContextType>();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, goodsName: e.target.value },
    }));
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, boardContent: e.target.value },
    }));
  };

  const isMovable =
    data.goodsDto.goodsName === '' && data.goodsDto.boardContent === '';

  return (
    <div className="flex h-[calc(100svh-48px)] w-full flex-col justify-between">
      <div />
      <div className="pb-24">
        <div className="pb-12 text-lg font-bold">
          공동 구매 팔로워를 모으려면?
          <br />
          끌리는 제목과 내용으로 폼을 만들어요!
        </div>

        <div className="pb-10">
          <div className="mb-2 text-sm font-thin">폼 제목</div>
          <InputWithNum
            value={data.goodsDto.goodsName}
            maxLength={30}
            onChange={handleTitle}
          />
        </div>
        <div>
          <div className="mb-2 text-sm font-thin">폼 내용</div>
          <StyledTextarea
            value={data.goodsDto.boardContent}
            onChange={handleContent}
            placeholder="1명이라도 공동구매에 함께하면 추가배송비가 절반 넘게 절약될거에요!"
          />
        </div>
      </div>

      <NextButton isDisabled={isMovable} linkTo="/register/link" />
    </div>
  );
}

export default Detail;
