
import useDayInfo from './hooks/CrewsIndexHook';
import { Stack, Box, Grid, Fab } from '@mui/material';


const CrewDashboard = function(props) {
  const { selectedDay, setSelectedDay, newDayCards } = useDayInfo()
  const { days } = props;
  
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

    
    const dayCards = newDayCards(days, fab);

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