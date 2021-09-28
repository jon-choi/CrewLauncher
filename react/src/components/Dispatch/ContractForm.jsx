import React, { useState } from 'react';
import MediaCard from '../MediaCard';
import DateRangePicker from '../DateRangePicker';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const ContractForm = (props) => {
  const submit = props.onSubmit;

  const [error, setError] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(props.selectedPackage || {});
  const [clientName, setClientName] = useState(props.clientName || "");
  const [clientPhone, setClientPhone] = useState(props.clientPhone || null);
  const [clientEmail, setClientEmail] = useState(props.clientEmail || "");
  const [startDate, setStartDate] = useState(props.startDate || new Date());
  const [address, setAddress] = useState(props.address || "");
  const [jobNotes, setJobNotes] = useState(props.jobNotes || "");

  const validate = () => {

  };

  return (
    <>
      <h1>New Contract</h1>
      <Stack component="form" spacing={2} sx={{margin: 'auto', width: '75%'}} >
        
        {error.length > 0 && <Alert severity="error">{`${error.join(', ')} cannot be blank.`}</Alert>}
        
        <FormControl>
          <InputLabel htmlFor="package">Package</InputLabel>
          <OutlinedInput
            id="package"
            value={selectedPackage}
            onChange={event => setSelectedPackage(event.target.value)}
            label="Please Select a Package"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="clientName">Client Name</InputLabel>
          <OutlinedInput
            id="clientName"
            value={clientName}
            onChange={event => setClientName(event.target.value)}
            label="Client Name"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="clientPhone">Client Phone Number</InputLabel>
          <OutlinedInput
            id="clientPhone"
            value={clientPhone}
            onChange={event => setClientPhone(event.target.value)}
            label="Client Phone Number"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="clientEmail">Client Email</InputLabel>
          <OutlinedInput
            id="clientEmail"
            value={clientEmail}
            onChange={event => setClientEmail(event.target.value)}
            label="Client Email"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="address">Address</InputLabel>
          <OutlinedInput
            id="address"
            value={address}
            onChange={event => setAddress(event.target.value)}
            label="Address"
          />
        </FormControl>          
        <TextField
          id="jobNotes"
          label="Job Notes"
          multiline
          maxRows={4}
          value={jobNotes}
          onChange={event => setJobNotes(event.target.value)}
        />
        <Button onClick={validate} variant="contained">Create New Package</Button>
      </Stack>
    </>
  );
};

export default ContractForm;
