import axios from 'axios';
import { TokenProviderType } from '@src/types/user';
import { InitUserType } from '@src/pages/Auth/components/Init/index.d';
import { NewProfileType } from '@src/pages/Mypage/index.d';
import { AuthType } from '@src/types/data';
import img0 from '@src/asset/images/profiles/initProfile0.png';
import img1 from '@src/asset/images/profiles/initProfile1.png';
import img2 from '@src/asset/images/profiles/initProfile2.png';
import { Form } from 'react-router-dom';
import jigumeAxios from './axios';

const initProfiles = [img0, img1, img2];

/**
 * 신규 유저의 닉네임 등의 정보를 입력하여 role을 USER로 변경한다
 */
export const setNewUser = async (param: InitUserType) => {
  const randomIdx = Math.round(Math.random() * 2);

  const response = await jigumeAxios.post('/api/member/info', {
    nickname: param.nickname,
    longitude: 0,
    latitude: 0,
    profileImgUrl: param.image || initProfiles[randomIdx],
  });

  return response;
};

/**
 * 토큰 만료일을 확인하여 리프레시 토큰을 재발급 받는다
 */
export const handleRefreshToken = async (auth: AuthType) => {
  if (
    (auth?.expired as number) > new Date().getTime() ||
    !auth.accessToken ||
    !auth.refreshToken
  )
    return 'valid';

  const response = await jigumeAxios.post('/api/member/token', {
    refreshToken: auth.refreshToken,
  });

  return response.data;
};

/**
 * 인가코드를 통해 로그인 처리
 */
export const codeProvide = async (
  code: string | null,
  domain?: string
): Promise<TokenProviderType> => {
  /** @type {string} */
  if (!code) throw Error('인가코드가 옳바르지 않습니다.');

  const response: TokenProviderType = await axios
    .post(
      `/api/member/login?login-provider=${domain}&authorization-code=${code}`
    )
    .then((res) => res.data);

  return response;
};

export const kakaoLogout = async () => {
  // kakao 서버에 요청
  const response = await axios.post('https://kapi.kakao.com/v1/user/logout');
  return response;
};

export const checkNickname = async (nickname: string) => {
  const response = await jigumeAxios.get('/api/member/nickname', {
    params: {
      nickname,
    },
  });
  return response;
};

export const updateProfile = async (param?: File) => {
  const formData = new FormData();
  formData.append('multipartFile', param as File);

  const response = await jigumeAxios.post('/api/member/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
