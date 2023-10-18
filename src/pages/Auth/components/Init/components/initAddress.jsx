import React, { useEffect, useState } from 'react';
import getCurrentLocation from '../../../../../utils';
// import { useMutation } from 'react-query';

export default function InitAddress() {
  const [position, setPosition] = useState(undefined);

  useEffect(() => {
    getCurrentLocation(setPosition);
  });

  // const postUser = useMutation('postUser', )

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
        className="bg-success text-white text-center w-full text-md p-3 rounded-lg active:scale-[99%] transition-all ease-in-out duration-300 disabled:bg-gray-300 active:disabled:scale-100"
        // onClick={() => navigate('/auth/init/address')}
      >
        완료하기
      </button>
    </>
  );
}
