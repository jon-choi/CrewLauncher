import React, { useState } from 'react';
import MediaCard from '../MediaCard';
import DateRangePicker from '../DateRangePicker';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Drawer from '../Drawer';
import { format, addDays, getDate } from 'date-fns';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

const ContractForm = (props) => {
  const { packages } = props;
  const submit = props.onSubmit;

  const [error, setError] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(props.selectedPackage || null);
  const [clientName, setClientName] = useState(props.clientName || "");
  const [clientPhone, setClientPhone] = useState(props.clientPhone || null);
  const [clientEmail, setClientEmail] = useState(props.clientEmail || "");
  const [startDate, setStartDate] = useState(props.startDate || new Date());
  const [endDate, setEndDate] = useState(props.startDate ? addDays(props.startDate, selectedPackage.contract_length_days) : new Date());
  const [address, setAddress] = useState(props.address || "");
  const [jobNotes, setJobNotes] = useState(props.jobNotes || "");

  const validate = () => {

  };

  const changeDate = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      if (selectedPackage) {
        setEndDate(addDays(start, selectedPackage.contract_length_days));
      } else {
        setEndDate(start);
      }
  };

  
  const packageCards = packages.map(p => {
    const packageBody = (`
      $${p.flat_rate} --
      ${p.contract_length_days} days
      ${p.size_range_string || ''} --
      ${p.description} --
      Service Interval: ${p.visit_interval_days}-days`);
    
    return (
      <Stack spacing={1}>
        <div onClick={() => {setSelectedPackage(p)}} >
          <MediaCard 
            image={p.package_image}
            header={p.title} 
            body={packageBody}
          />
        </div>
      </Stack>
    )
  });
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
        
        <Drawer buttonText={'Select a Package'} items={packageCards} />
        
        {selectedPackage &&
          <>
            <TextField required disabled label={'Package'} value={selectedPackage ? selectedPackage.title : 'Please Select a Package'} />
            <DateRangePicker startDate={startDate} endDate={endDate} onChange={changeDate} />

            <Box sx={{display: 'flex', 'flex-direction': 'row'}}>
              <TextField disabled label={'Contract Start'} value={format(startDate, 'MMMM dd, yyyy')} />
              <TextField disabled label={'Contract End'} value={format(endDate, 'MMMM dd, yyyy')} />
            </Box>
          </>
        }

        <FormControl required>
          <InputLabel htmlFor="clientName">Client Name</InputLabel>
          <OutlinedInput 
            id="clientName"
            value={clientName}
            onChange={event => setClientName(event.target.value)}
            label="Client Name"
          />
        </FormControl>
        
        <FormControl required>
          <InputLabel htmlFor="clientEmail">Client Email</InputLabel>
          <OutlinedInput
            id="clientEmail"
            value={clientEmail}
            onChange={event => setClientEmail(event.target.value)}
            label="Client Email"
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
        
        <FormControl required>
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
        
        <Button onClick={validate} variant="contained">Create New Contract</Button>
      </Stack>
    </>
  );
};

export default ContractForm;
