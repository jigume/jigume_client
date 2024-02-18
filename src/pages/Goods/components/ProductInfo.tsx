import { useQuery } from 'react-query';
import { GoodsPageDTO } from '@src/types/goods';
import getOpenGraph from '../../../api/og';
import OpenGraphViewer from '../../../components/OpenGraphViewer';

export default function ProductInfo({
  // data,
  deliveryFee,
  realDeliveryFee,
  link,
  goodsPrice,
}: {
  // data: GoodsPageDTO | undefined;
  deliveryFee?: number;
  realDeliveryFee?: number;
  link?: string;
  goodsPrice?: number;
}) {
  const openGraph = useQuery('introOpenGraph', () => getOpenGraph(link), {
    retryDelay: 500,
  });

  let people = 0;
  if (deliveryFee && realDeliveryFee) people = deliveryFee / realDeliveryFee;

  return (
    <div
      className={`flex flex-col gap-4 py-3 ${
        !deliveryFee && !openGraph.isSuccess ? 'animate-pulse' : ''
      }`}
    >
      <div>상품정보</div>

      <OpenGraphViewer openGraph={openGraph.data} link={link as string} />
      <div className="flex flex-col gap-2">
        {goodsPrice && deliveryFee ? (
          <>
            <div>구매가: {goodsPrice.toLocaleString()} 원</div>
            <div>
              <span>{`배송비:
              ${deliveryFee.toLocaleString()} / `}</span>
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

ProductInfo.defaultProps = {
  deliveryFee: undefined,
  realDeliveryFee: undefined,
  link: undefined,
  goodsPrice: undefined,
};
