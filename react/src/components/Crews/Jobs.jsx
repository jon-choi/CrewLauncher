// import { useParams } from 'react-router-dom'
// import CrewDayCard from '../CrewDayCard';
import React from 'react';
import { getJobsByCrew } from './crewsDataHelper';
import JobTable from './JobTable';


const Jobs = (props) => {
  // const params = useParams();

  return (

    <h1>So many Jobs 🚀🚀🚀🚀
      <JobTable 
        
        />
    </h1>

  );
};

export default Jobs;