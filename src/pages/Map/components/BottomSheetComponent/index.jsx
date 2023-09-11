import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BottomSheet } from 'react-spring-bottom-sheet';
import SheetHeader from './components/SheetHeader';
import ItemList from './components/ItemList';
import ContentHeader from './components/ContentHeader';
import { backURL2 } from '../../../../common';
import category from './data';
import 'react-spring-bottom-sheet/dist/style.css';
import './index.css';

export default function BottomSheetComponent({
  address,
  handleImplicitPosition,
}) {
  const [block, setBlock] = useState(false);
  const [imgArr, setImgArr] = useState([]);
  const sheetRef = useRef();
  const [filter, setFilter] = useState(
    category.map((item) => {
      return { ...item, checked: true };
    }),
  );

  const handleBlocking = () => {
    sheetRef.current.snapTo(126, { source: 'snap-to-bottom' });
    setBlock(false);
  };

  useEffect(() => {
    axios.get(`${backURL2}/api/goods`).then((res) => {
      // console.log(res.data);
      if (res.status === 200) {
        res.data.map((item, idx) => {
          return axios
            .get(`${backURL2}/api/${idx + 1}/image`, { responseType: 'blob' })
            .then((res_) => {
              const myFile = new File([res_.data], 'imageName');
              const reader = new FileReader();
              reader.onload = (ev) => {
                const previewImage = String(ev.target?.result);
                // console.log(previewImage);
                setImgArr((oldArray) => [
                  ...oldArray,
                  { image: previewImage, data: item },
                ]);
              };
              reader.readAsDataURL(myFile);
            });
        });
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log(imgArr);
  // }, [imgArr]);

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
          maxHeight * 0.1,
          maxHeight - maxHeight / 5,
          maxHeight * 0.6,
        ]}
        onSpringEnd={(event) => {
          if (event.type === 'SNAP') setBlock(true);
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
