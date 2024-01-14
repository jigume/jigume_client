import React from 'react';
import { FilterType } from '../index.d';

export default function CategoryTag({
  item,
  index,
  filter,
  setFilter,
}: {
  item: FilterType;
  index: number;
  filter: FilterType[];
  setFilter: React.Dispatch<React.SetStateAction<FilterType[]>>;
}) {
  return (
    <div
      className={`rounded-[8px] border border-gray-100 p-[8px] ${
        !item.checked ? 'bg-white' : 'bg-gray-900 text-white'
      }`}
      onClick={() => {
        const prevData = [...filter];

        prevData[index] = {
          ...prevData[index],
          checked: !item.checked,
        };

        setFilter(prevData);
      }}
    >
      <img
        className="mr-1 inline-block h-[16px] w-[16px]"
        src={item.icon}
        alt="필터"
      />
      <span className="text-xs">{item.name}</span>
    </div>
  );
}
