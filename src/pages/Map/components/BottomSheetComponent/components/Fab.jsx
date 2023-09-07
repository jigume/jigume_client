import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationIcon from '../../../../../asset/icon/NavigationIcon.svg';
import EditIcon from '../../../../../asset/icon/EditIcon.svg';

export default function Fab() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="p-2 bg-white rounded-full cursor-pointer drop-shadow"
        onClick={() => navigate('/')}
      >
        <img className="w-6 h-6" src={NavigationIcon} />
      </div>
      <div
        className="flex flex-row gap-1 bg-gray950 items-center px-[20px] rounded-full cursor-pointer drop-shadow"
        onClick={() => navigate('/')}
      >
        <img className="w-4 h-4" src={EditIcon} />
        <span className="h6 mb-0 text-white min-w-fit">공구 열기</span>
      </div>
    </>
  );
}
