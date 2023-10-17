import axios from 'axios';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import Loading from '../../Map/components/Loading';
import { authState } from '../../../recoil';

export default function Auth() {
  const [, setAuth] = useRecoilState(authState);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const codeProvide = async () => {
    if (!code) {
      return Error('인가코드가 옳바르지 않습니다.');
    }
    const response = await axios.post(
      `/api/member/login?login-provider=kakao&authorization-code=${code}`,
    );
    return response;
  };

  useQuery('oauth', codeProvide, {
    retry: false,
    onSuccess: (res) => {
      setAuth((prev) => {
        return {
          ...prev,
          role: 'USER',
          accessToken: res.data.tokenDto.accessToken,
          refreshToken: res.data.tokenDto.refreshToken,
        };
      });
    },
    onError: (err) => Error(err),
  });

  return (
    <Loading
      onClick={() =>
        setAuth((prev) => ({
          ...prev,
          role: 'GUEST',
        }))
      }
    />
  );
}
