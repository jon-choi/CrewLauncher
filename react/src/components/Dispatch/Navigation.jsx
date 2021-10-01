import { useEffect, useState } from 'react';
import { Link,NavLink, useRouteMatch } from 'react-router-dom';
import { Toolbar, Drawer, MenuList, MenuItem, AppBar, Divider, CssBaseline, IconButton, Button, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/MenuOpen';
import NavigationQuotes from './Navigation/NavigationQuotes';
import NavigationEmptyJobs from './Navigation/NavigationEmptyJob';

const drawerWidth=300;
const activeLink = {color: "red"};

const Navigation = (props) => {
  const [navOpen, setNavOpen] = useState(true);
  const [quotesOpen, setQuotesOpen] = useState(false);
  const [emptyJobsOpen, setEmptyJobsOpen] = useState(false);
  const [quoteState, setQuoteState] = useState([]);
  const [unassignedJobState, setUnassignedJobState] = useState([]);

  useEffect(() => {
    setQuoteState(props.quotes);
    const unassignedJobs = props.jobs.filter(job => !job.crew_id);
    setUnassignedJobState(unassignedJobs);
  }, [props.quotes, props.jobs])

  const { url } = useRouteMatch();
  const { contracts } = props.contracts;
  console.log("Contracts in nav: ", contracts)
  return (<>
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
          </Toolbar>
        </AppBar>
        
      <CssBaseline />
    <NavigationEmptyJobs contracts={props.contracts} jobs={unassignedJobState} open={emptyJobsOpen} setOpen={setEmptyJobsOpen}/>
    <NavigationQuotes quotes={quoteState} open={quotesOpen} setOpen={setQuotesOpen}/>
    <Drawer open={navOpen} variant='persistent' position='static' anchor='left'
      sx={{display: { xs: 'block', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    }}>
          <Button><h1 onClick={()=> setNavOpen(!navOpen)}>Crew🚀Launcher</h1></Button>

          <Divider />
          <Toolbar>
            <Badge showZero badgeContent={quoteState.length} color='primary'>
              <Button onClick={()=>{setNavOpen(false); setQuotesOpen(true);}}>{`Incoming Quotes`}</Button>
            </Badge>  
          </Toolbar>
          <Toolbar>
            <Badge showZero badgeContent={unassignedJobState.length} color='primary'>
              <Button onClick={()=>{setNavOpen(false); setEmptyJobsOpen(true);}}>{`Unassigned Jobs`}</Button>
            </Badge>  
          </Toolbar>
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