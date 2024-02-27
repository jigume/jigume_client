import { useState } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import CloseIcon from '@src/asset/icon/CloseIcon.svg';
import { GoodsModifyType } from '@src/pages/Goods/index.d';

function PostCodeModify({
  address,
  setAddress,
  setModify,
}: {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setModify: React.Dispatch<React.SetStateAction<GoodsModifyType>>;
}) {
  const [open, setOpen] = useState(false);
  const { kakao } = window;

  const handleComplete = (param: Address) => {
    const geocoder = new kakao.maps.services.Geocoder();
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
        setAddress(fullAddress);
        setModify((prev) => ({
          ...prev,
          coordinate: {
            latitude: Number(result[0].y),
            longitude: Number(result[0].x),
          },
        }));
      }
    });

    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        className="w-full rounded-md border border-slate-300 p-3 text-right text-sm font-medium focus:border-success focus:outline-none focus:ring-1 focus:ring-success disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        value={address}
      >
        {address || (
          <div className="text-gray-400">서울 성동구 왕십리로2길 20</div>
        )}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="fixed left-0 top-0 z-50 h-svh w-screen bg-white">
            <div onClick={() => setOpen(false)}>
              <img
                src={CloseIcon}
                className="ml-auto mr-2 mt-2 w-10 p-2"
                alt="닫기"
              />
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

export default PostCodeModify;
