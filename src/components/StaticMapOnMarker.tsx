import { StaticMap } from 'react-kakao-maps-sdk';
import { PositionType } from '@src/types/map';
import markerPin from '@src/asset/icon/markerPin.svg';

export default function StaticMapOnMarker({
  img,
  position,
}: {
  img?: string;
  position?: PositionType;
}) {
  return (
    <div className="relative aspect-[1.9197] w-full rounded-xl bg-gray-300">
      <div className="absolute left-1/2 top-[calc(50%+10px)] z-10 w-8 -translate-x-1/2 -translate-y-1/2">
        <img src={markerPin} alt="위치" />
        <img
          src={img}
          className="absolute left-[5px] top-[5px] z-50 size-[22px] rounded-full bg-gray-300"
          alt="거래 위치"
        />
      </div>
      {position ? (
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

StaticMapOnMarker.defaultProps = {
  img: undefined,
  position: undefined,
};
