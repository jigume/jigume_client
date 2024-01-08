import { PositionType } from './types/map';
import { RegisterDataType } from './types/register';

export const getCurrentLocation = async (
  setPosition: React.Dispatch<React.SetStateAction<PositionType>>
) => {
  const response = navigator.geolocation.getCurrentPosition(
    async (position) => {
      const current = await position;
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      return current;
    }
  );
  return response;
};

export const tempRandMarker = (position: PositionType) => {
  const radius = 500;

  // 10개의 좌표를 반환
  return [...Array(10)].map((_, idx) => {
    let x = Math.random() / radius;
    x *= Math.round(Math.random()) ? -1 : 1;
    let y = Math.random() / radius;
    y *= Math.round(Math.random()) ? -1 : 1;

    return {
      ...{
        lat: position.lat + y,
        lng: position.lng + x,
        goodsName: `임시 게시물 ${idx}`,
        goodsPrice: 5000,
        deliveryFee: 7500,
        realDeliveryFee: 15000,
        goodsLimitCount: 5,
        imageUrl: 'https://via.placeholder.com/256',
      },
      name: idx,
    };
  });
};

/**
 * 등록폼의 데이터 유효성을 검사합니다. 잘못된 데이터가 있다면 이전 단계의 프로세스 주소를 반환합니다.
 */
export const vaildRegister = (link: string, data: RegisterDataType) => {
  switch (link) {
    case '/register/detail':
      if (!data.image) return '/register';
      break;

    case '/register/link':
      if (data.image.name === '' || data.goodsDto.boardContent === '')
        return '/register/detail';
      break;

    case '/register/cost':
      if (data.goodsDto.link === '' || data.goodsDto.categoryName === -1)
        return '/register/link';
      break;

    case '/register/deadline':
      if (
        Number(data.goodsDto.goodPrice) === 0 ||
        Number(data.goodsDto.deliveryFee === 0)
      )
        return '/register/cost';
      break;

    case '/register/place':
      if (Number(data.goodsDto.goodsLimitCount) === 0)
        return '/register/deadline';
      break;

    case '/register/notice':
      if (
        typeof data.goodsDto.mapX === 'number' &&
        typeof data.goodsDto.mapY === 'number'
      )
        if (
          data.address === '' ||
          data.goodsDto.mapX + data.goodsDto.mapY === 0
        )
          return '/register/place';
      break;

    default:
      return undefined;
  }
  return undefined;
};

/**
 * bottomSheet thresholds
 */
export const thresholds = {
  min: 68,
  mid: window.innerHeight / 2,
  max: window.innerHeight - 100,
};

export const validNickname = (text: string) => {
  const regex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]{2,10}$/;
  return regex.test(text);
};

export const handleTextFieldColor = (
  nickname: string,
  valid: string
): string => {
  if (nickname.length === 0)
    return 'focus:border-slate-300 focus:ring-slate-300 border-slate-300 ring-slate-300';
  if (valid)
    return 'focus:border-success focus:ring-success border-success ring-success';
  return 'border-red-600 ring-red-600 focus:border-red-600 focus:ring-red-600';
};
