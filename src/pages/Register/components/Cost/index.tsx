import { useOutletContext } from 'react-router-dom';
import { RegisterContextType } from '@src/types/register';
import StyledCurrencyInput from '../../../../components/StyledCurrencyInput';
import NextButton from '../../../../components/NextButton';

function Cost() {
  const { data, setData } = useOutletContext<RegisterContextType>();

  const isMovable = data.goodsDto.goodsPrice && data.goodsDto.deliveryFee;

  return (
    <div className="flex h-[calc(100svh-48px)] w-full flex-col justify-between">
      <div />
      <div className="pb-24">
        <div className="pb-12 text-lg font-bold">
          구매처에서 기재한 상품의 가격과
          <br />
          추가 배송료가 포함된 배송비는 얼마인가요?
        </div>

        <div className="pb-10">
          <div className="mb-2 text-sm  font-thin">상품 구매가</div>
          <StyledCurrencyInput
            value={data.goodsDto.goodsPrice}
            onValueChange={(value) =>
              setData((prev) => ({
                ...prev,
                goodsDto: { ...prev.goodsDto, goodsPrice: Number(value) },
              }))
            }
          />
        </div>
        <div>
          <div className="mb-2 text-sm font-thin">
            배송비 (도서산간 비용 포함)
          </div>
          <StyledCurrencyInput
            value={data.goodsDto.deliveryFee}
            onValueChange={(value) =>
              setData((prev) => ({
                ...prev,
                goodsDto: { ...prev.goodsDto, deliveryFee: Number(value) },
              }))
            }
          />
        </div>
      </div>

      <NextButton isDisabled={!isMovable} linkTo="/register/deadline" />
    </div>
  );
}

export default Cost;
