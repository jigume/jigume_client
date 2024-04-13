import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfirmAlert({
  setIsConfirm,
}: {
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  return (
    <div
      className="absolute top-0 z-50 flex size-full max-w-screen-sm items-center justify-center bg-black/30 px-4"
      onClick={() => setIsConfirm(false)}
    >
      <div className="flex w-full flex-col gap-6 rounded-[20px] bg-white py-4">
        <div className="flex flex-col gap-1 pt-4">
          <div className="text-center text-lg font-bold">
            변경 사항을 취소 하시겠어요?
          </div>
          <div className="text-center text-sm">
            수정하신 내용이 반영되지 않아요.
          </div>
        </div>
        <div className="flex gap-4 px-4 text-sm">
          <button
            className="w-1/2 rounded-lg bg-gray-200 py-3 text-center active:opacity-80"
            onClick={() => navigate(-1)}
          >
            수정 취소
          </button>
          <button
            className="w-1/2 rounded-lg bg-success py-3 text-center text-white"
            onClick={() => setIsConfirm(false)}
          >
            계속 편집
          </button>
        </div>
      </div>
    </div>
  );
}
