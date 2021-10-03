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
    return day.map(job => {
      return (<div key={value}>
      <Typography variant="h6" color="text.primary" gutterBottom >
        Job Info: 

      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
        {job.clientOfJob.name}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
        {job.contractOfJob.address}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
        {job.job.completed ? "Complete!" : "Not Complete"}
      </Typography>
    </div>)
    });
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
      <Stack justifyContent="center">
        <Item variant="outlined" sx={{mr: 2, ml: 2}}>{date}</Item>
        <Item variant="outlined" sx={{mr: 2, ml: 2}}>{job.job.start_time}</Item>
        <Item variant="outlined" sx={{mr: 2, ml: 2}}>{job.packageOfJob.title}</Item>
        <Item variant="outlined" sx={{mr: 2, ml: 2}}>{job.clientOfJob.name}, {job.clientOfJob.phone}</Item>
      </Stack>
    </>)
  }
    )
  return (<>
  <Stack direction="row">
      <Card >
        <Item variant="outlined">Job Date</Item>
        <Item variant="outlined">Approximate Launch:</Item>
        <Item variant="outlined">Contract Package:</Item>
        <Item variant="outlined">Client:</Item>
      </Card>
      {selectedDayCard}
  </Stack>
  </>)
}

export { createBodyItems, createSelectedDayCard };
