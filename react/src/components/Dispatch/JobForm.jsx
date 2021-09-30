import { useParams } from 'react-router-dom';
import SpeedDial from '../SpeedDial';
import { useState } from 'react';
import { getInfoForJobForm, getEstTime } from './dispatchDataHelper';
import { addHours, format } from 'date-fns'
import TimePicker from '../Timepicker';
import { Stack, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const JobForm = (props) => {
  const params = useParams(props);
  const { onEdit, crews, packages, contracts, jobs } = props
  const [selectedCrew, setSelectedCrew] = useState(0)
  const [time, setTime] = useState(jobs[params.id] ? new Date(jobs[params.id].date) : new Date())
  if (jobs[params.id]) {
    const info = getInfoForJobForm(jobs, contracts, packages, parseInt(params.id));
    const estTime = getEstTime(info.packageManHours, (selectedCrew ? crews[selectedCrew - 1] : {crew_size: 1}))
    const date = format(new Date(jobs[params.id].date), 'EEE MMM dd yyyy')

    const onSave = function() {
      const endTimeString = addHours(time, estTime)
      const endTime = format(endTimeString, 'hhh')
      const startTime = format(time, 'HH')
      onEdit(selectedCrew, startTime, endTime, info, parseInt(params.id))
    }
    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center'
    }));
    return (
      <Box width={'100%'}>
        <Stack spacing={5} sx={{maxHeight: 800,minHeight: 550, maxWidth: 900, alignItems: 'center', alignContent: 'center', margin: 'auto'}}>
          <Item>
            <Typography variant="h2">
            🚀 Edit Crew For The Job 🚀
            </Typography>
          </Item>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            <Grid item xs={3}>
              <Item sx={{ fontSize: 21}}> Date: {date} </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{ fontSize: 21}}>  Package: {info.packageTitle}  </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{ fontSize: 21}}>  Address: {info.contractAddress}  </Item>
            </Grid>
            <Grid item xs={11}>
              <Item sx={{ fontSize: 21}}>  Job Notes: {info.contractJobNotes}  </Item>
            </Grid>
            <Grid item xs={5.5}>
              <Item sx={{ fontSize: 21}}>  Estimated Time Before Crew Assigned :  {info.packageManHours} Hours   </Item>
            </Grid>
            <Grid item xs={5.5}>
              {estTime > 1 ? <Item sx={{ fontSize: 21}}> Estimated Time After Crew Assigned : 🚀{estTime} Hours🚀 </Item> : estTime <= 1 && <Item sx={{ fontSize: 21}}> Estimated Time After Crew Assigned : 🚀 {estTime} Hour 🚀</Item>}
            </Grid>
        
          </Grid>
          
        

          <Button sx={{maxHeight: 50}} variant="contained" onClick={onSave}>🚀 Launch Crew 🚀</Button>
        </Stack>
        <Item sx={{ maxHeight: 400, maxWidth: 200, alignItems: 'center', alignContent: 'center', margin: 'auto'}}>
            <TimePicker startDate={time} onChange={setTime}/>
            <div>
            <Typography sx={{ fontSize: 200}}>🚀</Typography>
            <SpeedDial crews={crews} onChange={setSelectedCrew} selectedCrew={selectedCrew}/>
            </div>
        </Item>
      </Box>
    );
  }
  return null;
};

export default JobForm;