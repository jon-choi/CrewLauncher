import { Link } from 'react-router-dom';
import { Drawer, Button, Divider, Stack, Card, Typography, CardActions } from '@mui/material';
import { format } from 'date-fns';
const NavigationEmptyJobs = (props) => {
  const { open, setOpen, jobs, contracts } = props;
  
  const jobCards = jobs.map(job => {
    const contract = contracts.filter(contract => contract.id === job.contract_id)[0]
    return (
    <Card key={job.id}>
      <CardActions>
        <Button component={Link} to={`/dispatch/jobs/${job.id}`}>Edit Job</Button>
      </CardActions>
      <Typography>
        <b>{format(new Date(job.date), 'MMMM, dd, yyyy')}</b>
      </Typography>
      <Typography>
        {contract && contract.address}
      </Typography>
    </Card>);
  });

  return (
    <Drawer open={open} variant='persistent' position='static' anchor='left'
      sx={{display: { xs: 'block', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
    }}>
      <Button><h1 onClick={()=> setOpen(false)}>Crew🚀Launcher</h1></Button>
      <Divider />
      <Stack>
        {jobCards.length > 0 ? jobCards : (<h3>No unassigned jobs :)</h3>)}
      </Stack>
    </Drawer>
  )
}

export default NavigationEmptyJobs;