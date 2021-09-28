import { useParams } from 'react-router-dom';
import CrewDayCard from '../CrewDayCard';

const Day = (props) => {
  const params = useParams();

  return (

    <CrewDayCard>
      CrewDayCard
    </CrewDayCard>

  );
};

export default Day;