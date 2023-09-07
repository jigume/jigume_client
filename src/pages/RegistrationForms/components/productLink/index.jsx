import React from 'react';
import { Link } from 'react-router-dom';
import NextButton from '../nextButton';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import InputText from '../inputText';

const options = ['one', 'two', 'three'];

const ProductLink = () => {
  return (
    <form class="flex flex-col">
      <label>
        <div className="mt-1 h-10 w-20 bg-slate-200">상품 링크</div>
        <InputText placeholder="ex) www.figma.com" name="productLink" />
      </label>
      {/* 미리 보기가 있는 경우, 없는 경우 해두기 */}
      <label>
        <div className="mt-1 h-10 w-20 bg-slate-200">카테고리</div>
        <Dropdown
          options={options}
          // onChange={this._onSelect}
          placeholder="카테고리를 선택해주세요."
        />
      </label>
      <Link to="/RegistrationForms/ProductAmount">
        <NextButton />
      </Link>
    </form>
  );
};

export default ProductLink;
