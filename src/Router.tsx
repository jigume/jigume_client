import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from './data';
import Register from './pages/Register';
import Map from './pages/Map';
import Goods from './pages/Goods';
import Announcement from './pages/Announcement';
import Image from './pages/Register/components/Image';
import Detail from './pages/Register/components/Detail';
import Links from './pages/Register/components/Links';
import Cost from './pages/Register/components/Cost';
import Deadline from './pages/Register/components/Deadline';
import Place from './pages/Register/components/Place';
import Notice from './pages/Register/components/Notice';
import Login from './pages/Auth/components/login';
import NotMatch from './pages/NotMatch';
import InitUser from './pages/Auth/components/Init/components/initUser';
import InitAddress from './pages/Auth/components/Init/components/initAddress';
import Init from './pages/Auth/components/Init';
import Refresh from './pages/Auth/components/Refresh';
import InitProfileImage from './pages/Auth/components/Init/components/initProfileImage';
import Mypage from './pages/Mypage';
import Auth from './pages/Auth';
import InitAccessRights from './pages/Auth/components/Init/components/initAccessRights';
import Submitted from './pages/Goods/components/Submitted';
import Profile from './pages/Mypage/components/Profile';
import Edit from './pages/Mypage/components/EditProfile';
import InitAgreement from './pages/Auth/components/Init/components/initAgreement';
import ServiceAgreement from './pages/Auth/components/Init/components/ServiceAgreement';
import PrivacyAgreement from './pages/Auth/components/Init/components/PrivacyAgreement';
import MarketingAgreement from './pages/Auth/components/Init/components/MarketingAgreement';

export default function Router() {
  // recoil state로 access roles 관리
  /** @type {[{
   *  accessToken: string;
   *  refreshToken: string;
   *  role: "ADMIN" | "USER" | "GUEST";
   *  expired: TimeStapm
   * }]}
   * */
  const [auth] = useRecoilState(authState);

  const router = createBrowserRouter([
    // 로그인
    {
      path: '/auth/*',
      children: [
        {
          index: true,
          element: <Auth />,
          loader: () => {
            if (auth.accessToken) return redirect('/auth/init');
            return null;
          },
        },
        {
          path: 'login',
          element: <Login />,
          loader: () => {
            if (auth.accessToken) return redirect('/auth/init');
            return null;
          },
        },
        {
          path: 'init',
          element: <Init />,
          children: [
            { index: true, element: <InitAccessRights /> },
            { path: 'user', element: <InitUser /> },
            // { path: 'address', element: <InitAddress /> },
            { path: 'image', element: <InitProfileImage /> },
            {
              path: 'agreement',
              children: [
                { index: true, element: <InitAgreement /> },
                { path: 'service', element: <ServiceAgreement /> },
                { path: 'privacy', element: <PrivacyAgreement /> },
                { path: 'Marketing', element: <MarketingAgreement /> },
              ],
            },
          ],
          loader: () => {
            if (!auth.accessToken) return redirect('/auth/login');
            return null;
          },
        },
      ],
      loader: () => {
        if (auth.role !== 'GUEST') return redirect('/');
        return null;
      },
    },
    {
      path: '/',
      element: <Refresh />,
      children: [
        // 지도 (메인)
        { index: true, element: <Map /> },
        // 상품 상세
        {
          path: '/goods/:idx/*',
          element: <Goods />,
          children: [{ path: 'submitted', element: <Submitted /> }],
        },
        // 상품 공지
        {
          path: '/announcement',
          element: <Announcement />,
        },
        // 상품 등록
        {
          path: '/register/*',
          element: <Register />,
          children: [
            { index: true, element: <Image /> },
            {
              path: 'detail',
              element: <Detail />,
            },
            {
              path: 'link',
              element: <Links />,
            },
            {
              path: 'cost',
              element: <Cost />,
            },
            {
              path: 'deadline',
              element: <Deadline />,
            },
            {
              path: 'place',
              element: <Place />,
            },
            {
              path: 'notice',
              element: <Notice />,
            },
          ],
        },
        // 마이페이지
        {
          path: 'mypage',
          element: <Mypage />,
          children: [
            { index: true, element: <Profile /> },
            { path: 'edit', element: <Edit /> },
          ],
        },
      ],
      loader: () => {
        if (auth.role !== 'USER') return redirect('/auth/login');
        return null;
      },
    },
    { path: '*', element: <NotMatch /> },
  ]);

  return <RouterProvider router={router} />;
}
