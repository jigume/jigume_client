import React from 'react';

export default function CategoryTag({ item, index, filter, setFilter }) {
  return (
    <div
      className={`p-[8px] border border-gray-100 rounded-lg ${
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
      <img className="inline-block mr-2 w-[16px] h-[16px]" src={item.icon} />
      <span className="text-sm">{item.name}</span>
    </div>
  );
}
