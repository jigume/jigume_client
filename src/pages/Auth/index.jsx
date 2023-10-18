import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { add } from 'date-fns';
import Loading from '../Map/components/Loading';
import { authState } from '../../recoil';
import { codeProvide } from '../../api/user';

export default function Auth() {
  const navigate = useNavigate();
  const [, setAuth] = useRecoilState(authState);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useQuery('oauth', () => codeProvide(code), {
    retry: false,
    onSuccess: ({ data }) => {
      console.log(data.baseRole);
      // 초기 유저의 정보 입력 폼
      if (data.baseRole === 'GUEST') {
        setAuth((prev) => ({
          ...prev,
          accessToken: data.tokenDto.accessToken,
          refreshToken: data.tokenDto.refreshToken,
          expired: add(new Date(), { days: 1 }).getTime(),
        }));
        navigate('/auth/init');
        return;
      }

      setAuth((prev) => ({
        ...prev,
        role: 'USER',
        accessToken: data.tokenDto.accessToken,
        refreshToken: data.tokenDto.refreshToken,
        expired: add(new Date(), { days: 1 }).getTime(),
      }));
      navigate('/');
    },
    onError: (err) => Error(err),
    // onSettled: () => navigate('/'),
  });

  return (
    <Loading
      onClick={() =>
        setAuth((prev) => ({
          ...prev,
          role: 'GUEST',
        }))
      }
    />
  );
}
