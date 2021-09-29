const { format, addDays, subDays, isSameDay, isYesterday, isToday, isTomorrow } = require('date-fns')

const getDayInfo = function(jobs, crews, contracts, packages, clients) {
  const days = [ // shows 5 days
    [format(subDays(new Date(), 1),'EEEE, MMM dd')],
    [format(new Date(),'EEEE, MMM dd')],
    [format(addDays(new Date(), 1),'EEEE, MMM dd')],
    [format(addDays(new Date(), 2),'EEEE, MMM dd')],
    [format(addDays(new Date(), 3),'EEEE, MMM dd')]
  ];

  for (const job of jobs) {
    const contractOfJob = contracts.filter(contract => {
      return contract.id === job.contract_id
    })[0];
    const crewOfJob = crews.filter(crew => {
      return crew.id === job.crew_id
    })[0];
    const packageOfJob = packages.filter(packageItem => {
      return packageItem.id === job.package_id
    })[0];
    const clientOfJob = clients.filter(client => {
      return client.id === job.client_id
    })[0];
    const day = {job, contractOfJob, crewOfJob, packageOfJob, clientOfJob }

    if (isYesterday(new Date(day.job.date))) {
      days[0].push(day)
    }
    if (isToday(new Date(day.job.date))) {
      days[1].push(day)
    }
    if (isTomorrow(new Date(day.job.date))) {
      days[2].push(day)
    }
    if (isSameDay(new Date(day.job.date), addDays(new Date(), 2))) {
      days[3].push(day)
    }
    if (isSameDay(new Date(day.job.date), addDays(new Date(), 3))) {
      days[4].push(day)
    }
  }
  return days;
}
// const con = props.contracts.filter(c => c.id === id)[0];
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
        if (!job.completed && (!contract.jobDate || job.date < contract.jobDate)) {
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

export { getDayInfo, getInfoForJobForm, getEstTime, getContractsInfo };