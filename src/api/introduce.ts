import jigumeAxios from './axios';

const getIntroduce = async (id: number) => {
  const response = await jigumeAxios()
    .get(`/api/goods/${id}/page`)
    .then((res) => res.data);

  return response;
};

export default getIntroduce;
