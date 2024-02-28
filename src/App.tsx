import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import TimeAgo from 'javascript-time-ago';
import ko from 'javascript-time-ago/locale/ko';
import useKakaoLoader from './hooks/useKakaoLoader';
import Router from './Router';

const queryClient = new QueryClient();

function App() {
  TimeAgo.addLocale(ko);
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
