import React from 'react';
import CloseIcon from '../../../../../asset/icon/CloseIcon.svg';

export default function ImageCard({ image, onClick }) {
  return (
    <div className="relative inline-flex flex-shrink-0 justify-center w-full aspect-square bg-white rounded-lg mt-6">
      <img
        src={image}
        className="w-full h-full object-cover rounded-lg bg-gray-300 border border-gray-100 box-content"
      />
      {/* close button */}
      <span
        className="absolute top-[2px] right-[2px] inline-flex items-center py-1.5 px-1.5 rounded-full transform -translate-y-1/2 translate-x-1/2 bg-white text-white shadow-[0px_1px_3px_#0003] cursor-pointer"
        onClick={onClick}
      >
        <img
          src={CloseIcon}
          className="leading-7 inline-block relative top-[1px]"
        />
      </span>
    </div>
  );
}
