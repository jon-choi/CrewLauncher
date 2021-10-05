import { useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Drawer from '../Drawer'
import Quote from './Quote'
import { Box, Button, IconButton, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Navigation = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const id = useParams().id;

  const { packages, onSubmitQuote } = props;
  
  const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center'
  }));


  return (<>
    <AppBar position='fixed' width='100%'>
      <Toolbar width='100%' >
        <IconButton size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          component={Link} 
          to={`/crews/${id}`} 
        >🚀</IconButton>
        <Button variant='contained' color='inherit' onClick={() => setDrawerOpen(true)}>Quote</Button>
      </Toolbar>
    </AppBar>
    <Item>
      <Drawer
        anchor={'right'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
      <Box sx={{ width: '192vw' }} role="presentation">
          <Button onClick={() => setDrawerOpen(false)} variant="contained">Close</Button>
          <Quote packages={packages} onSubmitQuote={onSubmitQuote} />
        </Box>
      </Drawer>
    </Item>
  </>);
};

export default Navigation;

