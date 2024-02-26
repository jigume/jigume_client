import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoodsListDTO } from '@src/types/goods';
import { setComma } from '@src/utils';
import favoriteFilled from '@src/asset/icon/favoriteFilled.svg';
import favoriteBordered from '@src/asset/icon/favoriteBordered.svg';
import { useMutation } from 'react-query';
import { throttle } from 'lodash';
import { setWishGoods } from '@src/api/goods';

export default function ItemComponent({ goods }: { goods?: GoodsListDTO }) {
  const isWished = useRef<boolean>(false);
  const navigate = useNavigate();

  const { mutate: setWish } = useMutation('postWishGoods', setWishGoods, {
    onSuccess: () => {
      isWished.current = !isWished.current;
    },
  });

  const handleWish = () => {
    setWish({ id: goods?.goodsId as number, isWished: isWished.current });
  };

  // 쓰롤틀링으로 요청 제한
  const throttledWish = useMemo(() => throttle(handleWish, 2000), []);

  return (
    <div
      className={`flex w-full cursor-pointer flex-row gap-4 p-4 first-of-type:pt-0 ${
        !goods ? 'animate-pulse' : ''
      }`}
    >
      {!goods ? (
        <div className="border-gray50 size-32 flex-none rounded-lg border bg-gray-100" />
      ) : (
        <div className="relative">
          <button
            className="absolute right-0 top-0 p-2"
            onClick={() => throttledWish()}
          >
            <img
              src={isWished ? favoriteFilled : favoriteBordered}
              alt="좋아요"
              className="size-6"
            />
          </button>
          <img
            src={goods.repImgUrl}
            className="border-gray50 size-32 flex-none rounded-lg border bg-gray-100 object-cover"
            alt="상품 이미지"
          />
        </div>
      )}
      <div
        className="flex flex-col truncate pt-1"
        onClick={() => navigate(`/buying/${goods?.goodsId}`)}
      >
        {!goods ? (
          <div className="mb-[12px] h-[12px] w-48 rounded-sm bg-gray-100" />
        ) : (
          <div className="truncate text-lg">{goods.goodsName}</div>
        )}

        <div className="flex flex-row items-center gap-2 pb-2">
          {!goods ? (
            <div className="size-[18px] rounded-full bg-gray-100" />
          ) : (
            <img
              className="size-[18px] rounded-full bg-gray-100"
              src={goods.sellerInfoDto?.sellerProfileImage || undefined}
              alt="판매자 프로필 이미지"
            />
          )}

          <div className="caption flex flex-row items-center  gap-1">
            {!goods ? (
              <div className="w-16 rounded-sm bg-gray-100" />
            ) : (
              <div>{goods?.sellerInfoDto?.sellerNickname || undefined}</div>
            )}
          </div>
        </div>

        <div className="paragraph-sm text-gray-500">
          {!goods ? (
            <div className="mb-[6px] h-[12px] w-12 rounded-sm bg-gray-100" />
          ) : (
            <div>구매가: {setComma(goods.goodsPrice)} 원</div>
          )}
          <div className="flex flex-row items-center gap-1 font-light">
            {!goods ? (
              <div className="h-[12px] w-12 rounded-sm bg-gray-100" />
            ) : (
              <span>배송비: {goods.goodsDeliveryPrice}</span>
            )}
            <span>/</span>
            {!goods ? (
              <div className="h-[12px] w-20 rounded-sm bg-gray-100" />
            ) : (
              <span>
                <span className="font-bold text-[#FFAE39]">
                  {goods.goodsOrderCount}
                </span>{' '}
                명 분할 중
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ItemComponent.defaultProps = {
  goods: undefined,
};
