import axios from 'axios';

const jigumeAxios = () => {
  const local = localStorage.getItem('recoil-persist');
  const token = JSON.parse(local as string).jigumeAuth;
  if (!token.accessToken) throw Error('accessToken is not exist');

  return axios.create({
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  });
};

export default jigumeAxios;
