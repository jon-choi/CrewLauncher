import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Avatar, Stack, Button, Box } from '@mui/material';
import MediaCard from '../MediaCard';
import { format, addDays } from 'date-fns';

const ClientCard = (props) => {
  const client = props.client;
  let contracts;
  if (client.contracts.length > 0 && client.contracts[0].id) {
    contracts = client.contracts.map(contract => {
      return (
        <Box component={Link} to={`/dispatch/contracts/${contract.id}`} key={contract.id} >
          <MediaCard header={contract.address} 
          body={`${contract.packageInfo.title} 🚀 
                ( ${format(new Date(contract.start_date), 'MMMM dd, yyyy')} - 
                ${format(new Date(addDays(new Date(contract.start_date), contract.packageInfo.contract_length_days)), 'MMMM dd, yyyy')}
                )`} 
          />
        </Box>
      )    
    });
  } else {
    contracts = (
      <Box>
        <MediaCard header={'No contracts booked'}/>
      </Box>
    );
  }
  return (
    <Card sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
      <Stack width={400}>
        <Avatar alt="clientName" src={client.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 3 }} />
        <Typography sx={{ fontSize: 14, ml: 5 }} color="text.secondary" gutterBottom>
          {`${client.client.name} - ${client.client.phone || 'N/A'} - ${client.client.email}`}
        </Typography>
        <Typography>
          {client.contracts.length > 0 && `Active contracts: ${contracts.length}`}
        </Typography>
      </Stack>
        <CardActions>
          <Button component={Link} to={`/dispatch/clients/${client.client.id}/contracts/new`} >Create Contract</Button>
        </CardActions>
      {/* <CardContent> */}
        <CardContent>
          <Stack spacing={5} direction='row'>
            {contracts}
          </Stack>
        </CardContent>
    </Card>
  );
};

export default ClientCard;