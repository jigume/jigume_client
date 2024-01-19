import React from 'react';
import ItemComponent from '../../Map/components/BottomSheetComponent/components/ItemComponent';

export default function ProductAbout() {
  return (
    <div>
      <div className="w-full bg-white">
        <ItemComponent />
      </div>
      <div className="flex flex-col px-4 pt-7">
        <div className="flex flex-col gap-4 rounded-xl bg-gray-50 p-4">
          <div className="aspect-[1.9197] w-full animate-pulse rounded-xl bg-gray-300" />
          <div className="mx-auto h-3 w-3/4 animate-pulse rounded-lg bg-gray-300" />
        </div>
        <div className="mt-2 flex flex-col gap-4 rounded-xl bg-gray-50 p-4">
          <div>공지사항</div>
          <div className="aspect-[1.9197] w-full animate-pulse rounded-xl bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
