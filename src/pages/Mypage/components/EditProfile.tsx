import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useMutation } from 'react-query';
import { authState } from '@src/data';
import { AuthType } from '@src/types/data';
import { useRecoilState } from 'recoil';
import NextButton from '../../../components/NextButton';
import cameraIcon from '../../../asset/icon/mdi_camera.svg';
import {
  checkNickname,
  updateMemberInfo,
  updateProfile,
} from '../../../api/user';
import { handleTextFieldColor, validNickname } from '../../../utils';
import CircularProgress from '../../Auth/components/Init/components/circularProgress';
import { MyPageContextType, NewProfileType } from '../index.d';

export default function EditProfile() {
  const { setProfileHeader, profile, refetch } =
    useOutletContext<MyPageContextType>();
  const [valid, setValid] = useState(false);
  const [newProfile, setNewProfile] = useState<NewProfileType>({
    nickname: '',
    image: undefined,
    imageInput: undefined,
  });
  const [isChanged, setIsChanged] = useState({
    image: false,
    nickname: false,
  });
  const [auth] = useRecoilState<AuthType>(authState);
  const navigate = useNavigate();

  const handleNickname = (text: string) => {
    setIsChanged((prev) => ({ ...prev, nickname: true }));

    setValid(validNickname(text));
    setNewProfile((prev) => ({ ...prev, nickname: text }));
  };

  const encodeFileToBase64 = (fileBlob: File) => {
    // 이미지 선택 취소 시 예외처리
    if (fileBlob === undefined) return null;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise(() => {
      // onLoad에서 실행하는
      reader.onload = () => {
        setNewProfile((prev) => ({
          ...prev,
          imageInput: fileBlob,
          image: reader.result as string,
        }));
      };
    });
  };

  const {
    mutate: checkName,
    isLoading,
    isError,
  } = useMutation('checkNickname', () =>
    checkNickname(newProfile.nickname, auth.accessToken)
  );

  const { mutate: updateImage } = useMutation(
    'updateProfile',
    () => updateProfile(auth.accessToken as string, newProfile.imageInput),
    {
      onSuccess: () => {
        refetch();
        navigate('/mypage');
      },
    }
  );

  const { mutate: updateName } = useMutation(
    'updateNickname',
    () =>
      updateMemberInfo({
        nickname: newProfile.nickname,
        latitude: 0,
        longitude: 0,
      }),
    {
      onSuccess: () => {
        refetch();
        navigate('/mypage');
      },
    }
  );

  const handleSubmit = () => {
    if (newProfile.imageInput) updateImage();
    if (newProfile.nickname !== profile.nickname) updateName();
  };

  useEffect(() => {
    // 수정 페이지 헤더 조정
    setProfileHeader((prev) => ({
      title: '',
      isAlert: false,
    }));
  }, []);

  useEffect(() => {
    setNewProfile({
      nickname: profile?.nickname,
      image: profile?.profileImgUrl,
      imageInput: undefined,
    });
  }, [profile]);

  return (
    <div className="mx-auto flex h-[calc(100svh-3rem)] max-w-sm flex-col">
      <div className="flex h-full flex-col gap-4 pt-16">
        <div className="mx-auto">
          <label htmlFor="image">
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              className="hidden"
              id="image"
              onChange={(e) => {
                if (e.target.files) {
                  encodeFileToBase64(e.target.files[0]);
                  setIsChanged((prev) => ({ ...prev, image: true }));
                }
              }}
            />
            <div className="relative aspect-square size-32">
              <img
                className="size-full rounded-full bg-zinc-200 object-cover text-[0]"
                src={newProfile.image}
                alt="프로필 이미지"
              />
              <img
                src={cameraIcon}
                className="absolute bottom-0 right-0 size-11 rounded-[20px] bg-white p-2.5 pt-3 shadow-md"
                alt="엘범에서 불러오기"
              />
            </div>
          </label>
        </div>
        <div className="flex gap-4 pt-12">
          <input
            type="text"
            value={newProfile.nickname || ''}
            onChange={(e) => handleNickname(e.target.value)}
            maxLength={20}
            className={`block h-14 w-full rounded-md border bg-white p-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 ${handleTextFieldColor(
              newProfile.nickname,
              valid
            )}}`}
          />
          <button
            className="flex min-w-[6rem] items-center justify-center rounded-lg bg-success px-3 py-4 text-center text-white transition-all duration-300 ease-in-out active:scale-[99%] disabled:bg-gray-300 active:disabled:scale-100"
            onClick={checkName as () => void}
          >
            {isLoading ? <CircularProgress /> : '중복 확인'}
          </button>
        </div>

        <div className={`text-xs ${valid ? 'text-gray-600' : 'text-red-600'}`}>
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
      <NextButton
        content="수정하기"
        onClick={handleSubmit}
        isDisabled={!(isChanged.image || (isChanged.nickname && valid))}
      />
    </div>
  );
}
