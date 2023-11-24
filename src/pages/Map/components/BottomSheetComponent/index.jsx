import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import SheetHeader from './components/SheetHeader';
import ItemList from './components/ItemList';
import ContentHeader from './components/ContentHeader';
import category from './data';
import Sheet from './components/Sheet';
import { getSheetGoods, getSheetList } from '../../../../api/goods';

export default function BottomSheetComponent({
  address,
  handleToCenter,
  sheetProvider,
  preViewer,
  bounds,
}) {
  const [goodsArr, setGoodsArr] = useState([]);
  const [filter, setFilter] = useState(
    category.map((item) => ({ ...item, checked: true })),
  );
  const { isOpen, sheet, content, handle, sheetLevel, handleSheet } =
    sheetProvider;

  // 미리보기 fetch fn
  const { mutate: preViewMutate } = useMutation({
    mutationKey: 'getSheetDetail',
    mutationFn: () => getSheetGoods(preViewer),
    onSuccess: (res) => {
      if (res.data === 'retry') preViewMutate(preViewer);
      else setGoodsArr([res.data.goodsPageDto]);
    },
  });

  const { mutate: allMutate } = useMutation({
    mutationKey: 'getAllList',
    mutationFn: () => getSheetList(preViewer, bounds),
    onSuccess: (res) => {
      if (res.data === 'retry') allMutate(preViewer, bounds);
      console.log(res);
    },
  });

  useEffect(() => {
    if (isOpen)
      if (preViewer) preViewMutate(preViewer);
      else allMutate(preViewer, bounds);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-[30] h-screen w-screen cursor-pointer touch-pan-y duration-300 ease-out"
          onClick={() => handleSheet('min')}
        />
      )}
      <Sheet
        ref={{ sheet, content, handle }}
        header={
          <SheetHeader
            onClick={() => handleSheet('max')}
            address={address}
            handleToCenter={handleToCenter}
          />
        }
      >
        <ContentHeader filter={filter} setFilter={setFilter} />
        <ItemList
          goodsArr={goodsArr}
          filter={filter}
          sheetLevel={sheetLevel}
          preViewer={preViewer}
        />
      </Sheet>
    </>
  );
}
