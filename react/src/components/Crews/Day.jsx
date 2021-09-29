import { useParams } from 'react-router-dom';
import CrewDayCard from '../CrewDayCard';

const Day = (props) => {
  const params = useParams();
  const { onClick, date, jobsBooked, dayTimeEst } = props;

  return (
    
    <CrewDayCard onClick={onClick} date={date} jobsBooked={jobsBooked} dayTimeEst={dayTimeEst} >
      <h1>/crews/{params.id}/day/{params.day}</h1>
    </CrewDayCard>

  );
};

export default Day;