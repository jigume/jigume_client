import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';

function ProductAmount() {
  const { data, setData } = useOutletContext();

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div className="text-lg font-bold pb-12">
        구매처에서 기재한 상품의 가격과
        <br />
        추가 배송료가 포함된 배송비는 얼마인가요?
        <div className="text-sm mb-2 pt-10 font-thin">상품 구매가</div>
        <CurrencyInput
          suffix="원"
          className="border rounded-md w-full p-3 text-sm font-medium text-right"
          value={data.itemCost}
          defaultValue={0}
          decimalsLimit={2}
          onValueChange={(value) =>
            setData((prev) => ({ ...prev, itemCost: value }))
          }
        />
        <div className="pt-10">
          <div className="text-sm mb-2 font-thin">
            배송비 (도서산간 비용 포함)
          </div>
          <CurrencyInput
            suffix="원"
            className="border rounded-md w-full p-3 text-sm font-medium text-right"
            value={data.deliveryCost}
            defaultValue={0}
            decimalsLimit={2}
            onValueChange={(value) =>
              setData((prev) => ({ ...prev, deliveryCost: value }))
            }
          />
        </div>
      </div>

      <Link
        to="/register/ProductDeadline"
        className="w-full py-3 my-3 text-center bg-success text-white rounded-lg"
      >
        다음으로 넘어가기
      </Link>
    </div>
  );
}

export default ProductAmount;
