import React from 'react';
import LocationIcon from '../../../../../asset/icon/LocationIcon.svg';
import UserOutlineIcon from '../../../../../asset/icon/UserOutlineIcon.svg';

export default function Header({ address }) {
  return (
    <div className="flex items-center justify-between">
      {address === '-' ? (
        <div class="animate-pulse bg-slate-200 h-3 w-64 rounded-md" />
      ) : (
        <div className="flex items-center gap-[4px]">
          <img src={LocationIcon} />
          <div className="h6 mb-0">{address}</div>
        </div>
      )}
      <img src={UserOutlineIcon} className="p-[12px]" />
    </div>
  );
}
