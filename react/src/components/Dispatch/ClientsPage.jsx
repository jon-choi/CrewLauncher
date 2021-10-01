import React from 'react';
import { Stack, Box } from '@mui/material';
import ClientCard from './ClientCard';

const ClientsPage = (props) => {
  const clientCards = props.clientsInfo.map(client => {
    return (<ClientCard key={client.id} client={client} />)
  });

  return (
    <Box width={'100%'}>
      <div>Total Clients: {props.clientsInfo.length}</div>
      <Stack spacing={1} >
        {clientCards}
      </Stack>
    </Box>
  );
};

export default ClientsPage;