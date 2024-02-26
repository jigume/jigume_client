import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getGoodsPage } from '@src/api/goods';

export default function Goods() {
  const { idx } = useParams();

  const { data: goods, isSuccess } = useQuery('goodsDetail', () =>
    getGoodsPage(idx as string)
  );

  return <Outlet context={{ goods, isSuccess }} />;
}
