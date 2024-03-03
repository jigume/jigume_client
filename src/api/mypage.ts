import { MemberInfoDto } from '@src/types/user';
import { OrderHistoryDto, SellHistoryDto } from '@src/types/mypage';
import { axiosHeaderAuth, jigumeAxios } from './axios';

export const getProfile = async (): Promise<MemberInfoDto> => {
  const response = await jigumeAxios
    .get('/api/member/profile', {
      headers: axiosHeaderAuth,
    })
    .catch((res) => {
      throw Error(res);
    });

  return response.data;
};

export const getProgressLead = async (): Promise<SellHistoryDto[]> => {
  const response = await jigumeAxios
    .get('/api/sell/PROCESSING', {
      headers: axiosHeaderAuth,
    })
    .catch((res) => {
      throw Error(res);
    });

  return response.data;
};

export const getProgressJoin = async (): Promise<OrderHistoryDto[]> => {
  const response = await jigumeAxios
    .get('/api/order/PROCESSING', {
      headers: axiosHeaderAuth,
    })
    .catch((res) => {
      throw Error(res);
    });

  return response.data;
};
