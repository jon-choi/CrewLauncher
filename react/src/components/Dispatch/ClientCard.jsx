import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar, Stack } from '@mui/material';
import MediaCard from '../MediaCard';

const ClientCard = (props) => {
  const browserHistory = useHistory();
  const client = props.client;
  let contracts;

  if (client.contracts.length > 0) {
    contracts = client.contracts.map(contract => {
      return (
        <div onClick={() => browserHistory.push(`/dispatch/contracts/${contract.id}`)}>
          <MediaCard key={contract.id} header={contract.address} body={contract.packageInfo.title} />
          
        </div>
      )    
    });
  } else {
    contracts = (
      <div onClick={() => browserHistory.push('/dispatch/contracts/new')}>
        <MediaCard header={'No contracts booked'}/>
      </div>
    );
  }
  return (
    <Card sx="display: flex; justify-content: flex-start; align-items: flex-start;">
      <Stack width={400}>
        <Avatar alt="clientName" src={client.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 3 }} />
        <Typography sx={{ fontSize: 14, ml: 5 }} color="text.secondary" gutterBottom>
          {`${client.client.name} - ${client.client.phone || 'N/A'} - ${client.client.email}`}
        </Typography>
        <Typography>
          {client.contracts.length > 0 && `Active contracts: ${contracts.length}`}
        </Typography>
      </Stack>
      {/* <CardContent> */}
        <CardContent>
          <Stack spacing={5} direction='row'>
            {contracts}
          </Stack>
        </CardContent>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          details, address, package
        </Typography> */}
      {/* </CardContent> */}
    </Card>
  );
};

export default ClientCard;