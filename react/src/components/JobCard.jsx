import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';

const fab = (<Fab variant="extended" sx={{
  position: 'sticky',
  top: 16,
  left: 850,
}}>Finish</Fab>
  );

export default function JobCard(props) {
  return (
  <Card sx={'display: flex; flex-direction: column; justify-content: space-between; align-items: center;'}>
    {fab}      
    <CardContent sx={'display: flex; '}>
      <div sx={'display: flex; justify-content: space-between; align-items: center;'}>
        <Typography variant="h2" component="div">
          {props.packageTitle}
        </Typography>
        <Typography variant="h4">
          {`Time Est: ${props.timeEst}`}
        </Typography>
      </div>
    </CardContent>
    <CardContent>
      <Typography  sx={' font-size: 5000; mt: 1.5; '} color="text.secondary">
        {props.clientName}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {props.address}
      </Typography>
      <Typography variant="body2">
        {`Notes: ${props.jobNotes}`}
      </Typography>
    </CardContent>
  </Card>
);
}