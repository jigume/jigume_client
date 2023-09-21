import axios from 'axios';

import { backURL2 } from '../../common';

export const getGoods = async () => {
  // const response = await axios(`${backURL2}/api/goods`, {
  //   withCredentials: true,
  // }).then((res) => {
  //   return res.data;
  // });
  // return response;
};

export const getGoodsDetail = async (setImgArr) => {
  // axios.get(`${backURL2}/api/goods`).then((res) => {
  //   // console.log(res.data);
  //   if (res.status === 200) {
  //     res.data.map((item, idx) => {
  //       return axios
  //         .get(`${backURL2}/api/${idx + 1}/image`, { responseType: 'blob' })
  //         .then((res_) => {
  //           const myFile = new File([res_.data], 'imageName');
  //           const reader = new FileReader();
  //           reader.onload = (ev) => {
  //             const previewImage = String(ev.target?.result);
  //             // console.log(previewImage);
  //             setImgArr((oldArray) => [
  //               ...oldArray,
  //               { image: previewImage, data: item },
  //             ]);
  //           };
  //           reader.readAsDataURL(myFile);
  //         });
  //     });
  //   }
  // });
};
