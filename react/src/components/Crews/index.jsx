
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Navigation from './Navigation';
import Day from './Day';
import Jobs from './Jobs';
import Quote from './Quote';
import { getJobsByCrew, getJobsByCrewByDay } from './crewsDataHelper';
import { getDayInfo } from '../Dispatch/dispatchDataHelper';

const Crews = function(props) {
  const { onSubmitQuote } = props;
  const { url } = useRouteMatch;

  const crews = props.crews;
  const days = props.days;
  const jobs = props.jobs;
  const quotes = props.quotes;

  const jobsByCrew = getJobsByCrew(jobs, crews)
  const jobsByCrewByDay = getJobsByCrewByDay(jobs, crews)

  // console.log("jobsbyCrew: ", jobsByCrew)
  // console.log("jobsbyCrewByDay: ", jobsByCrewByDay)

  return (
  <div>

    <Navigation packages={props.packages} onSubmitQuote={onSubmitQuote}/>
      <Switch >
        <Route path="/crews/:id/days/:day">
          <Day jobsByCrewByDay={jobsByCrewByDay} />
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
};

export default Crews;