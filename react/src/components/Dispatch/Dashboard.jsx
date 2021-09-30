

import Stack from '@mui/material/Stack';
import useDayState from './hooks/DashboardHook'


const Dashboard = function(props) {
  const { selectedDay, createDayCards} = useDayState()
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
    <>
      {`${days}`}
    </>
  );
}

export default Dashboard;