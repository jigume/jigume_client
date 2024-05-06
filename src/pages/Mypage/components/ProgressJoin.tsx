import { useQuery } from 'react-query';
import { Link, useOutletContext } from 'react-router-dom';
import { OrderHistoryDto } from '@src/types/mypage';
import OpenGraphViewer from '../../../components/OpenGraphViewer';
import getOpenGraph from '../../../api/og';
import { MyPageContextType } from '../index.d';

function JoinGoods({ url, item }: { url: string; item: OrderHistoryDto }) {
  const openGraph = useQuery('introOpenGraph', () => getOpenGraph(url), {
    retryDelay: 500,
  });

  return (
    <>
      <div className="h-6 text-zinc-500">공동 구매 완료까지 D-5</div>
      <OpenGraphViewer openGraph={openGraph.data} link={url} imgSize="h-24" />

      <div className="flex gap-2 font-light">
        <div className="w-full rounded-lg border py-4 text-center text-xs">
          예상 결제 내역 확인하기
        </div>
        <Link
          className="w-full rounded-lg bg-success py-4 text-center text-xs text-white"
          to={`/buying/${item.goodsId}/notice`}
        >
          공지방으로 이동하기
        </Link>
      </div>
    </>
  );
}

export default function ProgressJoin() {
  const { joinData, joinLoading } = useOutletContext<MyPageContextType>();

  if (joinLoading)
    return (
      <div className="flex flex-col gap-4 py-2">
        <div className="h-6 w-40 animate-pulse rounded-sm bg-zinc-300" />
        <OpenGraphViewer imgSize="h-24" />
        {/* <div className="flex gap-2 font-light">
          <div className="w-full rounded-lg border py-3 text-center text-xs">
            예상 결제 내역 확인하기
          </div>
          <div className="w-full rounded-lg bg-success py-3 text-center text-xs text-white">
            공지방으로 이동하기
          </div>
        </div> */}
      </div>
    );

  return (
    <div className="flex flex-col gap-4 py-2">
      {joinData && joinData.length > 0 ? (
        <JoinGoods url={joinData[0].goodsLink as string} item={joinData[0]} />
      ) : (
        <div className="py-14 text-center text-zinc-500">
          참여중인 구매리드가 없습니다.
        </div>
      )}
    </div>
  );
}
