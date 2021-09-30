import Stack from '@mui/material/Stack';
import useDayInfo from '../Dispatch/hooks/CrewsIndexHook';


const CrewDashboard = function(props) {
  const { selectedDay, newDayCards } = useDayInfo()
  const { days } = props;
  
  if (days) {

    
    // const [yesterday, today, tomorrow, fourthDay, lastDay] = days;

    
    const dayCards = newDayCards(days);

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

export default CrewDashboard;