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
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      className="flex justify-center items-center w-full aspect-square"
    >
      {tempImages.map((item, i) => (
        <SwiperSlide key={i}>
          <img src={item} className="" />
        </SwiperSlide>
      )) || <div className="w-full bg-gray-300 aspect-square animate-pulse" />}
    </Swiper>
  );
}
