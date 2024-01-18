import { getToken } from '@src/utils';
import axios from 'axios';

const jigumeAxios = axios.create({
  headers: {
    Authorization: `Bearer ${getToken().accessToken}`,
    withCredentials: true,
    crossDomain: true,
    credentials: 'include',
  },
});
export default jigumeAxios;
