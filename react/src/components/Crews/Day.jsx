import { useParams } from 'react-router-dom';
import JobCard from '../JobCard';

const Day = (props) => {
  const params = useParams();
    console.log(props.jobsByCrewByDay)

  return (
    <>
      <JobCard 
      />
    </>
  );
};

export default Day;