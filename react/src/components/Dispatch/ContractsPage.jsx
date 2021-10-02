import MediaCard from "../MediaCard";
import { format, isBefore, isAfter, addDays, differenceInDays } from 'date-fns'
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
    const nextVisit = contract.jobDate ? format(new Date(contract.jobDate), 'EEE MMM d yyyy') : 'None';
    count++;
    const header =(<Item>
      <Typography variant="h5">
      🚀 {contract.clientName} 🚀{contract.clientEmail} 
      </Typography>
    </Item>);
    console.log('contract start date before crashing: ', contract.start_date)
    const startDate = contract.start_date ? format(new Date(contract.start_date), 'EEE MMM d yyyy') : 'Unknown';
    const endDate = new Date(addDays(new Date(startDate), parseInt(contract.packageLength)));
    const completedContract = isAfter(new Date(), endDate);
    const currentContract = isAfter(new Date(), new Date(startDate)) && isBefore(new Date(), endDate);
    const daysLeftInContract = differenceInDays(endDate, new Date());
    const contractProgress = completedContract ? 100 : Math.round((contract.packageLength - daysLeftInContract) / contract.packageLength * 100);

    const body = (
    <Stack >
      {(currentContract || completedContract) && contractProgress && 

      <Box sx={{position: 'relative', display: 'inline'}}>
        <CircularProgress size={'4.5em'} variant="determinate" value={contractProgress} />

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
          <Typography fontSize="2em" variant="caption" component="div" color="text.secondary">
            {completedContract ? '🚀' : `${contractProgress}%`}
          </Typography>
        </Box>
      </Box>
      }
      <Item>Address: {contract.address}</Item>
      <Item>Start Date: {startDate}</Item>
      <Item>Notes: {contract.job_notes}</Item>
      <Item><b>Contract length:</b> {contract.packageLength}</Item>
      <Item>Next Visit: {nextVisit}<Typography variant="h6">🚀</Typography></Item>
      </Stack>);
    const linkToEdit = `/dispatch/contracts/${contract.id}`;

    return (<Grid item >
      <MediaCard
    key={count}
    compClass="contract-card"
    link={linkToEdit}
    header={header}
    body={body}
    />
  </Grid>)
  })

  return (
    <Stack spacing={5} >
      <Item sx={{maxHeight: 800, maxWidth: 900, alignItems: 'center',  margin: 'auto'}}>
        <Typography variant="h3" >
      🚀 Contracts 🚀
        </Typography>
      </Item>

        <Grid container justifyContent="center" width={'100%'} columnSpacing={3} rowSpacing={2}>
    {contractCards}
        </Grid>

    </Stack>
  );
};

export default ContractsPage;
