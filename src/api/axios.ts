import { backURL } from '@src/common';
import axios from 'axios';

export const jigumeAxios = axios.create({
  baseURL: backURL,
  headers: {
    withCredentials: true,
    crossDomain: true,
    credentials: 'include',
  },
});

export const axiosHeaderAuth = (token?: string) => {
  return { Authorization: `Bearer ${token}` };
};
