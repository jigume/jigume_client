import { PreViewerMarker } from '@src/pages/Map/index.d';
import { stringLatLng2Arr } from '@src/utils';
import {
  BoardDTO,
  GetCommentsDTO,
  GoodSheetDTO,
  GoodsDetailDTO,
  Marker,
} from '@src/types/goods';
import qs from 'qs';
import { axiosHeaderAuth, jigumeAxios } from './axios';

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

  const response = await jigumeAxios
    .get(`/api/goods/marker?${query}`, {
      headers: axiosHeaderAuth,
    })
    .catch((res) => {
      throw Error(res);
    });

  return response.data;
};

export const getSheetGoods = async (
  preViewer: PreViewerMarker
): Promise<GoodsDetailDTO | 'retry'> => {
  // if (!preViewer) return 'retry';

  const response = await jigumeAxios
    .get(`/api/goods/${preViewer.goodsId}`, { headers: axiosHeaderAuth })
    .then((res) => res.data)
    .catch((res) => {
      throw Error(res);
    });

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
    // coordinateRequestDto: {
    //   latitude: center.getLat().toFixed(6),
    //   longitude: center.getLng().toFixed(6),
    //   latitudeDelta: (arr[1] - arr[0]).toFixed(6),
    //   longitudeDelta: (arr[3] - arr[2]).toFixed(6),
    // },
    // pageable: {
    //   page: 0,
    //   size: 10,
    //   sort: [],
    // },

    latitude: center.getLat().toFixed(6),
    longitude: center.getLng().toFixed(6),
    latitudeDelta: (arr[1] - arr[0]).toFixed(6),
    longitudeDelta: (arr[3] - arr[2]).toFixed(6),
  });

  const response = await jigumeAxios
    .get(`/api/goods/marker/list?${query}`, {
      headers: axiosHeaderAuth,
    })
    .catch((res) => {
      throw Error(res);
    });

  return response.data;
};

export const getGoodsPage = async (
  id: number | string
): Promise<GoodsDetailDTO> => {
  const response = await jigumeAxios
    .get(`/api/goods/${id}`, { headers: axiosHeaderAuth })
    .then((res) => res.data)
    .catch((res) => {
      throw Error(res);
    });

  return response;
};

export const setWishGoods = async ({
  id,
  isWished,
}: {
  id: number | string;
  isWished: boolean;
}) => {
  // await console.log('hello', isWished);

  const response = !isWished
    ? await jigumeAxios
        .post(`/api/wish/${id}`, {}, { headers: axiosHeaderAuth })
        .catch((res) => {
          throw Error(res);
        })
    : await jigumeAxios
        .delete(`/api/wish/${id}`, { headers: axiosHeaderAuth })
        .catch((res) => {
          throw Error(res);
        });

  return response.data;
};

export const deleteWishGoods = async (id: number | string) => {
  const response = await jigumeAxios
    .delete(`/api/wish/${id}`, { headers: axiosHeaderAuth })
    .then((res) => res.data)
    .catch((res) => {
      throw Error(res);
    });

  return response;
};

export const getNotice = async (
  goodsId: number | string,
  boardId: number | string
): Promise<BoardDTO> => {
  const response = await jigumeAxios
    .get(`/api/goods/${goodsId}/board/${boardId}`, { headers: axiosHeaderAuth })
    .then((res) => res.data)
    .catch((res) => {
      throw Error(res);
    });

  return response;
};

export const getComment = async (
  goodsId: number | string,
  boardId: number | string
): Promise<GetCommentsDTO> => {
  const response = await jigumeAxios
    .get(`/api/goods/${goodsId}/board/${boardId}/comment`, {
      headers: axiosHeaderAuth,
    })
    .then((res) => res.data)
    .catch((res) => {
      throw Error(res);
    });

  return response;
};

export const postCommentAtBoard = async (
  goodsId: number | string,
  boardId: number | string,
  content: string
) => {
  const response = await jigumeAxios
    .post(
      `/api/goods/${goodsId}/board/${boardId}/comment`,
      {
        content,
      },
      { headers: axiosHeaderAuth }
    )
    .then((res) => res.data)
    .catch((res) => {
      throw Error(res);
    });

  return response;
};

export const postCommentAtComment = async ({
  goodsId,
  boardId,
  parentCommentId,
  content,
}: {
  goodsId: number | string;
  boardId: number | string;
  parentCommentId: number;
  content: string;
}) => {
  const response = await jigumeAxios
    .post(
      `/api/goods/${goodsId}/board/${boardId}/comment/reply`,
      {
        parentCommentId,
        content,
      },
      { headers: axiosHeaderAuth }
    )
    .then((res) => res.data)
    .catch((res) => {
      throw Error(res);
    });

  return response;
};

export const postModifyNotice = async ({
  goodsId,
  boardId,
  boardContent,
}: {
  goodsId: number | string;
  boardId: number | string;
  boardContent: string;
}) => {
  const response = await jigumeAxios
    .post(
      `/api/goods/${goodsId}/board/${boardId}`,
      {
        boardContent,
      },
      { headers: axiosHeaderAuth }
    )
    .then((res) => res.data)
    .catch((res) => {
      throw Error(res);
    });

  return response;
};
