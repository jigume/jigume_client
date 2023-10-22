import React, { useState } from 'react';
import { Calendar } from 'react-date-range';
import locale from 'date-fns/locale/ko';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useOutletContext } from 'react-router-dom';
import { primaryBlue } from '../../../../../common';

function CalendarDate() {
  /** @type {{data:{
   * image: any[]
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
   *    category: number
   *  }
   * }}} 등록할 상품 정보  */
  const { data, setData } = useOutletContext();
  const [open, setOpen] = useState(false);

  const handleDateChange = (newDate) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, goodsLimitTime: newDate },
    }));
    setOpen(false); // 날짜 선택 후 모달 닫기
  };
  const date = data.goodsDto.goodsLimitTime;
  return (
    <>
      <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        className="border rounded-md w-full p-3 text-sm w-full font-medium rounded-lg  text-right border border-slate-300 focus:outline-none focus:border-success focus:ring-1 focus:ring-success disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {date.getFullYear()}년 {date.getMonth()}월 {date.getDate()}일
      </button>
      {open && (
        <div className="w-full h-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none ">
          <div
            className="w-screen h-[100svh] bg-black/10 fixed top-0 left-0 z-30"
            onClick={() => setOpen(false)}
          />
          <Calendar
            onChange={handleDateChange}
            date={date}
            locale={locale}
            color={primaryBlue}
            className="rounded-md z-50"
          />
        </div>
      )}
    </>
  );
}

export default CalendarDate;
