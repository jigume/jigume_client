import { backURL } from '@src/common';
import { getToken } from '@src/utils';
import axios from 'axios';

export const jigumeAxios = axios.create({
  baseURL: backURL,
  headers: {
    withCredentials: true,
    crossDomain: true,
    credentials: 'include',
  },
});

export const axiosHeaderAuth = {
  Authorization: `Bearer ${getToken().accessToken}`,
};
