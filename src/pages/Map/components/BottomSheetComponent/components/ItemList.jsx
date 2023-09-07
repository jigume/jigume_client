import React, { useState } from 'react';
import Filter from '../../../../../asset/icon/Filter.svg';
import ItemComponent from './ItemComponent';
import categories from '../data';

export default function ItemList() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="relative top-0 border-b border-gray100">
        <div className="px-[16px] py-[12px] ">
          <div className="h4 mb-0">공동 구매 폼 내역 보기</div>
        </div>
        <div className="px-[16px] py-[12px] flex flex-row justify-between">
          <div className="caption text-gray600">
            제품군 카테고리 필터를 켜보세요
          </div>

          <div
            className="h-3 cursor-pointer hover:text-black"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? '완료' : <img src={Filter} className="w-[24px] h-[24px]" />}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {categories.map((item) => (
          <div
            key={item.idx}
            className="p-[8px] border border-gray-100 rounded-lg"
          >
            <img
              className="inline-block mr-2 w-[16px] h-[16px]"
              src={item.icon}
            />
            <span className="caption">{item.name}</span>
          </div>
        ))}
      </div>
      <div>
        <ItemComponent />
        <ItemComponent />
        <ItemComponent />
        <ItemComponent />
        <ItemComponent />
        <ItemComponent />
      </div>
    </div>
  );
}
