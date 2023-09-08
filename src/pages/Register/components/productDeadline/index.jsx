import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import CalendarDate from './components/calendarDate';

function ProductDeadline() {
  const { data, setData } = useOutletContext();

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div className="text-lg font-bold pb-10">
        구매 수량과 종료 시점을 정해요.
        <br />
        목표에 도달하면 공동 구매 폼이 마감돼요.
      </div>
      <div>
        <div className="text-sm mb-2 font-thin">폼 목표 공동 구매 수량</div>
        <CurrencyInput
          suffix="원"
          className="border rounded-md w-full p-3 text-sm font-medium mb-10 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-right"
          value={data.deliveryCost}
          defaultValue={0}
          decimalsLimit={2}
          onValueChange={(value) =>
            setData((prev) => ({ ...prev, deliveryCost: value }))
          }
        />
        <div className="text-sm mb-2 font-thin">공동구매 종료 시간</div>
        <CalendarDate />
      </div>

      <Link
        to="/Register/getPlace"
        className="w-full py-3 my-3 text-center bg-success text-white rounded-lg"
      >
        다음으로 넘어가기
      </Link>
    </div>
  );
}

export default ProductDeadline;
