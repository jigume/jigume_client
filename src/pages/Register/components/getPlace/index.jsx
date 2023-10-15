import React from 'react';
import Postcode from './component/postcode';

function GetPlace() {
  return (
    <form className="flex flex-col">
      <div className="mt-1 h-10 w-20 bg-slate-200">픽업 주소검색</div>
      <div>주소 가져오는 api 사용하기</div>
      <Postcode />
      <input
        type="submit"
        value="공구 등록하기"
        className="mt-1 h-10 w-50 bg-slate-200"
      />
    </form>
  );
}

export default GetPlace;
