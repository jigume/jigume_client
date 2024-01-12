import axios from 'axios';
import { PreViewerMarker } from '@src/pages/Map/index.d';
import { stringLatLng2Arr } from '@src/utils';
import { GoodsMarkerListType } from '@src/types/goods';
import jigumeAxios from './axios';

export const getGoodsList = async (
  bound: kakao.maps.LatLngBounds | null
): Promise<GoodsMarkerListType | 'retry'> => {
  if (!bound) return 'retry';

  const boundArr = stringLatLng2Arr(bound);

  const response = await jigumeAxios()
    .get('/api/goods/marker/list', {
      params: {
        maxX: boundArr[3],
        minX: boundArr[2],
        maxY: boundArr[1],
        minY: boundArr[0],
      },
    })
    .then((res) => res.data);
  return response;
};

export const getSheetGoods = async (preViewer: PreViewerMarker) => {
  if (!preViewer) return 'retry';

  const response = await jigumeAxios().get(`/api/goods/${preViewer.goodsId}`);

  return response;
};

export const getSheetList = (
  preViewer: PreViewerMarker,
  bound: kakao.maps.LatLngBounds
) => {
  if (!preViewer && !bound) return 'retry';

  const boundArr = stringLatLng2Arr(bound);

  const response = jigumeAxios()
    .get('/api/goods/list', {
      params: {
        maxX: boundArr[3],
        minX: boundArr[2],
        maxY: boundArr[1],
        minY: boundArr[0],
        pageable: {
          page: 0,
          size: 1,
        },
      },
    })
    .then((res) => console.log(res));

  return response;
};
