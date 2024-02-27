import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useMutation } from 'react-query';
import RegistMarker from '@src/asset/icon/RegistMarker.svg';
import camera from '@src/asset/icon/mdi_camera.svg';
import close from '@src/asset/icon/CloseIcon.svg';
import Loading from '@src/pages/Map/components/Loading';
import StyledCountInput from '@src/components/StyledCountInput';
import StyledCurrencyInput from '@src/components/StyledCurrencyInput';
import StyledTextarea from '@src/components/StyledTextarea';
import InputWithNum from '@src/components/InputWithNum';
import getOpenGraph from '@src/api/og';
import OpenGraphViewer from '@src/components/OpenGraphViewer';
import StyledInputText from '@src/components/StyledInputText';
import CalendarDate from '@src/pages/Register/components/Deadline/components/calendarDate';
import Selector from '@src/pages/Register/components/Place/components/Selector';
import { NearPlacesType } from '@src/types/register';
import { PositionType } from '@src/types/map';
import { getPlaces } from '@src/api/register';
import PreviewMap from '@src/components/PreviewMap';
import { PlaceCodes } from '@src/common';
import { getCurrentLocation } from '@src/utils';
import category from '@src/pages/Map/components/BottomSheetComponent/data';
import PostCodeModify from './components/PostCodeModify';
import { GoodsContextType, GoodsModifyType } from '../../index.d';
import ModifyHeader from './components/ModifyHeader';
import ModifyCategory from './components/ModifyCategory';

const initModifyData: GoodsModifyType = {
  images: [],
  imagesInput: [],
  categoryId: -1,
  goodsName: '',
  introduction: '',
  goodsPrice: 0,
  deliveryFee: 0,
  goodsLimitCount: 0,
  goodsLimitTime: new Date(),
  coordinate: { longitude: 0, latitude: 0 },
};

