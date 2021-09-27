
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import ClientsPage from './ClientsPage';
import ContractsPage from './ContractsPage';
import ContractForm from './ContractForm';
import JobForm from './JobForm';
import PackageForm from './PackageForm';
import Navigation from './Navigation';
import CrewsPage from './CrewsPage/CrewsPage';
import CrewCard from './CrewsPage/CrewCard';
import {} from './dispatchDataHelper';

const Dispatch = function(props) {
  const crews = props.crews;
  const clients = props.crews;
  const packages = props.packages;
  const contracts = props.contracts;
  const jobs = props.jobs;

  return (
    <div>Dispatch
      <div>Navigation</div>
      <Router >
        <Switch >
          <Route path="/dispatch/job/:id" >
            <JobForm />
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