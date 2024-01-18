import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { RegisterContextType } from '@src/types/register';
import CalendarDate from './components/calendarDate';
import StyledCountInput from '../../../../components/StyledCountInput';
import NextButton from '../../../../components/NextButton';

function Deadline() {
  const { data, setData } = useOutletContext<RegisterContextType>();

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
            value={String(data.goodsDto.goodsLimitCount)}
            onValueChange={(value) =>
              setData((prev) => ({
                ...prev,
                goodsDto: {
                  ...prev.goodsDto,
                  goodsLimitCount: Number(value),
                },
              }))
            }
          />
        </div>
        <div>
          <div className="mb-2 text-sm font-thin">공동구매 종료 시간</div>
          <CalendarDate data={data} setData={setData} />
        </div>
      </div>

      <NextButton isDisabled={!isMovable} linkTo="/register/place" />
    </div>
  );
}

export default Deadline;
