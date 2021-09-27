
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// import Navigation from './Navigation'
// import Day from './Day'
// import Quote from './Quote'
import {} from './crewsDataHelper';

const Crews = function(props) {
  return (
  <div>Crews
    <div>Navigation</div>
    <Router >
      <Switch >
        <Route path="/crews/day/:id">DayForCrew</Route>
        <Route path="/crews/jobs">Jobs</Route>
      </Switch >
    </Router>
    {/* <Quote /> */}
  </div>
  );
}

export default Crews;