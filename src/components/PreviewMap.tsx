import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { PositionType } from '@src/types/map';
import markerPin from '@src/asset/icon/markerPin.svg';

export default function PreviewMap({
  img,
  position,
  markerImg,
}: {
  img?: string;
  markerImg?: string;
  position?: PositionType;
}) {
  return (
    <div className="relative aspect-[1.9197] w-full rounded-md bg-gray-300">
      {position?.lat ? (
        // <StaticMap
        //   className="size-full rounded-xl"
        //   marker={false}
        //   center={{
        //     // 마커를 위한 위치 조정
        //     lat: position.lat + 0.00045,
        //     lng: position.lng,
        //   }}
        //   level={5}
        // />
        <Map
          className="size-full rounded-xl"
          center={{
            // 마커를 위한 위치 조정
            lat: position.lat + 0.00045,
            lng: position.lng,
          }}
          level={5}
        >
          <CustomOverlayMap
            position={{
              // 마커를 위한 위치 조정
              lat: position.lat + 0.00045,
              lng: position.lng,
            }}
          >
            <div className="relative h-20 w-10">
              <div className="absolute left-[5px] top-[5px] z-50 size-[22px] rounded-full bg-white" />
              <img
                className="absolute z-10 max-w-8"
                src={markerImg}
                alt="거래 위치"
              />
            </div>
          </CustomOverlayMap>
        </Map>
      ) : (
        <div />
      )}
    </div>
  );
}

PreviewMap.defaultProps = {
  img: undefined,
  markerImg: undefined,
  position: undefined,
};
