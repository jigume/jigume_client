import { React, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

function Postcode() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');

  const handlePlaceChange = () => {
    setOpen(false); // 날짜 선택 후 모달 닫기
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress(fullAddress);
  };

  return (
    <div>
      <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        className="border rounded-md w-full h-78 p-3 text-sm w-full  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        placeholder="서울 성동구 왕십리로2길 20"
      >
        {address || (
          <div className="text-gray-400">서울 성동구 왕십리로2길 20</div>
        )}
      </button>
      {open && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            onChange={handlePlaceChange}
          />
        </div>
      )}
    </div>
  );
}

export default Postcode;
