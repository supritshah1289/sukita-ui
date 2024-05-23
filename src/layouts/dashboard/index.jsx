import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import { useAuth } from 'src/hooks/AuthProvider';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const auth = useAuth();
  const {authenticated} = auth;



  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
       { authenticated ? <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} /> : null }

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
