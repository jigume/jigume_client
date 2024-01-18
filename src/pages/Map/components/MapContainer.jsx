import React, { useEffect, useRef } from 'react';
import { clusterStyles, userPosition } from './marker';
import { setClusterDom, setMarkerDom } from '../utils';

export default function MapContainer({
  position,
  markers,
  sheetProvider,
  setPreViewer,
}) {
  const { kakao } = window;
  const mapRef = useRef(undefined);
  const mapContainer = useRef(undefined);
  const clusterRef = useRef(undefined);

  const initMap = () => {
    // create map
    mapRef.current = new kakao.maps.Map(mapContainer.current, {
      center: new kakao.maps.LatLng(position.lat, position.lng),
      level: 3,
      disableDoubleClick: false,
      disableDoubleClickZoom: false,
    });
  };

  const initCluster = () => {
    clusterRef.current = new kakao.maps.MarkerClusterer({
      map: mapRef.current,
      averageCenter: true,
      minLevel: 3,
      minClusterSize: 2,
      styles: [clusterStyles],
    });
    if (clusterRef.current)
      kakao.maps.event.addListener(clusterRef.current, 'clustered', (c) => {
        c.forEach((item) => {
          // eslint-disable-next-line no-underscore-dangle
          const imageUrl = item._markers[0].cc
            .querySelector('div')
            .style.backgroundImage.split('"')[1];
          item
            .getClusterMarker()
            // eslint-disable-next-line no-underscore-dangle
            .setContent(setClusterDom(imageUrl, item._markers.length));
        });
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
    // marker to array
    const markersArray = markers_.map(
      (item) =>
        new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(item.lat, item.lng),
          content: setMarkerDom(item, sheetProvider, setPreViewer),
        }),
    );
    if (clusterRef.current && clusterRef) {
      clusterRef.current.clear();
      clusterRef.current.addMarkers(markersArray);
    }
  };

  // init map
  useEffect(() => {
    if (!kakao && !position && !mapContainer) return;
    initMap();
    initCluster();
    drawCurrentPosition();
  }, []);

  // update markers
  useEffect(() => {
    drawMarkers(markers);
  }, [markers]);

  return <div ref={mapContainer} className="h-[100svh] w-full" />;
}
