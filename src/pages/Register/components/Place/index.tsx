import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  CategoryGroupCode,
  NearPlacesType,
  RegisterContextType,
} from '@src/types/register';
import { PositionType } from '@src/types/map';
import { getCurrentLocation } from '@src/utils';
import { useMutation } from 'react-query';
import { getPlaces } from '@src/api/register';
import NextButton from '@src/components/NextButton';
import MarkerOnStaticMap from '@src/components/MarkerOnStaticMap';
import RegistMarker from '@src/asset/icon/RegistMarker.svg';
import Postcode from './components/postcode';
import Selector from './components/Selector';

const category: CategoryGroupCode[] = ['MT1', 'CS2', 'SW8', 'BK9', 'PO3'];

function Place() {
  const { data, setData } = useOutletContext<RegisterContextType>();
  // -2: default, -1: 직접 입력
  const [index, setIndex] = useState(-2);
  const [places, setPlaces] = useState<NearPlacesType[]>([]);
  const [position, setPosition] = useState<PositionType | undefined>(undefined);

  const isMovable = data.address !== '';

  const { mutate, isLoading } = useMutation({
    mutationFn: getPlaces,
    onSuccess: (res) => {
      res.forEach((item) => {
        setPlaces((prev) => {
          // 중복 방지
          const isExist = prev.find(
            (place) => place.place_name === item.place_name
          );
          if (!isExist) return [...prev, item];
          return prev;
        });
        return item;
      });
    },
  });

  useEffect(() => {
    getCurrentLocation(setPosition);
  }, []);

  useEffect(() => {
    if (position)
      category.forEach((CODE) => mutate({ position, CAT_CODE: CODE }));
  }, [position]);

  useEffect(() => {
    // 거리 순으로 정렬
    setPlaces((prev) => {
      const temp = prev;
      temp.sort((a, b) => a.distance - b.distance);
      return temp;
    });
  }, [places]);

  // 주변 위치를 거래 장소로 지정했을 시
  useEffect(() => {
    if (index >= 0) {
      setData((prev) => ({
        ...prev,
        address: places[index].place_name,
        goodsDto: {
          ...prev.goodsDto,
          mapX: places[index].x,
          mapY: places[index].y,
        },
      }));
    }
  }, [index]);

  return (
    <div className="flex h-[calc(100svh-48px)] w-full flex-col justify-between">
      <div className="h-full pb-24">
        <div className="pb-10 pt-[13vh] text-lg font-bold">
          어디서 공구 물품을 전달할까요?
          <br />
          팔로워들과 만날 픽업 장소를 알려주세요.
        </div>
        <div className="mb-2 align-top text-sm font-thin">픽업 위치 지정</div>
        <Selector
          index={index}
          setIndex={setIndex}
          places={places}
          isLoading={position ? isLoading : true}
        />
        <div className="flex flex-col gap-4">
          {index === -1 && <Postcode data={data} setData={setData} />}
          {(data.goodsDto.mapX || index >= 0) && (
            <div className="relative top-16">
              <div className="mb-2 align-top text-sm font-thin">
                픽업 위치 확인
              </div>
              <MarkerOnStaticMap
                position={
                  index >= 0
                    ? {
                        lat: places[index].y,
                        lng: places[index].x,
                      }
                    : {
                        lat: data.goodsDto.mapY as number,
                        lng: data.goodsDto.mapX as number,
                      }
                }
                markerImg={RegistMarker}
              />
            </div>
          )}
        </div>
      </div>

      {isMovable && (
        <div className="mb-2 text-center align-top text-sm font-thin">
          이제 마지막이에요!
        </div>
      )}
      <NextButton isDisabled={!isMovable} linkTo="/register/notice" />
    </div>
  );
}

export default Place;
