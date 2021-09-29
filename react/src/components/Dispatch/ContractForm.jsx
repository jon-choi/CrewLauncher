import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
import Snackbar from '@mui/material/Snackbar';
import { format, addDays, parseISO } from 'date-fns';


// const getContractFormData = (contractId, clients, contracts) => {
//   const contract = contracts.filter(c => c.id === contractId)[0];

// };

const ContractForm = (props) => {
  const id = parseInt(useParams().id);
  const con = props.contracts.filter(c => c.id === id);
  let thisContract;
  console.log("conn is undefined ? ", con === undefined)
  if (con !== undefined) {
    const thisClient = props.clients.filter(c => c.id === con.client_id)[0];
    const thisPackage = props.packages.filter(p => p.id === con.package_id)[0];
    thisContract = {
      ...props.contracts[id],
      clientName: thisClient.name,
      clientEmail: thisClient.email,
      clientPhone: thisClient.phone,
      selectedPackage: thisPackage,
      
    }
    console.log("THIS CLIENT", thisClient);
    console.log("THIS CONTRACT", thisContract);
    console.log("thisContract.selectedPackage: ", thisContract.selectedPackage);
  }
  const { packages, onSubmit } = props;
  // const [editMode, setEditMode] = useState(id ? true : false)
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState( thisContract.selectedPackage || null);
  const [clientName, setClientName] = useState( thisContract.clientName || "");
  const [clientPhone, setClientPhone] = useState( thisContract.clientPhone || null);
  const [clientEmail, setClientEmail] = useState( thisContract.clientEmail || "");
  const [startDate, setStartDate] = useState( thisContract.startDate || new Date());
  const [endDate, setEndDate] = useState( addDays(parseISO(thisContract.start_date), parseInt(thisContract.selectedPackage.contract_length_days)) || new Date());
  const [address, setAddress] = useState( thisContract.address || "");
  const [jobNotes, setJobNotes] = useState( thisContract.job_notes || "");

  const validate = () => {
    const errorMessage = [];

    if (selectedPackage && startDate && address && clientName && clientEmail) {
      // Successful package creation
      setError([]);
      onSubmit({id, clientName, clientPhone, clientEmail, startDate, address, jobNotes, packageId: selectedPackage.id})
      .then(() => setSuccess(true));
    }
    if (!selectedPackage) {
      errorMessage.push('Package');
    }
    if (!address) {
      errorMessage.push('Address');
    }
    if (!startDate) {
      errorMessage.push('Start Date');
    }
    if (!clientName) {
      errorMessage.push('Client Name');
    }
    if (!clientEmail) {
      errorMessage.push('Client Email');
    }
    setError(errorMessage);
  };

  const changeDate = (dates) => {
      const [start] = dates;
      setStartDate(start);
      if (selectedPackage) {
        setEndDate(addDays(start, selectedPackage.contract_length_days));
      } else {
        setEndDate(start);
      }
  };

  // Map through all packages in database
  const packageCards = packages.map(p => {
    const packageBody = (`
      $${p.flat_rate} --
      ${p.contract_length_days} days --
      ${p.size_range_string || ''} --
      ${p.description} --
      Service Interval: ${p.visit_interval_days}-days`);
    
    return (
      <Stack key={p.id} spacing={1}>
        <div onClick={() => {setSelectedPackage(p)}} >
          <MediaCard 
            key={p.id}
            image={p.package_image}
            header={p.title} 
            body={packageBody}
          />
        </div>
      </Stack>
    )
  });

  return (
    <>
      <h1>New Contract</h1>
      <Stack component="form" spacing={2} sx={{margin: 'auto', width: '75%'}} >
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(true)}>
          <Alert onClose={() => setSuccess(false)}
          severity="success" sx={{ width: '100%' }}>
            Package created successfully!
          </Alert>
        </Snackbar>
        {error.length > 0 && <Alert severity="error">{`${error.join(', ')} cannot be blank.`}</Alert>}
        
        <Drawer buttonText={'Select a Package'} items={packageCards} />
        
        {selectedPackage &&
          <>
            <TextField required disabled label={'Package'} value={((selectedPackage && selectedPackage.title) || props.selectedPackage.title) || 'Please Select a Package'} />
            <DateRangePicker startDate={startDate} endDate={endDate} onChange={changeDate} />

            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
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
