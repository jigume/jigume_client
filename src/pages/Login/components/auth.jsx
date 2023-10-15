import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { backURL } from '../../../common';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    axios
      .get(
        `${backURL}/api/login?login-provider=kakao&authorization-code=${code}`,
      )
      .then((res) => console.log(res));
  }, []);
  return (
    <div className="w-full h-[100svh] flex items-center justify-center">
      authing...
    </div>
  );
}
