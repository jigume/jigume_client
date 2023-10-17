import React from 'react';
import ItemComponent from './ItemComponent';

export default function ItemList({ imgArr, filter }) {
  // loading state
  if (imgArr.length === 0)
    return (
      <div className="h-full w-full overflow-x-scroll absolute top-[96px] pt-[96px] pb-[192px]">
        {[1, 2, 3].map(() => (
          <ItemComponent />
        ))}
      </div>
    );

  return (
    <div className="h-full overflow-x-scroll absolute top-[96px] pt-[96px] pb-[192px]">
      {imgArr.map((item, index) => {
        const trueArr = filter.filter(({ checked }) => checked);

        if (!trueArr.find(({ idx }) => idx === item.data.category))
          // eslint-disable-next-line react/no-array-index-key
          return <div key={index} />;

        return (
          <ItemComponent
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
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
