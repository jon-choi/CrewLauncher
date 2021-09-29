import React from 'react';
import { Stack, Box } from '@mui/material';
import ClientCard from './ClientCard';

const ClientsPage = (props) => {
    console.log("clientsInfo: ", props.clientsInfo)

  const clientCards = props.clientsInfo.map(client => {
    return (<ClientCard client={client} />)
  });

  return (
    <>
    <div>Total Clients: {props.clientsInfo.length}</div>
    <Stack spacing={1} >
        {clientCards}
    </Stack>
    </>
  );
};

export default ClientsPage;