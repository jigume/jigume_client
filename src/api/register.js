import axios from 'axios';

/**
 * 상품 등록을 위한 fetch 함수
 * @param {File[]} images
 * @param {object} goodsDto
 * @param {number} goodsDto.goodsName
 * @param {string} goodsDto.boardContent
 * @param {string} goodsDto.introduction
 * @param {string} goodsDto.link
 * @param {number | string} goodsDto.goodPrice
 * @param {number | string} goodsDto.deliveryFee
 * @param {number | undefined} goodsDto.mapX
 * @param {number | undefined} goodsDto.mapY
 * @param {number | string} goodsDto.goodsLimitCount
 * @param {Date} goodsDto.goodsLimitTime
 * @param {number} goodsDto.categoryName
 */

const postGoods = async (images, goodsDto_) => {
  const token = JSON.parse(localStorage.getItem('recoil-persist')).jigumeAuth;
  if (!token.accessToken) throw Error('accessToken is not exist');

  // image fime
  const imageFormData = new FormData();
  images.forEach((item, idx) => imageFormData.append(`images[${idx}]`, item));

  const data = {
    borderContent: goodsDto_.boardContent,
    goodsId: goodsDto_.goodsId,
    categoryId: 1,
    deliveryFee: goodsDto_.deliveryFee,
    goodsPrice: goodsDto_.goodsPrice,
    goodsLimitCount: goodsDto_.goodsLimitCount,
    goodsLimitTime: goodsDto_.goodsLimitTime,
    goodsName: goodsDto_.goodsName,
    introduction: goodsDto_.introduction,
    link: goodsDto_.link,
    mapX: goodsDto_.mapX,
    mapY: goodsDto_.mapY,
  };

  const blobData = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });

  let formData = new FormData();
  formData.append('goodsSaveDto', blobData);
  formData.append('repImg', 0);
  images.forEach((item) => formData.append(`images`, item));

  const response = await axios({
    method: 'post',
    url: '/api/goods/new',
    data: formData,
    headers: {
      'Authorization': `Bearer ${token.accessToken}`,
      'withCredentials': true,
      'crossDomain': true,
      'credentials': 'include',
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => {
    // 성공 시 form 초기화
    if (res.status === 200) formData = null;
    return res;
  });

  return response;
};

export default postGoods;
