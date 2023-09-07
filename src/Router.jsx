import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Map from './pages/Map';
import Introduce from './pages/Introduce';
import ProductImage from './pages/Register/components/productImage';
import ProductDetail from './pages/Register/components/productDetail';
import ProductLink from './pages/Register/components/productLink';
import ProductAmount from './pages/Register/components/productAmount';
import ProductDeadline from './pages/Register/components/productDeadline';
import GetPlace from './pages/Register/components/getPlace';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Map />,
  },
  {
    path: '/Introduce',
    element: <Introduce />,
  },
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
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
