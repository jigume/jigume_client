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
import userState from './recoli/userState';

export default function Router() {
  // recoil state로 access roles 관리
  const [user] = useRecoilState(userState);

  const router = createBrowserRouter([
    // 로그인
    {
      path: '/login',
      element: <Login />,
      loader: () => user.role !== 'GEUST' && redirect('/'),
    },
    {
      path: '/',
      loader: () => user.role !== 'USER' && redirect('/login'),
      children: [
        // 지도 (메인)
        { index: true, element: <Map /> },
        // 상품 상세
        {
          path: '/Introduce/:idx',
          element: <Introduce />,
        },
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
        {
          path: '/logout',
          // loader: setUser((prev) => {
          //   return {
          //     ...prev,
          //     role: 'GEUST',
          //   };
          // }),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
