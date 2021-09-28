export function getJobsByCrewByDay(jobs, jobId, crews, days) {
  let jobsByCrewByDay = {};

  for (const job of jobs) {
    if (job.id === jobId) {
      jobsByCrewByDay = {date: job.date}
      for (const crew of crews) {
        if (job.crew_id === crew.id) {
          jobsByCrewByDay = {
            ...jobsByCrewByDay
          }
        }
      }
      for (const day of days) {
        if (day === job.crew_id) {
          jobsByCrewByDay = {
            ...jobsByCrewByDay
          }
        }
      }
    }
  }
  return jobsByCrewByDay;
};

export function getJobsByCrew(jobs, crews, crewId) {
  let jobsByCrew = {};

  for (const job of jobs) {
    if (job.id === crewId) {
      jobsByCrew = {date: job.date}
      for (const crew of crews) {
        if (job.crew_id === crew.id) {
          jobsByCrew = {
            ...jobsByCrew
          }
        }
      }
    }
  }
  return jobsByCrew;
};

export function getJobAndClientByCrewByDay(jobs, clients, crews, day) {


};

