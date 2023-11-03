import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './index.css';

export default function CarouselBox({ data }) {
  if (!data || !data.goodsImagesList)
    return <div className="aspect-square w-full animate-pulse bg-gray-300" />;

  return (
    <Swiper
      pagination
      modules={[Pagination]}
      loop
      className="flex aspect-square w-full items-center justify-center"
    >
      {data.goodsImagesList.map((item, i) => (
        <SwiperSlide key={i}>
          <img
            src={item.goodsImgUrl}
            className="aspect-square w-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
