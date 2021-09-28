import React, { useState } from 'react';
// import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const PackageForm = (props) => {

  // const params = useParams();
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
  const validate = () => {
    const errorMessage = [];

    if (title && flatRate && manHrsPerVisit && contractLength && visitInterval) {
      // Successful package creation
      setError([]);
      return console.log({title, flatRate, sizeRange, description, manHrsPerVisit, contractLength, visitInterval, packageImage});
    }
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
  };

  return (
    <>
      <h1>Create New Package</h1>
      <Stack component="form" spacing={2} sx={{margin: 'auto', width: '75%'}} >
      
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
        <Button onClick={validate} variant="contained">Create New Package</Button>
      </Stack>
    </>
  );
};

export default PackageForm;