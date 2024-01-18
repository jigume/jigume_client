export type AddressType = {
  maxX: number;
  mapY: number;
};

// 상품 미리보기 오브젝트 @main
export interface PreViewerMarker {
  address: AddressType;
  categoryId: number;
  goodsId: number;
  goodsRepImgUrl?: string;
}
