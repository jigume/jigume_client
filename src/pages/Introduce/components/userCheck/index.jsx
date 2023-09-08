import React from 'react';
import GetPlan from './components/getPlan';
import CheckComponent from './components/checkComponent';
import CheckTitle from './components/checkTitle';

export default function UserCheck() {
  return (
    <div className="flex flex-col items-center pt-[48px] pb-[112px]">
      <CheckTitle />
      <GetPlan />
      <CheckComponent
        name="endDate"
        title="구매종료일: "
        content="9월 7일 23시 59분"
      />
      <CheckComponent
        name="announCategory"
        content="해당 폼은 홈 인테리어 제품을 공동구매해요."
      />
      <CheckComponent
        name="announ"
        content="3자 에스크로 방식 결제로 안전하게 거래할 수 있어요. 환불 및 취소가 어려우니, 신중하게 참여해주세요."
      />
    </div>
  );
}
