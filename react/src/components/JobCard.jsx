import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


export default function JobCard(props) {
  const { packageTitle, timeEst, clientName, address, jobNotes, compClass } = props;
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center'
  }));

  return (
  <Card sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>     
    <CardContent sx={{display: 'flex'}}>
      <div sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
        <Typography variant="h4" component="div">
          {packageTitle}
        </Typography>
        <Typography variant="h4">
          {`Time Est: ${timeEst}`}
        </Typography>
      </div>
    </CardContent>
    <CardContent>
      <Typography  sx={' font-size: 5000; mt: 1.5; '} color="text.secondary">
        {clientName}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {address}
      </Typography>
      <Typography variant="body2">
        {`Notes: ${jobNotes}`}
      </Typography>
    </CardContent>
  </Card>
);
}