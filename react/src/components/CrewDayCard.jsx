import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function CrewDayCard(props) {
  const { onClick, date, jobsBooked, dayTimeEst } = props;

  return (
    <Card onClick={onClick} >
      <CardContent 
      sx={{ display: 'flex', justifyContent: 'center', minHeight: 175, midWidth: 40 }}>
       
        <Typography variant="h5" component="div">
          {date}
        </Typography>

        <Typography color="text.secondary">
          {`# of jobs booked: ${jobsBooked}`} 
        </Typography>

        <Typography variant="body2">
         {`Time Estimate: ${dayTimeEst}`} 
        </Typography>
      </CardContent>
    </Card>
  );
}