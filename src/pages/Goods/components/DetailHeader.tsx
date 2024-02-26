import React from 'react';
import ChevronLeft from '@src/asset/icon/chevronLeft.svg';
import { useNavigate } from 'react-router-dom';

export default function DetailHeader({
  scrollDown,
  rightMenu,
}: {
  scrollDown?: boolean;
  rightMenu?: JSX.Element;
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`absolute left-1/2 top-0 z-50 flex h-[48px] w-full max-w-screen-sm -translate-x-1/2 items-center justify-between px-4 ${scrollDown ? 'bg-white' : 'bg-transparent'}`}
    >
      <button onClick={() => navigate(-1)}>
        <img
          className="h-12 w-10 cursor-pointer px-1 py-2"
          src={ChevronLeft}
          alt="뒤로가기"
        />
      </button>
      <span>{rightMenu}</span>
    </div>
  );
}

DetailHeader.defaultProps = {
  scrollDown: true,
  rightMenu: undefined,
};
