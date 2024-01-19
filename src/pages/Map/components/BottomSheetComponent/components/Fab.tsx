import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationIcon from '../../../../../asset/icon/NavigationIcon.svg';
import EditIcon from '../../../../../asset/icon/EditIcon.svg';

export default function Fab({
  handleToCenter,
  onlyCurr,
}: {
  handleToCenter: () => void;
  onlyCurr: boolean;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="cursor-pointer rounded-full bg-white p-2 drop-shadow transition-all duration-300 ease-in-out active:scale-90"
        onClick={() => handleToCenter()}
      >
        <img className="size-6" src={NavigationIcon} alt="현재위치로" />
      </div>
      {!onlyCurr && (
        <div
          className="flex cursor-pointer flex-row items-center gap-1 rounded-full bg-gray-900 px-[20px] drop-shadow transition-all duration-300 ease-in-out active:scale-95"
          onClick={() => navigate('/register')}
        >
          <img className="size-4" src={EditIcon} alt="수정" />
          <span className="h6 mb-0 min-w-fit text-white">공구 열기</span>
        </div>
      )}
    </>
  );
}
