import React from 'react';

export default function checkComponent({ title, content }) {
  return (
    <div className="flex flex-row text-center justify-center bg-gray-100 w-[343px] p-[16px] mb-[8px] rounded-[8px] font-semibold">
      <div className="font-normal pr-1 text-gray600 text-[12px]">{title}</div>
      <div className="text-gray950 text-[14px]">{content}</div>
    </div>
  );
}
