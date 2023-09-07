import React, { useEffect, useRef, useState } from 'react';
import { Map as KakaoMap } from 'react-kakao-maps-sdk';
import getCurrentLocation from '../../utils';
import BottomSheetComponent from './components/BottomSheetComponent';
import Loading from './components/Loading';

import ItemMarker from './components/ItemMarker';

const initPosition = {
  lat: 33.450701,
  lng: 126.570667,
};

const tempMarker = [
  { lat: 33.44853, lng: 126.91604 },
  { lat: 33.44933, lng: 126.91535 },
  { lat: 33.44652, lng: 126.91734 },
  { lat: 33.44752, lng: 126.91634 },
  { lat: 33.44532, lng: 126.91324 },
];

export default function Map() {
  const { kakao } = window;
  const mapRef = useRef();
  const [position, setPosition] = useState(initPosition);
  const [address, setAddress] = useState('-');

  const getAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK)
        setAddress(result[0].address.address_name);
    };
    geocoder.coord2Address(position.lng, position.lat, callback);
  };

  useEffect(() => {
    getCurrentLocation(setPosition);
    getAddress();
  }, []);

  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      {position.lat !== initPosition.lat ? (
        <KakaoMap
          ref={mapRef}
          center={position}
          style={{
            width: '100%',
            height: '100svh',
          }}
          level={3}
        >
          {tempMarker.map((item) => (
            <ItemMarker
              position={{ lat: item.lat, lng: item.lng }}
              key={item.lat}
            />
          ))}
        </KakaoMap>
      ) : (
        <Loading />
      )}

      <BottomSheetComponent address={address} />
    </div>
  );
}
