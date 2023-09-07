import React, { useState } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // 스타일을 불러옵니다.
import 'react-date-range/dist/theme/default.css'; // 스타일을 불러옵니다.

const CalendarDate = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex flex-row">
      <Calendar onChange={(item) => setDate(item)} date={date} />
      {/* <div>date:{date.toDateString()}</div> */}
      <button name="year" className="mt-1 h-10 w-50 bg-slate-200">
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
      <div>일</div>
    </div>
  );
};

export default CalendarDate;
