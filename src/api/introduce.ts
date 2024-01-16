import { GoodsDetailDTO } from '@src/types/goods';
import jigumeAxios from './axios';

const getIntroduce = async (id: number | string): Promise<GoodsDetailDTO> => {
  const response = await jigumeAxios
    .get(`/api/goods/${id}/page`)
    .then((res) => res.data);

  return response;
};

export default getIntroduce;
