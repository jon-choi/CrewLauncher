
import { useParams, Link } from 'react-router-dom'
import Drawer from '../Drawer'
import Quote from './Quote'
import Card from '@mui/material/Card';
import { Stack, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Navigation = (props) => {

  const id = useParams().id;

  const { packages, onSubmitQuote } = props;
  const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center'
  }));

  return (
    <div>
      <Stack direction="row" sx={{justifyContent: 'space-between'}}>
        <Button component={Link} to={`/crews/${id}`} sx={{fontSize:100}}>
        🚀
        </Button>
      
        <Item>
          <Drawer closeButtonText={'Close'} openButtonText={'Quote'} items={<Quote packages={packages} onSubmitQuote={onSubmitQuote} />} />
        </Item>
      </Stack>
    </div>
  );
};

export default Navigation;