import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { GoodsListDTO } from '@src/types/goods';
import { getSheetGoods, getSheetList } from '@src/api/goods';
import { useRecoilState } from 'recoil';
import { AuthType } from '@src/types/data';
import { authState } from '@src/data';
import { BottomSheetType, FilterType } from './index.d';
import category from './data';
import SheetHeader from './components/SheetHeader';
import ContentHeader from './components/ContentHeader';
import ItemList from './components/ItemList';

export default function BottomSheetComponent({
  address,
  handleToCenter,
  sheetProvider,
  preViewer,
  map,
}: BottomSheetType) {
  const [auth] = useRecoilState<AuthType>(authState);
  const [goodsArr, setGoodsArr] = useState<GoodsListDTO[]>([]);
  const [filter, setFilter] = useState<FilterType[]>(
    category.map((item) => ({ ...item, checked: true }))
  );
  const { isOpen, sheet, content, handle, sheetLevel, handleSheet } =
    sheetProvider;

  // 미리보기 fetch fn
  const { mutate: preViewMutate } = useMutation({
    mutationKey: 'getSheetDetail',
    mutationFn: () => getSheetGoods(preViewer, auth.accessToken as string),
    onSuccess: (res) => {
      if (res === 'retry') preViewMutate(preViewer);
      else
        setGoodsArr([
          {
            goodsId: res.goodsPageDto.goodsId,
            goodsName: res.goodsPageDto.goodsName,
            sellerInfoDto: res.goodsPageDto.sellerInfoDto,
            goodsPrice: res.goodsPageDto.goodsPrice,
            goodsDeliveryPrice: res.goodsPageDto.deliveryFee,
            goodsOrderCount: res.goodsPageDto.goodsOrderCount,
            discountDeliveryPrice: res.goodsPageDto.discountDeliveryPrice,
            repImgUrl: res.goodsPageDto.goodsImagesList[0].goodsImgUrl,
            goodsStatus: res.goodsPageDto.goodsStatus,
            categoryId: res.goodsPageDto.categoryId,
          },
        ]);
    },
  });

  const { mutate: allMutate } = useMutation({
    mutationKey: 'getAllList',
    mutationFn: getSheetList,
    onSuccess: (res) => {
      if (res === 'retry')
        allMutate({ map, accessToken: auth.accessToken as string });
      else setGoodsArr(res.goodsListDtoList);
    },
  });

  useEffect(() => {
    if (isOpen)
      if (preViewer) preViewMutate(preViewer);
      else allMutate({ map, accessToken: auth.accessToken as string });
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-[30] h-svh w-svw cursor-pointer touch-pan-y duration-300 ease-out"
          onClick={() => handleSheet('min')}
        />
      )}
      {/* sheet */}
      <motion.div
        ref={sheet}
        className="noSelect fixed inset-x-0 top-[calc(100%-68px)] z-50 mx-auto flex h-[calc(100svh-24px)] max-w-screen-sm flex-col rounded-t-[20px] bg-white drop-shadow-xl duration-300 ease-out"
      >
        {/* header */}
        <div
          ref={handle}
          className="flex w-full cursor-pointer flex-col items-center"
        >
          <div className="flex h-5 items-center ">
            <div className="mx-auto h-1 w-16 rounded-full bg-[#ddd]" />
          </div>
          <SheetHeader
            onClick={() => handleSheet('max')}
            address={address}
            handleToCenter={handleToCenter}
          />
        </div>
        <motion.div className="h-full overflow-x-scroll" ref={content}>
          <ContentHeader filter_={filter} setFilter={setFilter} />
          <ItemList
            goodsArr={goodsArr}
            filter={filter}
            sheetLevel={sheetLevel}
            preViewer={preViewer}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
