import { useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Drawer from '../Drawer'
import Quote from './Quote'
import Card from '@mui/material/Card';
import { Stack, Grid, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './Navigation.scss'

const Navigation = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const id = useParams().id;

  const { packages, onSubmitQuote } = props;
  
  const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center'
  }));

  return (
    <Grid container className="crew-nav">
      <Stack direction="row" sx={{justifyContent: 'space-between'}}>
        <Button sx={{transitionDuration: '2s'}} className="rocket" component={Link} to={`/crews/${id}`}>
        🚀
        </Button>
      
        <Item className="quote-button" >
          <Drawer closeButtonText={'Close'} openButtonText={'Quote'} items={<Quote packages={packages} onSubmitQuote={onSubmitQuote} width={'192vw'} />} />
        </Item>
      </Stack>
    </Grid>
  );
};

export default Navigation;

