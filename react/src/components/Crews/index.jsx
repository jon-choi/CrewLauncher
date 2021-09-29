
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Navigation from './Navigation';
import Day from './Day';
import Jobs from './Jobs';
import {} from './crewsDataHelper';

const Crews = function(props) {
  const { onSubmitQuote } = props;
  const { url } = useRouteMatch;

  const days = props.days;
  const jobs = props.jobs; 
  
  return (
  <div>
    <Navigation packages={props.packages} onSubmitQuote={onSubmitQuote}/>
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