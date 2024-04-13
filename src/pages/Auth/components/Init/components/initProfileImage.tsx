import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AuthType } from '@src/types/data';
import { authState } from '@src/data';
import CameraIcon from '@src/asset/icon/mdi_camera.svg';
import { updateMemberInfo } from '@src/api/user';
import NextButton from '@src/components/NextButton';
import { InitContextType } from '../index.d';

export default function InitProfileImage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState<AuthType>(authState);
  const { initUser, setInitUser } = useOutletContext<InitContextType>();

  const { mutate } = useMutation(
    'newUser',
    () =>
      updateMemberInfo({
        nickname: initUser.nickname,
        latitude: initUser.position?.lat as number,
        longitude: initUser.position?.lng as number,
        token: auth.accessToken as string,
        imageInput: initUser.imageInput,
      }),
    {
      retry: false,
      onSuccess: () => {
        setAuth((prev) => ({ ...prev, role: 'USER' }));
        navigate('/');
      },
    }
  );
  // const handleImageReset = () => {
  //   setInitUser((prev) => ({ ...prev, image: undefined }));
  // };

  const encodeFileToBase64 = (fileBlob: File) => {
    // 이미지 선택 취소 시 예외처리
    if (fileBlob === undefined) return null;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise(() => {
      // onLoad에서 실행하는
      reader.onload = () => {
        setInitUser((prev) => ({
          ...prev,
          imageInput: fileBlob,
          image: reader.result as string,
        }));
        // resolve();
      };
    });
  };

  useEffect(() => {
    // 잘못된 요청 방지
    if (!initUser.nickname) navigate('/auth/init');

    setInitUser((prev) => ({
      ...prev,
      submitUser: mutate as () => void,
    }));
  }, []);

  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div className="flex h-full flex-col justify-center pb-16">
        <div className="pb-16 text-xl font-semibold">
          프로필을 등록해주세요.
        </div>

        <label htmlFor="image">
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            className="hidden"
            id="image"
            onChange={(e) => {
              if (e.target.files) encodeFileToBase64(e.target.files[0]);
            }}
          />
          {!initUser.image ? (
            <div className="mx-auto flex aspect-square w-3/5 flex-col items-center justify-center gap-2 rounded-full bg-gray-100 active:opacity-60">
              <img src={CameraIcon} alt="사진 등록" />
              <div className="font-thin">앨범으로 등록</div>
            </div>
          ) : (
            <div className="relative mx-auto aspect-square w-3/5">
              <span className="absolute -bottom-4 right-8 inline-flex aspect-square w-12 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center rounded-[20px] bg-white p-1.5 text-white shadow-[0px_1px_3px_#0003]">
                <img
                  src={CameraIcon}
                  className="relative top-[1px] mx-auto inline-block leading-7"
                  alt="사진 등록"
                />
              </span>
              <img
                className="aspect-square w-full rounded-full border-gray-100 bg-gray-300 object-cover"
                src={initUser.image}
                alt="프로필 이미지"
              />
            </div>
          )}
        </label>
      </div>

      <NextButton isDisabled={!initUser.image} onClick={mutate as () => void} />
    </div>
  );
}
