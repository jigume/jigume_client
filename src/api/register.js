import axios from 'axios';

const recoilLocal = JSON.parse(localStorage.getItem('recoil-persist'));
const { accessToken } = recoilLocal?.jigumeAuth ?? {};

const TokenedAxios = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
    withCredentials: true,
    crossDomain: true,
    credentials: 'include',
  },
});

/**
 * 상품 등록을 위한 fetch 함수
 * @param {array} images
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
 * @param {number} goodsDto.category
 */
const postGoods = async (images, goodsDto_) => {
  const formData = new FormData();
  images.forEach((item) => formData.append(item, images[item]));

  const goodsDto = { ...goodsDto_, category: '생활용품' };
  console.log(accessToken);
  // 이미지를 제외한 상품 먼저
  const preResponse = await TokenedAxios.post('/api/goods', goodsDto);
  console.log(preResponse);
  // const response = await axios({
  //   method: 'POST',
  //   url: '/api/goods',
  //   data: {
  //     request: formData,
  //     repImg: true,
  //     goodsId: 0,
  //   },
  //   headers: {
  //     'Authorization': `Bearer ${accessToken}`,
  //     'Content-Type': 'multipart/form-data',
  //     'withCredentials': true,
  //     'crossDomain': true,
  //     'credentials': 'include',
  //   },
  // });
  // console.log(response);
  // return response;
};

export default postGoods;
