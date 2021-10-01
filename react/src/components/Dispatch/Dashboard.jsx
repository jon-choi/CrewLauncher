

import { Stack, Box } from '@mui/material';
import useDashboardDayState from './hooks/DashboardHook'


const Dashboard = function(props) {
  const { selectedDay, createDayCards} = useDashboardDayState()
  const { days } = props;
  
  if (days) {

    
    // const [yesterday, today, tomorrow, fourthDay, lastDay] = days;

    
    const dayCards = createDayCards(days);

    return (
      <Stack sx={{margin: 'auto', width: '100%'}} >
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