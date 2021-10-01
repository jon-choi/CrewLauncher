import React from 'react';
import JobCard from '../JobCard';
// import { useParams } from 'react-router-dom';
import JobTable from './JobTable';


const Day = (props) => {
  // const params = useParams();
      

  return (
    <h1> Job: 
      <JobCard 
      packageTitle={props.packageTitle}
      timeEst={props.timeEst}
      clientName={props.clientName}
      address={props.address}
      jobNotes={props.jobNotes}
      />
    </h1>
  );
};

export default Day;