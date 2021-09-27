import { useParams } from 'react-router-dom'

const Jobs = () => {
  const params = useParams();

  return (
    <h1>/crews/{params.id}/jobs</h1>
  );
};

export default Jobs;