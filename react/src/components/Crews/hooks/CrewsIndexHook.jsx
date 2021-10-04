import { useEffect, useState } from "react";
import classNames from 'classnames';
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

  const dayToCard = function([...day], incompleteJobs) {
    const date = day.splice(0, 1);
    if (day[0]) {
    
      
      

      return (
        
          <Card className="page-header" sx={{mb: 2, mt: 2}}>
            <Typography className="font-color">
          <Typography variant="h5" component="h5">
            {date}
          </Typography>
          <Typography variant="h5" component="h5">
          Jobs Today: {day.length}
        </Typography>
        <Typography variant="h5" component="h6">
          Incomplete: {incompleteJobs}
        </Typography>
        </Typography>
        </Card>
        
      )
    }
    return (
      
        <Card className="page-header">
          <Typography className="font-color">
        <Typography variant="h4" component="h4">
          {date}
        </Typography>
        <Typography variant="h5" component="h5">
          No Jobs! 🚀
        </Typography>
        </Typography>
        </Card>
      )
  }
  
  const jobsForDay = function([...day], markJobCompleted) {
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
          <Card sx={{ minWidth: 200, justifyContent: 'center'}}>
            
              <JobCard sx={{ width: '100%', maxHeight: 300, display: 'flex'}}
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
    
    const incompleteJobs = Object.values(completeState).reduce((prev, current) => prev += !current,0);
    
    
    return days.map(day => {
      let counting = count;
      counting++;
      const dayCard = (
      <div className='dayCard-container' sx={{alignSelf: 'center'}} key={counting}>{selectedDay === counting && fab}
        {selectedDay === null && 
        <Box
          className={`day-${counting}`}
          sx={{ width: '100%', height: '90%', maxHeight: 200, minHeight: 90 }}
          onClick={(event) => setSelectedDay(counting)}
        >
          {dayToCard(days[counting], incompleteJobs)}
        </Box>}
        {selectedDay === counting &&  
        <Stack>
          {jobsForDay(days[counting], markJobCompleted)}
        </Stack>}
      </div>);
      count++;
      return dayCard;
    })
  }
  return { selectedDay, setSelectedDay, completeState, setCompleteState, newDayCards }
}
export default useDayInfo;