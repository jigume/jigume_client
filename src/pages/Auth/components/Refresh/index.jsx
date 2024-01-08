import React from 'react';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { Outlet } from 'react-router-dom';
import { authState, initAuth, initUser, userState } from '../../../../data';
import { handleRefreshToken } from '../../../../api/user';

export default function Refresh() {
  const [, setAuth] = useRecoilState(authState);
  const [, setUser] = useRecoilState(userState);

  useQuery('refresh', handleRefreshToken, {
    retry: false,
    onSuccess: (res) => {
      if (res === 'valid') return;

      console.log('토큰이 만료되었습니다.');
      setAuth((prev) => ({
        ...prev,
        accessToken: res.accessToken,
      }));
    },
    onError: () => {
      setAuth(initAuth);
      setUser(initUser);
    },
  });

  return <Outlet />;
}
