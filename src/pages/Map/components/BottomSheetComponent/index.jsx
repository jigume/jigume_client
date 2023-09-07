import React, { useEffect, useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Header from './components/header';
import './index.css';

export default function BottomSheetComponent({ address }) {
  const sheetRef = useRef();
  const [block, setBlock] = useState(false);

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
        open={true}
        blocking={false}
        ref={sheetRef}
        snapPoints={({ maxHeight, minHeight }) => [
          minHeight + 40,
          maxHeight * 0.5,
          maxHeight * 0.8,
        ]}
        onSpringEnd={(event) => {
          if (event.type === 'SNAP') setBlock(true);
        }}
        header={<Header address={address} />}
      >
        {address}
      </BottomSheet>
    </>
  );
}
