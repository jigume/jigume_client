import axios from 'axios';
import { backURL } from '../../common';

export const getGoods = async () => {
  const response = await axios(`${backURL}/api/goods`, {
    withCredentials: true,
  }).then((res) => {
    return res.data;
  });

  return response;
};

export const getGoods2 = async () => {
  const response = await axios(`${backURL}/api/goods`).then((res) =>
    console.log(res),
  );
};
