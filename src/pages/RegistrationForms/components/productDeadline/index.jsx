import React from 'react';
import { Link } from 'react-router-dom';
import NextButton from '../nextButton';
import InputNumber from '../inputNumber';
import CalendarDate from './components/calendarDate';

const ProductDeadline = () => {
  return (
    <form class="flex flex-col">
      <label>
        <div className="mt-1 h-10 w-20 bg-slate-200">공동구매 수량</div>
        <InputNumber />개
      </label>
      <label>
        <div className="mt-1 h-10 w-20 bg-slate-200">공동구매 종료 시간</div>
        <CalendarDate />
      </label>
      <Link to="/RegistrationForms/getPlace">
        <NextButton />
      </Link>
    </form>
  );
};

export default ProductDeadline;
