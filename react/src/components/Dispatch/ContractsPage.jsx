import MediaCard from "../MediaCard";
import { format } from 'date-fns'
import { Stack, Box, Typography } from '@mui/material';
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
  let count = -1;
  const contractCards = contractsInfo.map(contract => {
    const nextVisit = contract.jobDate ? format(new Date(contract.jobDate), 'EEE MMM d yyyy') : 'None'
    count++;
    const header =(<Item>
      <Typography variant="h5">
      🚀 {contract.clientName} 🚀{contract.clientEmail} 
      </Typography>
    </Item>);
    const body = (<Stack container>
      <Item>Address: ${contract.address}</Item>
      <Item>Start Date:{contract.start_date}</Item>
      <Item>Job Notes: {contract.job_notes}</Item>
      <Item>Package length: {contract.packageLength}</Item>
      <Item>Next Visit: {nextVisit}<Typography variant="h6">🚀</Typography></Item>
      </Stack>);
    const linkToEdit = `/dispatch/contracts/${contract.id}`;
    

    return <MediaCard
    key={count}
    compClass="contract-card"
    link={linkToEdit}
    header={header}
    body={body}
    />;
  })

  return (
    <Box width={'100%'}>
    <h1>🚀 Contracts: 🚀</h1>
    {contractCards}
    </Box>
  );
};

export default ContractsPage;
