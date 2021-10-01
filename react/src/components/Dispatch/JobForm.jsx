import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getInfoForJobForm, getEstTime } from './dispatchDataHelper';
import { addHours, format, isAfter, isBefore, setHours } from 'date-fns'
import { Stack, Box, Button, Typography, Alert, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import SpeedDial from '../SpeedDial';
import TimePicker from '../Timepicker';

const JobForm = (props) => {
  const params = useParams(props);
  const browserHistory = useHistory();

  const { onEdit, crews, packages, contracts, jobs } = props

  const [selectedCrew, setSelectedCrew] = useState(job ? job.crewId : 0)
  const [time, setTime] = useState(new Date())
  const [status, setStatus] = useState({error: false, success: false, message:""});
  const [error, setError] = useState([]);

  
  const errorMessage = [];
  const job = getInfoForJobForm(jobs, contracts, packages, parseInt(params.id));

  useEffect(() => {
    setSelectedCrew(job.crewId)
  },[selectedCrew])
  
  if (jobs[params.id]) {

    const estTime = getEstTime(job.packageManHours, (selectedCrew ? crews[selectedCrew - 1] : {crew_size: 1}))
    const date = format(new Date(job.date), 'EEE MMM dd yyyy')

    const validate = function(time, selectedCrew) {
      if (isAfter(new Date(time), setHours(new Date(time), 6)) && isBefore(new Date(time), setHours(new Date(time), 18)) && selectedCrew) {
        return save(time, selectedCrew)
      }else if (!selectedCrew) {
        errorMessage.push('Select A Crew To Launch!');
      } else {
        errorMessage.push('Select A Time For Launch!');
      }
      setTimeout(() =>{
        setError([])
      }, 3000)
      setError(errorMessage);
    }

    const save = function(time, selectedCrew) {
      const endTimeString = addHours(time, estTime)
      const endTime = format(endTimeString, 'hhh')
      const startTime = format(time, 'HH')
      onEdit(selectedCrew, startTime, endTime, job, parseInt(params.id))
      .then((response) => {
        setStatus({error: false, success: true, message: "Crew Launched successfully!"})
        setTimeout(() => browserHistory.push('/dispatch'), 1500);
      })
      .catch((err) => { 
          setStatus({ success: false, error: true, message: "Failure To Liftoff!"});
      })
    }
    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center'
    }));
    return (
      <Box width={'100%'}>
        <Snackbar open={status.success || status.error} autoHideDuration={6000} onClose={() => setStatus({success: false, error: false, message: ""})}>
          <Alert onClose={() => setStatus({success: false, error: false, message: ""})}
           severity={status.error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {status.message}
          </Alert>
        </Snackbar>
        <Stack spacing={5} sx={{maxHeight: 800,minHeight: 550, maxWidth: 900, alignItems: 'center',  margin: 'auto'}}>
          <Item>
            <Typography variant="h2">
            🚀 Edit Crew For The Job 🚀
            </Typography>
          </Item>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{justifyContent: 'center'}}>

            <Grid item xs={3}>
              <Item sx={{ fontSize: 21}}> Date: {date} </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{ fontSize: 21}}>  Package: {job.packageTitle}  </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{ fontSize: 21}}>  Address: {job.contractAddress}  </Item>
            </Grid>
            <Grid item xs={11}>
              <Item sx={{ fontSize: 21}}>  Job Notes: {job.contractJobNotes}  </Item>
            </Grid>
            <Grid item xs={5.5}>
              <Item sx={{ fontSize: 21}}>  Estimated Time Before Crew Assigned :  {job.packageManHours} Hours   </Item>
            </Grid>
            <Grid item xs={5.5}>
              {estTime > 1 ? <Item sx={{ fontSize: 21}}> Estimated Time After Crew Assigned : 🚀{estTime} Hours🚀 </Item> : estTime <= 1 && <Item sx={{ fontSize: 21}}> Estimated Time After Crew Assigned : 🚀 {estTime} Hour 🚀</Item>}
            </Grid>
        
          </Grid>
          
          {error.length > 0 && <Alert severity="error">{`${error.join(', ')}`}</Alert>}

          <Button sx={{maxHeight: 50}} variant="contained" onClick={() => {validate(time, selectedCrew)}}>🚀 Launch Crew 🚀</Button>
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