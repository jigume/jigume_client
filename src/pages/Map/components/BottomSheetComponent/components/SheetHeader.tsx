import { useNavigate } from 'react-router-dom';
import LocationIcon from '../../../../../asset/icon/LocationIcon.svg';
import UserOutlineIcon from '../../../../../asset/icon/UserOutlineIcon.svg';
import Fab from './Fab';

export default function SheetHeader({
  address,
  handleToCenter,
  onClick,
}: {
  address: string;
  handleToCenter: () => void;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute right-4 top-[-50px] flex flex-row gap-2">
        <Fab onlyCurr={false} handleToCenter={handleToCenter} />
      </div>
      <div
        className="flex w-full items-center justify-between px-4"
        onClick={onClick}
      >
        {address === '-' ? (
          <div className="h-3 w-64 animate-pulse rounded-md bg-slate-200" />
        ) : (
          <div className="flex items-center gap-[4px] ">
            <img src={LocationIcon} alt="위치" />
            <div className="h6 mb-0 text-gray-600">{address}</div>
          </div>
        )}
        {/* 임시 로그아웃 */}
        <div className="p-[12px]" onClick={() => navigate('/mypage')}>
          <img src={UserOutlineIcon} alt="프로필" />
        </div>
      </div>
    </>
  );
}
