import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';
import useKakaoLoader from './hooks/useKakaoLoader';

const queryClient = new QueryClient();

function App() {
  useKakaoLoader();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
