import React from 'react';

import { Map as KakaoMap } from 'react-kakao-maps-sdk';

export default function Map() {
  return (
    <KakaoMap
      center={{
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        width: '100%',
        height: '100svh',
      }}
      level={3}
    ></KakaoMap>
  );
}
