import axios from 'axios';

const recoilLocal = JSON.parse(localStorage.getItem('recoil-persist'));
const { accessToken } = recoilLocal?.jigumeAuth ?? {};

const tokenedAxios = axios.create({
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
 * @param {number} goodsDto.categoryName
 */
const postGoods = async (images, goodsDto_) => {
  if (!accessToken) throw Error('accessToken is not exist');

  // image fime
  const formData = new FormData();
  images.forEach((item) => formData.append('multipartFile', item));

  // 임시 category id
  const goodsDto = { ...goodsDto_, categoryName: 'temp' };

  // 이미지를 제외한 상품 먼저
  const response = await tokenedAxios
    .post('/api/goods', goodsDto)
    .then(async (res) => {
      // await tokenedAxios.post(`/api/${res.data}/image`, {
      //   request: formData,
      //   repImg: true,
      //   goodsId: res.data,
      // });
      axios({
        method: 'post',
        url: `/api/${res.data}/image?repImg=true`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
          'withCredentials': true,
          'crossDomain': true,
          'credentials': 'include',
        },
      });
    });

  console.log(response);
  return response;
};

export default postGoods;
