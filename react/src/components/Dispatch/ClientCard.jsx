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
  return (<Grid container width='100%' direction='row' minWidth='100%' rows={1}>
        <Grid item>
        <Card className="card-bg" sx={{ width: 300, height: 180, mb: 1, ml: 2, mr: 2, mt: 1 }}>
        <Avatar alt="clientName" src={client.avatar} sx={{ maxWidth: 400, maxHeight: 100, mb: 1, ml: 2, mr: 2, mt: 1 }} />
        <Typography className="font-color" sx={{ fontSize: 14, ml: 3 }} color="text.secondary" gutterBottom>
          {`${client.client.name} - ${client.client.phone || 'N/A'} - ${client.client.email}`}
        </Typography>
        <Typography className="font-color" >
          {client.contracts.length > 0 && `Active contracts: ${contracts.length}`}
        </Typography>
        <CardActions>
          <Button sx={{ ml: 8 }} component={Link} to={`/dispatch/clients/${client.client.id}/contracts/new`} >New Contract</Button>
        </CardActions>
        </Card>
      {/* <CardContent> */}
      </Grid>
      <Grid item sx={{display: "flex", alignItems: "center"}} > 
      <Grid container spacing={2} direction="row" sx={{  height: 170 }}>
        
        {contracts}
        
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientCard;