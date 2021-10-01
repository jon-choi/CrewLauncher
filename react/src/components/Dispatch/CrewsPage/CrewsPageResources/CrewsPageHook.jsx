 
import { useState } from "react";

import Card from '@mui/material/Card';
import { Stack, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';


import { createBodyItems, createSelectedDayCard } from './crewsPageHelpers'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center'
}));

const useCrewsPageDayState = function() {
  const [selectedDay, setSelectedDay] = useState(null);
  
  const createCards = function(days) {

    let count = -1;

      const dayCardMap = days.map(day => {
        count++;
        const countListen = count;
        return (<div key={countListen}>
          {selectedDay === null &&
          <Card
          sx={{display: 'flex', justifyContent: 'center', minHeight: 200}}
          className={`day-${countListen}`}
          >
            {day[1] ?
            <Item onClick={(event) => setSelectedDay(countListen)}>
            <CardContent sx={{minWidth: 200 }} >
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                {day[0]}
              </Typography>
              {createBodyItems(day, countListen)}
            </CardContent>
            </Item>
            :
            <Item >
            <CardContent sx={{minWidth: 200 }} >
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                {day[0]}
              </Typography>
              {createBodyItems(day, countListen)}
            </CardContent>
            </Item>}
          </Card>}
          {selectedDay === countListen && createSelectedDayCard(days[selectedDay])}
          </div>
        )
      })
      return dayCardMap
  }

  return { selectedDay, setSelectedDay, createCards}
}

export default useCrewsPageDayState;

{/* <Grid container rowSpacing={4} columnSpacing={{ xs: 10, sm: 10, md: 10 }}>
                <Grid item container>
                    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
                    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 200, mb: 5 }}></CrewCard>
                 </Grid>
                <Grid item container>
                    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
                    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 200, mb: 5 }}></CrewCard>
                </Grid>
                <Grid item container>
                    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
                    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 500 }}></CrewCard>
                </Grid> 
            </Grid> */}