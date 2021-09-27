import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import { addDays } from 'date-fns'

const DateRangePicker = (props) => {
  const { onChange, startDate, endDate } = props;
  
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(addDays(startDate, packageLength - 1));
  
  // const onChange = (dates) => {
  //   const [start, end] = dates;
  //   setInternalEndDate(addDays(start, packageLength));
  //   onChange(start, end);
  // };

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
};

export default DateRangePicker;