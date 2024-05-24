import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const MyitemsPage = lazy(() => import('src/pages/myItems'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Post = lazy(() => import ('src/pages/post'));
export const Saved = lazy(()=> import('src/pages/saved'));
export const OauthRedirect = lazy(() => import('src/pages/OAuth2RedirectHandler'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'myitems', element: <MyitemsPage /> },
        { path: 'saved', element: <Saved /> },
        { path: "post", element: <Post />}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/oauth2/redirect',
      element: <OauthRedirect />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
