import { useEffect, useState } from 'react';
import { Link,NavLink, useRouteMatch } from 'react-router-dom';
import { Toolbar, Drawer, MenuList, MenuItem, AppBar, Divider, CssBaseline, IconButton, Button, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/MenuOpen';
import NavigationQuotes from './Navigation/NavigationQuotes';
import NavigationEmptyJobs from './Navigation/NavigationEmptyJob';
import io from 'socket.io-client';

const activeLink = {color: "red"};

const Navigation = (props) => {
  const updateQuoteState = props.updateQuoteState;
  const [navOpen, setNavOpen] = useState(true);
  const [quotesOpen, setQuotesOpen] = useState(false);
  const [emptyJobsOpen, setEmptyJobsOpen] = useState(false);

  const [unassignedJobState, setUnassignedJobState] = useState([]);

  useEffect(()=> {
    const socket = io('/');
    socket.connect();
    console.log('Connected over here');
    socket.on('quote', (quote) => {
      updateQuoteState(quote);
      console.log("Incoming quote... ", quote)
    });
    return () => socket.disconnect();
  }, [updateQuoteState]);

  useEffect(() => {
    const unassignedJobs = props.jobs.filter(job => !job.crew_id);
    setUnassignedJobState(unassignedJobs);
  }, [props.jobs])

  const { url } = useRouteMatch();

  return (
    <>
      <AppBar position="fixed">
          <Toolbar>
            <IconButton
              onClick={()=>setNavOpen(!navOpen)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
              <Badge overlap='circular' badgeContent={props.quotes.length}><IconButton color="inherit" onClick={setQuotesOpen}>Quotes</IconButton></Badge>
              
              <Badge overlap='circular' badgeContent={unassignedJobState.length}><IconButton color="inherit" onClick={setEmptyJobsOpen}>Jobs</IconButton></Badge>
          </Toolbar>
        </AppBar>
        
      <CssBaseline />
    <NavigationEmptyJobs contracts={props.contracts} jobs={unassignedJobState} open={emptyJobsOpen} setOpen={setEmptyJobsOpen}/>
    <NavigationQuotes quotes={props.quotes} open={quotesOpen} setOpen={setQuotesOpen}/>
    <Drawer open={navOpen} variant='persistent' position='static' anchor='left'
      sx={{display: { xs: 'block', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', backgroundImage: "url(https://acegif.com/wp-content/gif/outerspace-6.gif)"},
    }}>
          <Button><h1 className='App-header' onClick={()=> setNavOpen(!navOpen)}>Crew Lau🚀ncher</h1></Button>

          <Divider />
          <Toolbar>
              <Button onClick={()=>{setNavOpen(false); setQuotesOpen(true);}}>{`Incoming Quotes`}</Button><Badge color='primary' showZero badgeContent={props.quotes.length} />
          </Toolbar>
          <Toolbar>
              <Button onClick={()=>{setNavOpen(false); setEmptyJobsOpen(true);}}>{`Unassigned Jobs`}</Button><Badge color='primary' showZero badgeContent={unassignedJobState.length} />
          </Toolbar>
          <Divider />
      <Toolbar>
        <MenuList className="font-color">
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