import jigumeAxios from './axios';

const getProfile = async () => {
  const response = await jigumeAxios().get('/api/member/profile');

  return response;
};

export default getProfile;
