import React from 'react';
import category from '../../Map/components/BottomSheetComponent/data';

export default function IntroCategory({ idx }: { idx: number }) {
  const { icon, name } = category.filter((item) => item.idx === idx)[0];

  return (
    <span className="rounded-md border border-gray-100 bg-white px-2 py-1">
      <img className="mr-1 inline-block size-[16px]" src={icon} alt={name} />
      {name}
    </span>
  );
}
