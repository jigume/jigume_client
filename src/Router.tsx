import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '@src/data';
import Register from '@src/pages/Register';
import Map from '@src/pages/Map';
import Goods from '@src/pages/Goods';
import GoodsNotice from '@src/pages/Goods/components/GoodsNotice';
import Image from '@src/pages/Register/components/Image';
import Detail from '@src/pages/Register/components/Detail';
import Links from '@src/pages/Register/components/Links';
import Cost from '@src/pages/Register/components/Cost';
import Deadline from '@src/pages/Register/components/Deadline';
import Place from '@src/pages/Register/components/Place';
import Notice from '@src/pages/Register/components/Notice';
import Login from '@src/pages/Auth/components/login';
import NotMatch from '@src/pages/NotMatch';
import InitUser from '@src/pages/Auth/components/Init/components/initUser';
// import InitAddress from '@src/pages/Auth/components/Init/components/initAddress';
import Init from '@src/pages/Auth/components/Init';
import Refresh from '@src/pages/Auth/components/Refresh';
import InitProfileImage from '@src/pages/Auth/components/Init/components/initProfileImage';
import Mypage from '@src/pages/Mypage';
import Auth from '@src/pages/Auth';
import InitAccessRights from '@src/pages/Auth/components/Init/components/initAccessRights';
import Submitted from '@src/pages/Goods/components/Submitted';
import Profile from '@src/pages/Mypage/components/Profile';
import Edit from '@src/pages/Mypage/components/EditProfile';
import InitAgreement from '@src/pages/Auth/components/Init/components/initAgreement';
import ServiceAgreement from '@src/pages/Auth/components/Init/components/ServiceAgreement';
import PrivacyAgreement from '@src/pages/Auth/components/Init/components/PrivacyAgreement';
import MarketingAgreement from '@src/pages/Auth/components/Init/components/MarketingAgreement';
import Confirm from '@src/pages/Register/components/Confirm';
import MyLeadList from '@src/pages/Mypage/components/MyLeadList';
import MyJoinList from '@src/pages/Mypage/components/MyJoinList';
import GoodsDetail from '@src/pages/Goods/components/GoodsDetail';
import GoodsModify from '@src/pages/Goods/components/GoodsModify';
import GoodsNoticeModify from '@src/pages/Goods/components/GoodsNoticeModify';
import GoodsNoticeContent from '@src/pages/Goods/components/GoodsNoticeContent';
import MyNotice from '@src/pages/Mypage/components/MyNotice';
import MyLiked from '@src/pages/Mypage/components/MyLiked';

import { AuthType } from '@src/types/data';

export default function Router() {
  const [auth] = useRecoilState<AuthType>(authState);

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
          path: '/buying/:idx/*',
          element: <Goods />,
          children: [
            {
              path: '*',
              element: <GoodsDetail />,
              children: [{ path: 'submitted', element: <Submitted /> }],
            },
            {
              path: 'modify',
              element: <GoodsModify />,
            },
            {
              path: 'notice/*',
              element: <GoodsNotice />,
              children: [
                { index: true, element: <GoodsNoticeContent /> },
                { path: 'modify', element: <GoodsNoticeModify /> },
              ],
            },
          ],
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
            {
              path: 'confirm',
              element: <Confirm />,
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
            { path: 'lead', element: <MyLeadList /> },
            { path: 'join', element: <MyJoinList /> },
            { path: 'notice', element: <MyNotice /> },
            { path: 'liked', element: <MyLiked /> },
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
