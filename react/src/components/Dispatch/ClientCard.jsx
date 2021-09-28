import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


const ClientCard = (props) => {


  
  return (
    <Card sx="display: flex; justify-content: center; align-items: flex-start;">
      <Avatar alt="clientName" src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Client info
        </Typography>
        <Typography variant="h5" component="div">
          Active contracts:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          details, address, package
        </Typography>
      </CardContent>
    </Card>

    

    // <h1>/dispatch/crews
    //   Card
    // </h1>
  );
};

export default ClientCard;