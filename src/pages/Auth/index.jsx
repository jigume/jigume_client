import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { add } from 'date-fns';
import Loading from '../Map/components/Loading';
import { authState } from '../../recoil';
import { codeProvide } from '../../api/user';

export default function Auth() {
  const [, setAuth] = useRecoilState(authState);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useQuery('oauth', () => codeProvide(code), {
    retry: false,
    onSuccess: (res) => {
      setAuth((prev) => {
        return {
          ...prev,
          role: 'USER',
          accessToken: res.data.tokenDto.accessToken,
          refreshToken: res.data.tokenDto.refreshToken,
          expired: add(new Date(), { days: 1 }).getTime(),
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
