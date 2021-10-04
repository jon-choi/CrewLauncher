
import { useParams, Link } from 'react-router-dom'
import useDayInfo from './hooks/CrewsIndexHook';
import { Stack, Box, Grid, Fab, Button, Card } from '@mui/material';


const CrewDashboard = function(props) {
  const { selectedDay, setSelectedDay, completeState, setCompleteState, newDayCards } = useDayInfo()
  const { days, markJobCompleted, jobs } = props;
  
  const id = useParams().id;
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

    
    const dayCards = newDayCards(days, fab, jobs, id, markJobCompleted);

    return (
    <div>
    <Button sx={{mt: 5}} component={Link} to={`${id}/jobs`}>
          Go to Launch Info
          </Button>
      
      <Stack sx={{margin: 'auto', width: '100%'}} >
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