import { MemberInfoDto } from '@src/types/user';
import { OrderHistoryDto, SellHistoryDto } from '@src/types/mypage';
import { axiosHeaderAuth, jigumeAxios } from './axios';

export const getProfile = async (
  accessToken: string
): Promise<MemberInfoDto> => {
  const response = await jigumeAxios
    .get('/api/member/profile', {
      headers: { ...axiosHeaderAuth(accessToken) },
    })
    .catch((res) => {
      throw Error(res);
    });

  return response.data;
};

export const getProgressLead = async (
  accessToken: string
): Promise<SellHistoryDto[]> => {
  const response = await jigumeAxios
    .get('/api/sell/PROCESSING', {
      headers: { ...axiosHeaderAuth(accessToken) },
    })
    .catch((res) => {
      throw Error(res);
    });

  return response.data;
};

export const getProgressJoin = async (
  accessToken: string
): Promise<OrderHistoryDto[]> => {
  const response = await jigumeAxios
    .get('/api/order/PROCESSING', {
      headers: { ...axiosHeaderAuth(accessToken) },
    })
    .catch((res) => {
      throw Error(res);
    });

  return response.data;
};
