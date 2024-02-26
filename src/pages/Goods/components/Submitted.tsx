import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import submintted from '../../../asset/images/introduce/submitted.png';
import jigumeLogo from '../../../asset/images/introduce/jigume_logo.png';

export default function Submitted() {
  const navigate = useNavigate();
  const location = useLocation();

  const idx = location.pathname.indexOf('submitted');
  const url = location.pathname.slice(0, idx - 1);

  return (
    <div className="absolute top-0 z-20 h-svh w-full max-w-screen-sm bg-black/60 p-4">
      <div
        className="absolute left-0 top-0 z-10 size-full"
        onClick={() => navigate(url)}
      />

      <div className="relative top-1/2 z-20 aspect-[1.2761] w-full -translate-y-1/2 rounded-xl bg-white">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, else: 'easeInOut' }}
          style={{ backgroundImage: `url(${submintted})` }}
          className="apsolute z-0 size-full bg-cover bg-center bg-no-repeat"
        />
        <div className="absolute top-0 z-50 flex size-full flex-col items-center justify-between gap-5 py-4">
          <div />
          <div className="flex flex-col justify-center gap-4">
            <img
              src={jigumeLogo}
              className="mx-auto h-[90px] w-20"
              alt="등록 성공"
            />
            <p className="text-lg font-bold">
              축하드려요! 공동 구매 폼이
              <br /> 성공적으로 게시되었어요.
            </p>
          </div>

          <div className="flex w-full gap-4 px-4 font-normal">
            <button
              className="w-full cursor-pointer rounded-lg bg-gray-200 px-4 py-2 transition-all duration-300 ease-in-out active:scale-[95%] "
              onClick={() => navigate('/')}
            >
              홈으로 가기
            </button>
            <button
              className="w-full cursor-pointer rounded-lg bg-success px-4 py-2 text-white transition-all duration-300 ease-in-out active:scale-[95%] "
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
