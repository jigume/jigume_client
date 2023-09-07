import React from 'react';
import Title from './components/title';
import User from './components/user';

export default function TitleBox() {
  return (
    <div className="mt-[32px] md-[12px]">
      <Title />
      <User />
    </div>
  );
}
