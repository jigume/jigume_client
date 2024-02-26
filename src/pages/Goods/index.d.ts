import { GoodsDetailDTO } from '@src/types/goods';

export type GoodsContextType = {
  goods: GoodsDetailDTO;
  isSuccess: boolean;
};
export type PostCommentStateType = {
  value: string;
  targetCommentId: number;
};
