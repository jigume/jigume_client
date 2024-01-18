import React, { useState } from 'react';
import { Calendar } from 'react-date-range';
import locale from 'date-fns/locale/ko';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { RegisterDataType } from '@src/types/register';
import { primaryBlue } from '../../../../../common';

function CalendarDate({
  data,
  setData,
}: {
  data: RegisterDataType;
  setData: React.Dispatch<React.SetStateAction<RegisterDataType>>;
}) {
  const [open, setOpen] = useState(false);

  const handleDateChange = (newDate: Date) => {
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
        className="w-full rounded-md border border-slate-300 p-3  text-right text-sm font-medium focus:border-success focus:outline-none focus:ring-1 focus:ring-success disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
      </button>
      {open && (
        <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none ">
          <div
            className="fixed left-0 top-0 z-30 h-[100svh] w-screen bg-black/10"
            onClick={() => setOpen(false)}
          />
          <Calendar
            onChange={handleDateChange}
            date={date}
            locale={locale}
            color={primaryBlue}
            className="z-50 rounded-md"
          />
        </div>
      )}
    </>
  );
}

export default CalendarDate;
