import React from 'react';
import ItemComponent from './ItemComponent';
import { thresholds } from '../../../../../utils';

export default function ItemList({ goodsArr, filter, sheetLevel, preViewer }) {
  // preViewer
  if (preViewer && goodsArr.length > 0)
    return (
      <div
        className="absolute top-[96px] h-full w-full overflow-x-scroll py-[96px]"
        style={{ height: thresholds[sheetLevel] }}
      >
        <ItemComponent
          index={preViewer.goodsId}
          goodsName={goodsArr[0].goodsName}
          goodsImagesList={goodsArr[0].goodsImagesList}
          hostNickname={goodsArr[0].hostNickname}
          goodsOrderCount={goodsArr[0].goodsOrderCount}
          goodsPrice={goodsArr[0].goodsPrice}
          realDeliveryFee={goodsArr[0].realDeliveryFee}
        />
      </div>
    );

  // loading skeleton
  if (goodsArr.length === 0)
    return (
      <div
        className="absolute top-[96px] h-full w-full overflow-x-scroll pb-[192px] pt-[96px]"
        style={{ height: thresholds[sheetLevel] }}
      >
        {[1, 2, 3].map((item) => (
          <ItemComponent key={item} />
        ))}
      </div>
    );

  return (
    <div className="absolute top-[96px] h-full overflow-x-scroll pb-[192px] pt-[96px]">
      {goodsArr.map((item, index) => {
        console.log(item);
        const trueArr = filter.filter(({ checked }) => checked);

        if (!trueArr.find(({ idx }) => idx === item.category))
          return <div key={index} />;
        return (
          item && <ItemComponent key={index} index={item.boardId} item={item} />
        );
      })}
    </div>
  );
}
