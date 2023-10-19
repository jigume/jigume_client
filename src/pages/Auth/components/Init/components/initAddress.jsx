import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getCurrentLocation } from '../../../../../utils';
import CircularProgress from './circularProgress';

export default function InitAddress() {
  const { initUser, setInitUser } = useOutletContext();
  const [position, setPosition] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentLocation(setPosition);
  });

  useEffect(() => {
    setInitUser((prev) => ({ ...prev, position }));
  }, [position]);

  useEffect(() => {
    // 잘못된 요청 방지
    if (!initUser.nickname) navigate('/auth/init');
  }, []);

  return (
    <>
      <div>어디에서 거래 하시길 희망하시나요?</div>
      <p>
        임시로 사용자의 위치를 저장 <br />
        {position
          ? `위치 정보: ${position.lat}, ${position.lng}`
          : '위치 정보를 불러오는 중...'}
      </p>
      <button
        disabled={!position}
        className="h-12 bg-success text-white text-center w-full text-md p-3 rounded-lg active:scale-[99%] transition-all ease-in-out duration-300 disabled:bg-gray-300 active:disabled:scale-100"
        onClick={() => navigate('/auth/init/image')}
      >
        {!position ? <CircularProgress /> : '다음으로 넘어가기'}
      </button>
    </>
  );
}
