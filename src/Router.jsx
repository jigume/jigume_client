import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Map from './pages/Map';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Map />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
