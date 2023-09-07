import React, { useState } from 'react';
import { CloseIcon } from '@goorm-dev/gds-goormthon';
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
        <div className="px-[16px] py-[12px] grid grid-cols-8">
          <div className="col-span-7 h-[1.5rem] overflow-x-scroll   whitespace-nowrap text-gray600">
            {filter.find(({ checked }) => checked) ? (
              filter.map(
                (item, index) =>
                  item.checked && (
                    <span
                      className="px-1 cursor-pointer"
                      key={item.name}
                      onClick={() => {
                        const prevData = [...filter];

                        prevData[index] = {
                          ...prevData[index],
                          checked: !item.checked,
                        };

                        setFilter(prevData);
                      }}
                    >
                      <span>{item.name}</span>
                      <CloseIcon className="inline-block pb-[3px] " />
                    </span>
                  ),
              )
            ) : (
              <div className="caption text-gray600">
                제품군 카테고리 필터를 켜보세요
              </div>
            )}
          </div>

          <div
            className="col-span-1 h-[1.5rem] flex justify-center cursor-pointer hover:text-black "
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
