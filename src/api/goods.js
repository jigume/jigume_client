import axios from 'axios';

export const getGoodsList = (map) => {
  console.log(map);
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  if (!token.accessToken) throw Error('accessToken is not exist');
  if (!map) return 'retry';

  const response = axios({
    url: `/api/goods/marker/list`,
    params: {
      minX: map.ha,
      maxX: map.oa,
      minY: map.qa,
      maxY: map.pa,
    },
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  });
  return response;
};

export const getSheetGoods = (preViewer) => {
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  if (!token.accessToken) throw Error('accessToken is not exist');
  if (!preViewer) return 'retry';

  const response = axios({
    url: `/api/goods/${preViewer.goodsId}/page`,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  });
  return response;
};

export const getSheetList = (preViewer, bounds) => {
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  if (!token.accessToken) throw Error('accessToken is not exist');
  if (!preViewer && !bounds) return 'retry';

  const response = axios({
    url: `/api/goods/list`,
    params: {
      minX: bounds.ha,
      maxX: bounds.oa,
      minY: bounds.qa,
      maxY: bounds.pa,
      pageable: {
        page: 0,
        size: 1,
      },
    },
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  });
  return response;
};
