
import { format, isSameDay } from 'date-fns'
import { Stack, Box, Grid, Fab } from '@mui/material';
import { useEffect } from 'react';
import useDashboardDayState from './hooks/DashboardHook'
import { getCrewNames } from './dispatchDataHelper'


const Dashboard = function(props) {
  const { selectedDay, setSelectedDay, setJobComplete, createDayCards} = useDashboardDayState()
  const { days, crews, jobs } = props;

  const [ yesterday, today, tomorrow, fourthDay, lastDay ] = days;
  const filterJobs = jobs.filter(job => {
    const date = format(new Date(job.date),'EEEE, MMM dd yyyy')
    if(date === yesterday[0] || date === today[0] || date === tomorrow[0] || date === fourthDay[0] || date === lastDay[0]) {
      return true;
    }
    return false;
  });
  const reducedJobs = filterJobs.reduce((prev, current) => ({...prev, [current.id]: {id: [current.id][0], completed: [current.completed][0]}}), {})
  
  useEffect(() => {
    setJobComplete(prev => {
      return {...prev, ...reducedJobs}
    })
  }, [])
  
  
  const crewNames = (getCrewNames(crews))

  if (days) {
    const fab = (<Fab variant="extended"
    onClick={() => {
      setSelectedDay(null)

      }} sx={{
        position: 'absolute',
        top: 100,
        right: 450,
      }}>Finish</Fab>
    );
    
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