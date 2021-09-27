
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// import Dashboard from './Dashboard';
// import ClientsPage from './ClientsPage';
// import ContractsPage from './ContractsPage';
// import ContractForm from './ContractForm';
// import JobForm from './JobForm';
// import PackageForm from './PackageForm';
// import Navigation from './Navigation';
// import CrewsPage from './CrewsPage/CrewsPage';
// import CrewCard from './CrewsPage/CrewCard';
import {} from './dispatchDataHelper';

const Dispatch = function(props) {
  return (
    <div>Dispatch
      <div>Navigation</div>
      <Router >
        <Switch >
          <Route path="/dispatch/job/:id" >JobForm</Route>
          <Route path="/dispatch/contract/:id" >EditContractForm</Route>
          <Route path="/dispatch/contract/new" >NewContractForm</Route>
          <Route path="/dispatch/package/new" ></Route>
          <Route path="/dispatch/crews" >BrowseCrews</Route>
          <Route path="/dispatch/clients" >BrowseClients</Route>
          <Route path="/dispatch" >Dashboard</Route>
        </Switch>
      </Router>
      {/* <Quote /> */}
    </div>
    );
}

export default Dispatch;