import React, { useEffect, useRef } from 'react';
import { userPosition } from './marker';
import MarkerPin from '../../../asset/icon/markerPin.svg';

export default function MapContainer({
  position,
  makers,
  sheetProvider,
  setPreViewer,
}) {
  const { kakao } = window;
  const mapRef = useRef(null);

  useEffect(() => {
    if (!kakao && !position && !mapRef) return;

    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(position.lat, position.lng),
      level: 3,
    };
    // create map
    const map = new kakao.maps.Map(container, options);

    // draw user position
    const currentPosition = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(position.lat, position.lng),
      content: userPosition,
    });
    currentPosition.setMap(map);

    // draw marker
    makers.forEach((item) => {
      // create marker obeject
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

      // dom object
      const imagedMarkers = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(item.lat, item.lng),
        content: markerElement,
        yAnchor: 1,
      });
      imagedMarkers.setMap(map);

      kakao.maps.event.addListener(imagedMarkers, 'click', () => {});
    });
  }, []);

  return (
    <div>
      <div ref={mapRef} className="h-[100svh] w-full" />
    </div>
  );
}
