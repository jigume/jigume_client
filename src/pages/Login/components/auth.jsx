import axios from 'axios';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { backURL } from '../../../common';
import Loading from '../../Map/components/Loading';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const codeProvide = async () => {
    const response = await axios.post(
      `${backURL}/api/member/login?login-provider=kakao&authorization-code=${code}`,
    );
    return response;
  };

  useQuery('oauth', codeProvide, {
    retry: false,
    onSuccess: (res) => console.log(res),
  });

  return <Loading />;
}
