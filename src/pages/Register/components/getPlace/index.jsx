import React from 'react';
import { Link } from 'react-router-dom';
import Postcode from './component/postcode';

function GetPlace() {
  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col mt-52">
      <div />
      <div className="text-lg font-bold pb-10">
        어디서 공구 물품을 전달할까요?
        <br />
        팔로워들과 만날 픽업 장소를 알려주세요.
      </div>
      <div className="">
        <div className="align-top text-sm mb-2 font-thin">픽업 위치 지정</div>
        <Postcode className="border rounded-md w-full p-3 text-sm font-medium mb-10 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" />
      </div>
      <Link
        to="/Register/ProductNotice"
        className="w-full py-3 my-3 text-center bg-success text-white rounded-lg"
      >
        다음으로 넘어가기
      </Link>
    </div>
  );
}

export default GetPlace;
