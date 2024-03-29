import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Address } from '@src/types/goods';
import { PositionType } from '@src/types/map';
import IntroStaticMap from '@src/components/MarkerOnStaticMap';

export default function PlaceInfo({
  coordinate,
  image,
  bg,
}: {
  coordinate?: Address;
  image?: string;
  bg?: string;
}) {
  const { kakao } = window;
  const [address, setAddress] = useState('-');

  const getAddress = (position?: PositionType) => {
    if (kakao === undefined) return;
    if (!kakao.maps.services.Geocoder) return;
    if (!position) return;

    const geoCoder = new kakao.maps.services.Geocoder();
    geoCoder.coord2Address(position.lng, position.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK)
        setAddress(result[0].address.address_name);
    });
  };

  useQuery(
    'revGeoCoder',
    () =>
      getAddress(
        coordinate && {
          lat: coordinate.latitude,
          lng: coordinate.longitude,
        }
      ),
    { retryDelay: 500, retry: 3 }
  );

  return (
    <div className={`flex flex-col gap-4 rounded-xl p-4 ${bg}`}>
      <div className="relative aspect-[1.9197] w-full rounded-xl bg-gray-300">
        <IntroStaticMap
          img={image || undefined}
          position={
            coordinate && {
              lat: coordinate.latitude,
              lng: coordinate.longitude,
            }
          }
        />
      </div>
      {address ? (
        <div className="text-center ">
          <span className="mr-2 text-sm font-light text-gray-600">
            픽업 예정 장소 :
          </span>
          <span>{address}</span>
        </div>
      ) : (
        <div className="mx-auto h-3 w-4/5 animate-pulse rounded-lg bg-gray-300" />
      )}
    </div>
  );
}

PlaceInfo.defaultProps = {
  coordinate: undefined,
  image: undefined,
  bg: 'bg-gray-100',
};
