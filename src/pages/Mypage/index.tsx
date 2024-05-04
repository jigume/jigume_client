import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getProfile, getProgressJoin, getProgressLead } from '@src/api/mypage';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { AuthType } from '@src/types/data';
import { authState, initAuth } from '@src/data';
import { ProfileHeaderType } from './index.d';
import MyPageHeader from './components/MyPageHeader';

export default function Mypage() {
  const [profileHeader, setProfileHeader] = useState<ProfileHeaderType>({
    title: '마이페이지',
    isAlert: true,
  });
  const [auth, setAuth] = useRecoilState<AuthType>(authState);

  // useQuery를 사용하여 fetch 함수 실행 (getProfile)
  const {
    data: profile,
    isSuccess,
    refetch,
  } = useQuery('getProfile', () => getProfile(auth.accessToken as string));

  const {
    data: leadData,
    isSuccess: leadSuccess,
    isLoading: leadLoading,
  } = useQuery(
    'progressLead',
    () => getProgressLead(auth.accessToken as string),
    {
      onError: () => {
        setAuth(initAuth);
      },
    }
  );

  const {
    data: joinData,
    isSuccess: joinSuccess,
    isLoading: joinLoading,
  } = useQuery(
    'progressJoin',
    () => getProgressJoin(auth.accessToken as string),
    {
      onError: () => {
        setAuth(initAuth);
      },
    }
  );

  return (
    <>
      <MyPageHeader
        title={profileHeader.title}
        isAlert={profileHeader.isAlert}
      />
      <Outlet
        context={{
          setProfileHeader,
          profile,
          isSuccess,
          refetch: () => refetch(),
          leadData,
          leadSuccess,
          leadLoading,
          joinData,
          joinSuccess,
          joinLoading,
        }}
      />
    </>
  );
}
