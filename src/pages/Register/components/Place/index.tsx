import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { RegisterContextType } from '@src/types/register';
import Postcode from './components/postcode';
import NextButton from '../../../../components/NextButton';

function Place() {
  const { data, setData } = useOutletContext<RegisterContextType>();

  const isMovable = data.address !== '';
  return (
    <div className="flex h-[calc(100svh-48px)] w-full flex-col justify-between">
      <div />
      <div className="pb-24">
        <div className="pb-10 text-lg font-bold">
          어디서 공구 물품을 전달할까요?
          <br />
          팔로워들과 만날 픽업 장소를 알려주세요.
        </div>

        <div className="mb-2 align-top text-sm font-thin">픽업 위치 지정</div>
        <Postcode data={data} setData={setData} />
      </div>

      <NextButton isDisabled={!isMovable} linkTo="/register/notice" />
    </div>
  );
}

export default Place;
