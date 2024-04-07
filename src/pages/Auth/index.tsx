import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { add } from 'date-fns';
import { AuthType } from '@src/types/data';
import { authState } from '@src/data';
import { codeProvide } from '@src/api/user';
import Loading from '../Map/components/Loading';

export default function Auth() {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState<AuthType>(authState);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useQuery('oauth', () => codeProvide(code, auth), {
    retry: false,
    onSuccess: (data) => {
      // 초기 유저의 정보 입력 폼
      if (data.baseRole === 'GUEST') {
        setAuth((prev) => ({
          ...prev,
          accessToken: data.tokenDto.accessToken,
          refreshToken: data.tokenDto.refreshToken,
          expired: add(new Date(), { hours: 12 }).getTime(),
        }));
        navigate('/auth/init');
        return;
      }

      setAuth((prev) => ({
        ...prev,
        role: 'USER',
        accessToken: data.tokenDto.accessToken,
        refreshToken: data.tokenDto.refreshToken,
        expired: add(new Date(), { hours: 12 }).getTime(),
      }));
      navigate('/');
    },
    onError: (err: string) => Error(err),
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
