import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './index.css';

export default function CarouselBox({ images }: { images: string[] }) {
  if (images.length === 0)
    return <div className="aspect-square w-full animate-pulse bg-gray-300" />;

  return (
    <Swiper
      pagination
      modules={[Pagination]}
      loop
      className="flex aspect-square w-full items-center justify-center bg-zinc-300"
    >
      {images.map((item) => (
        <SwiperSlide key={item}>
          <img
            src={item || undefined}
            className="aspect-square w-full object-cover"
            alt="상품 이미지"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
