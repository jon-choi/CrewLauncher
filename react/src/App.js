import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Crews from './components/Crews/index';
import Dispatch from './components/Dispatch/index'

import './App.css';

const App = function() {

  const [state, setState] = useState({
    crews: {},
    clients: {},
    packages: {},
    contracts: {},
    jobs: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get("/api/crews"),
      axios.get("/api/clients"),
      axios.get("/api/packages"),
      axios.get("/api/contracts"),
      axios.get("/api/jobs")
    ]).then((data) => {
        setState(prev => {
          return {...prev, crews: data[0].result, clients:data[1].result, packages:data[2].result, contracts:data[3].result, jobs:data[4].result}
        })
    })
  }, []);


  return (
    <div className="App">
      <Crews />
      <Dispatch />
      <h1>{ state }</h1>
      <button onClick={"Does Nothing"} >
        Fetch Data
      </button>        
    </div>
  );
}

export default App;
