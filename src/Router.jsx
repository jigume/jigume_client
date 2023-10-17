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
import Login from './pages/Login';
import Auth from './pages/Login/components/auth';
import Refresh from './pages/Refresh';
import { authState } from './recoil';

export default function Router() {
  // recoil state로 access roles 관리
  const [auth] = useRecoilState(authState);

  const router = createBrowserRouter([
    // 로그인
    {
      path: '/auth/*',
      children: [
        { index: true, element: <Auth /> },
        { path: 'login', element: <Login /> },
      ],
      loader: () => auth.role !== 'GUEST' && redirect('/'),
    },
    {
      path: '/',
      loader: () => auth.role !== 'USER' && redirect('/auth/login'),
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
    },
  ]);

  return <RouterProvider router={router} />;
}
