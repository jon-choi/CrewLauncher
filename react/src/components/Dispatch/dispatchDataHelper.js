const { format, addDays, subDays, isSameDay, isYesterday, isToday, isTomorrow } = require('date-fns')

const getCrewInfo = function() {

}
const getDayByCrew = function() {

}
const getJobsByCrew = function() {

}
const getJobsByDay = function() {

}
const getClientsInfo = function(clients, contracts, packages) {
  // map through clients
  const clientsPageInfo = clients.map(client => {
    // get contracts related to this client
    const clientContracts = contracts.filter(contract => contract.client_id === client.id)
    // if there are any contracts related to this client
    if (clientContracts.length > 0) {
      
      const clientContractsWithPackageInfo = clientContracts.map(c => {
        const packageInfo = packages.filter(pack => c.package_id === pack.id)[0];
        return {
          ...c,
          packageInfo
        }
      })
      // if client has any contracts, attach array of contracts with package info to each client 
      return {
        client,
        contracts: clientContractsWithPackageInfo
      }
    } else {
      // if client has no contracts, return client info and an empty array
      return {
        client,
        contracts: []
      }
    }
  })
  return clientsPageInfo;
}

const getContractsInfo = function(contracts, clients, packages, jobs) {
  const contractsInfo = [];
  for (let contract of contracts) {
    for (const client of clients) {
      if (contract.client_id === client.id) {
        contract = {
          ...contract,
          clientName: client.name,
          clientEmail: client.email
        }
      }
    }
    for (const packageItem of packages) {
      if (contract.package_id === packageItem.id) {
        contract = {
          ...contract,
          packageTitle: packageItem.title,
          packageLength: packageItem.contract_length_days
        }
      }
    }
    for (const job of jobs) {
      if (contract.id === job.contract_id) {
        if (!job.completed && (!contract.jobDate || job.date < contract.jobDate)) {
          contract = {
            ...contract,
            jobDate: job.date
          }
        }
      }
    }
    contractsInfo.push(contract);
  }
  return contractsInfo
}
const getInfoForJobForm = function(jobs, contracts, packages, jobId) {
  let infoForJobForm = {};

  for (const job of jobs) {
    if (job.id === jobId) {
      infoForJobForm = {
        date: job.date,
        contractId: job.contract_id
      }
      for (const contract of contracts) {
        if (job.contract_id === contract.id) {
          infoForJobForm = {
            ...infoForJobForm,
            packageId: contract.package_id,
            contractAddress: contract.address,
            contractJobNotes: contract.job_notes
          }
        }
      }
      for (const packageItem of packages) {
        if (infoForJobForm.packageId === packageItem.id) {
          infoForJobForm = {
            ...infoForJobForm,
            packageTitle: packageItem.title,
            packageManHours: packageItem.man_hours_per_visit
          }
        }  
      }
    }
  }
  return infoForJobForm;
}

const getEstTime = function(manhours, crew) {
  return (manhours / crew.crew_size)
}



export { getInfoForJobForm, getEstTime, getContractsInfo, getClientsInfo };