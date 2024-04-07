import { getComment, getNotice } from '@src/api/goods';
import { useMutation } from 'react-query';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { authState } from '@src/data';
import { AuthType } from '@src/types/data';
import { useRecoilState } from 'recoil';
import { GoodsContextType } from '../../index.d';

export default function GoodsNotice() {
  const { goods, isSuccess } = useOutletContext<GoodsContextType>();
  const [auth] = useRecoilState<AuthType>(authState);

  const {
    data: notice,
    mutate: getGoodsNotice,
    isSuccess: isNoticeSuccess,
  } = useMutation('goodsNotice', () =>
    getNotice(
      goods.goodsPageDto.goodsId as number,
      goods.goodsPageDto.boardId as number,
      auth.accessToken as string
    )
  );

  const {
    data: comment,
    mutate: getGoodsComment,
    isSuccess: isCommentSuccess,
  } = useMutation('goodsNotice', () =>
    getComment(
      goods.goodsPageDto.goodsId as number,
      goods.goodsPageDto.boardId as number,
      auth.accessToken as string
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
