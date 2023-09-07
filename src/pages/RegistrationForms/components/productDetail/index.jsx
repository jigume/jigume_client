import React from 'react';
import { Link } from 'react-router-dom';
import NextButton from '../nextButton';
import InputText from '../inputText';

const ProductDetail = () => {
  return (
    <form class="flex flex-col">
      <label>
        <div className="mt-1 h-10 w-20 bg-slate-200">공동구매 제목</div>
        <InputText
          name="title"
          placeholder="공백 포함 40자 까지 작성 가능해요."
        />
      </label>
      <label>
        <div className="mt-1 h-10 w-20 bg-slate-200">공구 내용 소개</div>
        <InputText
          name="introduce"
          placeholder="공백 포함 200자 까지 작성 가능해요."
        />
      </label>
      <Link to="/RegistrationForms/ProductLink">
        <NextButton />
      </Link>
    </form>
  );
};

export default ProductDetail;
