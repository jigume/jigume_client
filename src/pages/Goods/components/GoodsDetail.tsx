import React, { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { dateFormetter } from '@src/utils';
import { GoodsContextType } from '../index.d';
import CarouselBox from './CarouselBox';
import HeaderProfile from './HeaderProfile';
import ProductInfo from './ProductInfo';
import ProductContent from './ProductContent';
import PlaceInfo from './PlaceInfo';
import IntroCategory from './IntroCategory';
import DetailHeader from './DetailHeader';

export default function GoodsDetail() {
  const location = useLocation();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: targetRef,
  });
  const [scrollDown, setScrollDown] = useState(false);
  const { goods, isSuccess } = useOutletContext<GoodsContextType>();

  const isSubmitted = location.pathname.includes('submitted');

  useMotionValueEvent(scrollYProgress, 'change', () => {
    if (scrollYProgress.get() > 0.05) setScrollDown(true);
    else setScrollDown(false);
  });

  return (
    <div
      className={`container mx-auto h-svh w-full max-w-screen-sm overflow-y-scroll px-0 pb-32 ${
        isSubmitted ? 'touch-none overflow-hidden' : ''
      }`}
      ref={targetRef}
    >
      {/* header */}
      <DetailHeader scrollDown={scrollDown} />

      {/* 상품 사진 */}
      {isSuccess ? (
        <CarouselBox
          images={goods?.goodsPageDto.goodsImagesList.map(
            (item) => item.goodsImgUrl
          )}
        />
      ) : (
        <div className="aspect-square w-full animate-pulse bg-gray-300" />
      )}

      {/* 상품 정보 */}
      <section className="px-4">
        <HeaderProfile
          goodsLimitTime={goods?.goodsPageDto.goodsLimitTime}
          goodsName={goods?.goodsPageDto.goodsName}
          sellerInfoDto={goods?.goodsPageDto.sellerInfoDto}
        />
        <ProductInfo
          deliveryFee={goods?.goodsPageDto.deliveryFee}
          realDeliveryFee={goods?.goodsPageDto.realDeliveryFee}
          link={goods?.goodsPageDto.link}
          goodsPrice={goods?.goodsPageDto.goodsPrice}
        />
        <ProductContent introduction={goods?.goodsPageDto.introduction} />
      </section>

      <section className="px-4 pt-12 text-sm">
        <div className="pb-5 text-xl font-bold">
          잠깐! 이것만은 꼭 확인하고 가세요
        </div>

        <section className="flex flex-col gap-2">
          {/* 상품 위치 정보 */}
          <PlaceInfo
            coordinate={goods?.goodsPageDto.coordinate}
            image={goods?.goodsPageDto.goodsImagesList[0].goodsImgUrl}
          />

          {/* 상품 마감일 */}
          <div className="rounded-xl bg-gray-50 p-6">
            {isSuccess ? (
              <div className="text-center">
                <span className="mr-2 text-sm font-light text-gray-600">
                  구매종료일 :
                </span>
                <span>{dateFormetter(goods?.goodsPageDto.goodsLimitTime)}</span>
              </div>
            ) : (
              <div className="mx-auto h-3 w-3/4 animate-pulse rounded-lg bg-gray-300" />
            )}
          </div>

          {/* 상품 카테고리 */}
          <div className="rounded-xl bg-gray-50 p-4">
            {isSuccess ? (
              <div className="flex items-center justify-center gap-2">
                <span>해당 폼은</span>
                <IntroCategory idx={goods && goods.goodsPageDto.categoryId} />
                <span>제품을 공동구매해요.</span>
              </div>
            ) : (
              <div className="mx-auto h-3 w-full animate-pulse rounded-lg bg-gray-300" />
            )}
          </div>

          <div className="rounded-xl bg-gray-50 p-6 text-center  leading-7">
            <p>
              3자 에스크로 방식 결제로 안전하게 거래할 수 있어요.
              <br />
              환불 및 취소가 어려우니, 신중하게 참여해주세요.
            </p>
          </div>
        </section>
      </section>

      {/* footer */}
      <div className="absolute bottom-0 z-50 w-full max-w-screen-sm border-t-[1px] bg-white px-4 pb-6 pt-4">
        {goods?.goodsMemberAuth === 'SELLER' ? (
          <div className="flex w-full gap-4 text-white">
            <Link
              className="shrink-0 rounded-lg bg-zinc-950 p-4 text-center"
              to={`/buying/${goods.goodsPageDto.goodsId}/modify`}
            >
              편집하기
            </Link>
            <Link
              className="w-full rounded-lg bg-success py-4 text-center"
              to={`/buying/${goods.goodsPageDto.goodsId}/notice`}
            >
              공지방 바로가기
            </Link>
          </div>
        ) : (
          <Link
            className="relative inline-block w-full rounded-lg bg-success py-4 text-center text-white"
            to="/"
          >
            구매 참여하기
          </Link>
        )}
      </div>

      <Outlet />
    </div>
  );
}
