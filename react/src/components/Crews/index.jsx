
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Navigation from './Navigation';
import Day from './Day';
import Jobs from './Jobs';
import { getJobsByCrew } from './crewsDataHelper';

const Crews = function(props) {
  const { url } = useRouteMatch();

  const days = props.days;
  const jobs = props.jobs;
  const crews = props.crews;

  const jobsByCrew = getJobsByCrew(jobs, crews)

  return (
  <div>
    <Navigation packages={props.packages}/>

      <Switch >
        <Route path={`${url}/:id/days/:day`}>
          <Day days={days}/>
        </Route>

        <Route path={`${url}/:id/jobs`}>
          <Jobs jobs={jobs}/>
        </Route>
        </Switch>

  </div>
  );
};

export default Crews;