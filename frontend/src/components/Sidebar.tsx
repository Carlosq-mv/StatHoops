import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Drawer, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from './DarkMode';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const Sidebar = () => {
    const theme = useTheme();
const colorMode = React.useContext(ColorModeContext);
  const drawerWidth = 230;
  const navigator = useNavigate();
  const handleClick = (page: string) => {
    navigator(`/${page}`)
  }
  const DrawerList = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <List>
        {[
          { name: "StatHoops", icon: <SportsBasketballIcon />},
          { name: "Home", icon: <HomeIcon /> },
          { name: "Search", icon: <SearchIcon /> },
          { name: "My Teams", icon: <WorkspacesIcon /> },
          { name: "Profile", icon: <AccountCircleIcon /> },
          { name: "Settings", icon: <SettingsIcon /> },
        ].map((obj) => (
          <ListItem key={obj.name} disablePadding>
            <ListItemButton onClick={() => handleClick(obj.name.toLowerCase())} sx={{ '&:hover': { bgcolor: theme.palette.action.hover } }}>
              <ListItemIcon sx={{ color: theme.palette.text.primary }}>{obj.icon}</ListItemIcon>
              <ListItemText primary={<Typography variant="body1">{obj.name}</Typography>} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: theme.palette.background.default
          },
        }}
      >
        
        {DrawerList}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1 }}>
                {theme.palette.mode.charAt(0).toUpperCase() + theme.palette.mode.slice(1)} Mode
            </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
