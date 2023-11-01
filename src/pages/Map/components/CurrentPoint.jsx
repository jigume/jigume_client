import React from 'react';

export default function CurrentPoint() {
  return (
    <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-primaryBlue">
      <div className="relative z-30 h-[16px] w-[16px] rounded-full bg-white" />
      <div className="absolute z-10 h-[30px] w-[30px] animate-ping rounded-full bg-primaryBlue" />
    </div>
  );
}
