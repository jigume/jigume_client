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
    const response = await axios.get(
      `${backURL}/api/login?login-provider=kakao&authorization-code=${code}`,
    );
    return response;
  };

  const auth = useQuery('oauth', codeProvide);

  return <Loading />;
}
