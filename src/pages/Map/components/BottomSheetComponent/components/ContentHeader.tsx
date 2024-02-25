import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryTag from './CategoryTag';
import FilterIcon from '../../../../../asset/icon/Filter.svg';
import CloseIcon from '../../../../../asset/icon/CloseIcon.svg';
import { FilterType } from '../index.d';

export default function ContentHeader({
  filter_,
  setFilter,
}: {
  filter_: FilterType[];
  setFilter: React.Dispatch<React.SetStateAction<FilterType[]>>;
}) {
  const [open, setOpen] = useState(false);

  const chekedItem = filter_.filter(({ checked }) => checked);

  return (
    <div className="absolute top-[76px] z-50 w-full bg-white">
      <AnimatePresence>
        <div className="border-b border-gray-100">
          <div className="px-[16px] py-[12px] ">
            <div className="mb-0 text-lg font-bold">공동 구매 폼 내역 보기</div>
          </div>
          <div className="grid grid-cols-8 px-[16px] py-[12px]">
            <div className="col-span-7 flex h-8 flex-row items-center gap-2 overflow-x-scroll whitespace-nowrap text-sm text-gray-600">
              {open
                ? '제품군 카테고리를 선택하세요'
                : '찾으시는 제품이 있나요?'}
            </div>
            <div
              className="col-span-1 flex h-[1.5rem] cursor-pointer justify-center transition-all duration-300 ease-in-out active:scale-95"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                '완료'
              ) : (
                <img src={FilterIcon} className="size-[24px]" alt="필터" />
              )}
            </div>
          </div>

          <div className="flex h-10 flex-row gap-2 overflow-x-scroll whitespace-nowrap border-y py-1 pl-4 text-gray-600">
            {filter_.map(
              (item, index) =>
                item.checked && (
                  <motion.div
                    className="flex shrink-0 items-center justify-center gap-1 rounded-md border p-2"
                    key={item.name}
                    onClick={() => {
                      const prevData = [...filter_];

                      prevData[index] = {
                        ...prevData[index],
                        checked: !item.checked,
                      };

                      setFilter(prevData);
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="inline-block size-4"
                    />
                    <div className="inline-block text-xs font-light">
                      {item.name}
                    </div>
                    <img
                      src={CloseIcon}
                      className="inline-block size-3"
                      alt="닫기"
                    />
                  </motion.div>
                )
            )}
          </div>
        </div>

        {open && (
          <motion.div
            key="filter__conatiner"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap justify-center gap-2 rounded-b-[20px] bg-white px-4 py-7 drop-shadow-xl"
          >
            {filter_.map((item, index) => (
              <CategoryTag
                item={item}
                key={item.idx}
                index={index}
                filter={filter_}
                setFilter={setFilter}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
