import { useState } from "react";

import JobCard from '../../JobCard'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const useDayInfo = function() {
  const [ selectedDay, setSelectedDay ] = useState([{}]);

  const dayToCard = function([...day], value) {
    const date = day.splice(0, 1);

    if (day[0]) {
      const jobs = day.filter(jobOfDay => {
        const { job } = jobOfDay;
        return !job.completed;
      })
      return (
        <Box>
          <Typography variant="h5" component="h5" onClick={(event) => setSelectedDay(value)}>
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
  
  const jobsForDay = function([...day], value) {
    const date = day.splice(0, 1);

    if (day[0]) {
      const jobCard = day.map(jobOfDay => {
        const { job, contractOfJob, crewOfJob, packageOfJob, clientOfJob } = jobOfDay;

        return (
          <Stack>
            <Typography variant="h6">{clientOfJob.name}</Typography>
            <Box sx={{ width: '80%', maxWidth: 250, maxHeight: 100, display: 'flex' }}>
              <JobCard
              key={job.id}
              packageTitle={packageOfJob.title}
              timeEst={packageOfJob.man_hours_per_visit}
              clientName={clientOfJob.name}
              address={contractOfJob.address}
              jobNotes={contractOfJob.job_notes}
              compClass="crew-day"
              />
            </Box>
          </Stack>
        )
      })
      const jobsForDay = 
      <Box>
        {jobCard}
      </Box>
      return jobsForDay
    }
    return dayToCard([date])
  }
  const newDayCards = function(days) {
    let count = 0;
    return days.map(day => {
      const counting = count;
      const dayCard = (<Box
        className={`day-${counting}`}
        sx={{ width: '90%', height: '90%', maxHeight: 200, minHeight: 90 }}
        onClick={(event) => setSelectedDay(counting)}
        >
          {selectedDay !== null && counting === selectedDay ? jobsForDay(days[counting], counting) : dayToCard(days[counting], counting)}
        </Box>
        );
        count++;
        return dayCard;
    })
  }
  return { selectedDay, newDayCards }
}
export default useDayInfo;