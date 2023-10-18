import React, { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, Map as KakaoMap } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import getCurrentLocation from '../../utils';
import BottomSheetComponent from './components/BottomSheetComponent';
import Loading from './components/Loading';
import ItemMarker from './components/ItemMarker';
import { userState } from '../../recoil';

export default function Map() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const { kakao } = window;
  const mapRef = useRef();
  const [position, setPosition] = useState(undefined);
  const [address, setAddress] = useState('-');
  const [marker] = useState([]);

  // geocoder
  const getAddress = () => {
    if (!position) return;
    const callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK)
        setAddress(result[0].address.address_name);
    };
    new kakao.maps.services.Geocoder().coord2Address(
      position.lng,
      position.lat,
      callback,
    );
  };

  const handleToCenter = () => {
    getCurrentLocation(setPosition).then(() => {
      if (user.position) setPosition(user.position);
    });
  };

  // 맵 조작이 종료 되었을 때 실행하는 callback fn
  const handleDragEndMap = (map) => {
    setPosition({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
  };

  useEffect(() => {
    getCurrentLocation(setPosition);
    // getGoods().then((res) => setMarker(res));
  }, []);

  useEffect(() => {
    if (user.position && position !== undefined) getAddress();
    else
      setUser((prev) => ({
        ...prev,
        position,
      }));
  }, [position, user.position]);

  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      {position ? (
        <KakaoMap
          ref={mapRef}
          center={position}
          isPanto
          style={{
            width: '100%',
            height: '100svh',
          }}
          level={3}
          onDragEnd={handleDragEndMap}
        >
          <CustomOverlayMap position={user.position}>
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
