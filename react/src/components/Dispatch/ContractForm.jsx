import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import MediaCard from '../MediaCard';
import DateRangePicker from '../DateRangePicker';
import Drawer from '../Drawer';
import { Stack, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar } from '@mui/material';
import { format, addDays } from 'date-fns';


  const ContractForm = (props) => {
    const id = parseInt(useParams().id);
    const clientId = parseInt(useParams().client_id); 
    const quoteKey = parseInt(useParams().quote_key)
    const { url } = useRouteMatch();
    const browserHistory = useHistory();

    const { packages, onSubmit } = props;
    // const [editMode, setEditMode] = useState(id ? true : false)
    const [status, setStatus] = useState({success: false, error: false, message: ""});
    const [error, setError] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [address, setAddress] = useState("");
    const [jobNotes, setJobNotes] = useState("");
    
    const con = props.contracts ? props.contracts.filter(c => c.id === id)[0] : undefined;
    const cli = props.clients ? props.clients.filter(client => client.id === clientId)[0] : undefined;
    const quo = props.quotes ? props.quotes[quoteKey] : undefined;
    console.log("Props.quotes", props.quotes[quoteKey])
  useEffect(() => {  
    if (con !== undefined) {
      const thisClient = props.clients.filter(c => c.id === con.client_id)[0];
      const thisPackage = props.packages.filter(p => p.id === con.package_id)[0];

      setClientName(thisClient.name);
      setClientPhone(thisClient.phone);
      setClientEmail(thisClient.email);
      setStartDate(new Date(con.start_date));
      setEndDate(addDays(new Date(con.start_date), thisPackage.contract_length_days));
      setSelectedPackage(thisPackage);
      setAddress(con.address);
      setJobNotes(con.job_notes);
    } else if (cli !== undefined) {
      setClientName(cli.name);
      setClientPhone(cli.phone);
      setClientEmail(cli.email);
    } else if (quo !== undefined) {
      setClientName(quo.clientName);
      setClientPhone(quo.clientPhone);
      setClientEmail(quo.clientEmail);
      setSelectedPackage(quo.selectedPackage);
      setAddress(quo.address);
      setStartDate(new Date(quo.startDate));
    }
  }, [quo, url, con, cli, props.clients, props.packages])
 

  const validate = () => {
    const errorMessage = [];

    if (selectedPackage && startDate && address && clientName && clientEmail) {
      // Successful package creation
      setError([]);
      onSubmit({id, clientName, clientPhone, clientEmail, startDate, address, jobNotes, packageId: selectedPackage.id})
      .then(() => { 
      setStatus({success: true, error: false, message: "Contract created successfully!"})
      setTimeout(() => browserHistory.push(`/dispatch/contracts`), 1500);
    })
      .catch(() => setStatus({success: false, error: true, message: "Error creating contract!"}));
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
      setStartDate(new Date(start));
      if (selectedPackage) {
        setEndDate(addDays(new Date(start), selectedPackage.contract_length_days));
      } else {
        setEndDate(new Date(start));
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
    <Box width={'100%'}>
      <h1>New Contract</h1>
      <Stack component="form" spacing={2} sx={{margin: 'auto', maxWidth: 600}} >
        <Snackbar open={status.success || status.error} autoHideDuration={6000} onClose={() => setStatus({success: false, error: false, message: ""})}>
          <Alert onClose={() => setStatus({success: false, error: false, message: ""})}
          severity={status.success ? 'success' : 'error'} sx={{ width: '100%' }}>
            {status.message}
          </Alert>
        </Snackbar>
        {error.length > 0 && <Alert severity="error">{`${error.join(', ')} cannot be blank.`}</Alert>}
        
        <Drawer closeButtonText={'close'} openButtonText={'Select a Package'} items={packageCards} />
        
        {selectedPackage &&
          <>
            <TextField required disabled label={'Package'} value={((selectedPackage && selectedPackage.title) || selectedPackage.title) || 'Please Select a Package'} />
            <DateRangePicker startDate={startDate} endDate={endDate} onChange={changeDate} />

            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <TextField disabled label={'Contract Start'} value={format(new Date(startDate), 'MMMM dd, yyyy')} />
              <TextField disabled label={'Contract End'} value={format(new Date(endDate), 'MMMM dd, yyyy')} />
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
            value={`${clientPhone}`}
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
        
        <Button onClick={validate} variant="contained">Submit Contract</Button>
      </Stack>
    </Box>
  );
};

export default ContractForm;
