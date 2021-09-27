import { useParams } from 'react-router-dom';

const JobForm = () => {
  const params = useParams();

  return (
    <h1>/dispatch/job/{params.id}
      Edit Job Form
    </h1>
  );
};

export default JobForm;