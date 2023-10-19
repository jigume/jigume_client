import React from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import MarkerPin from '../../../../asset/icon/markerPin.svg';

export default function ItemMarker({ position, imageUrl }) {
  return (
    <CustomOverlayMap position={position}>
      <div className="w-[40px]">
        <img src={MarkerPin} />
        <div
          className="w-[30px] h-[30px] rounded-full absolute z-50 top-[5px] left-[5px] bg-gray-300"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
    </CustomOverlayMap>
  );
}
