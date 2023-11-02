import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CustomOverlayMap,
  Map as KakaoMap,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { throttle } from 'lodash';
import { getCurrentLocation, tempRandMarker } from '../../utils';
import BottomSheetComponent from './components/BottomSheetComponent';
import Loading from './components/Loading';
import ItemMarker from './components/ItemMarker';
import { userState } from '../../recoil';
import getGoodsList from '../../api/goods';
import useBottomSheet from '../../hooks/useBottomSheet';

export default function Map() {
  const { kakao } = window;
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [position, setPosition] = useState(undefined);
  const [address, setAddress] = useState('-');
  const [marker, setMarker] = useState([]);
  const sheetProvider = useBottomSheet();

  // geocoder
  const getAddress = () => {
    if (!position && !kakao.maps) return;
    if (!kakao?.maps.services.Geocoder) return;
    new kakao.maps.services.Geocoder().coord2Address(
      position.lng,
      position.lat,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK)
          setAddress(result[0].address.address_name);
      },
    );
  };

  // 쓰롤틀링으로 요청 제한
  const handleAddress = useMemo(
    () => throttle(getAddress, 5000),
    // 특정 범위 이동 내에선 요청 막음
    [position?.lat.toFixed(2), position?.lng.toFixed(2)],
  );

  const handleToCenter = () =>
    getCurrentLocation(setPosition).then(() => {
      if (user.position) setPosition(user.position);
    });

  // 맵 조작이 종료 되었을 때 실행하는 callback fn
  const handleDragEndMap = (map) =>
    setPosition({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });

  useEffect(() => {
    getCurrentLocation(setPosition);
  }, []);

  useEffect(() => {
    if (user.position && position !== undefined) handleAddress();
    else
      setUser((prev) => ({
        ...prev,
        position,
      }));

    if (user.position) setMarker(tempRandMarker(user.position));
  }, [position, user.position]);

  // const goods = useQuery('getGoods', () => getGoodsList(), {
  //   onSuccess: (res) => console.log(res),
  // });

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
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-primaryBlue">
              <div className="relative z-30 h-[16px] w-[16px] rounded-full bg-white" />
              <div className="absolute z-10 h-[30px] w-[30px] animate-ping rounded-full bg-primaryBlue" />
            </div>
          </CustomOverlayMap>

          <MarkerClusterer
            averageCenter
            minLevel={2}
            styles={[
              {
                width: '2rem',
                height: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                backgroundColor: '#F5535E',
                color: '#fff',
                zIndex: 2,
              },
            ]}
          >
            {marker.map((item, idx) => (
              <ItemMarker
                key={item.name}
                imageUrl={item.imageUrl}
                position={{
                  lat: item.lat,
                  lng: item.lng,
                }}
                onClick={() => sheetProvider.handleSheet('mid')}
              />
            ))}
          </MarkerClusterer>
        </KakaoMap>
      ) : (
        <Loading />
      )}

      <BottomSheetComponent
        address={address}
        handleToCenter={handleToCenter}
        sheetProvider={sheetProvider}
      />
    </div>
  );
}
