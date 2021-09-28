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
const getContractInfo = function() {

}
const getInfoForJobForm = function(jobs, contracts, packages, jobId) {
  let infoForJobForm = {};

  for (const job of jobs) {
    if (job.id = jobId) {
      infoForJobForm = {date: job.date}
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

export { getInfoForJobForm, getEstTime };