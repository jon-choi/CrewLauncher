import * as React from 'react';
import Card from '@mui/material/Card';

import { Stack, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center'
}));

const createBodyItems = function([...day], value) {
  const date = day.splice(0,1)
  if (day[0]) {
    const timeArray = [];
    const completedJobs = day.filter(item => {
      const estimate = item.packageOfJob.man_hours_per_visit / item.crewOfJob.crew_size;
      timeArray.push(estimate)
      return item.job.completed;
    })
    const incompleteJobs = day.length - completedJobs.length;

    const time = timeArray.reduce((previousValue, currentValue) => previousValue + currentValue)

    return (<Item key={value} >
      <Grid container sx={{justifyContent: 'space-between'}}>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom >
        Estimated Time:
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom >
       {time} hrs
      </Typography>
      </Grid >
      <Grid container sx={{justifyContent: 'space-between'}}>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom >
        Completed Jobs: 
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom >
      {completedJobs.length}
      </Typography>
      </Grid >
      <Grid container sx={{justifyContent: 'space-between'}}>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom >
        Incomplete Jobs: 
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom >
      {incompleteJobs}
      </Typography>
      </Grid >
    </Item>)
  }
  return(<>
    <Typography variant="h6" color="text.primary" gutterBottom>
      No Jobs!
    </Typography>
  </>)
}

const createSelectedDayCard = function([...day]) {
  const date = day.splice(0,1)
  const selectedDayCard = day.map(job => {
    return (<>
      <Stack justifyContent="center" className="--summary">
        <Item className="--list" variant="outlined" >{date}</Item>
        <Item className="--list" variant="outlined" >{job.job.start_time}</Item>
        <Item className="--list" variant="outlined" >{job.packageOfJob.title}</Item>
        <Item className="--list" variant="outlined" >{job.clientOfJob.name}, {job.clientOfJob.phone}</Item>
      </Stack>
    </>)
  }
    )
  return (<>
  <Stack direction="row">
      <Stack className="--summary"  >
        <Item variant="outlined">Job Date</Item>
        <Item variant="outlined">Approximate Launch:</Item>
        <Item variant="outlined">Contract Package:</Item>
        <Item variant="outlined">Client:</Item>
      </Stack>
      {selectedDayCard}
  </Stack>
  </>)
}

export { createBodyItems, createSelectedDayCard };
