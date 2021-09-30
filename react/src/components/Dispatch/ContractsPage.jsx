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
    const nextVisit = format(new Date(contract.jobDate), 'EEE MMM d yyyy')
    const header =`${contract.clientName}\n${contract.clientEmail}`
    const body =
    `Address: ${contract.address}
    \nStart Date:${contract.start_date}
    \nPackage length: ${contract.packageLength}
    \nJob Notes: ${contract.job_notes}
    \nNext Visit: ${nextVisit}`
    const linkToEdit = `/dispatch/contracts/${contract.id}`;

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
    <h1>contractInfo: </h1>
    {contractCards}
    </>
  );
};

export default ContractsPage;
