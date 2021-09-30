import * as React from 'react';
import { Card, CardContent, Typography, Avatar, AppBar, Toolbar } from '@mui/material';
const ClientCard = (props) => {


  
  return (<>
    <AppBar position="absolute" pb={5}>
      <Toolbar>

      </Toolbar>
    </AppBar>
    <Card sx="display: flex; justify-content: flex-start; align-items: flex-start;">
      <Avatar alt="clientName" src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 3 }} />
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
  </>);
};

export default ClientCard;