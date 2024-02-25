import { useNavigate, useOutletContext } from 'react-router-dom';
import { MyPageContextType } from '../index.d';

export default function ProgressLead() {
  const { leadData, leadLoading, leadSuccess } =
    useOutletContext<MyPageContextType>();
  const navigate = useNavigate();
  const len = leadData?.length || 0;

  if (leadLoading)
    return (
      <div className="py-2">
        <div className="flex gap-4 pb-3">
          <div className="aspect-square size-16 animate-pulse rounded-md bg-zinc-300" />

          <div className="text-sm">
            <div className="mt-2 h-3 w-20 animate-pulse rounded-sm bg-zinc-300" />

            <div className="mt-2 h-3 w-32 animate-pulse bg-zinc-300" />
          </div>
        </div>
        <div className="h-[50px]" />
      </div>
    );

  return (
    <div className="py-2">
      <div className="flex gap-4 pb-3">
        {leadData ? (
          <img
            src={leadData[len - 1].repImgUrl}
            alt="상품 이미지"
            className="aspect-square size-16 rounded-md object-cover"
          />
        ) : (
          <div className="aspect-square size-16 animate-pulse rounded-md bg-zinc-300" />
        )}
        <div className="text-sm">
          {leadData ? (
            <div>{leadData[len - 1].goodsName}</div>
          ) : (
            <div className="mt-2 h-3 w-20 animate-pulse rounded-sm bg-zinc-300" />
          )}
          <div className="flex gap-1 pt-1 font-light text-gray-600">
            {leadData ? (
              <>
                <div>배송비: {leadData[len - 1].goodsDeliveryPrice}원</div> /
                <div>
                  <span className="text-yellow-400">
                    {leadData[len - 1].goodsOrderCount}
                  </span>
                  명 분할 중
                </div>{' '}
              </>
            ) : (
              <div className="mt-2 h-3 w-32 animate-pulse bg-zinc-300" />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 font-light">
        <button
          className="w-full rounded-lg border py-4 text-center text-xs active:scale-[99%] disabled:animate-pulse "
          disabled={!leadSuccess}
        >
          공지방 관리하기
        </button>
        <button
          className="w-full rounded-lg bg-success py-4 text-center text-xs text-white active:scale-[99%] disabled:animate-pulse disabled:bg-zinc-400"
          disabled={!leadSuccess}
          onClick={() =>
            leadData && navigate(`/goods/${leadData[len - 1].goodsId}`)
          }
        >
          구매폼으로 이동하기
        </button>
      </div>
    </div>
  );
}
