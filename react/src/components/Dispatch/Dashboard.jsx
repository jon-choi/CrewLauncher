

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

    // return ( 
    // <>
    //   <h1>Dashboard</h1>

    //     <Box className="day-yesterday" sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }} onClick={() => setSelectedDay(yesterday)}>
    //       {yesterday === selectedDay ? jobsForSelectedDay(selectedDay) : mapDayToCard(yesterday)}
    //     </Box>

    //     <Box className="day" sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }} onClick={() => setSelectedDay(today)}>
    //       {today === selectedDay ? jobsForSelectedDay(selectedDay)  : mapDayToCard(today)}
    //     </Box>

    //     <Box className="day" sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }} onClick={() => setSelectedDay(tomorrow)}>
    //       {tomorrow === selectedDay ? jobsForSelectedDay(selectedDay)  : mapDayToCard(tomorrow)}
    //     </Box>

    //     <Box className="day" sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }} onClick={() => setSelectedDay(fourthDay)}>
    //       {fourthDay === selectedDay ? jobsForSelectedDay(selectedDay)  : mapDayToCard(fourthDay)}
    //     </Box>

    //     <Box className="day" sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }} onClick={() => setSelectedDay(lastDay)}>
    //       {lastDay === selectedDay ? jobsForSelectedDay(selectedDay)  : mapDayToCard(lastDay)}
    //     </Box>

    // </>
    // )
  }
  return (
    <>
      {`${days}`}
    </>
  );
}

export default Dashboard;