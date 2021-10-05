
import { useEffect, useState } from "react";

import DashboardJobCard from '../DashboardJobCard'

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
  const [completeJob, setCompleteJob] = useState({"date": {incomplete: 0, jobs: 0}});

  

  const mapDayToCard = function([...day], value, jobs) {
    const date = day.splice(0,1)[0]
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
          Jobs Today: {completeJob[date] && completeJob[date].jobs}
        </Typography>
        <Typography sx={{mb: 5}} variant="h5" component="h6" onClick={(event) => setSelectedDay(value)}>
          Incomplete: {completeJob[date] && completeJob[date].incomplete}
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

  
  const jobsForSelectedDay = function([...day], crewNames, jobs, fab, count) {
    const date = day.splice(0,1)
    
    if(day[0]) {
      const dayOfCrews = []
      for (const name in crewNames) {
        let manHours = 0;
        let jobsCount = 0;
        let incompleteJobs = 0;
        const crewSize = crewNames[name].crewSize
        for (const jobInfo of day) {
          if (jobInfo.crewOfJob && name === jobInfo.crewOfJob.foreman_name) {
            jobs++;
            manHours += jobInfo.packageOfJob.man_hours_per_visit;
            (!jobInfo.job.complete && incompleteJobs++);
          }
          if (name === "noCrew") {
            jobs++;
            manHours += jobInfo.packageOfJob.man_hours_per_visit;
            (!jobInfo.job.complete && incompleteJobs++);
          }
        }
        dayOfCrews.push({
          ...dayOfCrews[name],
          crewSize,
          incompleteJobs,
          manHours,
          name,
          jobsCount
        })
      }
      const jobCard = dayOfCrews.map(crewName => {
        
        const { crewSize, incompleteJobs, manHours, jobsCount, name } = crewName;
        return (
          <Card className="page-header" sx={{justifyContent: "center"}}>
            <Typography className="page-header" color="#DBEAF3" variant="h6">{crewSize ? name : "Launch A Crew"}</Typography>
            <Box   sx={{ width: '95%', maxWidth: 280, maxHeight: 200, display: 'flex', minHeight: 190, minWidth: 225, justifyContent: "center"}}>
              <DashboardJobCard 
              key={name}
              timeEst={manHours}
              crewSize={crewSize}
              incompleteJobs={incompleteJobs}
              jobs={jobs}
              compClass="dashboard-day"
              date={date[0]}
              jobsCount={jobsCount}
              setCompleteJobState={completeJob}
              selectedDay={selectedDay}
              />
            </Box>
          </Card>
        )
      })
      const jobsForSelectedDay =
        <Card sx={{width: '100%', maxWidth: 1000, maxHeight: 200, display: 'flex', minHeight: 190, mb: 1, flexWrap: "wrap", justifyContent: "center"}}>
           {jobCard}
        </Card>
      return jobsForSelectedDay
    }
    return mapDayToCard([date])
  }


  const createDayCards = function(days, fab, crewNames, jobs) {
    let count = 0;
    

    return days.map(day => {
      const countListen = count;
      const dayCard = (<div alignSelf="center" key={countListen}>
      <Box
        className={`day-${countListen}`}
        sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }}
        onClick={(event) => setSelectedDay(countListen)}
      >
        {selectedDay !== null && countListen === selectedDay ? jobsForSelectedDay(days[countListen], crewNames, jobs, fab, countListen) : mapDayToCard(days[countListen], countListen, jobs)}
      </Box>
      {(selectedDay === countListen && days[countListen][1]) && <div style={{position: "relative", width: 0, height: 0}} >{fab}</div>}
      </div>);
      count++;
      return dayCard;

    })
  }
  return { selectedDay, setSelectedDay, createDayCards, setCompleteJob}
}

export default useDashboardDayState;
