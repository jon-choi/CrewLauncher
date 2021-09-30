
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Dashboard from './Dashboard';
import ClientsPage from './ClientsPage';
import ContractsPage from './ContractsPage';
import ContractForm from './ContractForm';
import JobForm from './JobForm';
import PackageForm from './PackageForm';
import Navigation from './Navigation';
import CrewsPage from './CrewsPage/CrewsPage';
import { getContractsInfo, getClientsInfo } from './dispatchDataHelper';
import { getDayInfo } from '../../helpers/AppHelpers';

const Dispatch = function(props) {
  const { onEdit, createPackage, createContract } = props;
  const { url } = useRouteMatch();

  const crews = props.crews;
  const clients = props.clients;
  const packages = props.packages;
  const contracts = props.contracts;
  const jobs = props.jobs;
  const state = {crews, clients, packages, contracts, jobs}

  const clientsInfo = getClientsInfo(clients, contracts, packages);
  const contractsInfo = getContractsInfo(contracts, clients, packages, jobs)
  const days = getDayInfo(jobs, crews, contracts, packages, clients)

  return (
    <>
      <Navigation />
        <Switch >
          <Route path={`${url}/jobs/:id`} >
            <JobForm onEdit={onEdit} crews={crews} packages={packages} contracts={contracts} jobs={jobs} />
          </Route>
          <Route path={`${url}/clients/:client_id/contracts/new`}>
            <ContractForm contracts={contracts} clients={clients} packages={packages} onSubmit={createContract} />
          </Route>
          <Route path={`${url}/contracts/new`} >
            <ContractForm contracts={contracts} packages={packages} onSubmit={createContract} />
          </Route>
          <Route path={`${url}/contracts/:id`} >
            <ContractForm clients={clients} contracts={contracts} packages={packages} onSubmit={createContract} />
          </Route>
          <Route path={`${url}/packages/new`} >
            <PackageForm onSubmit={createPackage}/>
          </Route>
          <Route path={`${url}/crews`} >
            <CrewsPage state={state}/>
          </Route>
          <Route path={`${url}/contracts`} >
            <ContractsPage contractsInfo={contractsInfo} />
          </Route>
          <Route path={`${url}/clients`} >
            <ClientsPage clientsInfo={clientsInfo}/>
          </Route>
          <Route path={`${url}`} >
            <Dashboard days={days}/>
          </Route>
        </Switch>
      {/* <Quote /> */}
    </>
    );
}

export default Dispatch;