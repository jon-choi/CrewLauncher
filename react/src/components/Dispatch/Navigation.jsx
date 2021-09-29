import {  Link, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import { List, ListItem, Toolbar, Drawer, Button } from '@mui/material';

const Navigation = () => {
  const { url } = useRouteMatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (<>
    <Button onClick={() => setOpen(!open)}>Menu</Button>
    <Drawer open={open} variant='persistent' position='static' anchor='left'>
      <Toolbar>
        <List>
          <ListItem><h1>Crew🚀Launcher</h1></ListItem>
          <ListItem component={Link} to='/dispatch' onClick={handleClose}> 🚀 Dashboard 🚀</ListItem>
          <ListItem component={Link} to={`${url}/crews`} onClick={handleClose}>🚀 Crews</ListItem>
          <ListItem component={Link} to={`${url}/clients`} onClick={handleClose}>🚀 Clients</ListItem>
          <ListItem component={Link} to={`${url}/contracts`} onClick={handleClose}>🚀 Contracts</ListItem>
          <List>
            <ListItem>Create Forms</ListItem>
            <ListItem component={Link} to={`${url}/contracts/new`} onClick={handleClose}>🚀 New Contract</ListItem>
            <ListItem component={Link} to={`${url}/packages/new`} onClick={handleClose}>🚀 New Package</ListItem>
          </List>
          <ListItem component={Link} to={`${url}/contracts/1`} onClick={handleClose}>Edit Contract 1</ListItem>
          <ListItem component={Link} to={`${url}/jobs/1`} onClick={handleClose}>Edit Job 1</ListItem>
        </List>
      </Toolbar>
    </Drawer>

  </>);
};

export default Navigation;