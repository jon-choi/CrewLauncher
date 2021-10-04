import * as React from 'react';
import { format, isSameDay } from 'date-fns'
import { Box, Card, CardActions, CardContent, Button, Typography, Fab, Paper, styled } from '@mui/material';

export default function DashboardJobCard(props) {
  const { timeEst, jobs, incompleteJobs, jobsCount, setCompleteJobState, crewSize, compClass, selectedDay, date } = props;
  
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center'
  }));
  const crewTimeEst = crewSize ? Math.round(timeEst / crewSize) : timeEst; 
  return (
  <Card className={compClass} sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>     
    <CardContent sx={{display: 'flex'}}>
        <Typography variant="h4" component="div">
          {`Crew Size: ${crewSize}`}
        </Typography>
      </CardContent>
        <Typography variant="h4">
          {`Jobs: ${jobsCount}`}
        </Typography>
    
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {`Incomplete: ${incompleteJobs}`}
      </Typography>
    <CardContent>
      <Typography variant="body2">
      {`Time Est: ${crewTimeEst}`}
      </Typography>
    </CardContent>
  </Card>
);
}