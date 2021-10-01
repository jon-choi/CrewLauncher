import { useEffect, useState } from 'react';
import axios from 'axios';

import { getClientId, generateJobDates } from '../helpers/AppHelpers'

const useAppData = function() {

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
    const jobsInState = state.jobs.filter(jobInState => {
      return !(job.id === jobInState.id)
    })
    const jobs = [
      ...jobsInState,
      job
    ]
    console.log(jobs)
    return axios.post(`/jobs/${job.id}`, job)
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
    return editJob(job)
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
    .catch(error => console.log("Could not create package!", error));
  };

  const createNewClient = (client) => {
    const updatedClients = [...state.clients, client]; 

    return axios.post('/clients', client)
    .then(response => {
      console.log("Successfully created client!")
      setState(prev => {
        return {...prev, clients: updatedClients};
      });
    })
    .catch(error => console.log("Could not create client!", error));
  };

  const updateClient = (client) => {
    const updatedClients = state.clients.map(c => {
      if (c.id === client.id) {
        return client;
      } else {
        return c;
      }
    });

    return axios.post(`/clients/${client.id}`, client)
    .then(response => {
      console.log("Successfully updated client info!")
      setState(prev => {
        return {...prev, updatedClients};
      });
    })
    .catch(error => console.log("Could not update client!", error))
  };

  const processContract = (contractDetails) => {
    const { packageId,  clientName, clientPhone, clientEmail, startDate, address, jobNotes } = contractDetails;
    const existing = isNaN(parseInt(contractDetails.id)) ? false : true;
    const id = (existing === true) ? parseInt(contractDetails.id) : state.contracts.length + 1;

    const client = {
      name: clientName,
      email: clientEmail,
      phone: clientPhone
    };
    
    const existingClient = getClientId(client, state.clients);
    
    if (existingClient) {
      client.id = existingClient;
      console.log("Client already exists :", client)
      updateClient(client);
    } else {
      client.id = state.clients.length + 1;
    }

    // If client doesn't exist then create it
    if (!existingClient) {
      console.log("Client is a new client, let's call createNewClient :", client)
      createNewClient(client);
    }
    
    const contract = {
      id,
      client_id: client.id,
      package_id: packageId,
      start_date: startDate,
      address: address,
      job_notes: jobNotes
    };
    
    const updatedContracts = [...state.contracts, contract];
    if (existing) {
      console.log(`POSTING TO: /contracts/${contract.id}`)
      return axios.post(`/contracts/${contract.id}`, contract)
      .then(response => {
        setState(prev => {
          return {...prev, contracts: updatedContracts}})
      })
      .catch(error => {
        console.log('Could not submit contract: ', error);
      });
    } else {
      console.log(`POSTING TO: /contracts`)
      return axios.post(`/contracts`, contract)
      .then(response => {
        setState(prev => {
          return {...prev, contracts: updatedContracts}
        });
        const thisPackage = state.packages.filter(p => p.id === contract.package_id)[0];
        return generateJobsFromContract(contract, thisPackage);
      })
      .catch(error => {
        console.log('Could not submit contract: ', error);
      });
    }    
  };

  const generateJobsFromContract = (contract, packageInfo) => {
    // generates an array of job objects with correct date values
    const jobs = generateJobDates(new Date(contract.start_date), parseInt(packageInfo.contract_length_days), parseInt(packageInfo.visit_interval_days));

    let id = state.jobs.length;
    const jobsArray = jobs.map(job => {
      const start = 7;
      // const startTime = setHours(setMinutes(job.date, 0), start);
      // const endTime = setHours(setMinutes(job.date, 0), packageInfo.man_hours_per_visit + start);
      id++;
      return {
        id,
        ...job,
        contract_id: contract.id,
        start_time: start,
        end_time: (start + packageInfo.man_hours_per_visit),
        completed: false 
      };
      
    });
    
    const jobPostPromises = jobsArray.map(job => {
      return axios.post('/jobs', job)
    });

    Promise.all(jobPostPromises)
    .then((response) => {
      const updatedJobs = [...state.jobs, ...jobsArray];
      setState(prev => {
        return {...prev, jobs: updatedJobs};
      });
      console.log("Jobs created successfully!", response);
      return {success: true, error: false};
    })
    .catch(err => {
      console.log(`Error creating jobs -- ${err}`);
      return {error: true, success: false};
    });
  };

  return { state, createNewPackage, editJob, createNewClient, processContract, saveJobEdit }
}
export default useAppData;