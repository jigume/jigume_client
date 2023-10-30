import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './index.css';

const tempImages = [
  'https://via.placeholder.com/512',
  'https://via.placeholder.com/512',
  'https://via.placeholder.com/512',
  'https://via.placeholder.com/512',
  'https://via.placeholder.com/512',
];

export default function CarouselBox() {
  return (
    <Swiper
      pagination
      modules={[Pagination]}
      loop
      className="flex aspect-square w-full items-center justify-center"
    >
      {tempImages.map((item, i) => (
        <SwiperSlide key={i}>
          <img src={item} className="" />
        </SwiperSlide>
      )) || <div className="aspect-square w-full animate-pulse bg-gray-300" />}
    </Swiper>
  );
}
