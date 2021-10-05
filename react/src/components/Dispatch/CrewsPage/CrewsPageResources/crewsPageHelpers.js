import * as React from 'react';
import Card from '@mui/material/Card';

import { Stack, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getEstTime } from '../../dispatchDataHelper'

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
      const estimate = parseFloat(item.packageOfJob.man_hours_per_visit, item.crewOfJob.crew_size).toFixed(2);
      timeArray.push(estimate)
      return item.job.completed;
    })
    
    const incompleteJobs = day.length - completedJobs.length;

    const time = timeArray.reduce((previousValue, currentValue) => previousValue + currentValue)

    return (<Item className="page-header" key={value} >
      <Card sx={{justifyContent: 'space-between'}}>
      <Typography className="--days-summary" color="text.primary" gutterBottom >
        Estimated Time:
      </Typography>
      <Typography className="--days-summary" color="#text.primary" gutterBottom >
       {time} hrs
      </Typography>
      </Card >
      <Card sx={{justifyContent: 'space-between'}}>
      <Typography className="--days-summary" color="#text.primary" gutterBottom >
        Completed Jobs: 
      </Typography>
      <Typography className="--days-summary" color="#text.primary" gutterBottom >
      {completedJobs.length}
      </Typography>
      </Card >
      <Card sx={{justifyContent: 'space-between'}}>
      <Typography className="--days-summary" color="#text.primary" gutterBottom >
        Incomplete Jobs: 
      </Typography>
      <Typography className="--days-summary" color="#text.primary" gutterBottom >
      {incompleteJobs}
      </Typography>
      </Card >
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
  console.log(day)
  const selectedDayCard = day.map(job => {
    return (<>
      <Stack className="--selected-summary">
        <Item className="--list" variant="outlined" >{date}</Item>
        <Item className="--list" variant="outlined" >{job.job.start_time}</Item>
        <Item className="--list" variant="outlined" >{job.packageOfJob.title}</Item>
        <Item className="--list" variant="outlined" >{job.clientOfJob.name}, {job.clientOfJob.phone}</Item>
        <Item className="--list" variant="outlined" >{job.contractOfJob.address}</Item>
      </Stack>
    </>)
  }
    )
  return (<>
  <Stack direction="row" className="--stack">
      <Stack className="--selected" >
        <Item className="--list" variant="outlined">Job Date</Item>
        <Item className="--list" variant="outlined">Approximate Launch:</Item>
        <Item className="--list" variant="outlined">Contract Package:</Item>
        <Item className="--list" variant="outlined">Client:</Item>
        <Item className="--list" variant="outlined">Address:</Item>
      </Stack>
      {selectedDayCard}
  </Stack>
  </>)
}

export { createBodyItems, createSelectedDayCard };
