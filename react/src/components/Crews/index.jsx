import { useState } from 'react'
import { Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Day from './Day';
import Jobs from './Jobs';
import Quote from './Quote';
import CrewDashboard from './CrewDashboard';
import { getJobsByCrew, getJobsByCrewByDay } from './crewsDataHelper';
import { getDayInfo } from '../../helpers/AppHelpers';
import { getContractsInfo, getClientsInfo } from '../Dispatch/dispatchDataHelper';



const Crews = function(props) {
  const { onSubmitQuote } = props;
  const { url } = useRouteMatch;
  const params = useParams();
  // const jobsByCrewByDay = getJobsByCrewByDay(jobs, crews);
 

const { jobs, crews, contracts, packages, clients, markJobCompleted } = props;

const days = getDayInfo(
  jobs,
  crews,
  contracts,
  packages,
  clients,
  parseInt(params.id)
);
const contractsInfo = getContractsInfo(contracts, clients, packages, jobs)

const [selectedDay, setSelectedDay] = useState([{}]);
    

    return (
      <div width='100%'>
    
        <Navigation packages={props.packages} onSubmitQuote={onSubmitQuote}/>
          <Switch >
            
    
            <Route path="/crews/:id/jobs">
              <Jobs contracts={contracts} jobs={jobs} clients={clients} packages={packages} crews={crews} />
            </Route>

            <Route path="/crews/:id">
              <CrewDashboard jobs={jobs} days={days} markJobCompleted={markJobCompleted} />
            </Route>
            </Switch>
        </div>
      );
};

export default Crews;