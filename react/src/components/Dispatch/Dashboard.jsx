import { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Dashboard = function(props) {
  const { days } = props;
  const [selectedDay, setSelectedDay] = useState(null);
  if (days) {
    const [yesterday, today, tomorrow, fourthDay, lastDay] = days;

    let jobCard;

    console.log(yesterday)
    if (selectedDay) {
      jobCard = selectedDay.map(jobOfDay => {
        const { job, contractOfJob, crewOfJob, packageOfJob, clientOfJob } = jobOfDay;
       return null
      })
    }
    const mapDayToCard = function([...day]) {
      const date = day.splice(0,1)
      if(day[0]) {
        const jobs = day.filter(jobOfDay => {
          const { job } = jobOfDay;
          return !job.completed
        })
        return (
        <Box>
          <Typography variant="h4" component="h4">
            {date}
          </Typography>
          <Typography variant="h5" component="h5">
            Jobs Today: {day.length}
          </Typography>
          <Typography variant="h5" component="h6">
            Incomplete: {jobs.length}
          </Typography>
        </Box>
          )
      }
      return (
      <Box>
        <Typography variant="h4" component="h4">
          {date}
        </Typography>
        <Typography variant="h5" component="h5">
          No Jobs Today!
        </Typography>
        
      </Box>)
    }

    return ( 
    <>
      <h1>Dashboard</h1>

        <Box className="day-yesterday" sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }} onClick={() => setSelectedDay(yesterday)}>
          {yesterday === selectedDay ? jobCard : mapDayToCard(yesterday)}
        </Box>

        <Box className="day" sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }} onClick={() => setSelectedDay(today)}>
          {today === selectedDay ? jobCard : mapDayToCard(today)}
        </Box>

        <Box className="day" sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }} onClick={() => setSelectedDay(tomorrow)}>
          {tomorrow === selectedDay ? jobCard : mapDayToCard(tomorrow)}
        </Box>

        <Box className="day" sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }} onClick={() => setSelectedDay(fourthDay)}>
          {fourthDay === selectedDay ? jobCard : mapDayToCard(fourthDay)}
        </Box>

        <Box className="day" sx={{ width: '100%', height: '100%', maxHeight: 300, minHeight: 190 }} onClick={() => setSelectedDay(lastDay)}>
          {lastDay === selectedDay ? jobCard : mapDayToCard(lastDay)}
        </Box>

    </>
    )
  }
  return (
    <>
      {`${days}`}
    </>
  );
}

export default Dashboard;