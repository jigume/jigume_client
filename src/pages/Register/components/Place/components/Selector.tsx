import { useState } from 'react';
import DropDownUP from '@src/asset/icon/dropdown_up.svg';
import DropDownDown from '@src/asset/icon/dropdown_down.svg';
import { NearPlacesType } from '@src/types/register';

export default function Selector({
  index,
  setIndex,
  places,
  isLoading,
}: {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  places: NearPlacesType[];
  isLoading: boolean;
}) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleIdx = (p: number) => {
    if (p > places?.length) return;
    setIndex(p);
  };

  const getDisplayName = (i: number) => {
    if (i === -2) return '픽업 위치를 선택해주세요';
    if (i === -1) return '직접 입력할게요';
    return places[i].place_name;
  };

  return (
    <div
      className={`text-md absolute top-0 z-20 w-full max-w-screen-sm overflow-y-scroll rounded-md border border-slate-300 bg-white text-left font-light text-slate-600 ${!open ? 'py-3' : 'pt-3'}`}
      onClick={handleToggle}
    >
      <div className="flex justify-between px-3">
        <div>{getDisplayName(index)}</div>
        <img
          src={open ? DropDownUP : DropDownDown}
          alt={open ? '닫기' : '열기'}
        />
      </div>

      <div
        className={`transition-max-height duration-200 ease-in-out ${open ? 'max-h-40 overflow-scroll' : 'max-h-0 overflow-hidden'}`}
      >
        <div className="pt-1.5">
          <div
            onClick={() => handleIdx(-1)}
            className="cursor-pointer px-3 py-1.5 active:bg-slate-200"
          >
            직접 입력할게요
          </div>
          {isLoading ? (
            <div className="cursor-pointer px-3 py-1.5 active:bg-slate-200">
              주변 장소 찾는 중...
            </div>
          ) : (
            places &&
            places.map((item, idx) => (
              <div
                onClick={() => handleIdx(idx)}
                className="cursor-pointer px-3 py-1.5 active:bg-slate-200"
                key={item.id}
              >
                {item.place_name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
