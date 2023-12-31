import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import DaumPostcodeEmbed from 'react-daum-postcode';
import NextButton from '../../../../../components/NextButton';
import CloseIcon from '../../../../../asset/icon/CloseIcon.svg';

export default function InitAddress() {
  const { initUser, setInitUser } = useOutletContext();
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { kakao } = window;

  const handleComplete = (param) => {
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
        setInitUser((prev) => ({
          ...prev,
          position: { lat: result[0].x, lng: result[0].y },
        }));
        setAddress(fullAddress);
      }
    });

    setOpen(false);
  };

  useEffect(() => {
    // 잘못된 요청 방지
    if (!initUser.nickname) navigate('/auth/init');
  }, []);

  return (
    <>
      <div className="px-4 pb-24">
        <div className="pb-10 text-lg font-bold">픽업 위치 지정</div>

        <button
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          className="w-full rounded-md border border-slate-300 p-3  text-right text-sm font-medium focus:border-success focus:outline-none focus:ring-1 focus:ring-success disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          placeholder="서울 성동구 왕십리로2길 20"
          value={address}
        >
          {address || (
            <div className="text-gray-400">서울 성동구 왕십리로2길 20</div>
          )}
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none ">
            <div className="fixed left-0 top-0 z-50 h-[100svh] w-screen bg-white">
              <div onClick={() => setOpen(false)}>
                <img src={CloseIcon} className="ml-auto mr-2 mt-2 w-10 p-2" />
              </div>
            </div>
            <DaumPostcodeEmbed
              style={{
                height: 'calc(100svh - 64px)',
                position: 'fixed',
                bottom: 0,
                zIndex: 99,
              }}
              onComplete={handleComplete}
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 z-30 w-full max-w-screen-sm px-4">
        <NextButton isDisabled={!initUser.position} linkTo="/auth/init/image" />
      </div>
    </>
  );
}
