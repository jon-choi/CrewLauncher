import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, Paper, Grid, CardContent, CardActions, Typography, Avatar, Stack, Button, Box } from '@mui/material';
import MediaCard from '../MediaCard';
import { styled } from '@mui/material/styles';
import { format, addDays } from 'date-fns';

const ClientCard = (props) => {

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center'
}));

  const client = props.client;
  let contracts;
  if (client.contracts.length > 0 && client.contracts[0].id) {
    contracts = client.contracts.map(contract => {
      return (
        <Grid item component={Link} to={`/dispatch/contracts/${contract.id}`} key={contract.id} >
          <MediaCard header={contract.address} 
          body={`${contract.packageInfo.title} 🚀 
                ( ${format(new Date(contract.start_date), 'MMMM dd, yyyy')} - 
                ${format(new Date(addDays(new Date(contract.start_date), contract.packageInfo.contract_length_days)), 'MMMM dd, yyyy')}
                )`} 
          />
        </Grid >
      )    
    });
  } else {
    contracts = (
      <Box>
        <MediaCard header={'No contracts booked'}/>
      </Box>
    );
  }
  return (<Grid container item sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Card>
        <Avatar alt="clientName" src={client.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 3 }} />
        <Typography sx={{ fontSize: 14, ml: 5 }} color="text.secondary" gutterBottom>
          {`${client.client.name} - ${client.client.phone || 'N/A'} - ${client.client.email}`}
        </Typography>
        <Typography>
          {client.contracts.length > 0 && `Active contracts: ${contracts.length}`}
        </Typography>
        <CardActions>
          <Button component={Link} to={`/dispatch/clients/${client.client.id}/contracts/new`} >Create Contract</Button>
        </CardActions>
        </Card>
      {/* <CardContent> */}
      <Stack direction="row">
            {contracts}
        </Stack>
    </Grid>
  );
};

export default ClientCard;