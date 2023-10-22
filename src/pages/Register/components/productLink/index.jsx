import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import 'react-dropdown/style.css';
import category from '../../../Map/components/BottomSheetComponent/data';
import image from '../../../../asset/725ec573a6591587da4be2bb770449e8.png';
import StyledInputText from '../../../../components/StyledInputText';
import NextButton from '../../../../components/NextButton';

function ProductLink() {
  /** @type {{data:{
   * image: any[]
   * address: string
   *  goodsDto: {
   *    goodsId: number
   *    name: string
   *    boardContent: string
   *    introduction: string
   *    link: string
   *    goodsPrice: number
   *    deliveryFee: number
   *    mapX: number | undefined
   *    mapY: number | undefined
   *    goodsLimitCount: number
   *    goodsLimitTime: Date
   *    category: number
   *    realDeliveryFee: number
   *    end: boolean
   *  }
   * }}} 등록할 상품 정보  */
  const { data, setData } = useOutletContext();
  const [filterIdx, setFilterIdx] = useState(-1);

  const handleLink = (e) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, link: e.target.value },
    }));
  };

  const isMovable = data.goodsDto.link.length !== 0 && filterIdx !== -1;

  // init
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, category: filterIdx },
    }));
  }, [filterIdx]);

  // observe filter
  useEffect(() => {
    setFilterIdx(data.goodsDto.category);
  }, []);

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div>
        <div className="text-lg font-bold pb-10">
          상품의 구매처가 어디인가요?
          <br />
          상품의 카테고리도 알려주세요.
        </div>

        <div className="mb-1">
          <div className="text-sm mb-2 font-thin">상품 링크</div>
          <StyledInputText
            placeholder="ex) www.figma.com"
            value={data.goodsDto.link}
            onChange={handleLink}
          />
        </div>
        <div className="w-full flex flex-row items-center gap-2 border rounded-md pr-2 overflow-hidden cursor-pointer">
          <img className="h-20" src={image} />
          <div className="py-2 pr-2 flex flex-col w-full grow-0">
            <div className="inline-block line-clamp-2 text-xs w-100%">
              [오늘의딜/15%쿠폰] 논슬립 방수 가죽 데스크매트 마우스패드
              모니터받침대
            </div>
            <div className="text-xs text-gray-500 truncate">
              https://ohou.se/productions/1811972
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="text-sm mb-2 font-thin">카테고리</div>
          <div className="flex flex-wrap justify-center gap-2 ">
            {category.map((item, index) => (
              <div
                key={item.name}
                className={`py-[6px] px-[8px] border border-gray-100 rounded-lg ${
                  index === filterIdx ? 'bg-gray-900 text-white' : 'bg-white'
                }`}
                onClick={() => setFilterIdx(index)}
              >
                <img
                  className="inline-block mr-2 w-[16px] h-[16px]"
                  src={item.icon}
                />
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NextButton isDisabled={!isMovable} linkTo="/Register/ProductAmount" />
    </div>
  );
}

export default ProductLink;
