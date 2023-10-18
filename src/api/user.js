import axios from 'axios';

const recoilLocal = JSON.parse(localStorage.getItem('recoil-persist'));
const { accessToken, refreshToken, expired } = recoilLocal?.jigumeAuth ?? {};

/**
 *
 * @param {query} query
 * @returns
 */
export const setNewUser = (data) => {
  const result = axios.post('/api/member/new', data.query, {
    headers: { Authorization: `Bearer ${accessToken}` },
    withCredentials: true,
    crossDomain: true,
    credentials: 'include',
  });

  return result;
};

export const handleRefreshToken = async () => {
  // token valid
  if (new Date(expired) > new Date().getTime()) return 'valid';

  const response = await axios.post(
    '/api/member/token',
    {
      refreshToken,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  );
  return response.data;
};

/**
 * 인가코드를 통해 로그인 처리
 * @param {string} code
 * @return {{
 *  tokenDto:{accessToken: string; refreshToken:string}
 *  baseRole: "ADMIN" | "USER" | "GUEST"
 * }}
 */
export const codeProvide = async (code) => {
  return {
    data: {
      baseRole: 'GUEST',
      tokenDto: { accessToken: '123', refreshToken: '123' },
    },
  };
  // /** @type {string} */
  // if (!code) {
  //   throw Error('인가코드가 옳바르지 않습니다.');
  // }
  // const response = await axios.post(
  //   `/api/member/login?login-provider=kakao&authorization-code=${code}`,
  // );
  // return response;
};
