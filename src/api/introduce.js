import axios from 'axios';

const getIntroduce = (id) => {
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  if (!token.accessToken) throw Error('accessToken is not exist');

  const response = axios({
    url: `/api/goods/${id}/page`,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  });

  return response;
};

export default getIntroduce;
