import React from 'react';
import ChevronLeft from '@src/asset/icon/chevronLeft.svg';
import { useNavigate } from 'react-router-dom';

export default function NoticeModifyHeader({
  curr,
  prev,
  setIsConfirm,
  rightMenu,
}: {
  curr: string;
  prev: string;
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  rightMenu: JSX.Element;
}) {
  const navigate = useNavigate();

  const handleGoingBack = () => {
    if (curr === prev) {
      // console.log('변동사항 없음');
      navigate(-1);
    } else {
      // console.log('변동사항 있음');
      setIsConfirm(true);
    }
  };
  return (
    <div className="absolute left-1/2 top-0 z-50 flex h-[48px] w-full max-w-screen-sm -translate-x-1/2 items-center justify-between bg-white px-4">
      <button onClick={handleGoingBack}>
        <img
          className="h-12 w-10 cursor-pointer px-1 py-2"
          src={ChevronLeft}
          alt="뒤로가기"
        />
      </button>
      {rightMenu}
    </div>
  );
}
