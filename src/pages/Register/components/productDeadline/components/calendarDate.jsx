import React, { useState } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // 스타일을 불러옵니다.
import 'react-date-range/dist/theme/default.css'; // 스타일을 불러옵니다.

function CalendarDate() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        className="border rounded-md w-full p-3 text-sm w-full  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-right0"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        -
      </button>
      {open && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <Calendar onChange={(item) => setDate(item)} date={date} />
          </div>
          <div
            className="w-screen h-[100svh] bg-black/10 fixed top-0 left-0 z-10"
            onClick={() => console.log('clicked')}
          />
        </>
      )}

      {/* <div>date:{date.toDateString()}</div> */}
      {/* <button name="year" className="mt-1 h-10 w-50 bg-slate-200">
        {date.getFullYear()}
      </button>
      <div>년</div>
      <button name="month" className="mt-1 h-10 w-50 bg-slate-200">
        {date.getMonth()}
      </button>
      <div>월</div>
      <button name="date" className="mt-1 h-10 w-50 bg-slate-200">
        {date.getDate()}
      </button>
      <div>일</div> */}
    </div>
  );
}

export default CalendarDate;
