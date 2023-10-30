import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import CameraIcon from '../../../../asset/icon/mdi_camera.svg';
import ImageCard from './components/ImageCard';
import NextButton from '../../../../components/NextButton';

// Import Swiper styles
import 'swiper/css';

function Image() {
  /** @type {{data:{
   * image: any[]
   * imageInput: File[]
   * address: string
   *  goodsDto: {
   *    goodsName: string
   *    boardContent: string
   *    introduction: string
   *    link: string
   *    goodsPrice: number
   *    deliveryFee: number
   *    mapX: number | undefined
   *    mapY: number | undefined
   *    goodsLimitCount: number
   *    goodsLimitTime: Date
   *    categoryName: number
   *  }
   * }}} 등록할 상품 정보  */
  const { data, setData } = useOutletContext();
  const [slidesPerView, setSlidePerView] = useState(1);

  const encodeFileToBase64 = (fileBlob) => {
    // 이미지 선택 취소 시 예외처리
    if (fileBlob === undefined) return null;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      // onLoad에서 실행하는
      reader.onload = () => {
        const prevImages = data.image;
        const prevImageInput = data.imageInput;
        prevImages.push(reader.result);
        prevImageInput.push(fileBlob);
        setData((prev) => ({
          ...prev,
          image: prevImages,
          imageInput: prevImageInput,
        }));
        resolve();
      };
    });
  };

  const isMovable = data.image.length === 0;

  return (
    <div className="absolute left-1/2 flex h-[calc(100svh-48px)] w-screen max-w-screen-sm -translate-x-1/2 flex-col justify-between">
      <div />
      <div>
        <div className="px-4 text-xl font-bold">
          어떤 제품을 공동구매하실건가요? <br /> 소개 이미지를 등록해주세요!
        </div>
        <Swiper
          slidesPerView={slidesPerView}
          centeredSlides
          spaceBetween={16}
          onSlideChange={() => setSlidePerView('auto')}
          className="flex w-full items-center justify-center gap-4"
        >
          {/* add button */}
          <SwiperSlide
            className={`shrink-0 cursor-pointer ${
              !isMovable ? 'ml-4 aspect-square !w-1/2' : '!w-full px-4'
            } mt-6`}
          >
            <label htmlFor="image">
              <input
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                className="hidden"
                id="image"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
              />
              <div
                className={`${
                  !isMovable
                    ? 'aspect-square w-full shrink-0 '
                    : 'aspect-[1.8641] w-full'
                }  flex flex-col items-center justify-center gap-3 rounded-lg bg-gray-200`}
              >
                <img src={CameraIcon} />
                <div className="font-thin">앨범으로 등록</div>
              </div>
            </label>
          </SwiperSlide>

          {data.image.map((item, idx) => (
            <SwiperSlide key={idx} className={`${!isMovable ? '!w-1/2' : ''}`}>
              <ImageCard
                image={item}
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    image: prev.image.filter((_, i) => i !== idx),
                  }))
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="px-4">
        <NextButton isDisabled={isMovable} linkTo="/register/detail" />
      </div>
    </div>
  );
}

export default Image;
