// import { useParams } from 'react-router-dom'
import CrewDayCard from '../CrewDayCard';
import React from 'react';


const Jobs = (props) => {
  // const params = useParams();
  console.log("jobsByCrew: ", props.jobsByCrew);

  return (

    <h1>Day:
      <CrewDayCard 
        onClick={props.onClick}
        date={props.date}
        jobsBooked={`Way too many to count. OMG 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀`}
        dayTimeEst={`1000 hrs🚀🚀🚀🚀🚀🚀🚀🚀🚀`}
        />
    </h1>

  );
};

export default Jobs;