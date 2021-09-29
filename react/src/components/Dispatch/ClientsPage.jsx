import React from 'react';
import Card from '@mui/material/Card';
import ClientCard from './ClientCard';

const ClientsPage = (props) => {
    console.log(props.clientsInfo)

  return (
    <Card >
      

    <ClientCard >
    </ClientCard>

    <ClientCard >
    </ClientCard>

    <ClientCard >
    </ClientCard>
</Card>
  );
};

export default ClientsPage;