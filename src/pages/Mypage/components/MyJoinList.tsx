import { GoodsStatus } from '@src/types/goods';
import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OrderHistoryDto } from '@src/types/mypage';
import { getdDay, setComma } from '@src/utils';
import { MyPageContextType } from '../index.d';

const transitionValue = { bounce: 0.1, duration: 0.15 };

function JoinItems({
  items,
  filter,
  isLoading,
}: {
  items: OrderHistoryDto[];
  filter: GoodsStatus;
  isLoading: boolean;
}) {
  const processing = items?.filter((item) => item.goodsStatus === 'PROCESSING');
  const ended = items?.filter((item) => item.goodsStatus === 'END');

  if (isLoading)
    return (
      <div className="flex flex-col gap-3 px-4 py-5">
        <div className="h-4 w-48 animate-pulse rounded-sm bg-zinc-300" />
        <div className="flex gap-3">
          <div className="aspect-square size-16 animate-pulse rounded-md bg-zinc-300" />
          <div className="flex flex-col gap-3">
            <div className="h-3 w-40 animate-pulse rounded-sm bg-zinc-300" />
            <div className="h-3 w-32 animate-pulse rounded-sm bg-zinc-300" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-1/2 animate-pulse rounded-lg bg-zinc-300" />
          <div className="h-10 w-1/2 animate-pulse rounded-lg bg-zinc-300" />
        </div>
      </div>
    );

  return (
    <motion.div
      className="flex w-[200%] flex-row"
      animate={{ translateX: filter === 'PROCESSING' ? '0%' : '-50%' }}
      transition={transitionValue}
    >
      {/* 진행 중 */}
      <div className="w-full divide-y">
        {processing.length !== 0 ? (
          processing.map((item) => (
            <div className="flex flex-col gap-3 px-4 py-5" key={item.goodsId}>
              <div className="text-zinc-500">
                공동 구매 완료까지 {getdDay(item.goodsLimitTime)}
              </div>
              <div className="flex gap-3">
                <img
                  src={item.repImgUrl}
                  alt="상품 이미지"
                  className="size-16 rounded-md object-cover"
                />
                <div className="flex flex-col gap-1 font-light">
                  <div>{item.goodsName}</div>
                  <div className="text-sm text-zinc-500">
                    배송비: {setComma(item.goodsDeliveryPrice)}원 /{' '}
                    <span className="font-bold text-yellow-500">
                      {item.goodsOrderCount}
                    </span>{' '}
                    명 분할 중
                  </div>
                </div>
              </div>
              <div className="relative flex h-11 gap-2 text-sm font-light">
                <div className="h-full w-1/2 rounded-lg border text-center leading-[2.75rem]">
                  구매 공지방으로 이동하기
                </div>
                <Link
                  className="h-full w-1/2 rounded-lg bg-success text-center leading-[2.75rem] text-white"
                  to={`/goods/${item.boardId}`}
                >
                  구매폼으로 이동하기
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 pt-20 text-center text-zinc-600">
            참여중인 구매리드가 없습니다.
          </div>
        )}
      </div>

      {/* 완료 */}
      <div className="w-full divide-y ">
        {ended.length !== 0 ? (
          ended?.map((item) => (
            <div className="flex flex-col gap-3 px-4 py-5" key={item.goodsId}>
              <div className="text-zinc-500">공동 구매 마감</div>
              <div className="flex gap-3">
                <img
                  src={item.repImgUrl}
                  alt="상품 이미지"
                  className="size-16 rounded-md object-cover grayscale"
                />
                <div className="flex flex-col gap-1 font-light">
                  <div>{item.goodsName}</div>
                  <div className="text-sm text-zinc-500">
                    배송비: {setComma(item.goodsDeliveryPrice)}원 /{' '}
                    <span className="font-bold text-yellow-500">
                      {item.goodsOrderCount}
                    </span>{' '}
                    명 분할 마감
                  </div>
                </div>
              </div>
              <Link
                className="h-11 w-full rounded-lg border text-center text-sm font-light leading-[2.75rem]"
                to={`/goods/${item.boardId}`}
              >
                구매 공지방으로 이동하기
              </Link>
            </div>
          ))
        ) : (
          <div className="px-4 pt-20 text-center text-zinc-600">
            참여중인 구매리드가 없습니다.
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function MyJoinList() {
  const [filter, setFilter] = useState<GoodsStatus>('PROCESSING');
  const { setProfileHeader, joinData, joinLoading } =
    useOutletContext<MyPageContextType>();

  useEffect(() => {
    setProfileHeader({ title: '구매 참여 내역', isAlert: false });
  }, []);

  return (
    <>
      {/* header */}
      <div className="relative flex h-14 w-full justify-center border-b-[1px]">
        <div
          className="w-1/2 self-center text-center"
          onClick={() => setFilter('PROCESSING')}
        >
          구매 참여 중
        </div>
        <div
          className="w-1/2 self-center text-center"
          onClick={() => setFilter('END')}
        >
          구매 참여 완료
        </div>
        <motion.div
          className="absolute bottom-0 right-1/2 h-1 w-1/2 bg-success "
          animate={{ translateX: filter === 'PROCESSING' ? '0%' : '100%' }}
          transition={transitionValue}
        />
      </div>

      <JoinItems items={joinData} filter={filter} isLoading={joinLoading} />
    </>
  );
}
