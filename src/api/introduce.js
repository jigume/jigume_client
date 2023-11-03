import axios from 'axios';

const getIntroduce = async (id) => {
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  if (!token.accessToken) throw Error('accessToken is not exist');

  const response = await axios({
    url: `/api/goods/${id}/page`,
    headers: {
      'Authorization': `Bearer ${token.accessToken}`,
      'withCredentials': true,
      'crossDomain': true,
      'credentials': 'include',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.data);

  return response;
};

export default getIntroduce;
