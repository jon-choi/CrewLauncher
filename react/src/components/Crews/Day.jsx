import { useParams } from 'react-router-dom';
import CrewDayCard from '../CrewDayCard';

const Day = (props) => {
  const params = useParams();
  console.log(params);

  return (

    <CrewDayCard>
      CrewDayCard
    </CrewDayCard>

  );
};

export default Day;