export default function GoodsModify() {
  const navigate = useNavigate();
  const { goods, isSuccess } = useOutletContext<GoodsContextType>();
  const [modify, setModify] = useState<GoodsModifyType>(initModifyData);
  const [prevData, setPrevData] = useState<GoodsModifyType>(initModifyData);
  // 위치 관련 states
  // -2: default, -1: 직접 입력
  const [index, setIndex] = useState(-2);
  const [places, setPlaces] = useState<NearPlacesType[]>([]);
  const [position, setPosition] = useState<PositionType | undefined>(undefined);
  const [address, setAddress] = useState('');

  const [isConfirm, setIsConfirm] = useState(false);

  const encodeFileToBase64 = (fileBlob: File) => {
    // 이미지 선택 취소 시 예외처리
    if (fileBlob === undefined) return null;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise(() => {
      // onLoad에서 실행
      reader.onload = () => {
        const prevImages = modify.images;
        const prevImageInput = modify.imagesInput;
        prevImages.push(reader.result as string);
        prevImageInput.push(fileBlob);
        setModify((prev) => ({
          ...prev,
          images: prevImages,
          imagesInput: prevImageInput,
        }));
      };
    });
  };

  // OpenGraph API 사용
  const { mutate: getOG, data: openGraph } = useMutation(
    'introOpenGraph',
    () => getOpenGraph(goods.goodsPageDto.link),
    {
      retryDelay: 500,
    }
  );

  // KAKAO API로 검색
  const { mutate: getKakaoPlaces, isLoading } = useMutation({
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

  // 초기 위치 검색
  useEffect(() => {
    getCurrentLocation(setPosition);
  }, []);

  // 등록된 코드를 통해 주변 위치 검색
  useEffect(() => {
    if (position)
      PlaceCodes.forEach((CODE) =>
        getKakaoPlaces({ position, CAT_CODE: CODE })
      );
  }, [position]);

  // 주변 위치를 거래 장소로 지정했을 시
  useEffect(() => {
    if (index >= 0) {
      setAddress(places[index].place_name);
      setModify((prev) => ({
        ...prev,
        coordinate: {
          latitude: places[index].y,
          longitude: places[index].x,
        },
      }));
    } else if (index === -1) {
      setAddress('');
      setModify((prev) => ({
        ...prev,
        coordinate: { latitude: 0, longitude: 0 },
      }));
    }
  }, [index]);

  // 기존값을 수정할 값에 반영
  useEffect(() => {
    if (isSuccess) {
      getOG();
      const newData = {
        images: goods.goodsPageDto.goodsImagesList.map(
          (item) => item.goodsImgUrl
        ),
        imagesInput: [],
        categoryId: goods.goodsPageDto.categoryId,
        goodsName: goods.goodsPageDto.goodsName,
        introduction: goods.goodsPageDto.introduction,
        goodsPrice: goods.goodsPageDto.goodsPrice,
        deliveryFee: goods.goodsPageDto.deliveryFee,
        goodsLimitCount: goods.goodsPageDto.goodsLimitCount,
        goodsLimitTime: new Date(goods.goodsPageDto.goodsLimitTime),
        coordinate: goods.goodsPageDto.coordinate,
      };
      setModify(newData);
      setPrevData(newData);
    }
  }, [isSuccess]);

  if (!isSuccess)
    return (
      <div className="container mx-auto flex h-svh w-full max-w-screen-sm items-center justify-center overflow-y-scroll ">
        <Loading />
      </div>
    );

  return (
    <div className="container mx-auto h-svh w-full max-w-screen-sm overflow-y-scroll pb-4 pt-14">
      {/* header */}
      <ModifyHeader curr={modify} prev={prevData} setIsConfirm={setIsConfirm} />

      {/* content */}
      <div className="flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm">상품 소개 이미지</div>
          <div className="flex gap-3 overflow-x-scroll">
            <label className="shrink-0" htmlFor="image">
              <input
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                className="hidden"
                id="image"
                onChange={(e) => {
                  if (e.target.files) encodeFileToBase64(e.target.files[0]);
                }}
              />
              <div className="flex aspect-square size-24 items-center justify-center rounded-md bg-gray-200 active:opacity-80">
                <img src={camera} alt="사진 추가하기" className="mx-auto" />
              </div>
            </label>
            {modify.images.map((item, idx) => (
              <div key={item} className="relative shrink-0">
                <button
                  className="absolute -right-2 -top-2 rounded-full bg-white p-1.5 shadow-[0px_1px_3px_#0003]"
                  onClick={() =>
                    setModify((prev) => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== idx),
                      imagesInput: prev.imagesInput.filter((_, i) => i !== idx),
                    }))
                  }
                >
                  <img src={close} alt="이미지 삭제" />
                </button>
                <img
                  src={item}
                  alt="상품 이미지"
                  className="aspect-square size-24 rounded-md object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">카테고리</div>
          <div className="relative">
            {modify.categoryId === initModifyData.categoryId || !isSuccess ? (
              <div className="flex gap-2 overflow-x-scroll">
                {category.map((item) => (
                  <ModifyCategory
                    key={item.name}
                    idx={item.idx}
                    onClick={() =>
                      setModify((prev) => ({
                        ...prev,
                        categoryId: item.idx,
                      }))
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-2">
                <div
                  className="flex aspect-square size-10 items-center justify-center rounded-md bg-gray-200 text-center"
                  onClick={() =>
                    setModify((prev) => ({
                      ...prev,
                      categoryId: initModifyData.categoryId,
                    }))
                  }
                >
                  <img className="rotate-45" src={close} alt="카테고리 변경" />
                </div>
                <ModifyCategory
                  idx={modify.categoryId}
                  btn={
                    <div
                      className="ml-1 inline-block"
                      onClick={() =>
                        setModify((prev) => ({
                          ...prev,
                          categoryId: initModifyData.categoryId,
                        }))
                      }
                    >
                      <img src={close} alt="close" />
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">폼 제목</div>
          <InputWithNum
            value={modify.goodsName}
            onChange={(e) =>
              setModify((prev) => ({ ...prev, goodsName: e.target.value }))
            }
            maxLength={30}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">상품 링크 (수정불가)</div>
          <StyledInputText
            value={goods.goodsPageDto.link}
            onChange={() => undefined}
            placeholder=""
            disabled
          />
          <OpenGraphViewer
            openGraph={openGraph || undefined}
            link={goods.goodsPageDto.link as string}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">폼 내용</div>
          <StyledTextarea
            value={modify.introduction}
            onChange={(e) =>
              setModify((prev) => ({ ...prev, introduction: e.target.value }))
            }
            placeholder=""
            height={128}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">상품 구매가</div>
          <StyledCurrencyInput
            value={modify.goodsPrice}
            onValueChange={(value) =>
              setModify((prev) => ({
                ...prev,
                goodsPrice: Number(value),
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">배송비 (추가 배송비 포함)</div>
          <StyledCurrencyInput
            value={modify.deliveryFee}
            onValueChange={(value) =>
              setModify((prev) => ({
                ...prev,
                deliveryFee: Number(value),
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">목표 공동 구매 수량</div>
          <StyledCountInput
            value={modify.goodsLimitCount}
            onValueChange={(value) =>
              setModify((prev) => ({
                ...prev,
                goodsLimitCount: Number(value),
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">공동 구매 종료 시점</div>
          <CalendarDate
            date={modify.goodsLimitTime}
            onChange={(newDate: Date) =>
              setModify((prev) => ({ ...prev, goodsLimitTime: newDate }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm">픽업 위치 지정</div>
          <div className="relative">
            <Selector
              index={index}
              setIndex={setIndex}
              places={places}
              isLoading={position ? isLoading : true}
            />
          </div>
          <div className="relative">
            {index === -1 && (
              <div className="relative top-14 w-full pb-14">
                <PostCodeModify
                  address={address}
                  setAddress={setAddress}
                  setModify={setModify}
                />
              </div>
            )}

            <div
              className={`relative ${index === -1 ? 'top-[6px] pb-[6px]' : 'top-14 pb-14'}`}
            >
              <PreviewMap
                position={
                  index >= 0
                    ? {
                        lat: places[index].y,
                        lng: places[index].x,
                      }
                    : {
                        lat: modify.coordinate.latitude,
                        lng: modify.coordinate.longitude,
                      }
                }
                markerImg={RegistMarker}
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button className="w-full rounded-lg bg-success py-4 text-center text-white">
            수정 완료하기
          </button>
        </div>
      </div>

      {isConfirm && (
        <div
          className="absolute top-0 z-50 flex size-full items-center justify-center bg-black/30 px-4"
          onClick={() => setIsConfirm(false)}
        >
          <div className="flex w-full flex-col gap-6 rounded-[20px] bg-white py-4">
            <div className="flex flex-col gap-1 pt-4">
              <div className="text-center text-lg font-bold">
                변경 사항을 취소 하시겠어요?
              </div>
              <div className="text-center text-sm">
                수정하신 내용이 반영되지 않아요.
              </div>
            </div>
            <div className="flex gap-4 px-4 text-sm">
              <div
                className="w-1/2 rounded-lg bg-gray-200 py-3 text-center active:opacity-80"
                onClick={() => navigate(-1)}
              >
                수정 취소
              </div>
              <div
                className="w-1/2 rounded-lg bg-success py-3 text-center text-white"
                onClick={() => setIsConfirm(false)}
              >
                계속 편집
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
