import React from 'react';
import { useQuery } from 'react-query';
import { GoodsPageDTO } from '@src/types/goods';
import getOpenGraph from '../../../api/og';
import OpenGraphViewer from '../../../components/OpenGraphViewer';

export default function ProductInfo({
  data,
}: {
  data: GoodsPageDTO | undefined;
}) {
  const openGraph = useQuery('introOpenGraph', () => getOpenGraph(data?.link), {
    retryDelay: 500,
  });

  let people = 0;
  if (data) people = data.deliveryFee / data.realDeliveryFee;

  return (
    <div
      className={`flex flex-col gap-4 py-3 ${
        !data && !openGraph.isSuccess ? 'animate-pulse' : ''
      }`}
    >
      <div>상품정보</div>

      <OpenGraphViewer openGraph={openGraph.data} link={data!.link} />
      <div className="flex flex-col gap-2">
        {data ? (
          <>
            <div>구매가: {data.goodsPrice.toLocaleString()} 원</div>
            <div>
              <span>{`배송비:
              ${data.deliveryFee.toLocaleString()} / `}</span>
              <span className="text-yellow-400">{people}</span>
              <span>명 분할 중</span>
            </div>
            <div>보증금: 0원</div>
          </>
        ) : (
          <>
            <div className="h-3 w-1/2 rounded bg-gray-300" />
            <div className="h-3 w-3/4 rounded bg-gray-300" />
            <div className="h-3 w-1/2 rounded bg-gray-300" />
          </>
        )}
      </div>
    </div>
  );
}
