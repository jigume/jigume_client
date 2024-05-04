import axios from 'axios';
import { TokenProviderType } from '@src/types/user';
import { AuthType } from '@src/types/data';
import img0 from '@src/asset/images/profiles/initProfile0.png';
import img1 from '@src/asset/images/profiles/initProfile1.png';
import img2 from '@src/asset/images/profiles/initProfile2.png';
import { backURL } from '@src/common';
import { convertURLtoFile } from '@src/utils';
import { axiosHeaderAuth, jigumeAxios } from './axios';

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
  // console.log(auth);

  const response = await jigumeAxios
    .post(
      `/api/member/token?refreshToken=${auth.refreshToken}`,
      {},
      {
        headers: { ...axiosHeaderAuth(auth.accessToken) },
      }
    )
    .catch((err) => {
      throw Error(err);
    });

  return response.data;
};

/**
 * 인가코드를 통해 로그인 처리
 */
export const codeProvide = async (
  code: string | null,
  auth: AuthType
): Promise<TokenProviderType> => {
  /** @type {string} */
  if (!code) throw Error('인가코드가 옳바르지 않습니다.');

  const response: TokenProviderType = await axios
    .post(
      `${backURL}/api/member/login?login-provider=kakao&authorization-code=${code}`,
      {},
      {
        headers: { ...axiosHeaderAuth(code) },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      throw Error(err);
    });

  return response;
};

export const kakaoLogout = async (accessToken?: string) => {
  // kakao 서버에 요청
  const response = await axios
    .post(
      'https://kapi.kakao.com/v1/user/logout',
      {},
      { headers: axiosHeaderAuth(accessToken) }
    )
    .catch((err) => {
      throw Error(err);
    });

  return response;
};

export const checkNickname = async (nickname: string, accessToken?: string) => {
  const response = await jigumeAxios
    .get('/api/member/nickname', {
      headers: { ...axiosHeaderAuth(accessToken) },
      params: {
        nickname,
      },
    })
    .catch((err) => {
      throw Error(err);
    });

  return response;
};

export const updateProfile = async (accessToken: string, file?: File) => {
  const initProfiles = [img0, img1, img2];
  const formData = new FormData();

  if (!file) {
    const randomIdx = Math.round(Math.random() * 2);
    await convertURLtoFile(initProfiles[randomIdx]).then((res) => {
      formData.append('multipartFile', res);
    });
  } else {
    formData.append('multipartFile', file as File);
  }

  const response = await jigumeAxios
    .post('/api/member/profile', formData, {
      headers: {
        ...axiosHeaderAuth(accessToken),
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((err) => {
      throw Error(err);
    });

  return response.data;
};

/**
 * 신규 유저의 닉네임 등의 정보를 입력하여 role을 USER로 변경한다
 */
export const updateMemberInfo = async (param: {
  nickname: string;
  latitude: number;
  longitude: number;
  token: string;
  imageInput?: File;
  isImage: boolean;
}) => {
  const response = await jigumeAxios
    .post(
      '/api/member/info',
      {
        nickname: param.nickname,
        longitude: 0,
        latitude: 0,
      },
      {
        headers: { ...axiosHeaderAuth(param.token) },
      }
    )
    .then((res) => {
      if (param.isImage) updateProfile(param.token, param.imageInput);
      return res.data;
    })
    .catch((err) => {
      throw Error(err);
    });

  return response.data;
};
