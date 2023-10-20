import axios from 'axios';

const recoilLocal = JSON.parse(localStorage.getItem('recoil-persist'));
const { accessToken, refreshToken, expired } = recoilLocal?.jigumeAuth ?? {};

const TokenedAxios = axios.create({
  headers: { Authorization: `Bearer ${accessToken}` },
  withCredentials: true,
  crossDomain: true,
  credentials: 'include',
});

/**
 * 신규 유저의 닉네임 등의 정보를 입력하여 role을 USER로 변경한다
 * @param {object} param
 * @param {string} param.nickname 닉네임
 * @param {object} param.position position
 * @param {number} param.position.lat latitude
 * @param {number} param.position.lng longitude
 * @param {string} param.image Image URL
 */
export const setNewUser = async (param) => {
  const query = {
    nickname: param.nickname,
    mapX: param.position.lng,
    mapY: param.position.lat,
    profileImgUrl: param.image,
  };
  const result = await TokenedAxios.post('/api/member/new', { query });

  return result;
};

/**
 * 토큰 만료일을 확인하여 리프레시 토큰을 재발급 받는다
 * @returns void
 */
export const handleRefreshToken = async () => {
  // token valid
  if (new Date(expired) > new Date().getTime()) return 'valid';
  if (!accessToken || !refreshToken) return 'valid';

  const response = await TokenedAxios.post('/api/member/token', {
    refreshToken,
  });
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
  /** @type {string} */
  if (!code) {
    throw Error('인가코드가 옳바르지 않습니다.');
  }
  const response = await axios.post(
    `/api/member/login?login-provider=kakao&authorization-code=${code}`,
  );
  return response;
};
