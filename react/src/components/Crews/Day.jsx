import { useParams } from 'react-router-dom';
import JobCard from '../JobCard';

const Day = (props) => {
  const params = useParams();
  const { packageTitle, timeEst, clientName, address, jobNotes, jobsByCrew } = props;

  const jobCards = jobsByCrew.map((jobs, client) => {

    let clients = `${client.clientName}`
    const body = 
    `Name: ${client.name}
    \nPhone: ${client.phone}
    \nEmail: ${client.email}`

    return <JobCard 
      key={client.id}
      clients={clients.clientName}
      body={body}
      timeEst={timeEst}
    />
  })

  return (
    <>
      <JobCard 
        packageTitle={packageTitle}
        timeEst={timeEst}
        clientName={clientName}
        address={address}
        jobNotes={jobNotes}
      />
    </>
  );
};

export default Day;