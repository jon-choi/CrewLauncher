import { useParams } from 'react-router-dom';
import CrewDayCard from '../CrewDayCard';

const Day = (props) => {
  const params = useParams();


  return (
    
    <h1>/crews/{params.id}/day</h1>


  );
};

export default Day;