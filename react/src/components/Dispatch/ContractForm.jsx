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
import Drawer from '../Drawer';
import addDays from 'date-fns/addDays';

const ContractForm = (props) => {
  const { packages } = props;
  const submit = props.onSubmit;


  const [error, setError] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(props.selectedPackage);
  const [clientName, setClientName] = useState(props.clientName || "");
  const [clientPhone, setClientPhone] = useState(props.clientPhone || null);
  const [clientEmail, setClientEmail] = useState(props.clientEmail || "");
  const [startDate, setStartDate] = useState(props.startDate || new Date());
  const [endDate, setEndDate] = useState(addDays(props.startDate, selectedPackage.contract_length_days) || new Date());
  const [address, setAddress] = useState(props.address || "");
  const [jobNotes, setJobNotes] = useState(props.jobNotes || "");

  const validate = () => {

  };

  const changeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(addDays(start, selectedPackage.contract_length_days));
    
  };
  console.log("Selected Package: ", selectedPackage);
    // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(addDays(startDate, packageLength - 1));
  
  // const onChange = (dates) => {
  //   const [start, end] = dates;
  //   setInternalEndDate(addDays(start, packageLength));
  //   onChange(start, end);
  // };
  return (
    <>
      <h1>New Contract</h1>
      <Stack component="form" spacing={2} sx={{margin: 'auto', width: '75%'}} >
        
        {error.length > 0 && <Alert severity="error">{`${error.join(', ')} cannot be blank.`}</Alert>}
        

          {/* <OutlinedInput
            id="package"
            value={selectedPackage}
            onChange={event => setSelectedPackage(event.target.value)}
            label="Please Select a Package"
          /> */}
          <Drawer buttonText={'Select a Package'} items={packages} />

        <DateRangePicker startDate={startDate} endDate={endDate} onChange={changeDate} />

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
