import React, { useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetHeader from './components/SheetHeader';
import ItemList from './components/ItemList';
import ContentHeader from './components/ContentHeader';
import 'react-spring-bottom-sheet/dist/style.css';
import './index.css';

export default function BottomSheetComponent({ address }) {
  const [block, setBlock] = useState(false);
  const sheetRef = useRef();

  const handleBlocking = () => {
    sheetRef.current.snapTo(126, { source: 'snap-to-bottom' });
    setBlock(false);
  };

  return (
    <>
      {block && (
        <div
          className="bg-red w-screen h-screen fixed top-0 left-0 z-30"
          onClick={handleBlocking}
        />
      )}

      <BottomSheet
        className="fixed z-50 mx-auto bottom_sheet_root"
        open
        blocking={false}
        ref={sheetRef}
        defaultSnap={({ snapPoints, lastSnap }) =>
          lastSnap ?? Math.min(...snapPoints)
        }
        snapPoints={({ maxHeight }) => [
          76,
          maxHeight - maxHeight / 5,
          maxHeight * 0.6,
        ]}
        onSpringEnd={(event) => {
          if (event.type === 'SNAP') setBlock(true);
        }}
        header={<SheetHeader address={address} />}
      >
        <ContentHeader />
        <ItemList />
      </BottomSheet>
    </>
  );
}
