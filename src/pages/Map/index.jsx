import React, { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, Map as KakaoMap } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import getCurrentLocation from '../../utils';
import BottomSheetComponent from './components/BottomSheetComponent';
import Loading from './components/Loading';
import ItemMarker from './components/ItemMarker';
import { userState } from '../../recoil';
// import { getGoods } from './api';

const initPosition = {
  lat: 33.450701,
  lng: 126.570667,
};

export default function Map() {
  const { kakao } = window;
  const mapRef = useRef();
  const [position, setPosition] = useState(initPosition);
  const [address, setAddress] = useState('-');
  const [marker] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const getAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK)
        setAddress(result[0].address.address_name);
    };
    geocoder.coord2Address(position.lng, position.lat, callback);
  };

  const handleToCenter = () => {
    if (user.position !== undefined) setPosition(user.position);
  };

  useEffect(() => {
    getCurrentLocation(setPosition);
    // getGoods().then((res) => setMarker(res));
  }, []);

  useEffect(() => {
    if (user.position !== undefined) getAddress();

    setUser((prev) => {
      return {
        ...prev,
        position,
      };
    });
  }, [position]);

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
          <CustomOverlayMap position={position}>
            <div className="w-[32px] h-[32px] rounded-full bg-primaryBlue flex items-center justify-center">
              <div className="w-[16px] h-[16px] rounded-full bg-white relative z-30" />
              <div className="bg-primaryBlue w-[30px] h-[30px] absolute rounded-full z-10 animate-ping" />
            </div>
          </CustomOverlayMap>
          {marker.map((item, idx) => {
            const numX = Math.random() / 100;
            const numY = (Math.random() / 100) * -1;

            return (
              <div
                key={item.name}
                onClick={() => navigate(`/introduce/${idx}`)}
              >
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

      <BottomSheetComponent address={address} handleToCenter={handleToCenter} />
    </div>
  );
}
