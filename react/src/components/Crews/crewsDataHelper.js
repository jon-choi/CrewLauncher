import { subDays, addDays, format } from 'date-fns';

export function getJobsByCrewByDay(jobs, crews, crewId = 0) {
  let jobsByCrewByDay = [[],[],[]];
  const days = [subDays(new Date(), 1)];
  for (let d = 0; d < 5; d++ ) {
    days.push(addDays(new Date(), d))
  }
  for (const job of jobs) {
      
    const crewOfJob = crews.filter(crew => {
      return crew.id === job.crew_id
    })[0];

    const day = {job, crewOfJob }


  }

  return jobsByCrewByDay;
};

// export function getJobsByCrew(jobs, crews) {
//   let jobsByCrew = {};

//   for (const job of jobs) {
//     for (const crew of crews) {
//       if (job.id === crew.id) {
//         jobsByCrew = {
//           ...jobsByCrew,
//           jobId: job.id,
//           crew: job.crew_id,
//           contract: job.contract_id,
//           crewId: crew.id,
//           crewName: crew.foreman_name
//         }
//       }
//     }
//   }
//   return jobsByCrew;
// };

// const { contracts, clients, packages, jobs } = props.state;
// [{client: 'Frank Reynolds',
//         address: '555 Rocket Man Boulevard',
//         phone: '(555) 867-5309',
//         package: 'Rocket Man Package',
//         jobNotes: 'Watch out for rockets']}

export function getJobsByCrew(jobs, clients, packages, contracts, crewId) {

  const jobsInfo = [];
  const jobsOfCrew = jobs.filter(job => job.crew_id === crewId)
  for (const jobOfCrew of jobsOfCrew) {
    const contractOfJob = contracts.filter(contract => jobOfCrew.contract_id === contract.id)[0]
    const packageOfJobs = packages.filter(packageItem => contractOfJob.package_id === packageItem.id)[0];
    const clientOfJobs = clients.filter(client => contractOfJob.client_id === client.id)[0];
    const timeEstimate = jobOfCrew.end_time - jobOfCrew.start_time;
    const date = format(new Date(jobOfCrew.date), 'T')
    const job = {
        id: jobOfCrew.id,
        clientName: clientOfJobs.name,
        clientPhone: clientOfJobs.phone,
        package: packageOfJobs.title,
        address: contractOfJob.address,
        jobNotes: contractOfJob.job_notes,
        timeEstimate,
        date
    };
    jobsInfo.push(job);
  }
  return jobsInfo;
};



