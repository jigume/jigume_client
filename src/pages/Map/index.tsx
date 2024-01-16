import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CustomOverlayMap,
  Map as KakaoMap,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { throttle } from 'lodash';
import { Marker } from '@src/types/goods';
import { UserType } from '@src/types/data';
import { PositionType } from '@src/types/map';
import { getCurrentLocation } from '../../utils';
import BottomSheetComponent from './components/BottomSheetComponent';
import Loading from './components/Loading';
import { userState } from '../../data';
import { getGoodsList } from '../../api/goods';
import useBottomSheet from '../../hooks/useBottomSheet';
import { setClusterDom, setMarkerDom } from './utils';
import CurrentPoint from './components/CurrentPoint';
import { PreViewerMarker } from './index.d';

export default function Map() {
  const { kakao } = window;
  const mapRef = useRef<kakao.maps.Map>(null);
  const clusterRef = useRef<kakao.maps.MarkerClusterer>(null);
  const sheetProvider = useBottomSheet();

  const [user, setUser] = useRecoilState<UserType>(userState);
  const [position, setPosition] = useState<PositionType | undefined>(undefined);
  const [address, setAddress] = useState('-');
  const [preViewer, setPreViewer] = useState<PreViewerMarker | undefined>(
    undefined
  );
  const [markerList, setMarkerList] = useState<Marker[] | undefined>(undefined);

  const initMap = (list: Marker[]) => {
    if (!list) return;
    // marker to array
    const markersArray = list?.map((item) => {
      return new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(item.address.mapY, item.address.mapX),
        content: setMarkerDom(item, sheetProvider, setPreViewer),
      });
    });

    if (clusterRef.current && clusterRef && markersArray) {
      clusterRef.current.clear();
      clusterRef.current.addMarkers(markersArray);
    }
  };

  const { refetch } = useQuery(
    'getGoods',
    () => getGoodsList(mapRef.current && mapRef.current.getBounds()),
    {
      onSuccess: (res) => {
        // init map list
        if (res !== 'retry') {
          initMap(res.markerList);
          // 중복 방지
          if (!markerList) setMarkerList(res.markerList);
        }
      },
    }
  );

  // 클러스터 완료되었을 때 데이터를 읽어 DOM으로 변환
  const drawCluster = (
    target: kakao.maps.MarkerClusterer,
    clusters: kakao.maps.Cluster[]
  ) => {
    if (clusterRef.current)
      kakao.maps.event.addListener(
        clusterRef.current,
        'clustered',
        (cluster: kakao.maps.Cluster[]) => {
          cluster.forEach((item: any) => {
            // eslint-disable-next-line no-underscore-dangle
            const imageUrl = item._markers[0].cc.querySelector('.prodImg').src;
            const clusterDom = setClusterDom(
              imageUrl,
              // eslint-disable-next-line no-underscore-dangle
              item._markers.length
            );
            const clusterOberlay = item.getClusterMarker();
            clusterOberlay.setContent(clusterDom);
          });
        }
      );
  };

  // geocoder
  const getAddress = () => {
    if (!kakao) return;
    if (!kakao.maps) return;
    if (!kakao.maps.services) return;
    if (!position) return;

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(position.lng, position.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK)
        setAddress(result[0].address.address_name);
    });
  };

  // 쓰롤틀링으로 요청 제한
  const handleAddress = useMemo(
    () => throttle(getAddress, 5000),
    // 특정 범위 이동 내에선 요청 막음
    [position?.lat.toFixed(1), position?.lng.toFixed(1)]
  );

  // 지도 중앙으로 이동
  const handleToCenter = () => {
    getCurrentLocation(setPosition).then(() => {
      if (user.position) setPosition(user.position);
    });
  };

  // 맵 조작이 종료 되었을 때 실행하는 callback fn
  const handleDragEndMap = (map: kakao.maps.Map) => {
    setPosition({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
    console.log(map.getCenter());
    refetch();
  };

  // 쓰롤틀링으로 요청 제한
  const handleDragMap = useMemo(
    () => throttle(handleDragEndMap, 5000),
    // 특정 범위 이동 내에선 요청 막음
    [position?.lat.toFixed(1), position?.lng.toFixed(1)]
  );

  const onClusterclick = (
    _: kakao.maps.MarkerClusterer,
    cluster: kakao.maps.Cluster
  ) => {
    if (mapRef.current)
      mapRef.current.setLevel(mapRef.current.getLevel() - 1, {
        anchor: cluster.getCenter(),
      });
  };

  // 사용자 현재 위치 가져오기
  useEffect(() => {
    getCurrentLocation(setPosition);
    refetch();
  }, []);

  // 주소 변환 및 마커 등록
  useEffect(() => {
    if (user.position && position !== undefined) {
      handleAddress();
    } else {
      setUser((prev) => ({
        ...prev,
        position,
      }));
    }
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
          className="h-[100svh] w-full"
          level={3}
          onDragEnd={handleDragMap}
          onZoomChanged={handleDragEndMap}
          onCreate={refetch as () => void}
        >
          {/* user current position */}
          <CustomOverlayMap
            position={user.position as PositionType}
            zIndex={50}
          >
            <CurrentPoint />
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
