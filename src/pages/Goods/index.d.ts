import { Address, GoodsDetailDTO } from '@src/types/goods';

export type GoodsContextType = {
  goods: GoodsDetailDTO;
  isSuccess: boolean;
};
export type PostCommentStateType = {
  value: string;
  targetCommentId: number;
};

export type GoodsModifyType = {
  images: string[];
  imagesInput: File[];
  categoryId: number;
  goodsName: string;
  introduction: string;
  goodsPrice: number;
  deliveryFee: number;
  goodsLimitCount: number;
  goodsLimitTime: Date;
  coordinate: Address;
};
