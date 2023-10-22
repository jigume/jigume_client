import { React, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useOutletContext } from 'react-router-dom';
import CloseIcon from '../../../../../asset/icon/CloseIcon.svg';

function Postcode() {
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
   *    category: number
   *  }
   * }}} 등록할 상품 정보  */
  const { data, setData } = useOutletContext();
  const [open, setOpen] = useState(false);
  const { kakao } = window;
  const geocoder = new kakao.maps.services.Geocoder();

  const handleComplete = (param) => {
    let fullAddress = param.address;
    let extraAddress = '';

    if (param.addressType === 'R') {
      if (param.bname !== '') {
        extraAddress += param.bname;
      }
      if (param.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${param.buildingName}` : param.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    geocoder.addressSearch(fullAddress, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setData((prev) => ({
          ...prev,
          address: fullAddress,
          goodsDto: { ...prev.goodsDto, mapX: result[0].x, mapY: result[0].y },
        }));
      }
    });

    setOpen(false);
  };

  return (
    <div>
      <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        className="border rounded-md w-full p-3 text-sm w-full font-medium rounded-lg  text-right border border-slate-300 focus:outline-none focus:border-success focus:ring-1 focus:ring-success disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        placeholder="서울 성동구 왕십리로2길 20"
        value={data.address}
      >
        {data.address || (
          <div className="text-gray-400">서울 성동구 왕십리로2길 20</div>
        )}
      </button>
      {open && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none ">
          <div className="w-screen h-[100svh] bg-white fixed top-0 left-0 z-30">
            <div onClick={() => setOpen(false)}>
              <img src={CloseIcon} className="mt-2 ml-auto mr-2 w-10 p-2" />
            </div>
          </div>
          <DaumPostcodeEmbed
            style={{ height: 'calc(100svh - 64px)' }}
            className="fixed bottom-0 z-50"
            onComplete={handleComplete}
          />
        </div>
      )}
    </div>
  );
}

export default Postcode;
