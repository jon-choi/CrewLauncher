import * as React from 'react';
import Card from '@mui/material/Card';
import ClientCard from './ClientCard';

const ClientsPage = () => {
  
  return (
    <Card >
      

    <ClientCard sx={{ top: 100, position: 'absolute', minWidth: 245, mb: 5 }}>
    </ClientCard>

    <ClientCard sx={{ top: 100, position: 'absolute', minWidth: 245, mb: 5 }}>
    </ClientCard>

    <ClientCard sx={{ top: 100, position: 'absolute', minWidth: 245 }}>
    </ClientCard>
</Card>
  );
};

export default ClientsPage;