import React from 'react';

export default function checkComponent({ title, content }) {
  return (
    <div className="flex flex-row text-center justify-center bg-gray100 w-[343px] p-[16px] mb-[8px] rounded-[8px] font-semibold">
      <div className="font-normal pr-1 text-gray600">{title}</div>
      <div className="text-gray950">{content}</div>
    </div>
  );
}
