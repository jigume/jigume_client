import React from 'react';
import image from '../../../asset/725ec573a6591587da4be2bb770449e8.png';

// import ProductImage from './components/productImage';

export default function Image() {
  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      {/* <ProductImage /> */}
      <img className="" src={image} />
    </div>
  );
}