
import { useParams, Link } from 'react-router-dom'
import useDayInfo from './hooks/CrewsIndexHook';
import { Stack, Box, Grid, Fab, Button, Card } from '@mui/material';
import { useEffect } from 'react';
import { format } from 'date-fns';


const CrewDashboard = function(props) {
  
  const crewId = useParams().id;
  const { selectedDay, setSelectedDay, completeState, setCompleteState, newDayCards, completeJob, setCompleteJob } = useDayInfo()
  const { days, markJobCompleted, jobs } = props;
  
  const [ yesterday, today, tomorrow, fourthDay, lastDay ] = days;

  let reducedJobs = {
    [yesterday[0]]: {jobs: 0,incomplete: 0},
    [today[0]]: {jobs: 0,incomplete: 0},
    [tomorrow[0]]: {jobs: 0,incomplete: 0},
    [fourthDay[0]]: {jobs: 0,incomplete: 0},
    [lastDay[0]]: {jobs: 0,incomplete: 0}
  };
  for (const job of jobs) {
    const date = format(new Date(job.date),'EEEE, MMM dd yyyy')
    if (parseInt(job.crew_id) === parseInt(crewId) && (date === yesterday[0] || date === today[0] || date === tomorrow[0] || date === fourthDay[0] || date === lastDay[0])) {
      reducedJobs[date].jobs += 1;
      if (!job.completed) {
        reducedJobs[date].incomplete += 1;
      }
    }
  }

  useEffect(() => {
    setCompleteJob(prev => {
      return {...reducedJobs}
    })
  }, [jobs, selectedDay])

  // useEffect(() => {
  //   const completedJobs = jobs.filter(j => j.completed);
  //   console.log('completedJobs: ', completedJobs)
  // },[jobs]);

  if (days) {
    const fab = (<Fab variant="extended"
    onClick={() => {
      setSelectedDay(null)

      }} sx={{
        position: 'sticky',
        top: 16,
        left: 850,
      }}>Close</Fab>
    );

    
    // const [yesterday, today, tomorrow, fourthDay, lastDay] = days;

    
    const dayCards = newDayCards(days, fab, jobs, crewId, markJobCompleted);

    return (
    <div width='100%'>
    <Button className="page-header" sx={{mt: 5.5, border: '0.5px solid black', color: '#dbeaf3'}} component={Link} to={`${crewId}/jobs`}>
          Go to Launch Info
          </Button>
      <Stack sx={{margin: 'auto', width: '100%', mt: 2}} >
        {dayCards}        
      </Stack>
      </div>
    
    )
  }
  return (
    <>
      {days}
    </>
  );
}

export default CrewDashboard;