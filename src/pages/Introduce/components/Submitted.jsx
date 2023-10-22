import React from 'react';
import { motion } from 'framer-motion';
import submintted from '../../../asset/images/introduce/submitted.png';
import jigume_logo from '../../../asset/images/introduce/jigume_logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Submitted() {
  const navigate = useNavigate();
  const location = useLocation();

  const idx = location.pathname.indexOf('submitted');
  const url = location.pathname.slice(0, idx - 1);

  return (
    <div className="w-full h-[100svh] max-w-screen-sm absolute top-0 bg-black/60 z-20 p-4">
      <div
        className="w-full h-full absolute z-10 top-0 left-0"
        onClick={() => navigate(url)}
      />

      <div className="w-full bg-white absolute z-20 top-1/2 -translate-y-1/2 relative aspect-[1.2761] rounded-xl">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, else: 'easeInOut' }}
          style={{ backgroundImage: `url(${submintted})` }}
          className="w-full h-full apsolute z-0 bg-no-repeat bg-center bg-cover"
        />
        <div className="w-full h-full absolute z-50 top-0 flex flex-col justify-center items-center gap-5">
          <img src={jigume_logo} className="w-20 h-[90px]" />
          <p className="text-lg font-bold">
            축하드려요! 공동 구매 폼이
            <br /> 성공적으로 게시되었어요.
          </p>
          <div className="flex gap-4 font-normal">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer active:scale-[95%] transition-all ease-in-out duration-300 "
              onClick={() => navigate('/')}
            >
              홈으로 가기
            </button>
            <button
              className="px-4 py-2 bg-success text-white rounded-lg cursor-pointer active:scale-[95%] transition-all ease-in-out duration-300 "
              onClick={() => navigate(url)}
            >
              게시물 확인하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
