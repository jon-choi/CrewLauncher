 
import { useState } from "react";

import JobCard from '../../JobCard'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

 const useDayState = function() {
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

  const createDayCards = function(days) {
    let count = 0;
    return days.map(day => {
      const countListen = count;
      const dayCard = (<Box
        className={`day-${countListen}`}
        sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }}
        onClick={(event) => setSelectedDay(countListen)}
      >
        {selectedDay !== null && countListen === selectedDay ? jobsForSelectedDay(days[countListen], countListen) : mapDayToCard(days[countListen], countListen)}
      </Box>
      );
      count++;
      return dayCard;

    })
  }
  return { selectedDay, createDayCards}
}

export default useDayState;
