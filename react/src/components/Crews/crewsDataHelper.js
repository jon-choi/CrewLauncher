import { subDays, addDays } from 'date-fns';

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

  //   if ((!crewId || crewId === day.crewOfJob.id)) {
  //     jobsByCrewByDay[0].push(day);
  //   }
  }
  // for (const job of jobs) {
  //   for (const crew of crews) {
  //     if (job.id === crew.id) {
  //       jobsByCrewByDay = {
  //         crewId: job.crew_id,
  //         date: job.date,
  //         jobNum: job.id

          

  //       }
  //     }
  //   }
  // }
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

