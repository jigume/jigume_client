import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import CameraIcon from '../../../../asset/icon/mdi_camera.svg';
import CloseIcon from '../../../../asset/icon/CloseIcon.svg';

function ProductImage() {
  const { data, setData } = useOutletContext();

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setData((prev) => ({ ...prev, image: [reader.result] }));
        resolve();
      };
    });
  };

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div>
        <div className="text-xl font-bold">
          어떤 제품을 공동구매하실건가요? <br /> 소개 이미지를 등록해주세요!
        </div>

        {data.image[0] ? (
          <div className="relative inline-flex flex-shrink-0 justify-center aspect-square bg-white shadow-sm ">
            <img
              src={data.image[0]}
              className="w-full h-full my-6 object-cover"
            />
            <span
              className="absolute top-6 right-0 inline-flex items-center py-1.5 px-1.5 rounded-full transform -translate-y-1/2 translate-x-1/2 bg-white text-white shadow-md cursor-pointer"
              onClick={() => setData((prev) => ({ ...prev, image: [] }))}
            >
              <img
                src={CloseIcon}
                className="leading-7 inline-block relative top-[1px]"
              />
            </span>
          </div>
        ) : (
          <label htmlFor="image" className="cursor-pointer">
            <input
              type="file"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              className="hidden"
              id="image"
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
            />
            <div className="w-full aspect-square bg-gray-200 my-6 flex items-center justify-center flex-col gap-3">
              <img src={CameraIcon} />
              <div className="font-thin">앨범으로 등록</div>
            </div>
          </label>
        )}
      </div>
      {data.image[0] ? (
        <Link
          to="/register/ProductDetail"
          className="w-full py-3 my-3 text-center bg-success text-white rounded-lg"
        >
          다음으로 넘어가기
        </Link>
      ) : (
        <div className="w-full py-3 my-3 text-center bg-gray-300 text-white rounded-lg">
          다음으로 넘어가기
        </div>
      )}
    </div>
  );
}

export default ProductImage;
