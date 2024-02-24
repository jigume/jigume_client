import { add } from 'date-fns';
import { PositionType } from './types/map';
import { RegisterDataType } from './types/register';

export const getCurrentLocation = async (
  setPosition: React.Dispatch<React.SetStateAction<PositionType | undefined>>
) => {
  navigator.geolocation.getCurrentPosition((data) => {
    setPosition({
      lat: data.coords.latitude,
      lng: data.coords.longitude,
    });
  });
};

export const getCurrentLocation2 = () => {
  let response;

  navigator.geolocation.getCurrentPosition((pos) => {
    response = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };
  });

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
      if (data.image.length === 0 || data.goodsDto.boardContent === '')
        return '/register/detail';
      break;

    case '/register/cost':
      if (data.goodsDto.link === '' || data.goodsDto.categoryId === -1)
        return '/register/link';
      break;

    case '/register/deadline':
      if (
        Number(data.goodsDto.goodsPrice) === 0 ||
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
        typeof data.position.lat === 'number' &&
        typeof data.position.lng === 'number'
      )
        if (data.address === '' || data.position.lat + data.position.lng === 0)
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
  valid: boolean
): string => {
  if (!nickname || nickname.length === 0)
    return 'focus:border-slate-300 focus:ring-slate-300 border-slate-300 ring-slate-300';
  if (valid)
    return 'focus:border-success focus:ring-success border-success ring-success';
  return 'border-red-600 ring-red-600 focus:border-red-600 focus:ring-red-600';
};

/**
 * ((128.123, 36,123)) => [128.123, 36.123]
 * +정렬값을 반환하기 때문에 index 순서로 값 사용 권장
 */
export const stringLatLng2Arr = (bound: kakao.maps.LatLngBounds) => {
  const x = 100000000;

  const srtBound = bound.toString().replaceAll('(', '').replaceAll(')', '');
  const boundArr = srtBound
    .split(',')
    .map((item) => Math.round(Number(item) * x))
    .map((item) => item / x)
    .sort((pre, item) => pre - item);

  return boundArr;
};

export const getToken = (): { accessToken: string; refreshToken: string } => {
  try {
    const local = localStorage.getItem('recoil-persist');
    const token = JSON.parse(local as string)?.jigumeAuth;
    if (!token?.accessToken) throw Error('accessToken is not exist');
    return token;
  } catch (error) {
    console.error(error);
    return { accessToken: '', refreshToken: '' };
  }
};

export const dateFormetter = (param: string) => {
  const date = add(new Date(param), { days: -1 });

  return `${date.getMonth() + 1}월 ${date.getDate()}일 23시 59분`;
};

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  const b: any = theBlob;
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  // Cast to a File() type
  return theBlob as File;
};

// 천자리 콤마
export const setComma = (num: number | string) => {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
