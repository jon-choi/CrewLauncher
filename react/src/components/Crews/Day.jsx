import { useParams } from 'react-router-dom';
import JobCard from '../JobCard';

const Day = (props) => {
  const params = useParams();
  const { JobCard } = props;

  return (
    <>
      <JobCard 
        key={props.packageTitle}
        timeEst={props.timeEst}
        clientName={props.clientName}
        address={props.address}
        jobNotes={props.jobNotes}
      />
    </>
  );
};

export default Day;