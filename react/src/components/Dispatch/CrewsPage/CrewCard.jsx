import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Stack, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import useCrewsPageDayState from './CrewsPageResources/CrewsPageHook';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center'
}));

const CrewCard = (props) => {
  const { days } = props;
  const { selectedDay, createCards } = useCrewsPageDayState()
 
  if (days) {

    const cards = createCards(days)

    return ( <Card className="__card" sx={{display: "flex", justifyContent: "space-around", width: 150}}>{cards}</Card>)
  }
  return (
    <Card sx={{display: "flex", justifyContent: "center", alignItems: "flex-start"}}>
    {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100, mb: 4, ml: 20, mt: 10 }} />
    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" sx={{ width: 100, height: 100, mb: 4, ml: 20, mt: 10 }} /> */}
      <Card sx={{display: 'flex', justifyContent: 'center', minHeight: 175}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Yesterday
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
      </Card>

      <Card sx={{display: 'flex', justifyContent: 'center', minHeight: 175}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Today
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{display: 'flex', justifyContent: 'center', minHeight: 175}}>
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Tomorrow
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{display: 'flex', justifyContent: 'center', minHeight: 175}}>
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          The day after tomorrow
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>
    
    <Card sx={{display: 'flex', justifyContent: 'center', minHeight: 175}}>
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Two days after tomorrow
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>
    </Card>

    

    // <h1>/dispatch/crews
    //   Card
    // </h1>
  )
};

export default CrewCard;