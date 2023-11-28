import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMutation } from 'react-query';
import NextButton from '../../../../../components/NextButton';
import CircularProgress from './circularProgress';
import { checkNickname } from '../../../../../api/user';

export default function InitUser() {
  const [valid, setValid] = useState(false);
  const { initUser, setInitUser } = useOutletContext();

  const validNickname = (text) => {
    const regex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]{2,10}$/;
    return regex.test(text);
  };

  const handleNickname = (text) => {
    setValid(validNickname(text));
    setInitUser((prev) => ({ ...prev, nickname: text }));
  };

  const handleColor = () => {
    if (initUser.nickname.length === 0)
      return 'focus:border-slate-300 focus:ring-slate-300 border-slate-300 ring-slate-300';
    if (valid)
      return 'focus:border-success focus:ring-success border-success ring-success';
    return 'border-red-600 ring-red-600 focus:border-red-600 focus:ring-red-600';
  };

  const { data, mutate, isLoading } = useMutation(
    'checkNickname',
    () => checkNickname(initUser.nickname),
    {
      onSuccess: (res) => {
        console.log(res);
      },
    },
  );

  useEffect(() => {
    handleNickname(initUser.nickname);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div className="pt-[33%]">
        <div className="pb-12 font-semibold">닉네임을 입력해주세요.</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={initUser.nickname}
            onChange={(e) => handleNickname(e.target.value)}
            maxLength={20}
            className={`block h-12 w-full rounded-md border bg-white p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 ${handleColor()}}`}
          />
          <button
            className="flex min-w-[6rem] items-center justify-center rounded-lg bg-success p-3 text-center text-white transition-all duration-300 ease-in-out active:scale-[99%] disabled:bg-gray-300 active:disabled:scale-100"
            onClick={mutate}
          >
            {isLoading ? <CircularProgress /> : '중복 확인'}
          </button>
        </div>
        <div
          className={`py-3 text-xs ${
            initUser.nickname.length === 0 || valid
              ? 'text-gray-600'
              : 'text-red-600'
          }`}
        >
          최소 2글자, 최대 10글자까지 한글,영어, 숫자만 입력가능해요.
        </div>
        <div className="text-xs text-gray-600">{data}</div>
      </div>

      <NextButton isDisabled={!valid} linkTo="/auth/init/address" />
    </div>
  );
}
