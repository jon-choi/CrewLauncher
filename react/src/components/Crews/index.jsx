
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Navigation from './Navigation';
import Day from './Day';
import Jobs from './Jobs';
import Quote from './Quote';
import { getJobsByCrew, getJobsByCrewByDay } from './crewsDataHelper';

const Crews = function(props) {
  const { onSubmitQuote } = props;
  const { url } = useRouteMatch;

  const crews = props.crews;
  const days = props.days;
  const jobs = props.jobs;
  const quotes = props.quotes;

  const jobsByCrew = getJobsByCrew(jobs, crews)
  const jobsByCrewByDay = getJobsByCrewByDay(jobs, crews, days)

  // console.log("jobsbyCrew: ", jobsByCrew)
  console.log("jobsbyCrewByDay: ", jobsByCrewByDay)

  return (
  <div>

    <Navigation packages={props.packages} onSubmitQuote={onSubmitQuote}/>
      <Switch >
        <Route path={`${url}:id/days/:day`}>
          <Day jobsByCrewByDay={jobsByCrewByDay} />
        </Route>

        <Route path={`${url}/:id/jobs`}>
          <Jobs jobsByCrew={jobsByCrew} />
        </Route>

        <Route path={`${url}crews/:id/quote`}>
          <Quote />
        </Route>
        <Route path={`${url}/:id`}>
        </Route>
        </Switch>


  </div>
  );
};

export default Crews;