import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryTag from './CategoryTag';
import Filter from '../../../../../asset/icon/Filter.svg';
import CloseIcon from '../../../../../asset/icon/CloseIcon.svg';

export default function ContentHeader({ filter, setFilter }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-[76px] bg-white z-50 w-full">
      <AnimatePresence>
        <div className="border-b border-gray-100">
          <div className="px-[16px] py-[12px] ">
            <div className="font-bold text-lg mb-0">공동 구매 폼 내역 보기</div>
          </div>
          <div className="px-[16px] py-[12px] grid grid-cols-8">
            <div className="col-span-7 h-[1.5rem] overflow-x-scroll whitespace-nowrap text-gray-600">
              {filter.find(({ checked }) => checked) ? (
                filter.map(
                  (item, index) =>
                    item.checked && (
                      <motion.span
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>{item.name}</span>
                        <img
                          src={CloseIcon}
                          className="inline-block pb-[3px] "
                        />
                      </motion.span>
                    ),
                )
              ) : (
                <div className="text-sm text-gray-600">
                  제품군 카테고리 필터를 켜보세요
                </div>
              )}
            </div>

            <div
              className="col-span-1 h-[1.5rem] flex justify-center cursor-pointer active:scale-95 transition-all duration-300 ease-in-out"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                '완료'
              ) : (
                <img src={Filter} className="w-[24px] h-[24px]" />
              )}
            </div>
          </div>
        </div>

        {open && (
          <motion.div
            key="filter_conatiner"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap justify-center px-4 py-7 gap-2 rounded-b-[20px] bg-white drop-shadow-xl"
          >
            {filter.map((item, index) => (
              <CategoryTag
                item={item}
                key={item.idx}
                index={index}
                filter={filter}
                setFilter={setFilter}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
