import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TitleBox from './components/titleBox';
import Information from './components/information';
import UserCheck from './components/userCheck';
import Image from './components/image';
import { backURL2 } from '../../common';

// import ProductImage from './components/productImage';

export const getGoods = async (idx) => {
  const response = await axios(`${backURL2}/api/goods/${idx + 1}/page`, {
    withCredentials: true,
  }).then((res) => {
    return res.data;
  });

  return response;
};

export default function Introduce() {
  const { idx } = useParams();
  const navigate = useNavigate();
  const [goods, setGoods] = useState({
    name: '',
    link: '',
    goodsPrice: '',
    deliveryFee: '',
    orderCount: '',
    introduction: '',
    nickName: '',
    goodsLimitTime: '',
  });
  useEffect(() => {
    getGoods(idx).then((res) => {
      console.log(res);
      setGoods({
        name: res.goodsDto.goodsName,
        link: res.goodsDto.link,
        goodsPrice: res.goodsDto.goodsPrice,
        deliveryFee: res.goodsDto.deliveryFee,
        orderCount: res.orderCount,
        introduction: res.goodsDto.introduction,
        nickName: res.nickName,
        goodsLimitTime: res.goodsLimitTime,
      });
    });
  }, []);

  useEffect(() => {
    console.log(goods);
  }, [goods]);

  // console.log(goods.goodsDto.goodsName);
  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      {/* <ProductImage /> */}
      <div>
        <Image />
        <TitleBox name={goods.name} />
        <Information
          link={goods.link}
          goodsPrice={goods.goodsPrice}
          deliveryFee={goods.deliveryFee}
          orderCount={goods.orderCount}
          introduction={goods.introduction}
          nickName={goods.nickName}
          goodsLimitTime={goods.goodsLimitTime}
        />
        <UserCheck />
        <button
          className="mx-auto fixed bottom-[20px] left-1/2 -translate-x-1/2 w-[295px] h-[50px] mb-10 bg-blue-400 rounded-[8px]"
          onClick={() => navigate('/register')}
        >
          구매 참여하기
        </button>
      </div>
    </div>
  );
}
