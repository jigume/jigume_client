import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Init() {
  const [nickname, setNickname] = useState('');
  return <Outlet context={{ nickname, setNickname }} />;
}
