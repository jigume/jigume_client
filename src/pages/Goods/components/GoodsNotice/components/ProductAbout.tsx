import ItemComponent from '@src/pages/Map/components/BottomSheetComponent/components/ItemComponent';
import { GoodsPageDTO } from '@src/types/goods';
import { useMutation } from 'react-query';
import { getNotice } from '@src/api/goods';
import { useEffect } from 'react';
import { NoticeSkeleton } from '@src/components/Skeltons';
import PlaceInfo from '../../PlaceInfo';

export default function ProductAbout({
  data,
  isSuccess,
}: {
  data: GoodsPageDTO;
  isSuccess: boolean;
}) {
  const {
    data: notice,
    mutate: getGoodsNotice,
    isSuccess: isNoticeSuccess,
  } = useMutation('goodsNotice', () =>
    getNotice(data.goodsId as number, data.boardId as number)
  );

  useEffect(() => {
    if (isSuccess) getGoodsNotice();
  }, [isSuccess]);

  if (!isSuccess || !isNoticeSuccess) return <NoticeSkeleton />;

  return (
    <>
      {/* 상품 정보 */}
      <div className="w-full bg-white">
        <ItemComponent
          goods={{
            goodsId: data?.goodsId,
            goodsName: data?.goodsName,
            sellerInfoDto: data?.sellerInfoDto,
            goodsPrice: data?.goodsPrice,
            goodsDeliveryPrice: data?.deliveryFee,
            goodsOrderCount: data?.goodsOrderCount,
            discountDeliveryPrice: data?.discountDeliveryPrice,
            repImgUrl: data?.goodsImagesList[0]?.goodsImgUrl || '',
            goodsStatus: data?.goodsStatus,
            categoryId: data?.categoryId,
          }}
        />
      </div>

      <div className="flex flex-col gap-2 bg-gray-100 px-4 pt-8">
        {/* 위치 정보 */}
        <PlaceInfo coordinate={data?.coordinate} bg="bg-white" />

        {/* 공지사항 */}
        <div className="rounded-xl bg-white px-4 py-6">
          <div className="pb-3 text-xl">공지사항</div>
          <div>{notice.content}</div>
        </div>
      </div>
    </>
  );
}
