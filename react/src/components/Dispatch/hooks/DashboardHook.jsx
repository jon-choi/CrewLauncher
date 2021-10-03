 
import { useState } from "react";

import JobCard from '../../JobCard'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Stack, Card, Fab } from '@mui/material';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center'
}));



const useDashboardDayState = function() {
  const [selectedDay, setSelectedDay] = useState(null);
  

  const mapDayToCard = function([...day], value) {
    const date = day.splice(0,1)
    if(day[0]) {
      const jobs = day.filter(jobOfDay => {
        const { job } = jobOfDay;
        return !job.completed
      })
      return (
      <Item sx={{minHeight: 185, maxWidth: 1000}} >
        <Typography color="#DBEAF3" sx={{mt: 3}} variant="h4" component="h4" onClick={(event) => setSelectedDay(value)}>
          {date}
        </Typography>
        <Typography color="#DBEAF3" variant="h5" component="h5" onClick={(event) => setSelectedDay(value)}>
          Jobs Today: {day.length}
        </Typography>
        <Typography color="#DBEAF3" sx={{mb: 5}} variant="h5" component="h6" onClick={(event) => setSelectedDay(value)}>
          Incomplete: {jobs.length}
        </Typography>
      </Item>
        )
    }
    return (
    <Item sx={{minHeight: 185, maxWidth: 1000}} >
      <Typography color="#DBEAF3" variant="h4" component="h4" sx={{mt: 3}}>
        {date}
      </Typography>
      <Typography color="#DBEAF3" variant="h5" component="h5" sx={{mt: 3,mb: 5}}>
        No Jobs Today!
      </Typography>
      
    </Item>)
  }
  const jobsForSelectedDay = function([...day], value) {
    const date = day.splice(0,1)
    if(day[0]) {
      const jobCard = day.map(jobOfDay => {
        const { job, contractOfJob, crewOfJob, packageOfJob, clientOfJob } = jobOfDay;
          return (
          <Card  sx={{justifyContent: "center"}}>
            <Typography className="page-header" color="#DBEAF3" variant="h6">{crewOfJob ? crewOfJob.foreman_name : "Launch A Crew"}</Typography>
            <Box  sx={{ width: '95%', maxWidth: 280, maxHeight: 200, display: 'flex', minHeight: 190}}>
              <JobCard className="card-bg"
              key={job.id}
              packageTitle={packageOfJob.title}
              timeEst={packageOfJob.man_hours_per_visit}
              crewSize={crewOfJob && crewOfJob.crew_size}
              clientName={clientOfJob.name}
              address={contractOfJob.address}
              jobNotes={contractOfJob.job_notes}
              compClass="dashboard-day"
              />
            </Box>
          </Card>
        )
      })
      const jobsForSelectedDay =
        <Card sx={{width: '100%', maxWidth: 1000, maxHeight: 200, display: 'flex', minHeight: 190, mb: 1}}>
           {jobCard}
        </Card>
      return jobsForSelectedDay
    }
    return mapDayToCard([date])
  }

  const createDayCards = function(days, fab) {
    let count = 0;
    return days.map(day => {
      const countListen = count;
      const dayCard = (<div key={countListen}>{(selectedDay === countListen && days[countListen][1]) && fab}
      <Box
        className={`day-${countListen}`}
        sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }}
        onClick={(event) => setSelectedDay(countListen)}
      >
        {selectedDay !== null && countListen === selectedDay ? jobsForSelectedDay(days[countListen], countListen) : mapDayToCard(days[countListen], countListen)}
      </Box>
      </div>);
      count++;
      return dayCard;

    })
  }
  return { selectedDay, setSelectedDay, createDayCards}
}

export default useDashboardDayState;
