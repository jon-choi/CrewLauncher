import { useState } from 'react'
import { Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Day from './Day';
import Jobs from './Jobs';
import Quote from './Quote';
import { getJobsByCrew, getJobsByCrewByDay } from './crewsDataHelper';
import { getDayInfo } from '../../helpers/AppHelpers';
import { Stack, Typography, Box } from '@mui/material';
import JobCard from '../JobCard';


const Crews = function(props) {
  const { onSubmitQuote } = props;
  const { url } = useRouteMatch;
  const params = useParams();
 
  // const jobsByCrewByDay = getJobsByCrewByDay(jobs, crews);
  
 
const { jobs, crews, contracts, packages, clients } = props
   const jobsByCrew = getJobsByCrew(jobs, crews);
 
  const days = getDayInfo(jobs, crews, contracts, packages, clients, parseInt(params.id));
  
  const [selectedDay, newDayCards] = useState([{}])
  
  if (days) {
    const jobCard = days.map(jobOfDay => {
      const { job, contractOfJob, crewOfJob, packageOfJob, clientOfJob } = jobOfDay;
    

    return (
      <div>
    
        <Navigation packages={props.packages} onSubmitQuote={onSubmitQuote}/>
          <Switch >
          <Stack>
            <Typography variant="h6">{clientOfJob.name}</Typography>
            <Box sx={{ width: '95%', maxWidth: 500, maxHeight: 300, display: 'flex'}}>
              <JobCard
              key={job.id}
              packageTitle={packageOfJob.title}
              timeEst={packageOfJob.man_hours_per_visit}
              clientName={clientOfJob.name}
              address={contractOfJob.address}
              jobNotes={contractOfJob.job_notes}
              compClass="dashboard-day"
              />
            </Box>
          </Stack>
            <Route path="/crews/:id/days/:day">
              <Day days={getDayInfo} selectedDay={selectedDay} {...jobCard} />
            </Route>
    
            <Route path="/crews/:id/jobs">
              <Jobs jobsByCrew={jobsByCrew} />
            </Route>
    
            <Route path="/crews/:id/quote">
              <Quote />
            </Route>
            <Route path="crews/:id">
            </Route>
            </Switch>
    
    
      </div>
      );
    })
  }
  return (
    <>
      {`${days}`}
    </>
  );
};

export default Crews;