import { getComment, getNotice } from '@src/api/goods';
import { useMutation } from 'react-query';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { GoodsContextType } from '../../index.d';

export default function GoodsNotice() {
  const { goods, isSuccess } = useOutletContext<GoodsContextType>();

  const {
    data: notice,
    mutate: getGoodsNotice,
    isSuccess: isNoticeSuccess,
  } = useMutation('goodsNotice', () =>
    getNotice(
      goods.goodsPageDto.goodsId as number,
      goods.goodsPageDto.boardId as number
    )
  );

  const {
    data: comment,
    mutate: getGoodsComment,
    isSuccess: isCommentSuccess,
  } = useMutation('goodsNotice', () =>
    getComment(
      goods.goodsPageDto.goodsId as number,
      goods.goodsPageDto.boardId as number
    )
  );

  useEffect(() => {
    if (isSuccess) {
      getGoodsNotice();
      getGoodsComment();
    }
  }, [isSuccess]);

  return (
    <Outlet
      context={{
        goods,
        isSuccess,
        isNoticeSuccess,
        isCommentSuccess,
        notice,
        comment,
      }}
    />
  );
}
