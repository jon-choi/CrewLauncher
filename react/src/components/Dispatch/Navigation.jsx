import {  Link,NavLink, useRouteMatch } from 'react-router-dom';
import {  Toolbar, Drawer, MenuList, MenuItem, AppBar, Box, Divider, CssBaseline } from '@mui/material';

const drawerWidth=300;
const activeLink = {color: "red"};

const Navigation = () => {
  const { url } = useRouteMatch();

  return (<>
      <AppBar position="fixed"

        sx={{
          width: `calc(100% - ${drawerWidth}px)` ,
          ml: `${drawerWidth}px`,
        }}>
          <Toolbar></Toolbar>
        </AppBar>
        <Box
        component="nav"
        sx={{ width: drawerWidth }}
        aria-label="mailbox folders"
      ></Box>
      <CssBaseline />
    <Drawer variant='permanent' position='static' anchor='left'
      sx={{display: { xs: 'block', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    }}>
          <h1>Crew🚀Launcher</h1>
          <Divider />
      <Toolbar>
        <MenuList>
          <MenuItem exact component={NavLink} to='/dispatch' activeStyle={activeLink}> 🚀 Dashboard 🚀</MenuItem>
          <MenuItem component={NavLink} to={`${url}/crews`} activeStyle={activeLink}>🚀 Crews</MenuItem>
          <MenuItem exact component={NavLink} to={`${url}/clients`} activeStyle={activeLink}>🚀 Clients</MenuItem>
          <MenuItem exact component={NavLink} to={`${url}/contracts`} activeStyle={activeLink}>🚀 Contracts</MenuItem>
          <Divider />
          Create Forms
          <Toolbar>
            <MenuList>
              <Divider />
              <MenuItem component={NavLink} to={`${url}/contracts/new`} activeStyle={activeLink}>🚀 New Contract</MenuItem>
              <MenuItem component={NavLink} to={`${url}/packages/new`} activeStyle={activeLink}>🚀 New Package</MenuItem>
            </MenuList>
          </Toolbar>
          <Divider />
          <MenuItem component={Link} to={`${url}/contracts/1`}>Edit Contract 1</MenuItem>
          <MenuItem component={Link} to={`${url}/jobs/1`}>Edit Job 1</MenuItem>
        </MenuList>
      </Toolbar>
      <Divider />
    </Drawer>
  </>);
};

export default Navigation;