import { SellerInfoDto } from '@src/types/goods';
import { differenceInDays } from 'date-fns';

export default function HeaderProfile({
  goodsLimitTime,
  goodsName,
  sellerInfoDto,
}: {
  goodsLimitTime?: string;
  goodsName?: string;
  sellerInfoDto?: SellerInfoDto;
}) {
  const getdDay = (date: string) => {
    const today = new Date();
    const target = new Date(date);
    const dDay = differenceInDays(target, today);

    if (today.getDate() > target.getDate()) return '종료';
    if (dDay > 99) return '99+';
    return `D-${dDay}`;
  };

  return (
    <div
      className={`mb-3 mt-8 flex flex-col gap-3 ${
        !goodsName ? 'animate-pulse' : ''
      }`}
    >
      {/* 상품 제목 등 */}
      <div className="flex items-center gap-2">
        <div className="w-16 rounded-2xl bg-gray-100 px-2 py-1 text-center text-sm text-gray-700">
          {`${goodsLimitTime ? getdDay(goodsLimitTime) : 'D- '}`}
        </div>
        {goodsName ? (
          <div className="font-bold">{goodsName}</div>
        ) : (
          <div className="h-4 w-full rounded bg-gray-200" />
        )}
      </div>

      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 border-b border-gray-300 pb-[20px]">
        {sellerInfoDto ? (
          <img
            src={sellerInfoDto.sellerProfileImage}
            alt="판매자 프로필 이미지"
            className="size-10 shrink-0 rounded-full bg-gray-200"
          />
        ) : (
          <div className="size-10 shrink-0 rounded-full bg-gray-200" />
        )}
        {sellerInfoDto ? (
          <div>
            {sellerInfoDto.sellerNickname}{' '}
            <span className="text-zinc-400">
              | {sellerInfoDto.sellCount}
              번째 구매 리드
            </span>
          </div>
        ) : (
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        )}
      </div>
    </div>
  );
}

HeaderProfile.defaultProps = {
  goodsLimitTime: undefined,
  goodsName: undefined,
  sellerInfoDto: undefined,
};
