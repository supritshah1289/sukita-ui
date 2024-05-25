import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const navConfig = [
  {
    title: "Dashboard",
    path: "/",
    isPublic: false,
    icon: icon('ic_analytics'),
  },
  {
    title: 'My Items',
    path: '/myitems',
    isPublic: false,
    icon: icon('ic_cart'),
  },
  {
    title: 'Post',
    path: '/post',
    isPublic: false,
    icon: icon('ic_post'),
  },
  {
    title: 'Logout',
    path: "/",
    icon: icon('ic_unlock'),
  }
];

export const login = [
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  }
]
