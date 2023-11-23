import { useEffect } from 'react';

export default function useKakaoMap({ mapRef, position }) {
  const { kakao } = window;
  const apiKey = import.meta.env.VITE_KAKAO_JS_KEY;
  let map;

  // kakao map
  useEffect(() => {
    if ((!kakao && !position, !mapRef)) return;

    const { latitude, longitude } = position;
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        new kakao.maps.Map(mapRef.current, options);
      });
    });
  }, []);

  return {
    map,
  };
}
