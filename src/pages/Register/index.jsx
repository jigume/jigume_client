import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChevronLeft from '../../asset/icon/chevron-left.svg';

function Register() {
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
        <div onClick={() => navigate(-1)} className="pr-2">
          <img className="w-[32px] h-[32px] " src={ChevronLeft} />
        </div>
      </div>

      <div className="container mx-auto max-w-screen-sm px-4">
        <Outlet context={{ data, setData }} />
      </div>
    </>
  );
}

export default Register;
