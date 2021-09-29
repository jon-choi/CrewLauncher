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

  const editJob = function(job) {
    const jobs = [
      ...state.jobs,
      job
    ]
    axios.post(`/jobs/${job.id}`, job)
      .then(res => {
        setState(prev => {
          return {...prev, jobs}
        })
      })
      .catch(error => console.log(error))
  }

  const saveJobEdit = function(crewId, time, endTime, jobInfo, jobId) {
    
    const job = {
      id: jobId,
      contract_id: jobInfo.contractId,
      crew_id: crewId,
      date: jobInfo.date,
      start_time: time,
      end_time: endTime,
      completed: false
    }
    editJob(job)
  }

  const createNewPackage = (newPackage) => {
    const {title, flatRate, sizeRange, description, manHrsPerVisit, contractLength, visitInterval, packageImage} = newPackage;
    const pkg = {
      title,
      description,
      id: state.packages.length + 1,
      flat_rate: flatRate,
      size_range_string: sizeRange,
      man_hours_per_visit: manHrsPerVisit,
      contract_length_days: contractLength,
      visit_interval_days: visitInterval,
      image: packageImage
    };
    const updatedPackages = [...state.packages, pkg];
    return axios.post('/packages', pkg)
    .then(response => {
      setState(prev => {
        return {...prev, packages: updatedPackages};
      });
    })
    .catch(error => console.log(error));
  };

<<<<<<< HEAD
  const submitQuote = function(quote) {
    const contract = {...quote};
    for (const client of clients) {
      if (client.email === quote.clientEmail && client.phone === quote.clientPhone) {
        const contract = {
          ...contract,
          client_id: client.id,
          job_notes: ""
        }
        return;
      }
    }
    if (!contract.client_id) {
      
    }
    const contract = {

    }
  }
=======
  const getClientId = (client, clientList) => {
    const { email } = client;
    const existingClient = clientList.filter(c => c.email === email);
    console.log("getClientId returns: ", existingClient.length > 0 ? existingClient[0].id : false );
    if (existingClient.length > 0) {
      return existingClient[0].id;
    } else {
      return false;
    }
  };

  const createNewClient = (client) => {
    const updatedClients = [...state.clients, client]; 

    return axios.post('/clients', client)
    .then(response => {
      setState(prev => {
        return {...prev, clients: updatedClients};
      });
    })
    .catch(error => console.log(error));

  };

  const processContract = (contractDetails) => {
    const { packageId,  clientName, clientPhone, clientEmail, startDate, address, jobNotes } = contractDetails;
    const id = parseInt(contractDetails.id) || null;
    const client = {
      name: clientName,
      email: clientEmail,
      phone: clientPhone
    };
    
    const existingClient = getClientId(client, state.clients);
    
    if (existingClient) {
      client.id = existingClient;
    } else {
      client.id = state.clients.length + 1;
    }

    // If client doesn't exist then create it
    if (!existingClient) {
      createNewClient(client);
    }
    
    const contract = {
      id: id ? id : state.contracts.length + 1,
      client_id: client.id,
      package_id: packageId,
      start_date: startDate,
      address: address,
      job_notes: jobNotes
    };
    
    const updatedContracts = [...state.contracts, contract];
    console.log(` ${id}`)
      return axios.post(`/contracts${id && `/${id}`}`, contract)
        .then(response => {
          setState(prev => {
            return {...prev, contracts: updatedContracts}})
        })
        .catch(error => console.log(error));
    
  };

>>>>>>> master
  return (
    <Router >
      <div className="App"> App
        <Switch >
          <Route path='/crews/:id' >
            <Crews { ...state } onSubmitQuote={submitQuote} />
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
