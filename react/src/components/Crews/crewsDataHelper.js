export function getJobsByCrewByDay(jobs, crews) {
  let jobsByCrewByDay = {};


  for (const job of jobs) {
    for (const crew of crews) {
      if (job.id === crew.id) {
        jobsByCrewByDay = {
          crewId: job.crew_id,
          date: job.date,
          jobNum: job.id

          

        }
      }
    }
  }
  return jobsByCrewByDay;
};

export function getJobsByCrew(jobs, crews) {
  let jobsByCrew = {};

  for (const job of jobs) {
    for (const crew of crews) {
      if (job.id === crew.id) {
        jobsByCrew = {
          ...jobsByCrew,
          jobId: job.id,
          crew: job.crew_id,
          contract: job.contract_id,
          crewId: crew.id,
          crewName: crew.foreman_name



        }
      }
    }
  }
  return jobsByCrew;
};

export function getJobAndClientByCrewByDay(jobs, clients, crews, days) {


};

