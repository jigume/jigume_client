import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { GoodsPageDTO } from '@src/types/goods';
import { PositionType } from '@src/types/map';
import IntroStaticMap from '@src/components/StaticMapOnMarker';

export default function PlaceInfo({
  data,
}: {
  data: GoodsPageDTO | undefined;
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
        data && {
          lat: data.address.mapY,
          lng: data.address.mapX,
        }
      ),
    { retryDelay: 500, retry: 3 }
  );

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-gray-50 p-4">
      <div className="relative aspect-[1.9197] w-full rounded-xl bg-gray-300">
        <IntroStaticMap
          img={data?.goodsImagesList[0].goodsImgUrl}
          position={
            data && {
              lat: data.address.mapY,
              lng: data.address.mapX,
            }
          }
        />
      </div>
      {data ? (
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
