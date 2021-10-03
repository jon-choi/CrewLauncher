import React from 'react';
import { Stack, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import ClientCard from './ClientCard';

const ClientsPage = (props) => {
  const clientCards = props.clientsInfo.map((client) => {
    return <ClientCard key={client.id} client={client} />;
  });

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  return (
      <Box width={"100%"}>
        <Stack spacing={1} sx={{maxHeight: 800, minHeight: 550, alignItems: 'center',  margin: 'auto'}}> 
        <Item>
          <Typography variant="h3">
            🚀 Total Clients: {props.clientsInfo.length} 🚀
          </Typography>
        </Item>
        {clientCards}
      </Stack>
      </Box>
    
  );
};

export default ClientsPage;