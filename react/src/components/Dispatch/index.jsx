
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import Dashboard from './Dashboard';
import ClientsPage from './ClientsPage';
import ContractsPage from './ContractsPage';
import ContractForm from './ContractForm';
import JobForm from './JobForm';
import PackageForm from './PackageForm';
import Navigation from './Navigation';
import CrewsPage from './CrewsPage/CrewsPage';
import { } from './dispatchDataHelper';

const Dispatch = function(props) {
  const { state, onEdit } = props;
  const { url } = useRouteMatch();

  const crews = props.crews;
  const clients = props.crews;
  const packages = props.packages;
  const contracts = props.contracts;
  const jobs = props.jobs;

  return (
    <div>Dispatch
      <Navigation />
      <Router >
        <Switch >
          <Route path={`${url}/jobs/:id`} >
            <JobForm onEdit={onEdit} crews={crews} packages={packages} contracts={contracts} jobs={jobs} />
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