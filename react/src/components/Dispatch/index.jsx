
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Dashboard from './Dashboard';
import ClientsPage from './ClientsPage';
import ContractsPage from './ContractsPage';
import ContractForm from './ContractForm';
import JobForm from './JobForm';
import PackageForm from './PackageForm';
import Navigation from './Navigation';
import CrewsPage from './CrewsPage/CrewsPage';
import { getContractsInfo, getDayInfo } from './dispatchDataHelper';

const Dispatch = function(props) {
  const { onEdit, createPackage, createContract } = props;
  const { url } = useRouteMatch();

  const crews = props.crews;
  const clients = props.clients;
  const packages = props.packages;
  const contracts = props.contracts;
  const jobs = props.jobs;

  const contractsInfo = getContractsInfo(contracts, clients, packages, jobs)
  const dayInfo = getDayInfo(jobs, crews, contracts)
  return (
    <div>Dispatch
      <Navigation />
        <Switch >
          <Route path={`${url}/jobs/:id`} >
            <JobForm onEdit={onEdit} crews={crews} packages={packages} contracts={contracts} jobs={jobs} />
          </Route>
          <Route path={`${url}/contracts/new`} >
            <ContractForm packages={packages} onSubmit={createContract} />
          </Route>
          <Route path={`${url}/contracts/:id`} >
            <ContractForm clients={clients} contracts={contracts} packages={packages} onSubmit={createContract} />
          </Route>
          <Route path={`${url}/packages/new`} >
            <PackageForm onSubmit={createPackage}/>
          </Route>
          <Route path={`${url}/crews`} >
            <CrewsPage />
            BrowseCrews
          </Route>
          <Route path={`${url}/contracts`} >
            <ContractsPage contractsInfo={contractsInfo} />
          </Route>
          <Route path={`${url}/clients`} >
            <ClientsPage />
            BrowseClients
          </Route>
          <Route path={`${url}`} >
            <Dashboard dayInfo={dayInfo}/>
            Dashboard
          </Route>
        </Switch>
      {/* <Quote /> */}
    </div>
    );
}

export default Dispatch;