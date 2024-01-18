import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import useKakaoLoader from './hooks/useKakaoLoader';
import Router from './Router';

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
