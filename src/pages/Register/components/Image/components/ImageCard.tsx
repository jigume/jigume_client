import React from 'react';
import CloseIcon from '../../../../../asset/icon/CloseIcon.svg';

export default function ImageCard({
  image,
  onClick,
}: {
  image: string;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}) {
  return (
    <div className="relative mt-6 inline-flex aspect-square w-full shrink-0 justify-center rounded-lg bg-white">
      <img
        src={image}
        className="box-content h-full w-full rounded-lg border border-gray-100 bg-gray-300 object-cover"
        alt="상품 이미지"
      />
      {/* close button */}
      <span
        className="absolute right-[2px] top-[2px] inline-flex -translate-y-1/2 translate-x-1/2 cursor-pointer items-center rounded-full bg-white p-1.5 text-white shadow-[0px_1px_3px_#0003]"
        onClick={onClick}
      >
        <img
          src={CloseIcon}
          className="relative top-[1px] inline-block leading-7"
          alt="상품 삭제하기"
        />
      </span>
    </div>
  );
}
