import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthType, UserType } from '@src/types/data';
import { authState, initAuth, initUser, userState } from '@src/data';
import { handleRefreshToken } from '@src/api/user';
import { useEffect } from 'react';

export default function Refresh() {
  const [auth, setAuth] = useRecoilState<AuthType>(authState);
  const [, setUser] = useRecoilState<UserType>(userState);
  const location = useLocation();

  const { refetch } = useQuery('refresh', () => handleRefreshToken(auth), {
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

  useEffect(() => {
    refetch();
  }, [location.pathname]);

  return <Outlet />;
}
