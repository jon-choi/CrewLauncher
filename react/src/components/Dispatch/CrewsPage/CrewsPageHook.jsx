 
import { useState } from "react";

import JobCard from '../../JobCard'

import CrewCard from './CrewCard';

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

const useCrewsPageDayState = function() {
  const [selectedDay, setSelectedDay] = useState(null);
  const mapDayToCard = function([...day], value) {
    const date = day.splice(0,1)
    if(day[0]) {
      const jobs = day.filter(jobOfDay => {
        const { job } = jobOfDay;
        return !job.completed
      })
      return (
      <Box>
        <Typography variant="h4" component="h4" onClick={(event) => setSelectedDay(value)}>
          {date}
        </Typography>
        <Typography variant="h5" component="h5" onClick={(event) => setSelectedDay(value)}>
          Jobs Today: {day.length}
        </Typography>
        <Typography variant="h5" component="h6" onClick={(event) => setSelectedDay(value)}>
          Incomplete: {jobs.length}
        </Typography>
      </Box>
        )
    }
    return (
    <Box>
      <Typography variant="h4" component="h4">
        {date}
      </Typography>
      <Typography variant="h5" component="h5">
        No Jobs Today!
      </Typography>
      
    </Box>)
  }
  const jobsForSelectedDay = function([...day], value) {
    const date = day.splice(0,1)
    if(day[0]) {
      const jobCard = day.map(jobOfDay => {
        const { job, contractOfJob, crewOfJob, packageOfJob, clientOfJob } = jobOfDay;
          return (
          <Stack>
            <Typography variant="h6">{crewOfJob.foreman_name}</Typography>
            <Box sx={{ width: '95%', maxWidth: 500, maxHeight: 300, display: 'flex'}}>
              <JobCard
              key={job.id}
              packageTitle={packageOfJob.title}
              timeEst={packageOfJob.man_hours_per_visit}
              clientName={clientOfJob.name}
              address={contractOfJob.address}
              jobNotes={contractOfJob.job_notes}
              compClass="dashboard-day"
              />
            </Box>
          </Stack>
        )
      })
      const jobsForSelectedDay =
        <Box>
           {jobCard}
        </Box>
      return jobsForSelectedDay
    }
    return mapDayToCard([date])
  }

  const createCrewCards = function(days) {
    let count = 0;
    return days.map(day => {
      const countListen = count;
      const dayCard = (<Grid item container
        className={`day-${countListen}`}
        sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }}
        onClick={(event) => setSelectedDay(countListen)}
      >
        {selectedDay !== null && countListen === selectedDay ? jobsForSelectedDay(days[countListen], countListen) : mapDayToCard(days[countListen], countListen)}
      </Grid>
      );
      count++;
      return dayCard;

    })
  }
  return { selectedDay, setSelectedDay, createCrewCards}
}

export default useCrewsPageDayState;

{/* <Grid container rowSpacing={4} columnSpacing={{ xs: 10, sm: 10, md: 10 }}>
                <Grid item container>
                    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
                    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 200, mb: 5 }}></CrewCard>
                 </Grid>
                <Grid item container>
                    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
                    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 200, mb: 5 }}></CrewCard>
                </Grid>
                <Grid item container>
                    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
                    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 500 }}></CrewCard>
                </Grid> 
            </Grid> */}