import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NextButtnType } from '.';

export default function NextButton({
  content = '다음으로 넘어가기',
  isDisabled,
  onClick,
  linkTo,
}: NextButtnType) {
  const navigate = useNavigate();
  return (
    <button
      disabled={isDisabled}
      className="text-md mb-6 h-12 w-full rounded-lg bg-success p-3 text-center text-white transition-all duration-300 ease-in-out active:scale-[99%] disabled:bg-gray-300 active:disabled:scale-100"
      onClick={() => {
        if (linkTo) navigate(linkTo);
      }}
    >
      {content}
    </button>
  );
}
