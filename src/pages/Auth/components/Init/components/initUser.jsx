import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import InputWithNum from '../../../../../components/InputWithNum';

export default function InitUser() {
  const navigate = useNavigate();
  const { initUser, setInitUser } = useOutletContext();

  const handleNickname = (e) => {
    setInitUser((prev) => ({ ...prev, nickname: e.target.value }));
  };
  return (
    <>
      <div>
        <div className="pb-3">닉네임을 알려주세요.</div>
        <InputWithNum
          content={initUser.nickname}
          maxLength={20}
          handleContent={handleNickname}
        />
      </div>

      <button
        disabled={!initUser.nickname.length}
        className="h-12 bg-success text-white text-center w-full text-md p-3 rounded-lg active:scale-[99%] transition-all ease-in-out duration-300 disabled:bg-gray-300 active:disabled:scale-100"
        onClick={() => navigate('/auth/init/address')}
      >
        다음으로 넘어가기
      </button>
    </>
  );
}
