import axios from 'axios';

import { backURL2 } from '../../common';

const getGoods = async () => {
  const response = await axios(`${backURL2}/api/goods`, {
    withCredentials: true,
  }).then((res) => {
    return res.data;
  });

  return response;
};

export default getGoods;
