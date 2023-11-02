import React, { useEffect, useState } from 'react';
import SheetHeader from './components/SheetHeader';
import ItemList from './components/ItemList';
import ContentHeader from './components/ContentHeader';
import category from './data';
import Sheet from './components/Sheet';

export default function BottomSheetComponent({
  address,
  handleToCenter,
  sheetProvider,
  preViewer,
}) {
  const [imgArr] = useState([]);
  const [filter, setFilter] = useState(
    category.map((item) => ({ ...item, checked: true })),
  );
  const { isOpen, sheet, content, handle, sheetLevel, handleSheet } =
    sheetProvider;

  useEffect(() => {
    console.log(preViewer);
  }, [preViewer]);

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
          imgArr={imgArr}
          filter={filter}
          sheetLevel={sheetLevel}
          preViewer={preViewer}
        />
      </Sheet>
    </>
  );
}
