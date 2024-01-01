import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChevronLeft from '../../../asset/icon/chevronLeft.svg';

export default function MyPageHeader({ title }) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex h-[48px] w-full max-w-screen-sm flex-row items-center px-4">
      <div onClick={() => navigate(-1)} className="pr-2">
        <img className="h-12 w-12 cursor-pointer p-2" src={ChevronLeft} />
      </div>
      <div className="font-bole mt-1">{title}</div>
    </div>
  );
}
