import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getGoodsPage } from '@src/api/goods';
import { dateFormetter } from '@src/utils';
import CarouselBox from './components/CarouselBox';
import HeaderProfile from './components/HeaderProfile';
import ProductInfo from './components/ProductInfo';
import ProductContent from './components/ProductContent';
import ChevronLeft from '../../asset/icon/chevronLeft.svg';
import PlaceInfo from './components/PlaceInfo';
import IntroCategory from './components/IntroCategory';

export default function Goods() {
  const { idx } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isSubmitted = location.pathname.includes('submitted');

  const { data: goods, isSuccess } = useQuery('itemDetail', () =>
    getGoodsPage(idx as string)
  );

  return (
    <div
      className={`container mx-auto h-[100svh] w-full max-w-screen-sm overflow-y-scroll px-0 pb-20 ${
        isSubmitted ? 'touch-none overflow-hidden' : ''
      }`}
    >
      <div
        onClick={() => navigate(-1)}
        className="absolute top-0 z-50 pr-2 pt-2"
      >
        <img
          className="size-12 cursor-pointer p-2"
          src={ChevronLeft}
          alt="뒤로가기"
        />
      </div>

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
          sellerNickname={goods?.goodsPageDto.sellerInfoDto.sellerNickname}
          sellCount={goods?.goodsPageDto.sellerInfoDto.sellCount}
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

      <Outlet />
    </div>
  );
}
