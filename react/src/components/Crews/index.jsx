
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';
import Day from './Day';
import Jobs from './Jobs';
import Quote from './Quote'
import {} from './crewsDataHelper';

const Crews = function(props) {
  return (
  <>
    <Navigation />
    <Router >
      <Switch >
        <Route path="/crews/:id/days/:day">
          <Day />
        </Route>

        <Route path="/crews/:id/jobs">
          <Jobs />
        </Route>
      </Switch >
    </Router>
  </>
  );
};

export default Crews;