
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Navigation from './Navigation';
import Day from './Day';
import Jobs from './Jobs';
import Quote from './Quote'
import {} from './crewsDataHelper';

const Crews = function(props) {
  // const { url } = useRouteMatch();

  const days = props.days;
  const jobs = props.jobs;
  const quotes = props.quotes;

  return (
  <div>Crews
    <Navigation />
      <Switch >
        <Route path="/crews/:id/days/:day">
          <Day days={days}/>
        </Route>

        <Route path="/crews/:id/jobs">
          <Jobs jobs={jobs}/>
        </Route>
      </Switch >
    <Quote />
  </div>
  );
};

export default Crews;