import React from 'react';

import ItemComponent from './ItemComponent';

export default function ItemList() {
  return (
    <div className="pt-[96px]">
      <div className="h-full overflow-auto">
        <ItemComponent />
        <ItemComponent />
        <ItemComponent />
        <ItemComponent />
        <ItemComponent />
        <ItemComponent />
      </div>
    </div>
  );
}
