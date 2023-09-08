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
  const response = await axios(`${backURL2}/api/goods/${idx}/page`, {
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
        name: res.goodsDto.name,
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

  // console.log(goods.goodsDto.name);
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
        <div className="absolute w-[295px] h-[50px]">
          <button
            className="flex flex-col w-[295px] h-[50px] justify-center items-center mx-10 mb-10 bg-blue-400 rounded-[8px]"
            onClick={() => navigate('/register')}
          >
            구매 참여하기
          </button>
        </div>
      </div>
    </div>
  );
}
