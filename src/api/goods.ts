import { PreViewerMarker } from '@src/pages/Map/index.d';
import { stringLatLng2Arr } from '@src/utils';
import { GoodSheetDTO, GoodsDetailDTO, Marker } from '@src/types/goods';
import qs from 'qs';
import jigumeAxios from './axios';

export const getGoodsList = async (
  map: kakao.maps.Map | null
): Promise<Marker[] | 'retry'> => {
  if (!map) return 'retry';

  const center = map.getCenter();
  const bounds = map.getBounds();
  const arr = stringLatLng2Arr(bounds);

  // 인코딩
  const query = qs.stringify({
    latitude: center.getLat().toFixed(6),
    longitude: center.getLng().toFixed(6),
    latitudeDelta: (arr[1] - arr[0]).toFixed(6),
    longitudeDelta: (arr[3] - arr[2]).toFixed(6),
  });

  const response = await jigumeAxios.get(`/api/goods/marker?${query}`);

  return response.data;
};

export const getSheetGoods = async (
  preViewer: PreViewerMarker,
  map: kakao.maps.Map | null
): Promise<GoodsDetailDTO | 'retry'> => {
  // if (!preViewer) return 'retry';

  const response = await jigumeAxios
    .get(`/api/goods/${preViewer.goodsId}/page`)
    .then((res) => res.data);

  return response;
};

export const getSheetList = async (
  map: kakao.maps.Map | null
): Promise<GoodSheetDTO | 'retry'> => {
  if (!map) return 'retry';

  const center = map.getCenter();
  const bounds = map.getBounds();
  const arr = stringLatLng2Arr(bounds);

  // 특수문자 인코딩
  const query = qs.stringify({
    coordinateRequestDto: {
      latitude: center.getLat().toFixed(6),
      longitude: center.getLng().toFixed(6),
      latitudeDelta: (arr[1] - arr[0]).toFixed(6),
      longitudeDelta: (arr[3] - arr[2]).toFixed(6),
    },
    pageable: {
      page: 0,
      size: 5,
      sort: '',
    },
  });

  const response = await jigumeAxios
    .get(`/api/goods/list?${query}`)
    .then((res) => res.data);

  console.log(response);

  return response;
};

export const getGoodsPage = async (
  id: number | string
): Promise<GoodsDetailDTO> => {
  const response = await jigumeAxios
    .get(`/api/goods/${id}`)
    .then((res) => res.data);

  return response;
};
