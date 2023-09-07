import React from 'react';
import TitleBox from './components/titleBox';
import Information from './components/information';
import UserCheck from './components/userCheck';
import Image from './components/image';
// import ProductImage from './components/productImage';

export default function Introduce() {
  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      {/* <ProductImage /> */}
      <div>
        <Image />
        <TitleBox />
        <Information />
        <UserCheck />
      </div>
    </div>
  );
}
