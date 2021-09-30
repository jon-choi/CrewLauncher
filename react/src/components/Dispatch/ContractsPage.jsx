import MediaCard from "../MediaCard";
import { format } from 'date-fns'
import { Stack, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const ContractsPage = (props) => {
  const { contractsInfo } = props

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center'
  }));

  const contractCards = contractsInfo.map(contract => {
    const nextVisit = contract.jobDate ? format(new Date(contract.jobDate), 'EEE MMM d yyyy') : 'None'
    const header =(<Item>
      <Typography variant="h5">
      🚀 {contract.clientName} 🚀{contract.clientEmail} 
      </Typography>
    </Item>)
    const body = (<Stack container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Item>Address: ${contract.address}</Item>
      <Item>Start Date:{contract.start_date}</Item>
      <Item>Job Notes: {contract.job_notes}</Item>
      <Item>Package length: {contract.packageLength}</Item>
      <Item>Next Visit: {nextVisit}<Typography variant="h6">🚀</Typography></Item>
      </Stack>);
    const linkToEdit = `/dispatch/contracts/${contract.id}`
    

    return <MediaCard
    key={contract.id}
    compClass="contract-card"
    link={linkToEdit}
    header={header}
    body={body}
    />
  })

  return (
    <>
    <h1>🚀 Contracts: 🚀</h1>
    {contractCards}
    </>
  );
};

export default ContractsPage;
