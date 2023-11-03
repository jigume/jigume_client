import axios from 'axios';

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
  const token = JSON.parse(localStorage.getItem('recoil-persist'));
  if (!token.accessToken) return undefined;

  const result = await axios({
    method: 'post',
    url: '/api/member/new',
    data: {
      nickname: param.nickname,
      mapX: param.position.lng,
      mapY: param.position.lat,
    },
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  });

  return result;
};

/**
 * 토큰 만료일을 확인하여 리프레시 토큰을 재발급 받는다
 * @returns void
 */
export const handleRefreshToken = async () => {
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  // token valid
  // new Date(token?.expired) > new Date().getTime() ||
  if (!token.accessToken || !token.refreshToken) return 'valid';

  const response = await axios({
    method: 'post',
    url: '/api/member/token',
    data: {
      refreshToken: token.refreshToken,
    },
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  });
  return response.data;
};

/**
 * 인가코드를 통해 로그인 처리
 * @param {string} code
 * @param {'kakao' | 'naver'} domain
 * @return {{
 *  tokenDto:{accessToken: string; refreshToken:string}
 *  baseRole: "ADMIN" | "USER" | "GUEST"
 * }}
 */
export const codeProvide = async (code, domain) => {
  /** @type {string} */
  if (!code) throw Error('인가코드가 옳바르지 않습니다.');

  const response = await axios.post(
    `/api/member/login?login-provider=${domain}&authorization-code=${code}`,
  );
  return response;
};

export const kakaoLogout = async (accessToken) => {
  if (!accessToken) throw Error('accessToken is not exist');
  // kakao 서버에 요청
  const response = await axios.post('https://kapi.kakao.com/v1/user/logout');
  return response;
};
