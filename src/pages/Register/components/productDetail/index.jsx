import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

function ProductDetail() {
  const { data, setData } = useOutletContext();

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div className="pb-24">
        <div className="text-lg font-bold pb-12">
          공동 구매 팔로워를 모으려면?
          <br />
          끌리는 제목과 내용으로 폼을 만들어요!
        </div>
        <div className="pb-10">
          <div className="text-sm mb-2">폼 제목</div>
          <div className="border rounded-md w-full p-3 flex flex-row gap-2">
            <input
              className="w-full text-sm"
              name="title"
              placeholder="오늘의 집에 이거 같이 사실 분~!!"
              maxLength={30}
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
              value={data.title}
            />
            <span className="text-sm text-gray-400 w-12">
              {data.title.length}/30
            </span>
          </div>
        </div>
        <div>
          <div className="text-sm mb-2">폼 내용</div>
          <textarea
            name="introduce"
            className="border rounded-md w-full p-3 text-sm"
            placeholder="1명이라도 공동구매에 함께하면 추가배송비가 절반 넘게 절약될거에요!"
            onChange={(e) =>
              setData((prev) => ({ ...prev, content: e.target.value }))
            }
            value={data.content}
          />
        </div>
      </div>

      <Link
        to="/register/ProductLink"
        className="w-full py-3 my-3 text-center bg-success text-white rounded-lg"
      >
        다음으로 넘어가기
      </Link>
    </div>
  );
}

export default ProductDetail;
