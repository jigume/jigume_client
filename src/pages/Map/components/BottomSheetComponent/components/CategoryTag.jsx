import React from 'react';

export default function CategoryTag({ item, index, filter, setFilter }) {
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
      <img className="mr-1 inline-block h-[16px] w-[16px]" src={item.icon} />
      <span className="text-xs">{item.name}</span>
    </div>
  );
}
