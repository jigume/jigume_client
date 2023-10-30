import React from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import MarkerPin from '../../../../asset/icon/markerPin.svg';

export default function ItemMarker({ position, imageUrl, onClick }) {
  return (
    <CustomOverlayMap position={position}>
      <div className="w-[40px]" onClick={onClick}>
        <img src={MarkerPin} />
        <div
          className="absolute left-[5px] top-[5px] z-50 h-[30px] w-[30px] rounded-full bg-gray-300"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
    </CustomOverlayMap>
  );
}
