
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
  const { state, onEditJobs } = props;
  const crews = state.crews;
  const clients = state.clients;
  const packages = state.packages;
  const contracts = state.contracts;
  const jobs = state.jobs;

  return (
    <div>Dispatch
      <Navigation />
      <Router >
        <Switch >
          <Route path="/dispatch/job/:id" >
            <JobForm crews={crews} jobs={jobs} contracts={contracts} packages={packages} onSave={onEditJobs}/>
          </Route>
          <Route path="/dispatch/contract/:id" >
            <ContractForm />
            EditContractForm
          </Route>
          <Route path="/dispatch/contract/new" >
            <ContractForm />
            NewContractForm
            </Route>
          <Route path="/dispatch/package/new" >
            <PackageForm />
          </Route>
          <Route path="/dispatch/crews" >
            <CrewsPage />
            BrowseCrews
          </Route>
          <Route path="/dispatch/contracts" >
            <ContractsPage />
            BrowseContracts
          </Route>
          <Route path="/dispatch/clients" >
            <ClientsPage />
            BrowseClients
          </Route>
          <Route path="/dispatch" >
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