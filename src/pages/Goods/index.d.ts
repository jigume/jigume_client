import {
  Address,
  BoardDTO,
  GetCommentsDTO,
  GoodsDetailDTO,
} from '@src/types/goods';

export type GoodsContextType = {
  goods: GoodsDetailDTO;
  isSuccess: boolean;
};

export type GoodsNoticeContextType = {
  goods: GoodsDetailDTO;
  isSuccess: boolean;
  isNoticeSuccess: boolean;
  isCommentSuccess: boolean;
  notice: BoardDTO;
  comment: GetCommentsDTO;
  getGoodsComment: UseMutateFunction<GetCommentsDTO, unknown, void, unknown>;
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
