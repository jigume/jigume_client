import React from 'react';
import category from '../../Map/components/BottomSheetComponent/data';

export default function IntroCategory({ idx }) {
  const { icon, name } = category[idx];
  return (
    <span className="rounded-md border border-gray-100 bg-white px-2 py-1">
      <img className="mr-1 inline-block h-[16px] w-[16px]" src={icon} />
      {name}
    </span>
  );
}
