import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMutation } from 'react-query';
import NextButton from '@src/components/NextButton';
import { checkNickname } from '@src/api/user';
import { handleTextFieldColor, validNickname } from '@src/utils';
import { useRecoilState } from 'recoil';
import { AuthType } from '@src/types/data';
import { authState } from '@src/data';
import { InitContextType } from '../index.d';
import CircularProgress from './circularProgress';

const initText = '최소 2글자, 최대 10글자까지 한글,영어, 숫자만 입력가능해요.';

export default function InitUser() {
  const [valid, setValid] = useState(false);
  const [alertText, setAlertText] = useState(initText);
  const { initUser, setInitUser } = useOutletContext<InitContextType>();
  const [auth] = useRecoilState<AuthType>(authState);

  const handleNickname = (text: string) => {
    setValid(validNickname(text));
    setInitUser((prev) => ({ ...prev, nickname: text }));
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    'checkNickname',
    () => checkNickname(initUser.nickname, auth.accessToken)
  );

  const getTextColor = () => {
    if (initUser.nickname.length === 0) return 'text-gray-600';
    return valid ? 'text-success' : 'text-red-600';
  };

  useEffect(() => {
    handleNickname(initUser.nickname);
  }, []);

  useEffect(() => {
    if (valid) setAlertText('사용가능한 닉네임이에요!');
    else if (isError) setAlertText('중복된 닉네임이에요!');
    else setAlertText(initText);
  }, [valid]);

  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div className="pt-[33%]">
        <div className="pb-12 text-xl font-semibold">
          닉네임을 입력해주세요.
        </div>
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
        <div className={`py-3 text-xs ${getTextColor()}`}>{alertText}</div>
      </div>
      <NextButton
        isDisabled={!valid || !isSuccess}
        linkTo="/auth/init/agreement"
      />
    </div>
  );
}
