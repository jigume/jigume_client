import { ChevronLeftIcon } from '@goorm-dev/gds-goormthon';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function RegistrationForms() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    image: [],
    title: '',
    content: '',
    link: '',
    category: '',
    itemCost: '',
    deliveryCost: '',
    targetCost: 0,
    targetDate: new Date(),
    position: { lat: 0, lng: 0 },
    announce: '',
  });
  return (
    <>
      <div className="w-full h-[48px] px-[1rem] flex flex-row items-center">
        <div onClick={() => navigate(-1)} className="px-2">
          <ChevronLeftIcon className="w-[24px] h-[24px] " />
        </div>
      </div>
      <Outlet data={data} setData={setData} />
    </>
  );
}

export default RegistrationForms;
