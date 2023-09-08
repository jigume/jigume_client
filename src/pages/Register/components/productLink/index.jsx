import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-dropdown/style.css';
import category from '../../../Map/components/BottomSheetComponent/data';
import image from '../../../../asset/725ec573a6591587da4be2bb770449e8.png';

function ProductLink() {
  const [filter, setFilter] = useState(
    category.map((item) => {
      return { ...item, checked: false };
    }),
  );

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div>
        <div className="text-lg font-bold pb-10">
          상품의 구매처가 어디인가요?
          <br />
          상품의 카테고리도 알려주세요.
        </div>

        <div className="mb-1">
          <div className="text-sm mb-2 font-thin">상품 링크</div>
          <input
            type="text"
            name="productLink"
            placeholder="ex) www.figma.com"
            className="border rounded-md w-full p-3 text-sm"
          />
        </div>
        <div className="w-full flex flex-row items-center gap-2 border rounded-md pr-2 overflow-hidden cursor-pointer">
          <img className="h-20" src={image} />
          <div className="py-2 pr-2 flex flex-col w-full grow-0">
            <div className="inline-block line-clamp-2 text-xs w-100%">
              [오늘의딜/15%쿠폰] 논슬립 방수 가죽 데스크매트 마우스패드
              모니터받침대
            </div>
            <div className="text-xs text-gray-500 truncate">
              https://ohou.se/productions/1811972
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="text-sm mb-2 font-thin">카테고리</div>
          <div className="flex flex-wrap justify-center gap-2 ">
            {filter.map((item, index) => (
              <div
                key={item.name}
                className={`py-[6px] px-[8px] border border-gray-100 rounded-lg ${
                  !item.checked ? 'bg-white' : 'bg-gray-900 text-white'
                }`}
                onClick={() => {
                  const prevData = filter.map((prev) => {
                    return { ...prev, checked: false };
                  });

                  prevData[index] = {
                    ...prevData[index],
                    checked: !item.checked,
                  };

                  setFilter(prevData);
                }}
              >
                <img
                  className="inline-block mr-2 w-[16px] h-[16px]"
                  src={item.icon}
                />
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        to="/Register/ProductAmount"
        className="w-full py-3 my-3 text-center bg-success text-white rounded-lg"
      >
        다음으로 넘어가기
      </Link>
    </div>
  );
}

export default ProductLink;
