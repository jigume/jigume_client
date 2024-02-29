import ItemComponent from '@src/pages/Map/components/BottomSheetComponent/components/ItemComponent';
import { BoardDTO, GoodsPageDTO } from '@src/types/goods';
import { NoticeSkeleton } from '@src/components/Skeltons';
import PlaceInfo from '../../PlaceInfo';

export default function ProductAbout({
  data,
  notice,
  isSuccess,
  isNoticeSuccess,
}: {
  data: GoodsPageDTO;
  notice: BoardDTO;
  isSuccess: boolean;
  isNoticeSuccess: boolean;
}) {
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
        <PlaceInfo
          coordinate={data?.coordinate}
          bg="bg-white"
          image={data?.goodsImagesList[0].goodsImgUrl}
        />

        {/* 공지사항 */}
        <div className="rounded-xl bg-white px-4 py-6">
          <div className="pb-3 text-xl">공지사항</div>
          <div>{notice.content}</div>
        </div>
      </div>
    </>
  );
}
