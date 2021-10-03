import React, { useState } from 'react';
import { Box, Button, FormControl, Stack, InputLabel, OutlinedInput, TextField, Alert, Snackbar, Card, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const PackageForm = (props) => {
  const { onSubmit } = props;
  const browserHistory = useHistory();

  // const params = useParams();
  const [status, setStatus] = useState({error: false, success: false, message:""});
  const [error, setError] = useState([]);
  const [title, setTitle] = useState("");
  const [flatRate, setFlatRate] = useState("");
  const [sizeRange, setSizeRange] = useState("");
  const [description, setDescription] = useState("");
  const [manHrsPerVisit, setManHrsPerVisit] = useState("");
  const [contractLength, setContractLength] = useState("");
  const [visitInterval, setVisitInterval] = useState("");
  const [packageImage, setPackageImage] = useState("");
  
  // Validates form, sets error message and prevents submission if mandatory fields are blank
  // Passes new Package object to props.onSubmit if validation is successful
  const validate = () => {
    const errorMessage = [];

    if (title && flatRate && manHrsPerVisit && contractLength && visitInterval) {
      // Successful package creation
      console.log(`Success: ${status.success}`);
      console.log(`Error: ${status.error}`);
      setError([]);
      onSubmit({title, flatRate, sizeRange, description, manHrsPerVisit, contractLength, visitInterval, packageImage})
      .then((response) => {
        setStatus({error: false, success: true, message: "Package created successfully!"})
        setTimeout(() => browserHistory.push('/dispatch'), 1500);
      })
      .catch((err) => { 
          setStatus({ success: false, error: true, message: "Package creation error!"});
      })

    } else {
      if (!title) {
        errorMessage.push('Title');
      }
      if (!flatRate) {
        errorMessage.push('Flat Rate');
      }
      if (!manHrsPerVisit) {
        errorMessage.push('Man Hrs per Visit');
      }
      if (!contractLength) {
        errorMessage.push('Contract Length');
      }
      if (!visitInterval) {
        errorMessage.push('Visit Interval');
      }
        
      setError(errorMessage);
    } 
  };

  return (
    <Box width={'100%'} >
      <Card sx={{maxHeight: 800, maxWidth: 400, alignItems: 'center',  margin: 'auto', mb: 5 }}>
        <Typography variant="h4">
      Launch New Package
      </Typography>
      </Card>
      <Snackbar open={status.success || status.error} autoHideDuration={6000} onClose={() => setStatus({success: false, error: false, message: ""})}>
        <Alert onClose={() => setStatus({success: false, error: false, message: ""})}
         severity={status.error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {status.message}
        </Alert>
      </Snackbar>
      <Stack component="form" spacing={2} sx={{margin: 'auto', maxWidth: 600}} >
      
      {error.length > 0 && <Alert severity="error">{`${error.join(', ')} cannot be blank.`}</Alert>}
      


      <FormControl>
        <InputLabel htmlFor="title">Title</InputLabel>
        <OutlinedInput
          id="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          label="Title"
        />
      </FormControl>
      <TextField
          id="description"
          label="Description"
          multiline
          maxRows={4}
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      <FormControl>
        <InputLabel htmlFor="flatRate">Flat Rate</InputLabel>
        <OutlinedInput
          id="flatRate"
          value={flatRate}
          onChange={event => setFlatRate(event.target.value)}
          label="Flat Rate"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="sizeRange">Size Range</InputLabel>
        <OutlinedInput
          id="sizeRange"
          value={sizeRange}
          onChange={event => setSizeRange(event.target.value)}
          label="Size Range"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="manHrsPerVisit">Approx. Hrs per Visit</InputLabel>
        <OutlinedInput
          id="manHrsPerVisit"
          value={manHrsPerVisit}
          onChange={event => setManHrsPerVisit(event.target.value)}
          label="Approx. Hrs per Visit"
        />
        </FormControl>
        <FormControl>
        <InputLabel htmlFor="contractLengthDays">Contract Length (days)</InputLabel>
        <OutlinedInput
          id="contractLengthDays"
          value={contractLength}
          onChange={event => setContractLength(event.target.value)}
          label="Contract Length (days)"
        />
        </FormControl>
        <FormControl>
        <InputLabel htmlFor="visitIntervalDays">Visit Interval (days)</InputLabel>
        <OutlinedInput
          id="visitIntervalDays"
          value={visitInterval}
          onChange={event => setVisitInterval(event.target.value)}
          label="Visit Interval (days)"
        />
        </FormControl>
        <FormControl>
        <InputLabel htmlFor="packageImage">Package Image (file name)</InputLabel>
        <OutlinedInput
          id="packageImage"
          value={packageImage}
          onChange={event => setPackageImage(event.target.value)}
          label="Package Image (file name)"
        />
        </FormControl>


        <Button onClick={validate} variant="contained">Launch</Button>
      </Stack>
    </Box>
  );
};

export default PackageForm;