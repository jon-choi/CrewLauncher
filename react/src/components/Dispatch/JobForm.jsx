import { useParams } from 'react-router-dom';
import SpeedDial from '../SpeedDial';
import Timepicker from '../Timepicker';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { getInfoForJobForm, getEstTime } from './dispatchDataHelper';
import { parse, toDate } from 'date-fns'

const JobForm = (props) => {
  const params = useParams(props);
  const { onSave, crews, packages, contracts, jobs } = props
  const [selectedCrew, setSelectedCrew] = useState(0)
  const [time, setTime] = useState(new Date())
  const info = getInfoForJobForm(jobs, contracts, packages, params.id);
  const estTime = getEstTime(info.packageManHours, crews[selectedCrew])
  const dateString = toDate(new Date())
  const date = parse(dateString, 'yyyy', new Date())
  console.log(date)

  return (
    <>
      <h1>/dispatch/job/{params.id}</h1>
      <h3>Date: {info.date}</h3>
      <h3>Package: {info.packageTitle}</h3>
      <h3>Address: {info.contractAddress}</h3>
      <h3>Job Notes: {info.contractJobNotes}</h3>
      <h3>Man Hours: {info.packageManHours}</h3>
      {estTime > 1 ? <h3>Estimated Time: {estTime} Hours</h3> : estTime <= 1 && <h3>Estimated Time: {estTime} Hour</h3>}

      <div>
        <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue={crews[selectedCrew]}
        />
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
      </div>
      <SpeedDial crews={crews} onChange={setSelectedCrew} selectedCrew={selectedCrew}/>
    </>
  );
};

export default JobForm;