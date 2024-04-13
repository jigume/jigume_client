import {
  CategoryGroupCode,
  GoodsData,
  NearPlacesType,
} from '@src/types/register';
import axios from 'axios';
import { PositionType } from '@src/types/map';
import { axiosHeaderAuth, jigumeAxios } from './axios';

export const postGoods = async (
  images: File[],
  goodsDto_: GoodsData,
  position: PositionType,
  accessToken: string
): Promise<string> => {
  const imageFormData = new FormData();
  images.forEach((item, idx) => imageFormData.append(`images[${idx}]`, item));

  const blobData = new Blob([JSON.stringify(goodsDto_)], {
    type: 'application/json',
  });

  const formData = new FormData();
  formData.append('goodsSaveDto', blobData);
  images.forEach((item) => formData.append(`images`, item));

  const response = await jigumeAxios
    .post('/api/goods/new?repImg=0', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...axiosHeaderAuth(accessToken),
      },
    })
    .then(async (res) => {
      const goodsId = res.data;
      // console.log('GOODS ID', goodsId);
      await jigumeAxios
        .post(
          `/api/goods/${goodsId}/coordinate/new`,
          {
            latitude: position.lat,
            longitude: position.lng,
          },
          { headers: { ...axiosHeaderAuth(accessToken) } }
        )
        .then(async () => {
          await jigumeAxios
            .post(
              `/api/goods/${goodsId}/board`,
              {
                content: goodsDto_.boardContent,
              },
              { headers: { ...axiosHeaderAuth(accessToken) } }
            )
            .catch((err) => {
              throw Error(err);
            });
        })
        .catch((err) => {
          throw Error(err);
        });
      return res.data;
    })
    .catch((err) => {
      throw Error(err);
    });

  return response;
};

export const getPlaces = async ({
  position,
  CAT_CODE,
}: {
  position: PositionType | undefined;
  CAT_CODE: CategoryGroupCode;
}): Promise<NearPlacesType[]> => {
  const KAKAO_KEY = import.meta.env.VITE_KAKAO_REST_KEY;
  const url = 'https://dapi.kakao.com/v2/local/search/category.json';

  const response: NearPlacesType[] = await axios
    .get(url, {
      params: {
        category_group_code: CAT_CODE,
        x: position?.lng,
        y: position?.lat,
        radius: 1000,
      },
      headers: {
        Authorization: `KakaoAK ${KAKAO_KEY}`,
      },
    })
    .then((res) => {
      console.log(res.data.documents);
      return res.data.documents.map((item: NearPlacesType) => ({
        ...item,
        distance: Number(item.distance),
        x: Number(item.x),
        y: Number(item.y),
      }));
    });
  return response;
};
