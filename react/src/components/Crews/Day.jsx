import { useParams } from 'react-router-dom';

const Day = () => {
  const params = useParams();

  return (
    <h1>/crew/{params.id}/day/{params.day}</h1>
  );
};

export default Day;