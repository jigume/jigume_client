/**
 *
 * @param {* function()} setPosition
 */
export const getCurrentLocation = async (setPosition) => {
  const response = await navigator.geolocation.getCurrentPosition(
    async (position) => {
      const current = await position;
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      return current;
    },
  );
  return response;
};

/**
 *
 * @param {object} position
 * @param {number} position.lat
 * @param {number} position.lng
 * @returns {[{lat:number; lng:number}]} marker
 */
export const tempRandMarker = (position) => {
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
        imageUrl: 'https://via.placeholder.com/64',
      },
      name: idx,
    };
  });
};

/**
 * 등록폼의 데이터 유효성을 검사합니다. 잘못된 데이터가 있다면 이전 단계의 프로세스 주소를 반환합니다.
 * @param {string} link
 * @param {object} data
 * @param {array} data.image
 * @param {string} data.address
 * @param {object} data.goodsDto
 * @param {number} data.goodsDto.goodsName
 * @param {string} data.goodsDto.boardContent
 * @param {string} data.goodsDto.introduction
 * @param {string} data.goodsDto.link
 * @param {number | string} data.goodsDto.goodPrice
 * @param {number | string} data.goodsDto.deliveryFee
 * @param {number | undefined} data.goodsDto.mapX
 * @param {number | undefined} data.goodsDto.mapY
 * @param {number | string} data.goodsDto.goodsLimitCount
 * @param {Date} data.goodsDto.goodsLimitTime
 * @param {number} data.goodsDto.categoryName
 * @returns {'/register' | '/register/detail' | '/register/link' | '/register/cost' | '/register/deadline' | '/register/place' | undefined}
 */
export const vaildRegister = (link, data) => {
  switch (link) {
    case '/register/detail':
      if (data.image.length === 0) return '/register';
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
      if (data.address === '' || data.goodsDto.mapX + data.goodsDto.mapY === 0)
        return '/register/place';
      break;

    default:
      return undefined;
  }
  return undefined;
};
