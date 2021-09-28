
<<<<<<< HEAD
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
=======
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch } from 'react-router-dom';
>>>>>>> 6f25e076c4cf34a8746be97b950011803079d92c

import Dashboard from './Dashboard';
import ClientsPage from './ClientsPage';
import ContractsPage from './ContractsPage';
import ContractForm from './ContractForm';
import JobForm from './JobForm';
import PackageForm from './PackageForm';
import Navigation from './Navigation';
import CrewsPage from './CrewsPage/CrewsPage';
import { getInfoForJobForm } from './dispatchDataHelper';

const Dispatch = function(props) {
<<<<<<< HEAD
  const { state, onEditJobs } = props;
  const crews = state.crews;
  const clients = state.clients;
  const packages = state.packages;
  const contracts = state.contracts;
  const jobs = state.jobs;
=======
  const { url } = useRouteMatch();

  const crews = props.crews;
  const clients = props.crews;
  const packages = props.packages;
  const contracts = props.contracts;
  const jobs = props.jobs;
>>>>>>> 6f25e076c4cf34a8746be97b950011803079d92c

  return (
    <div>Dispatch
      <Navigation />
      <Router >
        <Switch >
<<<<<<< HEAD
          <Route path="/dispatch/job/:id" >
            <JobForm crews={crews} jobs={jobs} contracts={contracts} packages={packages} onSave={onEditJobs}/>
=======
          <Route path={`${url}/jobs/:id`} >
            <JobForm />
>>>>>>> 6f25e076c4cf34a8746be97b950011803079d92c
          </Route>
          <Route path={`${url}/contracts/new`} >
            <ContractForm />
            NewContractForm
          </Route>
          <Route path={`${url}/contracts/:id`} >
            <ContractForm />
            EditContractForm
          </Route>
          <Route path={`${url}/packages/new`} >
            <PackageForm />
          </Route>
          <Route path={`${url}/crews`} >
            <CrewsPage />
            BrowseCrews
          </Route>
          <Route path={`${url}/contracts`} >
            <ContractsPage />
            BrowseContracts
          </Route>
          <Route path={`${url}/clients`} >
            <ClientsPage />
            BrowseClients
          </Route>
          <Route path={`${url}`} >
            <Dashboard />
            Dashboard
          </Route>
        </Switch>
      </Router>
      {/* <Quote /> */}
    </div>
    );
}

export default Dispatch;