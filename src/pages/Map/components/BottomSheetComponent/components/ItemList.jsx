import React, { useEffect } from 'react';

import ItemComponent from './ItemComponent';

export default function ItemList({ imgArr, filter }) {
  useEffect(() => {
    // console.log(filter);
  }, []);

  return (
    <div className="h-full overflow-x-scroll absolute top-[96px] pt-[96px] pb-[192px]">
      {imgArr.map((item, index) => {
        const trueArr = filter.filter(({ checked }) => checked);

        if (!trueArr.find(({ idx }) => idx === item.data.category))
          // eslint-disable-next-line react/no-array-index-key
          return <div key={index} />;
        // console.log(item.data.category);
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div className="px-[16px]" key={index}>
            <ItemComponent
              index={index}
              image={item.image}
              title={item.data.name}
              username={item.data.name}
              count={item.data.goodsLimitCount}
              itemCost={item.data.goodsPrice}
              deliveryCost={item.data.deliveryFee}
              people={item.data.deliveryFee / item.data.realDeliveryFee}
            />
          </div>
        );
      })}
    </div>
  );
}
