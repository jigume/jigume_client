import React from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Outlet } from 'react-router-dom';
import { authState } from '../../recoil';

export default function Refresh() {
  const [user] = useRecoilState(authState);

  const handleRefreshToken = async () => {
    // if(user.acc)
    const response = await axios.post(
      '/api/member/token',
      {
        refreshToken: user.refreshToken,
      },
      {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        withCredentials: true,
        crossDomain: true,
        credentials: 'include',
      },
    );
    return response.data;
  };

  // useQuery('refresh', handleRefreshToken, { retry: false });

  return <Outlet />;
}
