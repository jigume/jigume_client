import React from 'react';
import { useOutletContext } from 'react-router-dom';
import InputWithNum from '../../../../../components/InputWithNum';
import NextButton from '../../../../../components/NextButton';

export default function InitUser() {
  const { initUser, setInitUser } = useOutletContext();

  const handleNickname = (e) => {
    setInitUser((prev) => ({ ...prev, nickname: e.target.value }));
  };
  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div>
        <div className="pb-3">닉네임을 알려주세요.</div>
        <InputWithNum
          value={initUser.nickname}
          maxLength={20}
          onChange={handleNickname}
        />
      </div>

      <NextButton
        isDisabled={!initUser.nickname.length}
        linkTo="/auth/init/address"
      />
    </div>
  );
}
