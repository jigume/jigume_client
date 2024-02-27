import { getToken } from '@src/utils';
import axios from 'axios';

export const jigumeAxios = axios.create({
  headers: {
    withCredentials: true,
    crossDomain: true,
    credentials: 'include',
  },
});

export const axiosHeaderAuth = {
  Authorization: `Bearer ${getToken().accessToken}`,
};
