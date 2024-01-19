import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './index.css';
import { GoodsPageDTO } from '@src/types/goods';

export default function CarouselBox({ data }: { data: GoodsPageDTO }) {
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
        <SwiperSlide key={item.goodsImgUrl}>
          <img
            src={item.goodsImgUrl}
            className="aspect-square w-full object-cover"
            alt="상품 이미지"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
