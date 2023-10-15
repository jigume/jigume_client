import React from 'react';
import { useRecoilState } from 'recoil';
import LocationIcon from '../../../../../asset/icon/LocationIcon.svg';
import UserOutlineIcon from '../../../../../asset/icon/UserOutlineIcon.svg';
import Fab from './Fab';
import userState from '../../../../../recoli/userState';

export default function SheetHeader({
  address,
  handleImplicitPosition,
  onClick,
}) {
  const [, setUser] = useRecoilState(userState);

  return (
    <>
      <div className="absolute top-[-50px] right-4 flex flex-row gap-2">
        <Fab handleImplicitPosition={handleImplicitPosition} />
      </div>
      <div
        className="flex items-center justify-between w-full px-4"
        onClick={onClick}
      >
        {address === '-' ? (
          <div className="animate-pulse bg-slate-200 h-3 w-64 rounded-md" />
        ) : (
          <div className="flex items-center gap-[4px] ">
            <img src={LocationIcon} />
            <div className="h6 mb-0 text-gray-600">{address}</div>
          </div>
        )}
        {/* 임시 로그아웃 */}
        <div
          className="p-[12px]"
          onClick={() =>
            setUser((prev) => {
              return {
                ...prev,
                role: 'GUEST',
              };
            })
          }
        >
          <img src={UserOutlineIcon} />
        </div>
      </div>
    </>
  );
}
