import { GoodsListDTO } from '@src/types/goods';
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
  goodsArr: GoodsListDTO[];
  filter: FilterType[];
  sheetLevel: SheetLevelType;
  preViewer: PreViewerMarker;
}) {
  const trueArr = filter.filter(({ checked }) => checked);
  // preViewer
  if (preViewer && goodsArr.length > 0)
    return (
      <div
        className="absolute top-[7.5rem] size-full overflow-x-scroll pt-[7.5rem]"
        style={{ height: thresholds[sheetLevel] }}
      >
        <ItemComponent goods={goodsArr[0]} />
      </div>
    );

  // loading skeleton
  if (goodsArr.length === 0)
    return (
      <div
        className="absolute top-[7.5rem] flex size-full flex-col gap-2 overflow-x-scroll pb-48 pt-[7.5rem]"
        style={{ height: thresholds[sheetLevel] }}
      >
        {[1, 2, 3].map((item) => (
          <ItemComponent key={item} />
        ))}
      </div>
    );

  return (
    <div className="absolute top-[7.5rem] flex h-full flex-col divide-y overflow-x-scroll pb-48 pt-[7.5rem]">
      {goodsArr
        .filter((item) =>
          trueArr.some((item2) => item2.idx === item.categoryId)
        )
        .map((item) => (
          <ItemComponent key={item.goodsId} goods={item} />
        ))}
    </div>
  );
}
