import MediaCard from "../MediaCard";
import { format, isWithinInterval, addDays, differenceInDays } from 'date-fns'
import { Stack, Box, Typography, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
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
    
    const startDate = format(new Date(contract.start_date), 'EEE MMM d yyyy');
    const endDate = new Date(addDays(new Date(startDate), parseInt(contract.packageLength)));
    const currentContract = isWithinInterval(new Date(), {start: new Date(startDate), end: endDate});
    const daysLeftInContract = differenceInDays(endDate, new Date());
    const contractProgress = Math.round((contract.packageLength - daysLeftInContract) / contract.packageLength * 100);

    const body = (
    <Stack container>
      {currentContract && contractProgress && 
      
      <Box sx={{position: 'relative', display: 'inline', border: '2px red solid'}}>
        <CircularProgress variant="determinate" value={contractProgress} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${contractProgress}%`}
          </Typography>
        </Box>
      </Box>
      }
      <Item>Address: {contract.address}</Item>
      <Item>Start Date:{startDate}</Item>
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
    <Grid width={'100%'}>
    <h1>🚀 Contracts: 🚀</h1>
    {contractCards}
    </Grid>
  );
};

export default ContractsPage;
