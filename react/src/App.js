
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Crews from './components/Crews/index';
import Dispatch from './components/Dispatch/index'

import './App.css';
import useAppData from './hooks/AppData';

const App = function() {
  const { state, createNewPackage, processContract, saveJobEdit } = useAppData()

  return (
    <Router >
      <div className="App">
        <Switch >
          <Route path='/crews/:id' >
            <Crews { ...state } onSubmitQuote={processContract} />
          </Route>
          <Route path='/dispatch' >
            <Dispatch { ...state } onEdit={saveJobEdit} createPackage={createNewPackage} createContract={processContract} /> 
          </Route> 
          <Route path='/'>
            <div><Link to='/dispatch'>Dispatch</Link></div>
            <div><Link to='/crews/1'>Crew #1</Link></div>
            <div><Link to='/crews/2'>Crew #2</Link></div>
            <div><Link to='/crews/3'>Crew #3</Link></div>
          </Route>
        </Switch>    
      </div>
    </Router>
  );
}

export default App;
