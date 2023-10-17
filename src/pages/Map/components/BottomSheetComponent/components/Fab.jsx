import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationIcon from '../../../../../asset/icon/NavigationIcon.svg';
import EditIcon from '../../../../../asset/icon/EditIcon.svg';

export default function Fab({ handleToCenter }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="p-2 bg-white rounded-full cursor-pointer drop-shadow active:scale-90 transition-all ease-in-out duration-300"
        onClick={() => handleToCenter()}
      >
        <img className="w-6 h-6" src={NavigationIcon} />
      </div>
      <div
        className="flex flex-row gap-1 bg-gray-900 items-center px-[20px] rounded-full cursor-pointer drop-shadow active:scale-95 transition-all ease-in-out duration-300"
        onClick={() => navigate('/register')}
      >
        <img className="w-4 h-4" src={EditIcon} />
        <span className="h6 mb-0 text-white min-w-fit">공구 열기</span>
      </div>
    </>
  );
}
