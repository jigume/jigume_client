import React, { useState } from 'react';
import CategoryTag from './CategoryTag';
import categories from '../data';
import Filter from '../../../../../asset/icon/Filter.svg';

export default function ContentHeader() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(
    categories.map((item) => {
      return { ...item, checked: false };
    }),
  );

  return (
    <div className="absolute top-[76px] bg-white z-50 w-full">
      <div className="border-b border-gray100">
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

      {open && (
        <div className="flex flex-wrap justify-center px-4 py-7 gap-2 rounded-b-[20px] bg-white drop-shadow-xl">
          {filter.map((item, index) => (
            <CategoryTag
              item={item}
              key={item.idx}
              index={index}
              filter={filter}
              setFilter={setFilter}
            />
          ))}
        </div>
      )}
    </div>
  );
}
