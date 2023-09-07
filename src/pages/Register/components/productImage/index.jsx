import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import NextButton from '../nextButton';

function ProductImage() {
  const { data, setData } = useOutletContext();

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div className="h-10 w-10 bg-indigo-500">a</div>

      <Link to="/register/ProductDetail" className="py-3">
        <NextButton />
      </Link>
    </div>
  );
}

export default ProductImage;
