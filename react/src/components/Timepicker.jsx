import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimePicker = (props) => {
  const { startDate, onChange } = props;
  // const [startDate, setStartDate] = useState(new Date());
  
  return (
    <DatePicker
      selected={startDate}
      onChange={(time) => onChange(time)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={30}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
  );
};

export default TimePicker;