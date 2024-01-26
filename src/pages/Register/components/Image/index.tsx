import React, { useEffect, useRef, useState } from 'react';
import { RegisterContextType } from '@src/types/register.d';
import { useOutletContext } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import CameraIcon from '../../../../asset/icon/mdi_camera.svg';
import ImageCard from './components/ImageCard';
import NextButton from '../../../../components/NextButton';

// Import Swiper styles
import 'swiper/css';

function Image() {
  const { data, setData } = useOutletContext<RegisterContextType>();
  const [slidesPerView, setSlidePerView] = useState<
    number | 'auto' | undefined
  >(1);
  const fileRef = useRef<HTMLInputElement>(null);

  const encodeFileToBase64 = (fileBlob: File) => {
    // 이미지 선택 취소 시 예외처리
    if (fileBlob === undefined) return null;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise(() => {
      // onLoad에서 실행
      reader.onload = () => {
        const prevImages = data.image;
        const prevImageInput = data.imageInput;
        prevImages.push(reader.result as string);
        prevImageInput.push(fileBlob);
        setData((prev) => ({
          ...prev,
          image: prevImages,
          imageInput: prevImageInput,
        }));
      };
    });
  };

  const isMovable = data.image.length === 0;

  useEffect(() => {
    if (fileRef.current) {
      fileRef.current.value = '';
      setData((prev) => ({ ...prev, image: [], imageInput: [] }));
    }
  }, []);

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
                ref={fileRef}
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                className="hidden"
                id="image"
                onChange={(e) => {
                  if (e.target.files) encodeFileToBase64(e.target.files[0]);
                }}
              />
              <div
                className={`${
                  !isMovable
                    ? 'aspect-square w-full shrink-0 '
                    : 'aspect-[1.8641] w-full'
                } flex flex-col items-center justify-center gap-3 rounded-lg bg-gray-200`}
              >
                <img src={CameraIcon} alt="사진 추가" />
                <div className="font-thin">앨범으로 등록</div>
              </div>
            </label>
          </SwiperSlide>

          {data.image.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
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
