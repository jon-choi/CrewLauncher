import { useParams } from 'react-router-dom';
import SpeedDial from '../SpeedDial';
import { TextField, Button } from '@mui/material/';
import { useState } from 'react';
import { getInfoForJobForm, getEstTime } from './dispatchDataHelper';
import { addHours, toDate, format } from 'date-fns'
import TimePicker from '../Timepicker';

const JobForm = (props) => {
  const params = useParams(props);
  const { onEdit, crews, packages, contracts, jobs } = props
  const [selectedCrew, setSelectedCrew] = useState(0)
  const [time, setTime] = useState(jobs[params.id] ? new Date(jobs[params.id].date) : new Date())
  if (jobs[params.id]) {
    const info = getInfoForJobForm(jobs, contracts, packages, parseInt(params.id));
    const estTime = getEstTime(info.packageManHours, (selectedCrew ? crews[selectedCrew - 1] : {crew_size: 1}))
    const date = format(new Date(jobs[params.id].date), 'EEE MMM dd yyyy')

    const onSave = function() {
      const endTimeString = addHours(time, estTime)
      const endTime = format(endTimeString, 'hhh')
      const startTime = format(time, 'HH')
      onEdit(selectedCrew, startTime, endTime, info, parseInt(params.id))
    }

    return (
      <>
        <h1>/dispatch/job/{params.id}</h1>
        <h3>Date: {date}</h3>
        <h3>Package: {info.packageTitle}</h3>
        <h3>Address: {info.contractAddress}</h3>
        <h3>Job Notes: {info.contractJobNotes}</h3>
        <h3>Man Hours: {info.packageManHours}</h3>
        {estTime > 1 ? <h3>Estimated Time: {estTime} Hours</h3> : estTime <= 1 && <h3>Estimated Time: {estTime} Hour</h3>}
        <div>
          <TimePicker startDate={time} onChange={setTime}/>
        </div>
        <SpeedDial crews={crews} onChange={setSelectedCrew} selectedCrew={selectedCrew}/>
        <Button variant="contained" onClick={onSave}>Save Changes</Button>
      </>
    );
  }
  return null;
};

export default JobForm;