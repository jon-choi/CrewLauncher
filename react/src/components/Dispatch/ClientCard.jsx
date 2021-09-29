import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import MediaCard from '../MediaCard';

const ClientCard = (props) => {
  const browserHistory = useHistory();
  const client = props.client;
  let contracts;
  if (client.contracts.length > 0) {
    contracts = client.contracts.map(contract => {
    return (<MediaCard header={contract.address} onClick={() => browserHistory.push(`/dispatch/contracts/${contract.id}`)} />)
    });
  } else {
    contracts = <MediaCard header={'No contracts booked'}/>
  }
  return (
    <Card sx="display: flex; justify-content: flex-start; align-items: flex-start;">
      <Avatar alt="clientName" src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 3 }} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`${client.client.name} - ${client.phone} - ${client.email}`}
        </Typography>
        <CardContent>
          {contracts}
        </CardContent>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          details, address, package
        </Typography> */}
      </CardContent>
    </Card>

    

    // <h1>/dispatch/crews
    //   Card
    // </h1>
  );
};

export default ClientCard;