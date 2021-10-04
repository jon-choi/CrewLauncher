import { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography, Fab, Paper, styled } from '@mui/material';

export default function JobCard(props) {
  const { packageTitle, timeEst, clientName, address, jobNotes, jobId, completeState, completed, onMarkCompleted, crewSize, compClass, jobs } = props;
  const [rerender, setRerender] = useState(true);
  const [jobComplete, setJobComplete] = useState(jobs.filter(j => j.id === jobId)[0].complete)
  
  useEffect(() => {
    
    const thisJob = jobs.filter(j => j.id === jobId);
    setJobComplete(thisJob);
  }, [rerender, jobs, jobId]);


  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center'
  }));
  const crewTimeEst = crewSize ? Math.round(timeEst / crewSize) : timeEst; 
  return (
  <Card className={compClass} sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>     
    <CardContent sx={{display: 'flex'}}>
      <div sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
        <Typography variant="h4" component="div">
          {packageTitle}
        </Typography>
        <Typography variant="h4">
          {`Time Est: ${crewTimeEst}`}
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
    {/* {(!completed || completeState[jobId]) && <Typography>Completed!</Typography>} */}
    { jobComplete && <Typography>Completed!</Typography>}
    {/* {props.onMarkCompleted && (!completeState[jobId] && !completed) && */}
    { !jobComplete && 
    <CardActions>
      <Button onClick={() => {onMarkCompleted(jobId); setRerender(!rerender)}}>Mark Completed</Button>
    </CardActions>}
  </Card>
);
}