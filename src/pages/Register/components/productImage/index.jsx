import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import CameraIcon from '../../../../asset/icon/mdi_camera.svg';
import ImageCard from './components/ImageCard';

function ProductImage() {
  /** @type {{data:{
   * boardContent: string
   * image: any[]
   *  goodsDto: {
   *    goodsId: number
   *    name: string
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

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        const prevImages = data.image;
        prevImages.push(reader.result);
        setData((prev) => ({ ...prev, image: prevImages }));
        resolve();
      };
    });
  };

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div>
        <div className="text-xl font-bold">
          어떤 제품을 공동구매하실건가요? <br /> 소개 이미지를 등록해주세요!
        </div>

        <div className="flex snap-x overflow-x-scroll whitespace-nowrap items-start gap-4 overflow-y-hidden scrollbar-hide">
          <label
            htmlFor="image"
            className={`cursor-pointer snap-center ${
              data.image.length !== 0
                ? 'w-[calc(50vw-0.5rem)] h-[calc(50vw-0.5rem)] '
                : 'w-[calc(100vw-2rem)] h-[calc((100vw-2rem)*0.5364)]'
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
                data.image.length !== 0
                  ? 'w-[calc(50vw-0.5rem)] h-[calc(50vw-0.5rem)] '
                  : 'w-[calc(100vw-2rem)] h-[calc((100vw-2rem)*0.5364)]'
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
              onClick={() => setData((prev) => ({ ...prev, image: [] }))}
            />
          ))}
        </div>
      </div>

      {data.image[0] ? (
        <Link
          to="/register/ProductDetail"
          className="w-full py-3 mb-6 text-center bg-success text-white rounded-lg"
        >
          다음으로 넘어가기
        </Link>
      ) : (
        <div className="w-full py-3 mb-6 text-center bg-gray-300 text-white rounded-lg">
          다음으로 넘어가기
        </div>
      )}
    </div>
  );
}

export default ProductImage;
