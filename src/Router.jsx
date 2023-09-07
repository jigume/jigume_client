import React from 'react';
import RegistrationForms from './pages/RegistrationForms';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductImage from './pages/RegistrationForms/components/productImage';
import ProductDetail from './pages/RegistrationForms/components/productDetail';
import ProductLink from './pages/RegistrationForms/components/productLink';
import ProductAmount from './pages/RegistrationForms/components/productAmount';
import ProductDeadline from './pages/RegistrationForms/components/productDeadline';
import GetPlace from './pages/RegistrationForms/components/getPlace';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/RegistrationForms/*',
    element: <RegistrationForms />,
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
