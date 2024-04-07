import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getGoodsPage } from '@src/api/goods';
import { useRecoilState } from 'recoil';
import { AuthType } from '@src/types/data';
import { authState } from '@src/data';

export default function Goods() {
  const { idx } = useParams();
  const [auth] = useRecoilState<AuthType>(authState);

  const { data: goods, isSuccess } = useQuery('goodsDetail', () =>
    getGoodsPage(idx as string, auth.accessToken as string)
  );

  return <Outlet context={{ goods, isSuccess }} />;
}
