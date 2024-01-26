import { useNavigate } from 'react-router-dom';
import ChevronLeft from '../../../asset/icon/chevronLeft.svg';
import Notification from '../../../asset/icon/Notification.svg';
import { ProfileHeaderType } from '../index.d';

export default function MyPageHeader({ title, isAlert }: ProfileHeaderType) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex h-[48px] w-full max-w-screen-sm flex-row items-center justify-between px-4">
      <div className="flex items-center">
        <button onClick={() => navigate(-1)} className="pr-1">
          <img
            className="h-12 w-10 cursor-pointer px-1 py-2"
            src={ChevronLeft}
            alt="뒤로가기"
          />
        </button>
        <div className="font-bole mt-1 font-semibold">{title}</div>
      </div>
      {isAlert && (
        <button>
          <img className="mt-1 h-12 w-10" src={Notification} alt="알림" />
        </button>
      )}
    </div>
  );
}
