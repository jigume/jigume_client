import axios from 'axios';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { backURL } from '../../../common';
import Loading from '../../Map/components/Loading';
import { authState } from '../../../recoil';

export default function Auth() {
  const [, setUser] = useRecoilState(authState);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const codeProvide = async () => {
    if (!code) {
      return Error('인가코드가 옳바르지 않습니다.');
    }
    const response = await axios.post(
      `${backURL}/api/member/login?login-provider=kakao&authorization-code=${code}`,
    );
    return response;
  };

  useQuery('oauth', codeProvide, {
    retry: false,
    onSuccess: (res) => {
      setUser((prev) => {
        console.log(res);
        return {
          ...prev,
          role: 'USER',
          token: res.data.tokenDto.accessToken,
          re_token: res.data.tokenDto.refreshToken,
        };
      });
    },
    onError: (err) => console.log(err),
  });

  return (
    <Loading
      onClick={() =>
        setUser((prev) => ({
          ...prev,
          role: 'GUEST',
        }))
      }
    />
  );
}
