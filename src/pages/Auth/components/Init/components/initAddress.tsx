import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import NextButton from '@src/components/NextButton';
import CloseIcon from '@src/asset/icon/CloseIcon.svg';
import { InitContextType } from '../index.d';

export default function InitAddress() {
  const { initUser, setInitUser } = useOutletContext<InitContextType>();
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
        setInitUser((prev) => ({
          ...prev,
          position: {
            lat: Number(result[0].x),
            lng: Number(result[0].y),
          },
        }));
        setAddress(fullAddress);
      }
    });

    setOpen(false);
  };

  useEffect(() => {
    // 잘못된 요청 방지
    if (!initUser.nickname && !initUser.agreement[1] && !initUser.agreement[2])
      navigate('/auth/init');
  }, []);

  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div className="pb-24">
        <div className="pb-10 text-lg font-bold">픽업 위치 지정</div>

        <button
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          className="w-full rounded-md border border-slate-300 p-3  text-right text-sm font-medium focus:border-success focus:outline-none focus:ring-1 focus:ring-success disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          value={address}
        >
          {address || (
            <div className="text-gray-400">서울 성동구 왕십리로2길 20</div>
          )}
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex size-full items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="fixed left-0 top-0 z-50 h-[100svh] w-screen bg-white">
              <div onClick={() => setOpen(false)}>
                <img
                  src={CloseIcon}
                  className="ml-auto mr-2 mt-2 w-10 p-2"
                  alt="닫기"
                />
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

      <NextButton isDisabled={!initUser.position} linkTo="/auth/init/image" />
    </div>
  );
}
