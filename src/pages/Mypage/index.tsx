import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MyPageHeader from './components/MyPageHeader';

export default function Mypage() {
  const [title, setTitle] = useState('마이페이지');
  return (
    <>
      <MyPageHeader title={title} />
      <Outlet context={{ setTitle }} />
    </>
  );
}
