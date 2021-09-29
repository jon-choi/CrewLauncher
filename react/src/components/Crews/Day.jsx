import React from 'react';
import JobCard from '../JobCard';
import { useParams } from 'react-router-dom';


const Day = (props) => {
  const params = useParams();
  const { jobsByCrewByDay } = props;

    console.log(props.jobsByCrewByDay)
    console.log('this log is working')

  return (
    <h1> Job: 
      <JobCard 
      {...jobsByCrewByDay}
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