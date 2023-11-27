import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Map } from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';
import { throttle } from 'lodash';
import { getCurrentLocation } from '../../../../../utils';
import NextButton from '../../../../../components/NextButton';
import { userState } from '../../../../../recoil';
import Fab from '../../../../Map/components/BottomSheetComponent/components/Fab';
import Loading from '../../../../Map/components/Loading';

export default function InitAddress() {
  const { initUser, setInitUser } = useOutletContext();
  const [position, setPosition] = useState(undefined);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  // 지도 중앙으로 이동
  const handleToCenter = () => {
    getCurrentLocation(setPosition).then(() => {
      if (user.position) setPosition(user.position);
    });
  };

  const setUserPosition = () => {
    if (!position) return;
    setInitUser((prev) => ({ ...prev, position }));
    setUser((prev) => ({
      ...prev,
      position,
    }));
  };

  // 쓰롤틀링으로 요청 제한
  const handleAddress = useMemo(
    () => throttle(setUserPosition, 500),
    // 특정 범위 이동 내에선 요청 막음
    [],
  );

  useEffect(() => {
    handleAddress();
  }, [position]);

  useEffect(() => {
    getCurrentLocation(setPosition);
    // 잘못된 요청 방지
    if (!initUser.nickname) navigate('/auth/init');
  }, []);

  return (
    <>
      {position ? (
        <Map
          isPanto
          className="h-[calc(100svh-48px)] w-full"
          center={position}
        />
      ) : (
        <Loading />
      )}

      <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white">
        여기서 거래희망해요
      </div>

      <div className="absolute bottom-0 z-50 w-full max-w-screen-sm px-4">
        <div className="absolute bottom-28 right-4 flex flex-row gap-2">
          <Fab onlyCurr handleToCenter={handleToCenter} />
        </div>

        <NextButton isDisabled={!position} linkTo="/auth/init/image" />
      </div>
    </>
  );
}
