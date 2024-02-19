import { MemberInfoDto } from '@src/types/user';
import { OrderHistoryDto, SellHistoryDto } from '@src/types/mypage';
import jigumeAxios from './axios';

export const getProfile = async (): Promise<MemberInfoDto> => {
  const response = await jigumeAxios.get('/api/member/profile');

  return response.data;
};

export const getProgressLead = async (): Promise<SellHistoryDto[]> => {
  const response = await jigumeAxios.get('/api/sell/PROCESSING');

  return response.data;
};

export const getProgressJoin = async (): Promise<OrderHistoryDto[]> => {
  const response = await jigumeAxios.get('/api/order/PROCESSING');
  return response.data;
};
