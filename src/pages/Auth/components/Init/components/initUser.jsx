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
          value={initUser.nickname}
          maxLength={20}
          onChange={handleNickname}
        />
      </div>

      <button
        disabled={!initUser.nickname.length}
        className="text-md h-12 w-full rounded-lg bg-success p-3 text-center text-white transition-all duration-300 ease-in-out active:scale-[99%] disabled:bg-gray-300 active:disabled:scale-100"
        onClick={() => navigate('/auth/init/address')}
      >
        다음으로 넘어가기
      </button>
    </>
  );
}
