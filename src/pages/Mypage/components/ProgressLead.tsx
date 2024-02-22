import { getProgressLead } from '@src/api/mypage';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function ProgressLead() {
  const navigate = useNavigate();
  const { data, isSuccess, isLoading } = useQuery(
    'progressLead',
    getProgressLead
  );
  const len = data?.length || 0;

  if (isLoading)
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
        {data ? (
          <img
            src={data[len - 1].repImgUrl}
            alt="상품 이미지"
            className="aspect-square size-16 rounded-md object-cover"
          />
        ) : (
          <div className="aspect-square size-16 animate-pulse rounded-md bg-zinc-300" />
        )}
        <div className="text-sm">
          {data ? (
            <div>{data[len - 1].goodsName}</div>
          ) : (
            <div className="mt-2 h-3 w-20 animate-pulse rounded-sm bg-zinc-300" />
          )}
          <div className="flex gap-1 pt-1 font-light text-gray-600">
            {data ? (
              <>
                <div>배송비: {data[len - 1].goodsDeliveryPrice}원</div> /
                <div>
                  <span className="text-yellow-400">
                    {data[len - 1].goodsOrderCount}
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
          disabled={!isSuccess}
        >
          공지방 관리하기
        </button>
        <button
          className="w-full rounded-lg bg-success py-4 text-center text-xs text-white active:scale-[99%] disabled:animate-pulse disabled:bg-zinc-400"
          disabled={!isSuccess}
          onClick={() => data && navigate(`/goods/${data[len - 1].goodsId}`)}
        >
          구매폼으로 이동하기
        </button>
      </div>
    </div>
  );
}
