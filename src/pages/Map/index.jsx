import React, { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, Map as KakaoMap } from 'react-kakao-maps-sdk';
import getCurrentLocation from '../../utils';
import BottomSheetComponent from './components/BottomSheetComponent';
import Loading from './components/Loading';
import ItemMarker from './components/ItemMarker';
import { getGoods } from './api';

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
  const [implicit, setImplicit] = useState(undefined);
  const [address, setAddress] = useState('-');
  const [marker, setMarker] = useState([]);

  const getAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK)
        setAddress(result[0].address.address_name);
    };
    geocoder.coord2Address(position.lng, position.lat, callback);
  };

  const handleImplicitPosition = () => {
    if (implicit !== undefined) {
      setPosition(implicit);
    }
  };

  useEffect(() => {
    getCurrentLocation(setPosition, setImplicit);
    getAddress();
  }, []);

  useEffect(() => {
    getGoods().then((res) => setMarker(res));
  }, []);

  useEffect(() => {
    console.log(marker);
  }, [marker]);

  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      {position.lat !== initPosition.lat ? (
        <KakaoMap
          ref={mapRef}
          center={position}
          isPanto
          style={{
            width: '100%',
            height: '100svh',
          }}
          level={3}
        >
          <CustomOverlayMap position={implicit}>
            <div className="w-[32px] h-[32px] rounded-full bg-primaryBlue flex items-center justify-center">
              <div className="w-[16px] h-[16px] rounded-full bg-white relative z-30" />
              <div className="bg-primaryBlue w-[30px] h-[30px] absolute rounded-full z-10 animate-ping" />
            </div>
          </CustomOverlayMap>
          {tempMarker.map((item) => (
            <ItemMarker
              position={{ lat: item.lat, lng: item.lng }}
              key={item.lat}
            />
          ))}
          {marker.map((item) => {
            console.log(item);
            const numX = Math.random() / 100;
            const numY = (Math.random() / 100) * -1;

            return (
              <div key={item.name}>
                {item.name}
                <ItemMarker
                  position={{
                    lat: position.lat + numX,
                    lng: position.lng + numY,
                  }}
                />
              </div>
            );
          })}
        </KakaoMap>
      ) : (
        <Loading />
      )}

      <BottomSheetComponent
        address={address}
        handleImplicitPosition={handleImplicitPosition}
      />
    </div>
  );
}
