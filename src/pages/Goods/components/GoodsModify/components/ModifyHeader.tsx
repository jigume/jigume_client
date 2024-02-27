import React from 'react';
import ChevronLeft from '@src/asset/icon/chevronLeft.svg';
import { useNavigate } from 'react-router-dom';
import { GoodsModifyType } from '@src/pages/Goods/index.d';

export default function ModifyHeader({
  curr,
  prev,
  setIsConfirm,
}: {
  curr: GoodsModifyType;
  prev: GoodsModifyType;
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const handleGoingBack = () => {
    if (JSON.stringify(curr) === JSON.stringify(prev)) {
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
    </div>
  );
}
