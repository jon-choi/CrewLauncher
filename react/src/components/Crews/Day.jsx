import { useParams } from 'react-router-dom';
import JobCard from '../JobCard';

const Day = (props) => {
  const params = useParams();
  const { packageTitle, timeEst, clientName, address, jobNotes, jobsByCrewByDay } = props;

  const jobCard = jobsByCrewByDay.map(jobs => {

    


    return <JobCard
    key={jobs.id}
      packageTitle={packageTitle}
      timeEst={timeEst}
      clientName={clientName}
      address={address}
      jobNotes={jobNotes}
      />
  })

  

  

    return (
    <>
      <h1>Job: </h1>
      {jobCard}
    </>

  );
};

export default Day;