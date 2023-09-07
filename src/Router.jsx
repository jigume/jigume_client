import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Map from './pages/Map';
import Introduce from './pages/Introduce';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Map />,
  },
  {
    path: '/Introduce',
    element: <Introduce />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
