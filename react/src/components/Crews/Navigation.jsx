
import { useParams, Link } from 'react-router-dom'
import Drawer from '../Drawer'
import Quote from './Quote'
import Card from '@mui/material/Card';
import { Stack, Grid, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './Navigation.scss'

const Navigation = (props) => {

  const id = useParams().id;

  const { packages, onSubmitQuote } = props;
  const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center'
  }));

  return (
    <Grid container>
      <Stack direction="row" sx={{justifyContent: 'space-between', minWidth: 350}}>
        <Button component={Link} to={`/crews/${id}`} sx={{fontSize:100}}>
        🚀
        </Button>
      
        <Item>
          <Drawer closeButtonText={'Close'} openButtonText={'Quote'} compClass={'quote-drawer'} items={<Quote packages={packages} onSubmitQuote={onSubmitQuote} />} />
        </Item>
      </Stack>
    </Grid>
  );
};

export default Navigation;