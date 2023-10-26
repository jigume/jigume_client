import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMutation } from 'react-query';
import category from '../../../Map/components/BottomSheetComponent/data';
import StyledInputText from '../../../../components/StyledInputText';
import NextButton from '../../../../components/NextButton';
import getOpenGraph from '../../../../api/og';
import 'react-dropdown/style.css';
import OpenGraphView from './components/OpenGraphViewer';

function Links() {
  /** @type {{data:{
   * image: any[]
   * imageInput: File[]
   * address: string
   *  goodsDto: {
   *    goodsName: string
   *    boardContent: string
   *    introduction: string
   *    link: string
   *    goodsPrice: number
   *    deliveryFee: number
   *    mapX: number | undefined
   *    mapY: number | undefined
   *    goodsLimitCount: number
   *    goodsLimitTime: Date
   *    categoryName: number
   *  }
   * }}} 등록할 상품 정보  */
  const { data, setData } = useOutletContext();
  const [tmpLink, setTmpLink] = useState(data.goodsDto.link);
  const [filterIdx, setFilterIdx] = useState(-1);

  const isMovable = data.goodsDto.link.length !== 0 && filterIdx !== -1;

  const {
    data: openGraph,
    mutate,
    isSuccess,
  } = useMutation('getOpenGraph', (value) => getOpenGraph(value));

  const handleLink = (e) => setTmpLink(e.target.value);

  useEffect(() => {
    mutate(data.goodsDto.link);
  }, [data.goodsDto.link]);

  // debound 적용
  useEffect(() => {
    const debounce = setTimeout(() => {
      return setData((prev) => ({
        ...prev,
        goodsDto: { ...prev.goodsDto, link: tmpLink },
      }));
    }, 500); // ->setTimeout 설정 (0.5초 후)
    return () => clearTimeout(debounce); // ->clearTimeout 바로 타이머 제거
  }, [tmpLink]); // ->결국 마지막 이벤트에만 setTimeout이 실행됨

  // init
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, categoryName: filterIdx },
    }));
  }, [filterIdx]);

  // observe filter
  useEffect(() => {
    setFilterIdx(data.goodsDto.categoryName);
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
            value={tmpLink}
            onChange={handleLink}
          />
        </div>

        <OpenGraphView
          openGraph={isSuccess && openGraph}
          link={data.goodsDto.link}
        />

        <div className="pt-4">
          <div className="text-sm mb-2 font-thin">카테고리</div>
          <div className="flex flex-wrap justify-center gap-2">
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
                <span className="text-[0.7rem] xs:text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NextButton isDisabled={!isMovable} linkTo="/Register/cost" />
    </div>
  );
}

export default Links;
