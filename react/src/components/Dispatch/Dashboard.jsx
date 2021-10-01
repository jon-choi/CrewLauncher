

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
        position: 'sticky',
        top: 16,
        left: 850,
      }}>Finish</Fab>
    );
    
    // const [yesterday, today, tomorrow, fourthDay, lastDay] = days;

    
    const dayCards = createDayCards(days, fab);


    return (
      <Stack sx={{ mb: 2, mt: 2, width: '100%', justifyContent: "center"}} >
        {dayCards}
      </Stack>

    )
  }
  return (
    <Box width={'100%'}>
      {`${days}`}
    </Box>
  );
}

export default Dashboard;