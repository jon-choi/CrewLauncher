

import { Stack, Box, Grid, Fab } from '@mui/material';
import { useEffect } from 'react';
import useDashboardDayState from './hooks/DashboardHook'


const Dashboard = function(props) {
  const { selectedDay, setSelectedDay, createDayCards} = useDashboardDayState()
  const { days } = props;
  

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

    
    const dayCards = createDayCards(days, fab);


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