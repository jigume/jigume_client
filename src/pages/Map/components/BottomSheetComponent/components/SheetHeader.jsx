import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocationIcon from '../../../../../asset/icon/LocationIcon.svg';
import UserOutlineIcon from '../../../../../asset/icon/UserOutlineIcon.svg';
import Fab from './Fab';

export default function SheetHeader({ address, handleImplicitPosition }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute top-[-50px] right-4 flex flex-row gap-2">
        <Fab handleImplicitPosition={handleImplicitPosition} />
      </div>
      <div className="flex items-center justify-between w-full px-4">
        {address === '-' ? (
          <div className="animate-pulse bg-slate-200 h-3 w-64 rounded-md" />
        ) : (
          <div className="flex items-center gap-[4px] ">
            <img src={LocationIcon} />
            <div className="h6 mb-0 text-gray-600">{address}</div>
          </div>
        )}
        <div className="p-[12px]" onClick={() => navigate('/mypage')}>
          <img src={UserOutlineIcon} />
        </div>
      </div>
    </>
  );
}
