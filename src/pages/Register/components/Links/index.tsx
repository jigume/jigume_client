import React, { ChangeEvent, useEffect, useState } from 'react';
import { RegisterContextType } from '@src/types/register';
import { useOutletContext } from 'react-router-dom';
import { useMutation } from 'react-query';
import category from '../../../Map/components/BottomSheetComponent/data';
import StyledInputText from '../../../../components/StyledInputText';
import NextButton from '../../../../components/NextButton';
import getOpenGraph from '../../../../api/og';
import OpenGraphViewer from '../../../../components/OpenGraphViewer';
import 'react-dropdown/style.css';

function Links() {
  const { data, setData } = useOutletContext<RegisterContextType>();
  const [tmpLink, setTmpLink] = useState(data.goodsDto.link);
  const [categoryIdx, setCategoryIdx] = useState(-1);

  const isMovable = data.goodsDto.link.length !== 0 && categoryIdx !== -1;

  const {
    data: openGraph,
    mutate,
    isSuccess,
  } = useMutation('getOpenGraph', getOpenGraph);

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
      goodsDto: { ...prev.goodsDto, categoryId: categoryIdx },
    }));
    console.log(categoryIdx);
  }, [categoryIdx]);

  // observe filter
  useEffect(() => {
    setCategoryIdx(data.goodsDto.categoryId);
  }, []);

  return (
    <div className="flex h-[calc(100svh-48px)] w-full flex-col justify-between">
      <div />
      <div>
        <div className="pb-10 text-lg font-bold">
          상품의 구매처가 어디인가요?
          <br />
          상품의 카테고리도 알려주세요.
        </div>

        <div className="mb-1">
          <div className="mb-3 text-sm font-thin">상품 링크</div>
          <StyledInputText
            placeholder="ex) www.figma.com"
            value={tmpLink}
            onChange={(e) => setTmpLink(e.target.value)}
          />
        </div>

        <OpenGraphViewer openGraph={openGraph} link={data.goodsDto.link} />

        <div className="pt-4">
          <div className="mb-2 text-sm font-thin">카테고리</div>
          <div className="flex flex-wrap justify-center gap-2">
            {category.map((item) => (
              <div
                key={item.name}
                className={`rounded-lg border border-gray-100 px-[8px] py-[6px] ${
                  item.idx === categoryIdx
                    ? 'bg-gray-900 text-white'
                    : 'bg-white'
                }`}
                onClick={() => setCategoryIdx(item.idx)}
              >
                <img
                  className="mr-2 inline-block size-[16px]"
                  src={item.icon}
                  alt={item.name}
                />
                <span className="xs:text-xs text-[0.7rem]">{item.name}</span>
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
