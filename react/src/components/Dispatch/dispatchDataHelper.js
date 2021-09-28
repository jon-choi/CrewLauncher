const getDayInfo = function() {

}
const getCrewInfo = function() {

}
const getDayByCrew = function() {

}
const getJobsByCrew = function() {

}
const getJobsByDay = function() {

}
const getClientInfo = function() {

}
const getContractsInfo = function(contracts, clients, packages, jobs) {
  const contractsInfo = [];
  for (const contract of contracts) {
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
        if (!job.completed && !contract.jobDate) {
          contract = {
            ...contract,
            crewId: job.crew_id,
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

export { getInfoForJobForm, getEstTime, getContractsInfo };