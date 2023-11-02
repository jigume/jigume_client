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
  const formData = new FormData();
  images.forEach((item, idx) => formData.append(`multipartFile[${idx}]`, item));

  // 임시 category id
  const goodsDto = { ...goodsDto_, categoryName: 'temp' };

  // 이미지를 제외한 상품 먼저
  const response = await axios({
    method: 'post',
    url: '/api/goods',
    data: goodsDto,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      withCredentials: true,
      crossDomain: true,
      credentials: 'include',
    },
  }).then(async (res) => {
    // 두 번째 요청 (이미지)
    const response2 = await axios({
      method: 'post',
      url: `/api/${res.data}/image2?repImg=true`,
      data: images,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token.accessToken}`,
        'withCredentials': true,
        'crossDomain': true,
        'credentials': 'include',
      },
    });

    // res1의 data인 게시물 번호를 반환
    if (response2.status === 200) return res.data;
    return response2;
  });

  return response;
};

export default postGoods;
