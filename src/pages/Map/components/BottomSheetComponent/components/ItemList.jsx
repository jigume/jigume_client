import React from 'react';
import Filter from '../../../../../asset/icon/Filter.svg';

export default function ItemList() {
  return (
    <div>
      <div className="relative top-0 border-b border-gray100">
        <div className="px-[16px] py-[12px] ">
          <div className="h4 mb-0">공동 구매 폼 내역 보기</div>
        </div>
        <div className="px-[16px] py-[12px] flex col-row justify-between">
          <div className="caption text-gray600">
            제품군 카테고리 필터를 켜보세요
          </div>
          <img src={Filter} className="w-[24px] h-[24px]" />
        </div>
      </div>
      <div>item</div>
    </div>
  );
}
