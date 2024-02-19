import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getProfile } from '@src/api/mypage';
import { useQuery } from 'react-query';
import MyPageHeader from './components/MyPageHeader';
import { ProfileHeaderType } from './index.d';

export default function Mypage() {
  const [profileHeader, setProfileHeader] = useState<ProfileHeaderType>({
    title: '마이페이지',
    isAlert: true,
  });

  // useQuery를 사용하여 fetch 함수 실행 (getProfile)
  const { data: profile, isSuccess } = useQuery('getProfile', () =>
    getProfile()
  );

  return (
    <>
      <MyPageHeader
        title={profileHeader.title}
        isAlert={profileHeader.isAlert}
      />
      <Outlet context={{ setProfileHeader, profile, isSuccess }} />
    </>
  );
}
