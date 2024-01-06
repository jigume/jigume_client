import axios from 'axios';
import img0 from '../asset/images/profiles/initProfile0.png';
import img1 from '../asset/images/profiles/initProfile1.png';
import img2 from '../asset/images/profiles/initProfile2.png';

const initProfiles = [img0, img1, img2];

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
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  if (!token.accessToken) throw Error('accessToken is not exist');

  const randomIdx = Math.round(Math.random() * 2);

  const response = await axios({
    method: 'post',
    url: '/api/member/info',
    data: {
      nickname: param.nickname,
      mapX: param.position.lng,
      mapY: param.position.lat,
      profileImgUrl: param.image || initProfiles[randomIdx],
    },
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  });

  return response;
};

/**
 * 토큰 만료일을 확인하여 리프레시 토큰을 재발급 받는다
 * @returns void
 */
export const handleRefreshToken = async () => {
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  // token valid

  if (
    new Date(token?.expired) > new Date().getTime() ||
    !token.accessToken ||
    !token.refreshToken
  )
    return 'valid';

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

export const checkNickname = async (nickname) => {
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  if (!token.accessToken) throw Error('accessToken is not exist');

  const response = await axios({
    url: `/api/member/nickname`,
    method: 'get',
    params: {
      nickname,
    },
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  });
  return response;
};

export const updateProfile = async (param) => {
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  if (!token.accessToken) throw Error('accessToken is not exist');

  const blobData = new Blob(
    [JSON.stringify({ nickname: param.nickname, profileImgUrl: param.image })],
    {
      type: 'application/json',
    },
  );

  const formData = new FormData();
  formData.append('UpdateMemberInfoDto', blobData);

  const response = await axios({
    method: 'post',
    url: '/api/member/info',
    data: formData,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  });
  console.log(response);

  return response;
};
