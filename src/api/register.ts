import axios from 'axios';
import { GoodsData } from '@src/types/register';
import jigumeAxios from './axios';

const postGoods = async (
  images: File[],
  goodsDto_: GoodsData
): Promise<string> => {
  // image fime
  const imageFormData = new FormData();
  images.forEach((item, idx) => imageFormData.append(`images[${idx}]`, item));

  const blobData = new Blob([JSON.stringify(goodsDto_)], {
    type: 'application/json',
  });

  const formData = new FormData();
  formData.append('goodsSaveDto', blobData);
  formData.append('repImg', '0');
  images.forEach((item) => formData.append(`images`, item));

  const response = await jigumeAxios()
    .post('/api/goods/new', {
      params: { repImg: 0 },
      data: formData,
    })
    .then((res) => res.data);

  return response;
};

export default postGoods;
