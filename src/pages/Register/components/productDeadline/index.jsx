import React from 'react';
import { Link } from 'react-router-dom';
import NextButton from '../nextButton';
import InputNumber from '../inputNumber';
import CalendarDate from './components/calendarDate';

function ProductDeadline() {
  return (
    <form className="flex flex-col">
      <div className="mt-1 h-10 w-20 bg-slate-200">공동구매 수량</div>
      <InputNumber />개
      <div className="mt-1 h-10 w-20 bg-slate-200">공동구매 종료 시간</div>
      <CalendarDate />
      <Link to="/Register/getPlace">
        <NextButton />
      </Link>
    </form>
  );
}

export default ProductDeadline;
