import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CameraIcon from '../../../../asset/icon/mdi_camera.svg';
import ImageCard from './components/ImageCard';
import NextButton from '../../../../components/NextButton';

function Image() {
  /** @type {{data:{
   * image: any[]
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
  const encodeFileToBase64 = (fileBlob) => {
    // 이미지 선택 취소 시 예외처리
    if (fileBlob === undefined) return null;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      // onLoad에서 실행하는
      reader.onload = () => {
        const prevImages = data.image;
        prevImages.push(reader.result);
        setData((prev) => ({ ...prev, image: prevImages }));
        resolve();
      };
    });
  };

  const isMovable = data.image.length === 0;

  return (
    <div className="w-screen max-w-screen-sm h-[calc(100svh-48px)] flex flex-col justify-between absolute left-1/2 -translate-x-1/2">
      <div />
      <div>
        <div className="text-xl font-bold px-4">
          어떤 제품을 공동구매하실건가요? <br /> 소개 이미지를 등록해주세요!
        </div>

        <div className="flex snap-x overflow-x-scroll whitespace-nowrap items-start gap-4 overflow-y-hidden scrollbar-hide">
          <label
            htmlFor="image"
            className={`cursor-pointer snap-center ${
              !isMovable
                ? 'w-[calc(50vw-0.5rem)] h-[calc(50vw-0.5rem)] ml-4'
                : 'w-[calc(100%-2rem)] h-[calc((100%-2rem)*0.5364)] mx-auto'
            } mt-6`}
          >
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              className="hidden"
              id="image"
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
            />
            <div
              className={`${
                !isMovable
                  ? 'w-[calc(50vw-0.5rem)] h-[calc(50vw-0.5rem)] '
                  : 'w-[calc(100%-2rem)] h-[calc((100%-2rem)*0.5364)]'
              }  bg-gray-200 flex items-center justify-center flex-col gap-3 rounded-lg`}
            >
              <img src={CameraIcon} />
              <div className="font-thin">앨범으로 등록</div>
            </div>
          </label>

          {data.image.map((item, idx) => (
            <ImageCard
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              image={item}
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  image: prev.image.filter((_, i) => i !== idx),
                }))
              }
            />
          ))}
        </div>
      </div>

      <div className="px-4">
        <NextButton isDisabled={isMovable} linkTo="/register/detail" />
      </div>
    </div>
  );
}

export default Image;
