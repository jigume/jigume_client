import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

function ProductNotice() {
  const { data, setData } = useOutletContext();

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div className="text-lg font-bold pb-10">
        댓글을 통해 팔로워들과 소통해요.
        <br />
        팔로워만 볼 수 있는 공지를 올려보세요.
      </div>
      <div>
        <div className="text-sm mb-2 font-thin">폼 내용</div>
        <textarea
          name="introduce"
          className="border rounded-md w-full h-48 p-3 text-sm"
          placeholder="픽업 기간은 배송 완료 예정일인 9월 10일부터 13일 까지 입니다. 댓글로 픽업 시간을 알려주세요! 
          
노쇼, 잠수를 타는 행위를 하실 경우 보증금을 돌려드리지 않습니다!
돈 아끼기 위해 참여한 구매잖아요. 
보증금을 돌려받지 못하면 너무 아쉽겠죠?
픽업시간 반드시 지켜주시기 바랍니다!"
          onChange={(e) =>
            setData((prev) => ({ ...prev, notice: e.target.value }))
          }
          value={data.notice}
        />
      </div>

      <Link
        to="/Register/getPlace"
        className="w-full py-3 my-3 text-center bg-success text-white rounded-lg"
      >
        공동 구매 폼 게시하기
      </Link>
    </div>
  );
}

export default ProductNotice;
