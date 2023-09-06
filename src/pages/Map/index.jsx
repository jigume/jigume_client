import React, { useEffect, useState } from 'react';

import { Map as KakaoMap } from 'react-kakao-maps-sdk';
import { getCurrentLocation } from '../../utils';

export default function Map() {
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  useEffect(() => {
    getCurrentLocation(setPosition);
  }, []);

  return (
    <KakaoMap
      center={position}
      style={{
        width: '100%',
        height: '100svh',
      }}
      level={3}
    ></KakaoMap>
  );
}
