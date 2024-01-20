import { StaticMap } from 'react-kakao-maps-sdk';
import { PositionType } from '@src/types/map';
import markerPin from '@src/asset/icon/markerPin.svg';

export default function MarkerOnStaticMap({
  img,
  position,
  markerImg,
}: {
  img?: string;
  markerImg?: string;
  position?: PositionType;
}) {
  return (
    <div className="relative aspect-[1.9197] w-full rounded-xl bg-gray-300">
      <div className="absolute left-1/2 top-[45%] z-10 w-8 -translate-x-1/2 -translate-y-1/2">
        <img src={markerImg || markerPin} alt="위치" />
        {img ? (
          <img
            src={img}
            className="absolute left-[5px] top-[5px] z-50 size-[22px] rounded-full bg-gray-300"
            alt="거래 위치"
          />
        ) : (
          <div className="absolute left-[5px] top-[5px] z-50 size-[22px] rounded-full bg-white" />
        )}
      </div>

      {position?.lat ? (
        <StaticMap
          className="size-full rounded-xl"
          marker={false}
          center={{
            // 마커를 위한 위치 조정
            lat: position.lat + 0.00045,
            lng: position.lng,
          }}
          level={5}
        />
      ) : (
        <div />
      )}
    </div>
  );
}

MarkerOnStaticMap.defaultProps = {
  img: undefined,
  markerImg: undefined,
  position: undefined,
};
