import React from 'react';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { Outlet } from 'react-router-dom';
import { authState } from '../../../../recoil';
import { handleRefreshToken } from '../../../../api/user';

export default function Refresh() {
  const [, setAuth] = useRecoilState(authState);

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
  });

  return <Outlet />;
}
