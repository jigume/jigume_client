import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { setNewUser } from '../../../../../api/user';
import { authState } from '../../../../../recoil';

export default function InitProfileImage() {
  const navigate = useNavigate();
  const { initUser, setInitUser } = useOutletContext();
  const [, setAuth] = useRecoilState(authState);

  const setNewUserProfile = useMutation('newUser', () => setNewUser(initUser), {
    retry: false,
    onSuccess: () => {
      setAuth((prev) => ({ ...prev, role: 'USER' }));
    },
  });

  useEffect(() => {
    setInitUser((prev) => ({ ...prev, image: '/' }));
    // 잘못된 요청 방지
    if (!initUser.nickname || !initUser.position) navigate('/auth/init');
  }, []);

  return (
    <>
      <div className="pb-3">profile 이미지 설정</div>
      <button
        disabled={!initUser.nickname.length}
        className="text-md h-12 w-full rounded-lg bg-success p-3 text-center text-white transition-all duration-300 ease-in-out active:scale-[99%] disabled:bg-gray-300 active:disabled:scale-100"
        onClick={setNewUserProfile.mutate}
      >
        완료하기
      </button>
    </>
  );
}
