import React, { useEffect, useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { getGoodsDetail } from '../../api';
import SheetHeader from './components/SheetHeader';
import ItemList from './components/ItemList';
import ContentHeader from './components/ContentHeader';
import category from './data';
import 'react-spring-bottom-sheet/dist/style.css';
import './index.css';
import useBottomSheet from './hooks/useBottomSheet';
import Sheet from './components/Sheet';

export default function BottomSheetComponent({
  address,
  handleImplicitPosition,
}) {
  const [block, setBlock] = useState(false);
  const [imgArr, setImgArr] = useState([]);
  const sheetRef = useRef();
  const [filter, setFilter] = useState(
    category.map((item) => ({ ...item, checked: true })),
  );
  const { sheet, content } = useBottomSheet();

  const handleBlocking = () => {
    console.log('blocking: ', block);
    sheetRef.current.snapTo(126, { source: 'snap-to-bottom' });
    setBlock(false);
  };

  const scrollingBlocking = () => {
    console.log('scrolling', sheetRef.current.height);
    if (sheetRef.current.height < 120) setBlock(false);
    else setBlock(true);
  };

  useEffect(() => {
    getGoodsDetail(setImgArr);
  }, []);

  return (
    <>
      {block ? (
        <div
          className="bg-white/50 w-screen h-screen fixed top-0 left-0 z-[30]"
          onClick={handleBlocking}
        />
      ) : (
        ''
      )}
      <Sheet ref={{ sheet, content }}>
        <div>bottom sheet</div>
      </Sheet>

      <BottomSheet
        className="fixed z-50 mx-auto bottom_sheet_root"
        ref={sheetRef}
        open={false}
        blocking={false}
        defaultSnap={({ snapPoints, lastSnap }) =>
          lastSnap ?? Math.min(...snapPoints)
        }
        snapPoints={({ maxHeight }) => [
          maxHeight * 0.1,
          maxHeight - maxHeight / 5,
          maxHeight * 0.6,
        ]}
        onSpringStart={(event) => {
          console.log('start event: ', event, sheetRef.current.height);
          scrollingBlocking();
        }}
        onSpringCancel={(event) => {
          console.log('cancel event: ', event, sheetRef.current.height);
          scrollingBlocking();
        }}
        onSpringEnd={(event) => {
          console.log('end event: ', event, sheetRef.current.height);
          scrollingBlocking();
        }}
        header={
          <SheetHeader
            address={address}
            handleImplicitPosition={handleImplicitPosition}
          />
        }
      >
        <ContentHeader filter={filter} setFilter={setFilter} />
        <ItemList imgArr={imgArr} filter={filter} />
      </BottomSheet>
    </>
  );
}
