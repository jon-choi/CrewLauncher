import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Stack, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import useCrewsPageDayState from './CrewsPageHook';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center'
}));

const CrewCard = (props) => {
  const { days } = props;
  const { selectedDay, setSelectedDay, createCrewCards } = useCrewsPageDayState()
 
  if (days) {

    const createBodyItems = function([...day], value) {
      console.log(value)
      const date = day.splice(0,1)
      if (day[0]) {
        return day.map(job => {
          return (<div key={value}>
          <Typography variant="h6" color="text.primary" gutterBottom >
            Job Info: 

          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
            {job.clientOfJob.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
            {job.contractOfJob.address}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
            {job.job.completed ? "Complete!" : "Not Complete"}
          </Typography>
        </div>)
        });
      }
      return(<>
        <Typography variant="h6" color="text.primary" gutterBottom>
          No Jobs!
        </Typography>
      </>)
    }
    const createSelectedDayCard = function([...day]) {
      console.log("click", day)
      return null
    }
    const createCards = function(days) {

      let count = -1;

        const dayCardMap = days.map(day => {
          count++;
          const countListen = count;
          return (<div key={countListen}>
            {selectedDay === null &&
            <Card
            sx={{display: 'flex', justifyContent: 'center', minHeight: 175, minWidth: 40}}
            className={`day-${countListen}`}
            onClick={(event) => setSelectedDay(countListen)}
            >
              <Item>
              <CardContent onClick={(event) => setSelectedDay(countListen)}>
                <Typography onClick={(event) => setSelectedDay(countListen)} sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                  {day[0]}
                </Typography>
                {createBodyItems(day, countListen)}
              </CardContent>
              </Item>
            </Card>}
            {selectedDay && createSelectedDayCard(days[selectedDay])}
            </div>
          )
        })
        return dayCardMap
    }
    const cards = createCards(days)

    return ( <Card sx="display: flex; justify-content: center; align-items: flex-start;">{cards}</Card>)
  }
  return (
    <Card sx="display: flex; justify-content: center; align-items: flex-start;">
    {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100, mb: 4, ml: 20, mt: 10 }} />
    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" sx={{ width: 100, height: 100, mb: 4, ml: 20, mt: 10 }} /> */}
      <Card sx={{display: 'flex', justifyContent: 'center', minHeight: 175}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Yesterday
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
      </Card>

      <Card sx={{display: 'flex', justifyContent: 'center', minHeight: 175}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Today
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{display: 'flex', justifyContent: 'center', minHeight: 175}}>
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Tomorrow
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{display: 'flex', justifyContent: 'center', minHeight: 175}}>
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          The day after tomorrow
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>
    
    <Card sx={{display: 'flex', justifyContent: 'center', minHeight: 175}}>
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Two days after tomorrow
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>
    </Card>

    

    // <h1>/dispatch/crews
    //   Card
    // </h1>
  )
};

export default CrewCard;