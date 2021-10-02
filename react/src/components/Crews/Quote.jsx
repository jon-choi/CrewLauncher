import { useState } from 'react';
import DateRangePicker from '../DateRangePicker';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import QuoteSpeedDial from './QuoteSpeedDial'
import { format, addDays } from 'date-fns';


const Quote = (props) => {
  const { packages } = props;
  const submit = props.onSubmitQuote;

  const [error, setError] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState(null);
  const [clientEmail, setClientEmail] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [address, setAddress] = useState("");

  const validate = () => {
    const errorMessage = [];

    if (selectedPackage && startDate && address && clientName && clientEmail && clientPhone) {
      
      setError([]);
      const quote = {
        packageInfo : selectedPackage,
        packageId: selectedPackage.id,
        startDate: startDate,
        address,
        clientEmail,
        clientName,
        clientPhone
      }
      return submit(quote);
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
        setEndDate(addDays(start, selectedPackage.contract_length_days));
      } else {
        setEndDate(start);
      }
  };

  return (
    <>
      <Stack component="form" spacing={2} sx={{margin: 'auto', width: '90%'}} >
        <h1>
          <QuoteSpeedDial onChange={setSelectedPackage} packages={packages} selectedPackage={selectedPackage} />
        </h1>
        {error.length > 0 && <Alert severity="error">{`${error.join(', ')} cannot be blank.`}</Alert>}

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
        
        <FormControl required>
          <InputLabel htmlFor="address">Address</InputLabel>
          <OutlinedInput
            id="address"
            value={address}
            onChange={event => setAddress(event.target.value)}
            label="Address"
          />
        </FormControl>          

        <FormControl>
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
            <TextField required disabled label={'Package'} value={(selectedPackage && selectedPackage.title) || 'Please Select a Package'} />
            <DateRangePicker startDate={startDate} endDate={endDate} onChange={changeDate} />

            <Box sx={{display: 'flex', 'flex-direction': 'row', 'justify-content': 'center'}}>
              <TextField disabled label={'Contract Start'} value={format(startDate, 'dd-MM-yyyy')} />
              <TextField disabled label={'Contract End'} value={format(endDate, 'dd-MM-yyyy')} />
            </Box>
          </>
        }
        
        <Button onClick={validate} variant="contained">Quote!</Button>
      </Stack>
    </>
  );
};

export default Quote;