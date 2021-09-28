
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Dashboard from './Dashboard';
import ClientsPage from './ClientsPage';
import ContractsPage from './ContractsPage';
import ContractForm from './ContractForm';
import JobForm from './JobForm';
import PackageForm from './PackageForm';
import Navigation from './Navigation';
import CrewsPage from './CrewsPage/CrewsPage';
import { getContractInfo } from './dispatchDataHelper';

const Dispatch = function(props) {
  const { onEdit } = props;
  const { url } = useRouteMatch();

  const crews = props.crews;
  const clients = props.crews;
  const packages = props.packages;
  const contracts = props.contracts;
  const jobs = props.jobs;

  const contractsInfo = getContractInfo(contracts, clients, packages, jobs)
  console.log("contracts: ",contracts)

  return (
    <div>Dispatch
      <Navigation />
        <Switch >
          <Route path={`${url}/jobs/:id`} >
            <JobForm onEdit={onEdit} crews={crews} packages={packages} contracts={contracts} jobs={jobs} />
          </Route>
          <Route path={`${url}/contracts/new`} >
            <ContractForm packages={packages} />
          </Route>
          <Route path={`${url}/contracts/:id`} >
            <ContractForm packages={packages} />
          </Route>
          <Route path={`${url}/packages/new`} >
            <PackageForm />
          </Route>
          <Route path={`${url}/crews`} >
            <CrewsPage />
            BrowseCrews
          </Route>
          <Route path={`${url}/contracts`} >
            <ContractsPage contractInfo={contractsInfo} onEdit={() => }/>
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
      {/* <Quote /> */}
    </div>
    );
}

export default Dispatch;