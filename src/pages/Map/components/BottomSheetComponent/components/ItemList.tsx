import React from 'react';
import { GoodsPageDTO } from '@src/types/goods';
import { PreViewerMarker } from '@src/pages/Map/index.d';
import ItemComponent from './ItemComponent';
import { thresholds } from '../../../../../utils';
import { FilterType, SheetLevelType } from '../index.d';

export default function ItemList({
  goodsArr,
  filter,
  sheetLevel,
  preViewer,
}: {
  goodsArr: GoodsPageDTO[];
  filter: FilterType[];
  sheetLevel: SheetLevelType;
  preViewer: PreViewerMarker;
}) {
  // preViewer
  if (preViewer && goodsArr.length > 0)
    return (
      <div
        className="absolute top-[96px] h-full w-full overflow-x-scroll py-[96px]"
        style={{ height: thresholds[sheetLevel] }}
      >
        <ItemComponent index={preViewer.goodsId} item={goodsArr[0]} />
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
      {goodsArr.map((item) => {
        const trueArr = filter.filter(({ checked }) => checked);

        if (!trueArr.find(({ idx }) => idx === item.categoryId))
          return <div key={item.boardId} />;
        return (
          item && (
            <ItemComponent
              key={item.boardId}
              index={item.boardId}
              item={item}
            />
          )
        );
      })}
    </div>
  );
}
