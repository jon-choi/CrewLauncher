import { useState } from 'react';
import DateRangePicker from '../DateRangePicker';
import { Stack, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar } from '@mui/material';
import QuoteSpeedDial from './QuoteSpeedDial'
import { format, addDays } from 'date-fns';
import classNames from 'classnames'


const Quote = (props) => {
  const { packages } = props;
  const submit = props.onSubmitQuote;
  const [status, setStatus] = useState({success: false, message: ""})
  const [error, setError] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState(null);
  const [clientEmail, setClientEmail] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);

  const validate = () => {
    const errorMessage = [];

    if (selectedPackage && startDate && address && clientName && clientEmail && clientPhone) {
      
      setError([]);
      const quote = {
        packageId: selectedPackage.id,
        startDate: startDate,
        address,
        clientEmail,
        clientName,
        clientPhone,
        selectedPackage
      }
      return submit(quote)
      .then((response) => {
        setStatus({success: true, error: false, message: response});
      })
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
    if (!clientPhone) {
      errorMessage.push('Client Phone');
    }
      
    setError(errorMessage);
    
  };

  const changeDate = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      if (selectedPackage) {
        setEndDate(addDays(start, selectedPackage.contract_length_days -1));
      } else {
        setEndDate(start);
      }
  };

  const zChange = classNames('form', {
    behind: open
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Stack className={zChange} component="form" spacing={2} sx={{margin: 'auto', width: '90%'}} >
      <Snackbar open={status.success || status.error} autoHideDuration={6000} onClose={() => setStatus({success: false, message: ""})}>
          <Alert onClose={() => setStatus({success: false, message: ""})}
          severity={'success'} sx={{ width: '100%' }}>
            {status.message}
          </Alert>
        </Snackbar>
        <h1>
          <QuoteSpeedDial zChange={zChange} handleClose={handleClose} handleOpen={handleOpen} open={open} direction="left" onChange={setSelectedPackage} packages={packages} selectedPackage={selectedPackage} />
        </h1>
        {error.length > 0 && <Alert severity="error">{`${error.join(', ')} cannot be blank.`}</Alert>}

        <FormControl className={zChange} required>
          <InputLabel className={zChange} htmlFor="clientName">Client Name</InputLabel>
          <OutlinedInput 
            id="clientName"
            value={clientName}
            onChange={event => setClientName(event.target.value)}
            label="Client Name"
          />
        </FormControl>
        
        <FormControl  className={zChange} required>
          <InputLabel htmlFor="clientEmail">Client Email</InputLabel>
          <OutlinedInput
            id="clientEmail"
            value={clientEmail}
            onChange={event => setClientEmail(event.target.value)}
            label="Client Email"
          />
        </FormControl>
        
        <FormControl className={zChange} required>
          <InputLabel htmlFor="address">Address</InputLabel>
          <OutlinedInput
            id="address"
            value={address}
            onChange={event => setAddress(event.target.value)}
            label="Address"
          />
        </FormControl>          

        <FormControl className={zChange}>
          <InputLabel htmlFor="clientPhone">Phone Number</InputLabel>
          <OutlinedInput
            id="clientPhone"
            value={clientPhone}
            onChange={event => setClientPhone(event.target.value)}
            label="Phone Number"
          />
        </FormControl>
        
        {selectedPackage &&
          <>
            <TextField  className={zChange} required disabled label={'Package'} value={(selectedPackage && selectedPackage.title) || 'Please Select a Package'} />
            <DateRangePicker startDate={startDate} endDate={endDate} onChange={changeDate} />

            <Box className={zChange} sx={{display: 'flex', 'flex-direction': 'row', 'justify-content': 'center'}}>
              <TextField disabled label={'Contract Start'} value={format(startDate, 'dd-MM-yyyy')} />
              <TextField disabled label={'Contract End'} value={format(endDate, 'dd-MM-yyyy')} />
            </Box>
          </>
        }
        
        <Button className={zChange} onClick={validate} variant="contained" >Quote!</Button>
      </Stack>
    </>
  );
};

export default Quote;