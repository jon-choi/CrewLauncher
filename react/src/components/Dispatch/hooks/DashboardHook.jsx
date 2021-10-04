import { format, isSameDay } from 'date-fns'
import { useEffect, useState } from "react";

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
  const [completeJob, setJobComplete] = useState({id: {id: 0, complete: true}});
  

  const mapDayToCard = function([...day], value, jobs) {
    const date = day.splice(0,1)
    if(day[0]) {
      const jobs = day.filter(jobOfDay => {
        const { job } = jobOfDay;
        return !job.completed
      })


      return (
      <Item className="font-color" sx={{minHeight: 185, maxWidth: 1000}} >
        <Typography csx={{mt: 3}} variant="h4" component="h4" onClick={(event) => setSelectedDay(value)}>
          {date}
        </Typography>
        <Typography variant="h5" component="h5" onClick={(event) => setSelectedDay(value)}>
          Jobs Today: {day.length}
        </Typography>
        <Typography sx={{mb: 5}} variant="h5" component="h6" onClick={(event) => setSelectedDay(value)}>
          Incomplete: {jobs.length}
        </Typography>
      </Item>
        )
    }
    return (
    <Item className="font-color" sx={{minHeight: 185, maxWidth: 1000}} >
      <Typography variant="h4" component="h4" sx={{mt: 3}}>
        {date}
      </Typography>
      <Typography variant="h5" component="h5" sx={{mt: 3,mb: 5}}>
        No Jobs Today!
      </Typography>
      
    </Item>)
  }

  
  const jobsForSelectedDay = function([...day], crewNames, jobs) {
    const date = day.splice(0,1)
    
    if(day[0]) {
      const dayOfCrews = []
      for (const name in crewNames) {
        let manHours = 0;
        let jobs = 0;
        let incompleteJobs = 0;
        for (const jobInfo of day) {
          if (jobInfo.crewOfJob && name === jobInfo.crewOfJob.foreman_name) {
            jobs++;
            manHours += jobInfo.packageOfJob.man_hours_per_visit;
            (!jobInfo.job.complete && incompleteJobs++);
            dayOfCrews[jobInfo.crewOfJob.foreman_name] = {
              ...dayOfCrews[name],
              crewSize: jobInfo.crewOfJob.crew_size
            }
          }
          if (name === "noCrew") {
            jobs++;
            manHours += jobInfo.packageOfJob.man_hours_per_visit;
            (!jobInfo.job.complete && incompleteJobs++);
          }

          dayOfCrews[name] = {
            ...dayOfCrews[name],
            incompleteJobs,
            manHours,
            name,
            jobs
          }
        }
      }
      console.log("object Array", dayOfCrews)
      const jobCard = dayOfCrews.map(crewName => {
        
        const { crewSize, incompleteJobs, manHours, jobs, name } = crewName;
        console.log(crewName)
        return (
          <Card  sx={{justifyContent: "center"}}>
            <Typography className="page-header" color="#DBEAF3" variant="h6">{crewSize ? name: "Launch A Crew"}</Typography>
            <Box  sx={{ width: '95%', maxWidth: 280, maxHeight: 200, display: 'flex', minHeight: 190}}>
              <JobCard
              key={name}
              timeEst={manHours}
              crewSize={crewSize}
              incompleteJobs={incompleteJobs}
              jobs={jobs}
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


  const createDayCards = function(days, fab, crewNames, jobs) {
    let count = 0;
    const [ yesterday, today, tomorrow, fourthDay, lastDay ] = days;
    const filterJobs = jobs.filter(job => {
      const date = format(new Date(job.date),'EEEE, MMM dd yyyy')
      if(date === yesterday[0] || date === today[0] || date === tomorrow[0] || date === fourthDay[0] || date === lastDay[0]) {
        return true;
      }
      return false;
    });
    console.log(filterJobs)
    // setState Right Here
    // setJobComplete(prev => {
    //   return {...prev}
    // })
    

    return days.map(day => {
      const countListen = count;
      const dayCard = (<div alignSelf="center" key={countListen}>{(selectedDay === countListen && days[countListen][1]) && fab}
      <Box
        className={`day-${countListen}`}
        sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }}
        onClick={(event) => setSelectedDay(countListen)}
      >
        {selectedDay !== null && countListen === selectedDay ? jobsForSelectedDay(days[countListen], crewNames, jobs) : mapDayToCard(days[countListen], countListen, jobs)}
      </Box>
      </div>);
      count++;
      return dayCard;

    })
  }
  return { selectedDay, setSelectedDay, createDayCards}
}

export default useDashboardDayState;
