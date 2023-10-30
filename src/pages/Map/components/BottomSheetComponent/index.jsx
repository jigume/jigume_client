import React, { useState } from 'react';
import SheetHeader from './components/SheetHeader';
import ItemList from './components/ItemList';
import ContentHeader from './components/ContentHeader';
import category from './data';
import useBottomSheet from '../../../../hooks/useBottomSheet';
import Sheet from './components/Sheet';

export default function BottomSheetComponent({ address, handleToCenter }) {
  const [imgArr] = useState([]);
  const [filter, setFilter] = useState(
    category.map((item) => ({ ...item, checked: true })),
  );
  const { sheet, content, handle, isOpen, handleSheet } = useBottomSheet();

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
        <ItemList imgArr={imgArr} filter={filter} />
      </Sheet>
    </>
  );
}
