import React from 'react';
import { postGoods } from '@src/api/register';
import LoadingButton from '@src/components/LoadingButton';
import NextButton from '@src/components/NextButton';
import { RegisterContextType } from '@src/types/register';
import { useMutation } from 'react-query';
import { useNavigate, useOutletContext } from 'react-router-dom';
import CarouselBox from '@src/pages/Goods/components/CarouselBox';
import HeaderProfile from '@src/pages/Goods/components/HeaderProfile';
import ProductInfo from '@src/pages/Goods/components/ProductInfo';
import ProductContent from '@src/pages/Goods/components/ProductContent';
import PlaceInfo from '@src/pages/Goods/components/PlaceInfo';
import { dateFormetter } from '@src/utils';
import IntroCategory from '@src/pages/Goods/components/IntroCategory';
import { useRecoilState } from 'recoil';
import { AuthType } from '@src/types/data';
import { authState } from '@src/data';
import { initData } from '../..';

export default function Confirm() {
  const navigate = useNavigate();
  const { data, setData } = useOutletContext<RegisterContextType>();
  const [auth] = useRecoilState<AuthType>(authState);

  const { mutate, isSuccess, isLoading } = useMutation(
    'post_goods',
    () =>
      postGoods(
        data.imageInput,
        data.goodsDto,
        data.position,
        auth.accessToken as string
      ),
    {
      retry: false,
      onSuccess: (res) => {
        setData(initData);
        navigate(`/buying/${res}/submitted`);
      },
    }
  );

  return (
    <div className="w-full">
      {/* carousel images */}
      {!isSuccess ? (
        <CarouselBox images={data.image} />
      ) : (
        <div className="aspect-square w-full animate-pulse bg-gray-300" />
      )}
      <div className="px-4">
        {/* 상품 정보 */}
        <HeaderProfile
          goodsLimitTime={data.goodsDto.goodsLimitTime.toISOString()}
          goodsName={data.goodsDto.goodsName}
        />
        <ProductInfo
          deliveryFee={Number(data.goodsDto.deliveryFee)}
          realDeliveryFee={Number(data.goodsDto.deliveryFee)}
          link={data.goodsDto.link}
          goodsPrice={Number(data.goodsDto.goodsPrice)}
        />
        <ProductContent introduction={data.goodsDto.introduction} />

        <section className="py-12 text-sm">
          <div className="pb-5 text-xl font-bold">
            잠깐! 이것만은 꼭 확인하고 가세요
          </div>

          <section className="flex flex-col gap-2">
            {/* 상품 위치 정보 */}
            <PlaceInfo
              coordinate={{
                latitude: data.position.lat,
                longitude: data.position.lng,
              }}
              image={data.image[0]}
            />

            {/* 상품 마감일 */}
            <div className="rounded-xl bg-gray-50 p-6">
              {isSuccess ? (
                <div className="text-center">
                  <span className="mr-2 text-sm font-light text-gray-600">
                    구매종료일 :
                  </span>
                  <span>
                    {dateFormetter(data.goodsDto.goodsLimitTime.toISOString())}
                  </span>
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
                  <IntroCategory idx={data && data.goodsDto.categoryId} />
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

        {isLoading ? (
          <LoadingButton />
        ) : (
          <NextButton
            content="공동 구매 폼 게시하기"
            onClick={() => mutate()}
          />
        )}
      </div>
    </div>
  );
}
