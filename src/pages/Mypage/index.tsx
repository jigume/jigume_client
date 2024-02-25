import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getProfile, getProgressJoin, getProgressLead } from '@src/api/mypage';
import { useQuery } from 'react-query';
import MyPageHeader from './components/MyPageHeader';
import { ProfileHeaderType } from './index.d';

export default function Mypage() {
  const [profileHeader, setProfileHeader] = useState<ProfileHeaderType>({
    title: '마이페이지',
    isAlert: true,
  });

  // useQuery를 사용하여 fetch 함수 실행 (getProfile)
  const {
    data: profile,
    isSuccess,
    refetch,
  } = useQuery('getProfile', () => getProfile());

  const {
    data: leadData,
    isSuccess: leadSuccess,
    isLoading: leadLoading,
  } = useQuery('progressLead', getProgressLead);

  const {
    data: joinData,
    isSuccess: joinSuccess,
    isLoading: joinLoading,
  } = useQuery('progressJoin', getProgressJoin);

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
