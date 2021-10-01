import React from 'react';
import JobTable from './JobTable';
import { useParams } from 'react-router-dom'
import { isAfter, isBefore } from 'date-fns'
// import { getContractsInfo } from '../Dispatch/dispatchDataHelper';

import { getJobsByCrew } from './crewsDataHelper';


const Jobs = (props) => {
  const params = useParams()
  const crewId = parseInt(params.id);

  if (props.contracts[1]) {
    const jobs = getJobsByCrew(props.jobs, props.clients, props.packages, props.contracts, crewId);
    jobs.sort(function (a, b) {
      return a.date - b.date;
    });
    



    
    return (
      <>
        <JobTable jobs={jobs}
          
          />
      </>
  
    );
  }
// const { contracts, clients, packages, jobs } = props.state;
// [{client: 'Frank Reynolds',
//         address: '555 Rocket Man Boulevard',
//         phone: '(555) 867-5309',
//         package: 'Rocket Man Package',
//         jobNotes: 'Watch out for rockets']}

  return null
  
};

export default Jobs;