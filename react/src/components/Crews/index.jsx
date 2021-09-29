
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Navigation from './Navigation';
import Day from './Day';
import Jobs from './Jobs';
import Quote from './Quote';
import { getJobsByCrew } from './crewsDataHelper';

const Crews = function(props) {
  const { onSubmitQuote } = props;
  const { url } = useRouteMatch;

  const crews = props.crews;
  const days = props.days;
  const jobs = props.jobs;
  const quotes = props.quotes;

  const jobsByCrew = getJobsByCrew(jobs, crews)
  console.log("jobs: ", jobs)
  return (
  <div>

    <Navigation packages={props.packages} onSubmitQuote={onSubmitQuote}/>
      <Switch >
        <Route path={`${url}:id/days/:day`}>
          <Day />
        </Route>

        <Route path={`${url}/:id/jobs`}>
          <Jobs jobsByCrew={jobsByCrew} />
        </Route>

        <Route path={`${url}crews/:id/quote`}>
          <Quote />
        </Route>
        <Route path={`${url}`}>
        </Route>
        </Switch>


  </div>
  );
};

export default Crews;