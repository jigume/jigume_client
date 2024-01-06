import React from 'react';
import { useQuery } from 'react-query';
import OpenGraphViewer from '../../../components/OpenGraphViewer';
import getOpenGraph from '../../../api/og';

const tempUrl = 'https://product.29cm.co.kr/catalog/2272130';

export default function ProgressJoin() {
  const openGraph = useQuery('introOpenGraph', () => getOpenGraph(tempUrl), {
    retryDelay: 500,
  });

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="text-zinc-500">공동 구매 완료까지 D-5</div>

      <OpenGraphViewer
        openGraph={openGraph.isSuccess && openGraph.data}
        link={tempUrl}
        imgSize="h-24"
      />

      <div className="flex gap-2 font-light">
        <div className="w-full rounded-lg border py-4 text-center text-xs">
          예상 결제 내역 확인하기
        </div>
        <div className="w-full rounded-lg bg-success py-4 text-center text-xs text-white">
          공지방으로 이동하기
        </div>
      </div>
    </div>
  );
}
