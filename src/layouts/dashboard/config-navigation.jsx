import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    isPublic: false,
    icon: icon('ic_analytics'),
  },
  {
    title: 'Profile',
    path: '/user',
    isPublic: false,
    icon: icon('ic_user'),
  },
  {
    title: 'My Items',
    path: '/products',
    isPublic: false,
    icon: icon('ic_cart'),
  },
  {
    title: 'Saved',
    path: '/blog',
    isPublic: false,
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Inbox',
    path: '/inbox',
    isPublic: false,
    icon: icon('ic_lock'),
  },
  {
    title: 'Post',
    path: '/post',
    isPublic: false,
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
