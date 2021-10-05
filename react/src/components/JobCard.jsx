import { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography, Fab, Paper, styled } from '@mui/material';

export default function JobCard(props) {
  const { packageTitle, timeEst, clientName, address, jobNotes, jobId, completeState, completed, onMarkCompleted, crewSize, compClass, jobs } = props;
  const { rerender, setRerender } = props;
  const [jobComplete, setJobComplete] = useState(jobs.filter(j => j.id === jobId)[0].complete)
  console.log("jobComplete:", jobComplete)
  useEffect(() => {
    console.log('completed Jobs in jobcard', jobs.filter(j => j.completed))
    const thisJob = jobs.filter(j => j.id === jobId)[0];
    console.log('this job: ', thisJob)
    setJobComplete(thisJob);

    const doRerender = setTimeout(()=> {
      setRerender(!rerender)
      console.log( "render")
    }, 3000)
    return clearTimeout(doRerender)
  }, [jobs, jobId, rerender]);


  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center'
  }));
  const crewTimeEst = crewSize ? parseFloat(timeEst / crewSize).toFixed(2) : timeEst; 
  return (
  <Card className={compClass} sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>     
    <CardContent sx={{display: 'flex'}}>
      <div sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
        <Typography variant="h4" component="div">
          {packageTitle}
        </Typography>
        <Typography variant="h4">
          {`Approx: ${crewTimeEst} hrs`}
        </Typography>
      </div>
    </CardContent>
    <CardContent>
      <Typography  sx={' font-size: 5000; mt: 1.5; '} color="text.secondary">
        {clientName}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {address}
      </Typography>
      <Typography variant="body2">
        {`Notes: ${jobNotes}`}
      </Typography>
    </CardContent>
    {jobComplete && jobComplete.completed && <Typography>Completed! {jobComplete.completed}</Typography>}
    
    <CardActions>

    {!jobComplete && <Button onClick={() => >Mark Completed</Button>}

    {jobComplete && !jobComplete.completed && <Button onClick={() => {onMarkCompleted(jobId).then((res) => {setRerender(!rerender)})}}>Mark Completed</Button>}

    </CardActions>
  </Card>
);
}