type GoodsStatus = 'PROCESSING' | 'END' | 'FINISHED';
type OrderStatus = 'PROCESSING' | 'CONFIRMATION';

// 상품에 관한 DTO
export type GoodsListDTO = {
  goodsId: number;
  goodsName: string;
  sellerInfoDto: SellerInfoDto;
  goodsPrice: number;
  goodsDeliveryPrice: number;
  goodsOrderCount: number;
  discountDeliveryPrice: number;
  repImgUrl?: string;
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

export type Address = {
  longitude: number;
  latitude: number;
};

export type GoodsImageDto = {
  goodsImgUrl: string;
  repimgYn: boolean;
};

export type SellerInfoDto = {
  sellerNickname: string;
  sellCount: number;
  sellerProfileImage: string;
};

// 상품 상세 페이지
export type GoodsPageDTO = {
  goodsId: number;
  goodsName: string;
  boardId: number;
  introduction: string;
  link: string;
  goodsPrice: number;
  deliveryFee: number;
  goodsDeposit: number;
  coordinate: Address;
  goodsLimitCount: number;
  goodsLimitTime: string;
  categoryId: number;
  realDeliveryFee: number;
  goodsStatus: GoodsStatus;
  sellerInfoDto: SellerInfoDto;
  goodsOrderCount: number;
  discountDeliveryPrice: number;
  goodsImagesList: GoodsImageDto[];
};

export type GoodsDetailDTO = {
  goodsMemberAuth: MemberStatus;
  goodsPageDto: GoodsPageDTO;
};

export type BoardDTO = {
  title: string;
  content: string;
  hostName: string;
  created_at: string;
  modified_at: string;
};

export type CommentDTO = {
  commentId: number;
  content: string;
  memberNickname: string;
  memberProfileUrl: string;
  created_at: string;
  modified_at: string;
  isDelete: boolean;
};

export type CommentWithReplyDTO = {
  parent: CommentDTO;
  reply: CommentDTO[];
};

export interface GetCommentsDTO {
  commentDtoList: CommentWithReplyDTO[];
  totalPages: number;
}
