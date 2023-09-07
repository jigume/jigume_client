import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Map from './pages/Map';
import Introduce from './pages/Introduce';
import Announcement from './pages/Announcement';

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
    path: '/Announcement',
    element: <Announcement />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
