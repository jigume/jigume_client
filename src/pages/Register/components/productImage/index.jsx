import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import CameraIcon from '../../../../asset/icon/mdi_camera.svg';

function ProductImage() {
  const { data, setData } = useOutletContext();

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div>
        <div className="h4">
          어떤 제품을 공동구매하실건가요? <br /> 소개 이미지를 등록해주세요!
        </div>
        <div className="w-full h-64">
          <img src={CameraIcon} />
          <div>앨범으로 등록</div>
        </div>
      </div>

      <Link
        to="/register/ProductDetail"
        className="w-full py-3 my-3 text-center bg-gray-300 text-white"
      >
        다음으로 넘어가기
      </Link>
    </div>
  );
}

export default ProductImage;
