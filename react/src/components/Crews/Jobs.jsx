import React from 'react';
import JobTable from './JobTable';
import { subDays, addDays, format } from 'date-fns';
import { useParams } from 'react-router-dom'
import { isAfter, isBefore } from 'date-fns'
// import { getContractsInfo } from '../Dispatch/dispatchDataHelper';
import { getJobsByCrew } from './crewsDataHelper';


const Jobs = (props) => {
  const params = useParams()
  const crewId = parseInt(params.id);
  
  if (props.jobs[1]) {
    const jobs = getJobsByCrew(props.jobs, props.clients, props.packages, props.contracts, crewId);
    jobs.sort(function (a, b) {
      return a.sortDate - b.sortDate;
    });
    let count = 1;
    let rows = [];
    for (const row of jobs) {
      if (isAfter(new Date(row.date), new Date())) {
      const date = row.date;
      const timeEstimate = row.timeEstimate;
      const packageItem = row.package;
      rows.push({
        count,
        date,
        timeEstimate,
        packageItem,
        rows:
        [row]});
      count++;
      }
    };


    
    return (
      <>
        <JobTable className="table" rows={rows} />
      </>
    );
  }

  return null
  
};

export default Jobs;