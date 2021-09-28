import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Crews from './components/Crews/index';
import Dispatch from './components/Dispatch/index'

import './App.css';

const App = function() {

  const [state, setState] = useState({
    crews: [{foreman_name: null}],
    clients: [{name: null}],
    packages: [{title: null}],
    contracts: [{address: null}],
    jobs: [{date: null}]
  })

  const links = [
  <div><Link to={`/dispatch/jobs/:id`}>Job Edit Form</Link></div>,
  <div><Link to={`/dispatch/contracts`}>Contracts</Link></div>,
  <div><Link to={`/dispatch/contracts/:id`}>Contract Edit Form</Link></div>,
  <div><Link to={`/dispatch/contracts/new`}>New Contract Form</Link></div>,
  <div><Link to={`/dispatch/crews`}>Crews</Link></div>,
  <div><Link to={`/dispatch/clients`}>Clients</Link></div>,
  <div><Link to={`/dispatch/packages/new`}>New Package Form</Link></div>]

  useEffect(() => {
    Promise.all([
      axios.get("/api/crews"),
      axios.get("/api/clients"),
      axios.get("/api/packages"),
      axios.get("/api/contracts"),
      axios.get("/api/jobs")
    ]).then((response) => {
        setState(prev => {
          return {
            ...prev,
            crews: response[0].data.result,
            clients:response[1].data.result,
            packages:response[2].data.result,
            contracts:response[3].data.result,
            jobs:response[4].data.result
          }
        })
    })
  }, []);

  return (
    <Router >
      <div className="App"> App
        <Switch >
          <Route path='/crews/:id' >
            <Crews { ...state }/>
          </Route>
          <Route path='/dispatch' >
            <Dispatch { ...state }/> 
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
