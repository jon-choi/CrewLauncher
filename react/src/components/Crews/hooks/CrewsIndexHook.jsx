import { useEffect, useState } from "react";
import JobCard from '../../JobCard'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { getThemeProps } from "@mui/system";


const useDayInfo = function() {
  const [ selectedDay, setSelectedDay ] = useState(null);
  const [ completeState, setCompleteState ] = useState({'0':true})

  let completedInfo = {};
  useEffect(() => {
    setCompleteState(prev => {
      return { ...prev, ...completedInfo  }
    });
  },[selectedDay])

  const dayToCard = function([...day], value) {
    const date = day.splice(0, 1);
    if (day[0]) {
      const jobs = day.filter(dayInfo => {
        const { job } = dayInfo;
        
        return !job.completed;
      })

      

      return (
        <Box>
          <Typography variant="h5" component="h5">
            {date}
          </Typography>
          <Typography variant="h5" component="h5">
          Jobs Today: {day.length}
        </Typography>
        <Typography variant="h5" component="h6">
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
          Rocket Jobs all day 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
        </Typography>
        
      </Box>)
  }
  
  const jobsForDay = function([...day], value, markJobCompleted) {
    const date = day.splice(0, 1);

    if (day[0]) {
      const jobCard = day.map(jobOfDay => {
        const { job, contractOfJob, crewOfJob, packageOfJob, clientOfJob} = jobOfDay;
        const onMarkJobCompleted = function() {
          markJobCompleted(job.job.id)
          .then(res => {
            console.log(res)
            return setCompleteState(prev => {
              return {...prev, [job.id]: true}
            })
          })
        }
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
              compClass="crew-day"
              completed={job.completed}
              jobId={job.id}
              onMarkCompleted={onMarkJobCompleted}

              />
            </Box>
          </Card>
        )
      })
      return (<Box>{jobCard}</Box>)
    }
    return dayToCard([date])
  }
  const newDayCards = function(days, fab, markJobCompleted) {
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
          {dayToCard(days[counting], counting)}
        </Box>}
        {selectedDay === counting &&  
        <Stack>
          {jobsForDay(days[counting], counting, markJobCompleted)}
        </Stack>}
      </div>);
      count++;
      return dayCard;
    })
  }
  return { selectedDay, setSelectedDay, completeState, setCompleteState, newDayCards }
}
export default useDayInfo;