import Avatar from 'boring-avatars';
import { useNavigate } from 'react-router-dom';
import { GoodsListDTO, GoodsPageDTO } from '@src/types/goods';
import {
  primaryBlue,
  primaryJade,
  primaryPurple,
  primaryYello,
} from '../../../../../common';

export default function ItemComponent({
  index,
  imageUrl,
  goodsName,
  sellerNickname,
  sellCount,
  goodsPrice,
  realDeliveryFee,
}: {
  index?: number | undefined;
  imageUrl?: string;
  goodsName?: string;
  sellerNickname?: string;
  sellCount?: number;
  goodsPrice?: number;
  realDeliveryFee?: number;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex w-full cursor-pointer flex-row gap-4 px-4 pb-4${
        !index ? 'animate-pulse' : ''
      }`}
      onClick={() => navigate(`/goods/${index}`)}
    >
      {!imageUrl ? (
        <div className="border-gray50 size-32 flex-none rounded-lg border bg-gray-100" />
      ) : (
        <img
          src={imageUrl}
          className="border-gray50 size-32 flex-none rounded-lg border bg-gray-100 object-cover"
          alt="상품 이미지"
        />
      )}
      <div className="flex flex-col truncate pt-1">
        {!goodsName ? (
          <div className="mb-[12px] h-[12px] w-48 rounded-sm bg-gray-100" />
        ) : (
          <div className="truncate text-lg">{goodsName}</div>
        )}

        <div className="flex flex-row items-center gap-2 pb-2">
          {!goodsName ? (
            <div className="size-[18px] rounded-full bg-gray-100" />
          ) : (
            <div />
          )}
          {/* <div className="w-[18px] h-[18px] rounded-full bg-gray-100" /> */}
          <div className="caption flex flex-row items-center gap-1">
            {!sellerNickname && !sellCount ? (
              <div className="h-[12px] w-16 rounded-sm bg-gray-100" />
            ) : (
              <>
                <div>{sellerNickname}</div>
                <div className="h-3 w-[1px] bg-gray-500" />
                {sellCount ? (
                  <div className="h-[12px] w-20 rounded-sm bg-gray-100" />
                ) : (
                  <div className="text-gray-500">
                    {sellCount} 번째 구매 리드
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="paragraph-sm text-gray-500">
          {!goodsPrice ? (
            <div className="mb-[6px] h-[12px] w-12 rounded-sm bg-gray-100" />
          ) : (
            <div>구매가: {goodsPrice}</div>
          )}
          <div className="flex flex-row items-center gap-1 font-light">
            {!realDeliveryFee ? (
              <div className="h-[12px] w-12 rounded-sm bg-gray-100" />
            ) : (
              <span>배송비: {realDeliveryFee}</span>
            )}
            <span>/</span>
            {!realDeliveryFee ? (
              <div className="h-[12px] w-20 rounded-sm bg-gray-100" />
            ) : (
              <span>
                <span className="font-bold text-[#FFAE39]">
                  {realDeliveryFee}
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

// 기본 값 정의
ItemComponent.defaultProps = {
  index: undefined,
  imageUrl: undefined,
  goodsName: undefined,
  sellerNickname: undefined,
  sellCount: undefined,
  goodsPrice: undefined,
  realDeliveryFee: undefined,
};
