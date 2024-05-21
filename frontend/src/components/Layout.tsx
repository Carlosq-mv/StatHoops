import React from 'react'
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import DarkMode from './DarkMode';

interface Props {
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/404";
  return (
    <>
      <DarkMode>
        <Box sx={{ display: 'flex' }}>
          {!isAuthPage && <Sidebar />}
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: isAuthPage ? '100%' : `calc(100% - 250px)` }}
          > {children} </Box>
        </Box>
      </DarkMode>
    </>
  )
}

export default Layout
