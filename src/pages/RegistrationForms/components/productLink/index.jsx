import React from 'react';
import { Link } from 'react-router-dom';
import NextButton from '../nextButton';
import 'react-dropdown/style.css';
import InputText from '../inputText';

const ProductLink = () => {
  return (
    <form className="flex flex-col">
      <div className="mt-1 h-10 w-20 bg-slate-200">상품 링크</div>
      <InputText placeholder="ex) www.figma.com" name="productLink" />

      {/* 미리 보기가 있는 경우, 없는 경우 해두기 */}

      <div className="mt-1 h-10 w-20 bg-slate-200">카테고리</div>

      <Link to="/RegistrationForms/ProductAmount">
        <NextButton />
      </Link>
    </form>
  );
};

export default ProductLink;
