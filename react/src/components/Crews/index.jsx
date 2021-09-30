import { useState } from 'react'
import { Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Day from './Day';
import Jobs from './Jobs';
import Quote from './Quote';
import CrewDashboard from './CrewDashboard';
import { getJobsByCrew, getJobsByCrewByDay } from './crewsDataHelper';
import { getDayInfo } from '../../helpers/AppHelpers';



const Crews = function(props) {
  const { onSubmitQuote } = props;
  const { url } = useRouteMatch;
  const params = useParams();

  // const jobsByCrewByDay = getJobsByCrewByDay(jobs, crews);
 

const { jobs, crews, contracts, packages, clients } = props;
const jobsByCrew = getJobsByCrew(jobs, crews);

const days = getDayInfo(
  jobs,
  crews,
  contracts,
  packages,
  clients,
  parseInt(params.id)
);

console.log("please get the day info: ", days);

const [selectedDay, setSelectedDay] = useState([{}]);
    

    return (
      <div>
    
        <Navigation packages={props.packages} onSubmitQuote={onSubmitQuote}/>
          <Switch >
            <Route path="/crews/:id/days/:day">
              <Day days={getDayInfo} selectedDay={selectedDay} />
            </Route>
    
            <Route path="/crews/:id/jobs">
              <Jobs jobsByCrew={jobsByCrew} />
            </Route>
    
            <Route path="/crews/:id/quote">
              <Quote />
            </Route>
            <Route path="/crews">
              <CrewDashboard days={days} />
            </Route>
            </Switch>
        </div>
      );
};

export default Crews;