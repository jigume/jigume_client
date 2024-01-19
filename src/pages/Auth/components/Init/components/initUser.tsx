import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMutation } from 'react-query';
import NextButton from '@src/components/NextButton';
import { checkNickname } from '@src/api/user';
import { handleTextFieldColor, validNickname } from '@src/utils';
import CircularProgress from './circularProgress';
import { InitContextType } from '../index.d';

export default function InitUser() {
  const [valid, setValid] = useState(false);
  const { initUser, setInitUser } = useOutletContext<InitContextType>();

  const handleNickname = (text: string) => {
    setValid(validNickname(text));
    setInitUser((prev) => ({ ...prev, nickname: text }));
  };

  const { mutate, isLoading, isError } = useMutation(
    'checkNickname',
    () => checkNickname(initUser.nickname),
    {
      onSuccess: (res) => {
        console.log(res);
      },
    }
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
            className={`block h-12 w-full rounded-md border bg-white p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 ${handleTextFieldColor(
              initUser.nickname,
              valid
            )}}`}
          />
          <button
            className="flex min-w-[6rem] items-center justify-center rounded-lg bg-success p-3 text-center text-white transition-all duration-300 ease-in-out active:scale-[99%] disabled:bg-gray-300 active:disabled:scale-100"
            onClick={mutate as () => void}
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
          {valid && (
            <div className="mr-2 inline-block size-2 rounded-full bg-green-500 leading-4" />
          )}
          <span>
            최소 2글자, 최대 10글자까지 한글,영어, 숫자만 입력가능해요.
          </span>
        </div>
        {isError && (
          <div className="text-xs text-red-600">
            <div className="mr-2 inline-block size-2 rounded-full bg-red-600 leading-4" />
            <span>중복된 닉네임 입니다.</span>
          </div>
        )}
      </div>
      {valid ? 'oo' : 'ss'}
      <NextButton isDisabled={!valid} linkTo="/auth/init/address" />
    </div>
  );
}
