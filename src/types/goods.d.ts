type GoodsStatus = 'PROCESSING' | 'END';

// 상품에 관한 DTO
export type GoodsListDTO = {
  goodsId: number;
  goodsName: string;
  sellerInfoDto: {
    sellerNickname: string;
    sellCount: number;
  };
  goodsPrice: number;
  goodsDeliveryPrice: number;
  goodsOrderCount: number;
  discountDeliveryPrice: number;
  repImgUrl: string;
  goodsStatus: GoodsStatus;
  categoryId: number;
};

export type GoodSheetDTO = {
  goodsListDtoList: GoodsListDTO[];
  hasNext: boolean;
};

// 지도의 마커용
export type Marker = {
  goodsId: number;
  categoryId: number;
  latitude: number;
  longitude: number;
  goodsRepImgUrl?: string;
};

export type GoodsMarkerListType = {
  markerList: Marker[];
};

type MemberStatus = 'ORDER' | 'SELLER' | 'NONE';

type Address = {
  mapX: number;
  mapY: number;
};

export type GoodsImageDto = {
  goodsImgUrl: string;
  repimgYn: boolean;
};

export type SellerInfoDto = {
  sellerNickname: string;
  sellCount: number;
};

// 상품 상세 페이지
export type GoodsPageDTO = {
  goodsId: number;
  goodsName: string;
  introduction: string;
  link: string;
  goodsPrice: number;
  deliveryFee: number;
  address: Address;
  goodsLimitCount: number;
  goodsLimitTime: string;
  categoryId: number;
  realDeliveryFee: number;
  goodsStatus: GoodsStatus;
  sellerInfoDto: SellerInfoDto;
  goodsOrderCount: number;
  discountDeliveryPrice: number;
  boardId: number;
  goodsImagesList: GoodsImageDto[];
};

export type GoodsDetailDTO = {
  memberStatus: MemberStatus;
  goodsPageDto: GoodsPageDTO;
};
