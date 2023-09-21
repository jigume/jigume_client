import React, { useEffect, useState } from 'react';
import { getGoodsDetail } from '../../api';
import SheetHeader from './components/SheetHeader';
import ItemList from './components/ItemList';
import ContentHeader from './components/ContentHeader';
import category from './data';
import useBottomSheet from './hooks/useBottomSheet';
import Sheet from './components/Sheet';

export default function BottomSheetComponent({
  address,
  handleImplicitPosition,
}) {
  const [imgArr, setImgArr] = useState([]);
  const [filter, setFilter] = useState(
    category.map((item) => ({ ...item, checked: true })),
  );
  const { sheet, content, handle, isOpen, handleSheet } = useBottomSheet();

  useEffect(() => {
    getGoodsDetail(setImgArr);
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="w-screen h-screen fixed top-0 left-0 z-[30] touch-pan-y cursor-pointer ease-out duration-300"
          onClick={() => handleSheet('min')}
        />
      )}
      <Sheet
        onClick={() => handleSheet('max')}
        ref={{ sheet, content, handle }}
        header={
          <SheetHeader
            address={address}
            handleImplicitPosition={handleImplicitPosition}
          />
        }
      >
        <ContentHeader filter={filter} setFilter={setFilter} />
        <ItemList imgArr={imgArr} filter={filter} />
      </Sheet>
    </>
  );
}
