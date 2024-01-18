import { PreViewerMarker } from '@src/pages/Map/index.d';
import { stringLatLng2Arr } from '@src/utils';
import {
  GoodsDetailDTO,
  GoodsListDTO,
  GoodsMarkerListType,
} from '@src/types/goods';
import jigumeAxios from './axios';

export const getGoodsList = async (
  bounds: kakao.maps.LatLngBounds | null
): Promise<GoodsMarkerListType | 'retry'> => {
  if (!bounds) return 'retry';

  const boundArr = stringLatLng2Arr(bounds);
  const response = await jigumeAxios
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

export const getSheetGoods = async (
  preViewer: PreViewerMarker
): Promise<GoodsDetailDTO | 'retry'> => {
  if (!preViewer) return 'retry';

  const response = await jigumeAxios
    .get(`/api/goods/${preViewer.goodsId}/page`)
    .then((res) => res.data);

  return response;
};

export const getSheetList = async ({
  bounds,
}: {
  bounds: kakao.maps.LatLngBounds | undefined;
}): Promise<GoodsListDTO | 'retry'> => {
  if (!bounds) return 'retry';

  const boundArr = stringLatLng2Arr(bounds);
  const response = await jigumeAxios
    .get('/api/goods/list', {
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
