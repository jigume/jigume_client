import React from 'react';
import { Link } from 'react-router-dom';
import NextButton from '../nextButton';
import InputNumber from '../inputNumber';

function ProductAmount() {
  return (
    <form className="flex flex-col">
      <div className="mt-1 h-10 w-20 bg-slate-200">상품 금액</div>
      <InputNumber name="amount" placeholder="30,000" />원
      <div className="mt-1 h-10 w-20 bg-slate-200">
        배송비 (도서산간 비용 포함)
      </div>
      <InputNumber name="deliveryCharge" placeholder="5,500" />원
      <Link to="/Register/ProductDeadline">
        <NextButton />
      </Link>
    </form>
  );
}

export default ProductAmount;
