import { Link, useOutletContext } from 'react-router-dom';
import { SellHistoryDto } from '@src/types/mypage';
import { MyPageContextType } from '../index.d';

function LeadGoods({
  item,
  leadSuccess,
}: {
  item: SellHistoryDto;
  leadSuccess: boolean;
}) {
  return (
    <div className="py-2">
      <div className="flex gap-4 pb-3">
        {leadSuccess ? (
          <img
            src={item.repImgUrl}
            alt="상품 이미지"
            className="aspect-square size-16 rounded-md object-cover"
          />
        ) : (
          <div className="aspect-square size-16 animate-pulse rounded-md bg-zinc-300" />
        )}
        <div className="text-sm">
          {leadSuccess ? (
            <div>{item.goodsName}</div>
          ) : (
            <div className="mt-2 h-3 w-20 animate-pulse rounded-sm bg-zinc-300" />
          )}
          <div className="flex gap-1 pt-1 font-light text-gray-600">
            {leadSuccess ? (
              <>
                <div>배송비: {item.goodsDeliveryPrice}원</div> /
                <div>
                  <span className="text-yellow-400">
                    {item.goodsOrderCount}
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
        <Link
          className="w-full rounded-lg border py-4 text-center text-xs active:scale-[99%] disabled:animate-pulse "
          to={`/buying/${item.goodsId}/notice`}
        >
          공지방 관리하기
        </Link>
        <Link
          className="w-full rounded-lg bg-success py-4 text-center text-xs text-white active:scale-[99%] disabled:animate-pulse disabled:bg-zinc-400"
          to={`/buying/${item.goodsId}`}
        >
          구매폼으로 이동하기
        </Link>
      </div>
    </div>
  );
}

export default function ProgressLead() {
  const { leadData, leadLoading, leadSuccess } =
    useOutletContext<MyPageContextType>();
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

  return len === 0 ? (
    <div className="py-14 text-center text-zinc-500">
      진행중인 구매리드가 없습니다.
    </div>
  ) : (
    <LeadGoods item={leadData[len - 1]} leadSuccess={leadSuccess} />
  );
}
