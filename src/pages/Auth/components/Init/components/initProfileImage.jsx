import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { setNewUser } from '../../../../../api/user';
import { authState } from '../../../../../recoil';
import CameraIcon from '../../../../../asset/icon/mdi_camera.svg';
import CloseIcon from '../../../../../asset/icon/CloseIcon.svg';

export default function InitProfileImage() {
  const navigate = useNavigate();
  const { initUser, setInitUser } = useOutletContext();
  const [, setAuth] = useRecoilState(authState);

  const newUser = useMutation('newUser', () => setNewUser(initUser), {
    retry: false,
    onSuccess: (res) => {
      if (res.status === 200) setAuth((prev) => ({ ...prev, role: 'USER' }));
    },
  });
  const handleImageReset = () => {
    setInitUser((prev) => ({ ...prev, image: undefined }));
  };

  const encodeFileToBase64 = (fileBlob) => {
    // 이미지 선택 취소 시 예외처리
    if (fileBlob === undefined) return null;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      // onLoad에서 실행하는
      reader.onload = () => {
        setInitUser((prev) => ({
          ...prev,
          image: reader.result,
        }));
        resolve();
      };
    });
  };

  useEffect(() => {
    // 잘못된 요청 방지
    if (!initUser.nickname || !initUser.position) navigate('/auth/init');
  }, []);

  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div className="pb-3">프로필 이미지 설정</div>
      <label htmlFor="image">
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          className="hidden"
          id="image"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
          }}
        />
        {!initUser.image ? (
          <div className="flex aspect-[1.8641] w-full flex-col items-center justify-center gap-3 rounded-lg bg-gray-200">
            <img src={CameraIcon} />
            <div className="font-thin">앨범으로 등록</div>
          </div>
        ) : (
          <div className="relative mx-auto aspect-square w-3/4">
            <span
              className="absolute right-[2px] top-[2px] inline-flex -translate-y-1/2 translate-x-1/2 cursor-pointer items-center rounded-full bg-white p-1.5 text-white shadow-[0px_1px_3px_#0003]"
              onClick={handleImageReset}
            >
              <img
                src={CloseIcon}
                className="relative top-[1px] inline-block leading-7"
              />
            </span>
            <img
              className="h-full rounded-lg border-gray-100 bg-gray-300 object-cover"
              src={initUser.image}
            />
          </div>
        )}
      </label>
      <button
        disabled={!initUser.nickname.length}
        className="text-md h-12 w-full rounded-lg bg-success p-3 text-center text-white transition-all duration-300 ease-in-out active:scale-[99%] disabled:bg-gray-300 active:disabled:scale-100"
        onClick={newUser.mutate}
      >
        완료하기
      </button>
    </div>
  );
}
