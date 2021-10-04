import { useEffect, useState } from "react";
import classNames from 'classnames';
import JobCard from '../../JobCard'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { getThemeProps } from "@mui/system";
import { format } from 'date-fns';


const useDayInfo = function() {
  const [ selectedDay, setSelectedDay ] = useState(null);
  const [ completeState, setCompleteState ] = useState({'0':true})

  let completedInfo = {};
  useEffect(() => {
    setCompleteState(prev => {
      return { ...prev, ...completedInfo  }
    });
  },[selectedDay])


  const dayToCard = function([...day], jobs, crewId) {
    // jobs is state.jobs
    console.log(jobs)
    console.log(crewId)
    const date = day.splice(0, 1);

    if (day[0]) {
      const todayJobsForCrew = jobs.filter(j => {
        console.log('1: ', format(new Date(j.date), 'EEEE, MMM dd yyyy'))
        console.log('2: ', date[0])
        return parseInt(j.crew_id) === parseInt(crewId) && format(new Date(j.date), 'EEEE, MMM dd yyyy') === date[0];
      });
      // todayJobsForCrew is an array of jobs for the crew. currently working, proceed from here
      console.log(todayJobsForCrew)
      const incompleteJobs = todayJobsForCrew.filter(j => !j.complete);
      return (
        <Box>
          <Typography variant="h5" component="h5">
            {date}
          </Typography>
          <Typography variant="h5" component="h5">
          Jobs Today: {todayJobsForCrew.length}
        </Typography>
        <Typography variant="h5" component="h6">
          Incomplete: {incompleteJobs.length}
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
          No jobs booked today
        </Typography>
        
      </Box>)
  }
  
  const jobsForDay = function([...day], markJobCompleted, jobs, crewId) {
    const date = day.splice(0, 1);

    if (day[0]) {
      const jobCard = day.map(jobOfDay => {
        const { job, contractOfJob, crewOfJob, packageOfJob, clientOfJob} = jobOfDay;
        const onMarkJobCompleted = function(jobId) {
          markJobCompleted(jobId)
          .then(res => {
            console.log(res)
            return setCompleteState(prev => {
              return {...prev, [jobId]: true}
            })
          })
        }
        const cardClassNames = classNames("crew-day", {'completed-jobcard': job.completed || completeState[job.id]});
        return (
          <Card>
            <Box sx={{ width: '95%', maxWidth: 500, maxHeight: 300, display: 'flex-start' }}>
              <JobCard
              key={job.id}
              packageTitle={packageOfJob.title}
              timeEst={packageOfJob.man_hours_per_visit}
              crewSize={crewOfJob.crew_size}
              clientName={clientOfJob.name}
              address={contractOfJob.address}
              jobNotes={contractOfJob.job_notes}
              compClass={cardClassNames}
              completed={job.completed}
              completeState={completeState}
              jobId={job.id}
              onMarkCompleted={onMarkJobCompleted}

              />
            </Box>
          </Card>
        )
      })
      return (<Box>{jobCard}</Box>)
    }
    return dayToCard([date], jobs, crewId)
  }
  const newDayCards = function(days, fab, jobs, crewId, markJobCompleted) {
    let count = -1;
    
    for (const day of days) {
      const dayItem = [...day]
      dayItem.splice(0, 1);
      
      if (dayItem[0])
      for (const dayInfo of dayItem) {
        completedInfo = {[dayInfo.job.id]: dayInfo.job.completed}
      }
    }
    

    
    
    return days.map(day => {
      let counting = count;
      counting++;
      const dayCard = (
      <div key={counting}>{selectedDay === counting && fab}
        {selectedDay === null && 
        <Box
          className={`day-${counting}`}
          sx={{ width: '90%', height: '90%', maxHeight: 200, minHeight: 90 }}
          onClick={(event) => setSelectedDay(counting)}
        >
          {dayToCard(days[counting], jobs, crewId)}
        </Box>}
        {selectedDay === counting &&  
        <Stack>
          {jobsForDay(days[counting], markJobCompleted, jobs, crewId)}
        </Stack>}
      </div>);
      count++;
      return dayCard;
    })
  }
  return { selectedDay, setSelectedDay, completeState, setCompleteState, newDayCards }
}
export default useDayInfo;