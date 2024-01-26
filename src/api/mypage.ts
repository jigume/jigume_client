import { MemberInfoDto } from '@src/types/user';
import jigumeAxios from './axios';

const getProfile = async (): Promise<MemberInfoDto> => {
  const response = await jigumeAxios.get('/api/member/profile');

  return response.data;
};

export default getProfile;
