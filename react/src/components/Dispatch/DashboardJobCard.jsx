import * as React from 'react';
import { format, isSameDay } from 'date-fns'
import { Box, Card, Grid, Stack, Button, Typography, Fab, Paper, styled } from '@mui/material';

export default function DashboardJobCard(props) {
  const { timeEst, jobs, incompleteJobs, jobsCount, setCompleteJobState, crewSize, compClass, selectedDay, date } = props;
  
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center'
  }));
  const crewTimeEst = crewSize ? Math.round(timeEst / crewSize) : timeEst; 
  return (
  <Card className={compClass} sx={{display: "flex", minWidth: 190, justifyContent:"space-evenly", backgroundImage: "url(https://acegif.com/wp-content/gif/outerspace-58.gif)"}}>
    <Stack direction="row" sx={{ mt: 1.3}}>    
    <Stack sx={{display: 'flex', mr:2}}>
      
    <Item sx={{fontSize: 16}}>
          {`Crew Size: `}
        </Item>
      
        <Item sx={{fontSize: 16}}>
          {`Jobs: `}
        </Item>
    
      <Item sx={{fontSize: 16}}>
        {`Incomplete: `}
      </Item>
  
      <Item sx={{fontSize: 16}}>
      {`Time Est: `}
      </Item>
      
    </Stack>
    <Stack sx={{minWidth: 50}}>
      
        <Item sx={{minWidth: 45}} sx={{fontSize: 16}}>
          {crewSize}
        </Item>
      
        <Item sx={{fontSize: 16}}>
          {jobsCount}
        </Item>
    
      <Item sx={{fontSize: 16}}>
        {incompleteJobs}
      </Item>
  
      <Item sx={{fontSize: 16}}>
        {crewTimeEst}
      </Item>
      
    </Stack>
    </Stack> 
  </Card>
);
}