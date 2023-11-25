import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CustomOverlayMap,
  Map as KakaoMap,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { throttle } from 'lodash';
import { getCurrentLocation } from '../../utils';
import BottomSheetComponent from './components/BottomSheetComponent';
import Loading from './components/Loading';
import { userState } from '../../recoil';
import { getGoodsList } from '../../api/goods';
import useBottomSheet from '../../hooks/useBottomSheet';
import { setClusterDom, setMarkerDom } from './urils';

export default function Map() {
  const { kakao } = window;
  const mapRef = useRef(null);
  const clusterRef = useRef(undefined);
  const sheetProvider = useBottomSheet();

  const [user, setUser] = useRecoilState(userState);
  const [position, setPosition] = useState(undefined);
  const [address, setAddress] = useState('-');
  const [preViewer, setPreViewer] = useState(undefined);

  const initMap = (list) => {
    if (!position && !list) return;
    if (list?.length === 0) return;

    // marker to array
    const markersArray = list?.map(
      (item) =>
        new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(item.point.y, item.point.x),
          content: setMarkerDom(item, sheetProvider, setPreViewer),
        }),
    );
    if (clusterRef.current && clusterRef && markersArray) {
      clusterRef.current.clear();
      clusterRef.current.addMarkers(markersArray);
    }
  };

  const { data: goods, refetch } = useQuery(
    'getGoods',
    () => getGoodsList(mapRef.current && mapRef.current.getBounds()),
    {
      onSuccess: (res) => {
        if (res.data === 'retry') refetch();
        else initMap(res.data?.markerList);
      },
    },
  );

  const drawCluster = () => {
    kakao.maps.event.addListener(clusterRef.current, 'clustered', (c) => {
      c.forEach((item) => {
        // eslint-disable-next-line no-underscore-dangle
        const imageUrl = item._markers[0].cc
          .querySelector('div')
          .style.backgroundImage.split('"')[1];
        const clusterDom = setClusterDom(
          imageUrl,
          // eslint-disable-next-line no-underscore-dangle
          item._markers.length,
        );
        const clusterOberlay = item.getClusterMarker();
        clusterOberlay.setContent(clusterDom);
      });
    });
  };

  // geocoder
  const getAddress = () => {
    if (!position && !kakao.maps) return;
    const geocoder = new kakao.maps.services.Geocoder();
    if (!geocoder) return;
    geocoder.coord2Address(position.lng, position.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK)
        setAddress(result[0].address.address_name);
    });
  };

  // 쓰롤틀링으로 요청 제한
  const handleAddress = useMemo(
    () => throttle(getAddress, 5000),
    // 특정 범위 이동 내에선 요청 막음
    [position?.lat.toFixed(2), position?.lng.toFixed(2)],
  );

  // 지도 중앙으로 이동
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
    refetch();
  };

  const onClusterclick = (_, cluster) => {
    mapRef.current.setLevel(mapRef.current.getLevel() - 1, {
      anchor: cluster.getCenter(),
    });
  };

  // 사용자 현재 위치 가져오기
  useEffect(() => {
    getCurrentLocation(setPosition);
  }, []);

  // 주소 변환 및 마커 등록
  useEffect(() => {
    if (user.position && position !== undefined) handleAddress();
    else
      setUser((prev) => ({
        ...prev,
        position,
      }));

    refetch();
  }, [position, user.position]);

  // 미리보기 상태가 아닐 시 미리보기 콘텐츠 초기화
  useEffect(() => {
    if (sheetProvider.sheetLevel !== 'mid') setPreViewer(undefined);
  }, [sheetProvider.sheetLevel]);

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
            // top: sheetProvider.sheetLevel === 'mid' ? '-100px' : '0',
          }}
          level={3}
          onDragEnd={handleDragEndMap}
          onZoomChanged={handleDragEndMap}
        >
          <CustomOverlayMap position={user.position} zIndex={50}>
            <div className="z-[999] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-primaryBlue">
              <div className="relative z-30 h-[16px] w-[16px] rounded-full bg-white" />
              <div className="absolute z-10 h-[30px] w-[30px] animate-ping rounded-full bg-primaryBlue" />
            </div>
          </CustomOverlayMap>
          <MarkerClusterer
            ref={clusterRef}
            disableClickZoom
            averageCenter
            clickable
            minLevel={2}
            onClustered={drawCluster}
            onClusterclick={onClusterclick}
          />
        </KakaoMap>
      ) : (
        <Loading />
      )}

      <BottomSheetComponent
        address={address}
        handleToCenter={handleToCenter}
        sheetProvider={sheetProvider}
        preViewer={preViewer}
        bounds={mapRef.current?.getBounds()}
      />
    </div>
  );
}
