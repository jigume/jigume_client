import React, { useEffect, useRef } from 'react';
import { userPosition } from './marker';
import MarkerPin from '../../../asset/icon/markerPin.svg';

export default function MapContainer({
  position,
  markers,
  sheetProvider,
  setPreViewer,
}) {
  const { kakao } = window;
  const mapRef = useRef(null);
  const mapContainer = useRef(null);
  const clusterRef = useRef(null);

  const setMarkerDom = (item) => {
    const markerElement = document.createElement('div');
    markerElement.className = 'relative z-30 w-[40px] h-[57px]';
    const markerPin = document.createElement('img');
    markerPin.src = MarkerPin;
    const markerImage = document.createElement('div');
    markerImage.className =
      'absolute left-[5px] top-[5px] z-50 h-[30px] w-[30px] rounded-full bg-gray-300';
    markerImage.style.backgroundImage = `url(${item.imageUrl})`;
    markerElement.appendChild(markerPin);
    markerElement.appendChild(markerImage);
    markerElement.onclick = () => {
      sheetProvider.handleSheet('mid');
      setPreViewer(item);
    };

    return markerElement;
  };

  const initMap = () => {
    // create map
    mapRef.current = new kakao.maps.Map(mapContainer.current, {
      center: new kakao.maps.LatLng(position.lat, position.lng),
      level: 3,
      disableDoubleClick: false,
      disableDoubleClickZoom: false,
    });
  };

  const drawCurrentPosition = () => {
    const currentPosition = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(position.lat, position.lng),
      content: userPosition,
    });
    currentPosition.setMap(mapRef.current);
  };

  const drawMarkers = (markers_) => {
    // cluter object
    clusterRef.current = new kakao.maps.MarkerClusterer({
      map: mapRef.current,
      averageCenter: true,
      minLevel: 3,
      minClusterSize: 2,
      styles: [
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
      ],
    });
    // marker to array
    const markersArray = markers_.map(
      (item) =>
        new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(item.lat, item.lng),
          content: setMarkerDom(item),
        }),
    );

    // draw
    if (clusterRef.current !== undefined && clusterRef !== undefined) {
      clusterRef.current.clear();
      clusterRef.current.addMarkers(markersArray);
    }
  };

  // init map
  useEffect(() => {
    if (!kakao && !position && !mapContainer) return;
    initMap();
    drawCurrentPosition();
  }, []);

  // update markers
  useEffect(() => {
    drawMarkers(markers);
  }, [markers]);

  return (
    <div>
      <div ref={mapContainer} className="h-[100svh] w-full" />
    </div>
  );
}
