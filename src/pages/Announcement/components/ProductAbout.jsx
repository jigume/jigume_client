import React from 'react';
import ItemComponent from '../../Map/components/BottomSheetComponent/components/ItemComponent';

export default function ProductAbout() {
  return (
    <div>
      <div className="bg-white w-full">
        <ItemComponent />
      </div>
      <div className="flex flex-col pt-7 px-4">
        <div className="p-4 bg-gray-50 rounded-xl flex flex-col gap-4">
          <div className="bg-gray-300 w-full aspect-[1.9197] rounded-xl animate-pulse" />
          <div className="w-3/4 h-3 mx-auto bg-gray-300 rounded-lg animate-pulse" />
        </div>
        <div className="p-4 bg-gray-50 rounded-xl flex flex-col gap-4 mt-2">
          <div>공지사항</div>
          <div className="bg-gray-300 w-full aspect-[1.9197] rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
