import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Register from './pages/Register';
import Map from './pages/Map';
import Introduce from './pages/Introduce';
import Announcement from './pages/Announcement';
import ProductImage from './pages/Register/components/productImage';
import ProductDetail from './pages/Register/components/productDetail';
import ProductLink from './pages/Register/components/productLink';
import ProductAmount from './pages/Register/components/productAmount';
import ProductDeadline from './pages/Register/components/productDeadline';
import GetPlace from './pages/Register/components/getPlace';
import Login from './pages/Auth/components/login';
import Auth from './pages/Auth';
import { authState } from './recoil';
import NotMatch from './pages/NotMatch';
import InitUser from './pages/Auth/components/Init/components/initUser';
import InitAddress from './pages/Auth/components/Init/components/initAddress';
import Init from './pages/Auth/components/Init';
import Refresh from './pages/Auth/components/Refresh';
import InitProfileImage from './pages/Auth/components/Init/components/initProfileImage';

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
            { index: true, element: <InitUser /> },
            { path: 'address', element: <InitAddress /> },
            { path: 'image', element: <InitProfileImage /> },
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
          path: '/Introduce/:idx',
          element: <Introduce />,
        },
        // 상품 공지
        {
          path: '/Announcement',
          element: <Announcement />,
        },
        // 상품 등록
        {
          path: '/Register/*',
          element: <Register />,
          children: [
            { index: true, element: <ProductImage /> },
            {
              path: 'ProductDetail',
              element: <ProductDetail />,
            },
            {
              path: 'ProductLink',
              element: <ProductLink />,
            },
            {
              path: 'ProductAmount',
              element: <ProductAmount />,
            },
            {
              path: 'ProductDeadline',
              element: <ProductDeadline />,
            },
            {
              path: 'GetPlace',
              element: <GetPlace />,
            },
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
