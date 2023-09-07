import React, { useEffect, useRef, useState } from 'react';
import { Map as KakaoMap } from 'react-kakao-maps-sdk';
import getCurrentLocation from '../../utils';
import BottomSheetComponent from './components/BottomSheetComponent';

export default function Map() {
  const { kakao } = window;
  const mapRef = useRef();
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [address, setAddress] = useState('-');

  const getAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    };
    geocoder.coord2Address(position.lng, position.lat, callback);
  };

  useEffect(() => {
    getCurrentLocation(setPosition);
    getAddress();
  }, []);

  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      <KakaoMap
        ref={mapRef}
        center={position}
        style={{
          width: '100%',
          height: '100svh',
        }}
        level={3}
      />

      <BottomSheetComponent address={address} />
    </div>
  );
}
