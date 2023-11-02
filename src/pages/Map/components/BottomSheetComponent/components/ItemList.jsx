import React from 'react';
import ItemComponent from './ItemComponent';
import { thresholds } from '../../../../../utils';

export default function ItemList({ imgArr, filter, sheetLevel, preViewer }) {
  // preViewer
  if (preViewer)
    return (
      <div
        className="absolute top-[96px] h-full w-full overflow-x-scroll py-[96px]"
        style={{ height: thresholds[sheetLevel] }}
      >
        <ItemComponent
          index={1}
          image={preViewer.imageUrl}
          title={preViewer.goodsName}
          username="임시사용자"
          count={preViewer.goodsLimitCount}
          itemCost={preViewer.goodsPrice}
          deliveryCost={preViewer.deliveryFee}
          people={preViewer.realDeliveryFee / preViewer.deliveryFee}
        />
      </div>
    );

  // loading
  if (imgArr.length === 0)
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
      {imgArr.map((item, index) => {
        const trueArr = filter.filter(({ checked }) => checked);

        if (!trueArr.find(({ idx }) => idx === item.data.category))
          return <div key={index} />;

        return (
          <ItemComponent
            key={index}
            image={item.image}
            title={item.data.name}
            username={item.data.name}
            count={item.data.goodsLimitCount}
            itemCost={item.data.goodsPrice}
            deliveryCost={item.data.deliveryFee}
            people={item.data.deliveryFee / item.data.realDeliveryFee}
          />
        );
      })}
    </div>
  );
}
