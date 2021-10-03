

import { Stack, Box, Grid, Fab } from '@mui/material';
import { useEffect } from 'react';
import useDashboardDayState from './hooks/DashboardHook'
import { getCrewNames } from './dispatchDataHelper'


const Dashboard = function(props) {
  const { selectedDay, setSelectedDay, createDayCards} = useDashboardDayState()
  const { days, crews } = props;
  
  const crewNames = (getCrewNames(crews))

  if (days) {
    const fab = (<Fab variant="extended"
    onClick={() => {
      setSelectedDay(null)

      }} sx={{
        position: 'sticky',
        top: 150,
        left: 500,
      }}>Finish</Fab>
    );
    
    // const [yesterday, today, tomorrow, fourthDay, lastDay] = days;

    
    const dayCards = createDayCards(days, fab, crewNames);


    return (
      <Stack sx={{ mb: 2, mt: 2, width: '100%', justifyContent: 'center', ml: 58}} >
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