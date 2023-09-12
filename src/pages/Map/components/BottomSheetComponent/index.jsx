import React, { useEffect, useState } from 'react';
import { getGoodsDetail } from '../../api';
import SheetHeader from './components/SheetHeader';
import ItemList from './components/ItemList';
import ContentHeader from './components/ContentHeader';
import category from './data';
import useBottomSheet from './hooks/useBottomSheet';
import Sheet from './components/Sheet';
import './index.css';

export default function BottomSheetComponent({
  address,
  handleImplicitPosition,
}) {
  const [imgArr, setImgArr] = useState([]);
  const [filter, setFilter] = useState(
    category.map((item) => ({ ...item, checked: true })),
  );
  const { sheet, content, handle, isOpen } = useBottomSheet();

  useEffect(() => {
    getGoodsDetail(setImgArr);
  }, []);

  return (
    <>
      {isOpen ? (
        <div className="bg-white/50 w-screen h-screen fixed top-0 left-0 z-[30] ease-out duration-300" />
      ) : (
        ''
      )}
      <Sheet
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
