import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import NextButton from '../nextButton';

function ProductImage() {
  const { data, setData } = useOutletContext();

  return (
    <form>
      <div className="h-10 w-10 bg-indigo-500">a</div>
      <Link to="/RegistrationForms/ProductDetail">
        <NextButton />
      </Link>
    </form>
  );
}

export default ProductImage;
