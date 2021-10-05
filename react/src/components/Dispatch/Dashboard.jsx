
import { format, isSameDay } from 'date-fns'
import { Stack, Box, Grid, Button } from '@mui/material';
import { useEffect } from 'react';
import useDashboardDayState from './hooks/DashboardHook'
import { getCrewNames } from './dispatchDataHelper'


const Dashboard = function(props) {
  const { selectedDay, setSelectedDay, setCompleteJob, createDayCards} = useDashboardDayState()
  const { days, crews, jobs } = props;

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
    if ((date === yesterday[0] || date === today[0] )|| (date === tomorrow[0] || date === fourthDay[0]) || date === lastDay[0]) {
     
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
  }, [selectedDay, jobs]);
  

  if (days) {
    const fab = (<Button variant="contained"
      onClick={() => {
        setSelectedDay(null)
  
        }} sx={{
          position: 'absolute',
          left: 905,
          bottom: 8.5
        }}>Finish</Button>
      );
  
  
  
  const crewNames = (getCrewNames(crews))

  
    
    // const [yesterday, today, tomorrow, fourthDay, lastDay] = days;

    
    const dayCards = createDayCards(days, fab, crewNames, jobs);


    return (
      <Stack className='dispatch-dashboard-stack' >
        {dayCards}
      </Stack>

    )
  }
  return (
    <Stack className='dispatch-dashboard-stack'  sx={{width: '100%'}} >
      {`${days}`}
    </Stack>
  );
}

export default Dashboard;