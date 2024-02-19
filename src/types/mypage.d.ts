import { GoodsStatus, OrderStatus, SellerInfoDto } from './goods';

export type SellHistoryDto = {
  goodsId: number;
  goodsLink: string;
  goodsName: string;
  sellerInfoDto: SellerInfoDto;
  goodsPrice: number;
  goodsDeliveryPrice: number;
  goodsOrderCount: number;
  discountDeliveryPrice: number;
  repImgUrl: string;
  goodsStatus: GoodsStatus;
  categoryId: number;
  boardid: number;
  sellId: number;
};

export type OrderHistoryDto = {
  goodsId: number;
  goodsLink: string;
  goodsName: string;
  sellerInfoDto: SellHistoryDto;
  goodsPrice: number;
  goodsDeliveryPrice: number;
  goodsOrderCount: number;
  discountDeliveryPrice: number;
  repImgUrl: string;
  goodsStatus: GoodsStatus;
  categoryId: number;
  boardId: number;
  orderId: number;
  orderStatus: OrderStatus;
};
